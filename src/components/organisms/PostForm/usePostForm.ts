import { postSchema } from '@/schemas';
import { trpc } from '@/utils/trpc';
import { ChangeEvent, useReducer, useState } from 'react';
import { inferFormattedError } from 'zod';

enum ActionType {
  ADD_CATEGORY,
  REMOVE_CATEGORY,
  UPDATE_VALUE,
}

const initialState: IPostForm = {
  content: '',
  excerpt: '',
  slug: '',
  thumbnail: '',
  title: '',
  categories: [],
};

export type IPostForm = typeof postSchema._type;

type Action =
  | {
      type: ActionType.UPDATE_VALUE;
      key: keyof IPostForm;
      value: string;
    }
  | {
      type: ActionType.ADD_CATEGORY;
      value: string;
    }
  | {
      type: ActionType.REMOVE_CATEGORY;
      value: number;
    };

const reducer = (state: IPostForm, action: Action): IPostForm => {
  switch (action.type) {
    case ActionType.UPDATE_VALUE:
      return { ...state, [action.key]: action.value };
    case ActionType.ADD_CATEGORY:
      return { ...state, categories: [...state.categories, { name: action.value }] };
    case ActionType.REMOVE_CATEGORY:
      const newCategories = [...state.categories];
      newCategories.splice(action.value, 1);
      return { ...state, categories: [...newCategories] };
    default:
      return state;
  }
};

export const usePostForm = (post = initialState) => {
  const { mutate, isLoading, reset, isSuccess } = trpc.useMutation(['protected.posts.upsert']);
  const [state, dispatch] = useReducer(reducer, { ...post });
  const [fieldErrors, setFieldErrors] = useState<Partial<inferFormattedError<typeof postSchema>>>(
    {},
  );

  const addCategory = (name: string) => {
    if (state.categories.find((c) => c.name === name)) return;

    dispatch({ type: ActionType.ADD_CATEGORY, value: name });
  };

  const removeCategory = (index: number) => {
    return () => {
      dispatch({ type: ActionType.REMOVE_CATEGORY, value: index });
    };
  };

  const updateField = (key: keyof IPostForm) => {
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

    const result = postSchema.safeParse(state);
    if (!result.success) {
      setFieldErrors(result.error.format());
      return;
    }

    mutate(result.data, {
      onSuccess: () => {
        setTimeout(() => {
          reset();
        }, 3000);
      },
    });
  };

  return {
    fieldErrors,
    isLoading,
    isSuccess,
    state,
    addCategory,
    removeCategory,
    submit,
    updateField,
  };
};
