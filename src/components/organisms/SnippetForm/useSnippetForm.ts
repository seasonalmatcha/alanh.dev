import { snippetSchema } from '@/schemas';
import { trpc } from '@/utils/trpc';
import { ChangeEvent, useEffect, useReducer, useState } from 'react';
import { inferFormattedError } from 'zod';
import slugify from 'slugify';

enum ActionType {
  UPDATE_VALUE,
}

type SnippetState = typeof snippetSchema._type;

const defaultState: SnippetState = {
  content: '',
  description: '',
  excerpt: '',
  languageId: '',
  logo: '',
  slug: '',
  title: '',
};

type Action = {
  type: ActionType.UPDATE_VALUE;
  key: keyof SnippetState;
  value: string;
};

const reducer = (state: SnippetState, action: Action): SnippetState => {
  switch (action.type) {
    case ActionType.UPDATE_VALUE:
      return { ...state, [action.key]: action.value };
    default:
      return state;
  }
};

export interface ISnippetForm {
  initialState?: typeof snippetSchema._type;
}

export const useSnippetForm = ({ initialState = defaultState }: ISnippetForm) => {
  const { mutate, isLoading, reset, isSuccess } = trpc.useMutation(['protected.snippets.upsert']);
  const [state, dispatch] = useReducer(reducer, initialState);
  const [fieldErrors, setFieldErrors] = useState<
    Partial<inferFormattedError<typeof snippetSchema>>
  >({});

  const updateField = (key: keyof SnippetState) => {
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

    const result = snippetSchema.safeParse(state);
    if (!result.success) {
      setFieldErrors(result.error.format());
      return;
    }

    mutate(result.data, {
      onSuccess: (snippet) => {
        setTimeout(() => {
          reset();
        }, 3000);
        dispatch({ type: ActionType.UPDATE_VALUE, key: 'id', value: snippet.id });
      },
    });
  };

  useEffect(() => {
    dispatch({
      type: ActionType.UPDATE_VALUE,
      key: 'slug',
      value: slugify(state.title, {
        lower: true,
        strict: true,
      }),
    });
  }, [state.title]);

  return {
    fieldErrors,
    isLoading,
    isSuccess,
    state,
    submit,
    updateField,
  };
};
