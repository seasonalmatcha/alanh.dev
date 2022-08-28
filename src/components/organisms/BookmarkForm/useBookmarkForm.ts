import { bookmarkSchema } from '@/schemas';
import { trpc } from '@/utils/trpc';
import { ChangeEvent, useReducer, useState } from 'react';
import { inferFormattedError } from 'zod';

enum ActionType {
  UPDATE_VALUE,
}

type BookmarkState = typeof bookmarkSchema._type;

const defaultState: BookmarkState = {
  excerpt: '',
  thumbnail: '',
  title: '',
  url: '',
  urlText: '',
};

type Action = {
  type: ActionType.UPDATE_VALUE;
  key: keyof BookmarkState;
  value: string;
};

const reducer = (state: BookmarkState, action: Action): BookmarkState => {
  switch (action.type) {
    case ActionType.UPDATE_VALUE:
      return { ...state, [action.key]: action.value };
    default:
      return state;
  }
};

export interface IBookmarkForm {
  initialState?: typeof bookmarkSchema._type;
}

export const useBookmarkForm = ({ initialState = defaultState }: IBookmarkForm) => {
  const { mutate, isLoading, reset, isSuccess } = trpc.useMutation(['protected.bookmarks.upsert']);
  const [state, dispatch] = useReducer(reducer, initialState);
  const [fieldErrors, setFieldErrors] = useState<
    Partial<inferFormattedError<typeof bookmarkSchema>>
  >({});

  const updateField = (key: keyof BookmarkState) => {
    return (
      arg?: string | ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
    ) => {
      switch (typeof arg) {
        case 'undefined':
          return;
        case 'string':
          dispatch({ type: ActionType.UPDATE_VALUE, key, value: arg });
          return;
        default:
          dispatch({ type: ActionType.UPDATE_VALUE, key, value: arg.target.value });
          return;
      }
    };
  };

  const submit = () => {
    setFieldErrors({});

    const result = bookmarkSchema.safeParse(state);
    if (!result.success) {
      setFieldErrors(result.error.format());
      return;
    }

    mutate(result.data, {
      onSuccess: (bookmark) => {
        setTimeout(() => {
          reset();
        }, 3000);
        dispatch({ type: ActionType.UPDATE_VALUE, key: 'id', value: bookmark.id });
      },
    });
  };

  return {
    fieldErrors,
    isLoading,
    isSuccess,
    state,
    submit,
    updateField,
  };
};
