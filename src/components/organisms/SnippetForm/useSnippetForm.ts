import { snippetSchema } from '@/schemas';
import { trpc } from '@/utils/trpc';
import { ChangeEvent, useReducer, useState } from 'react';
import { inferFormattedError } from 'zod';

enum ActionType {
  UPDATE_VALUE,
}

export type ISnippetForm = typeof snippetSchema._type;

const initialState: ISnippetForm = {
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
  key: keyof ISnippetForm;
  value: string;
};

const reducer = (state: ISnippetForm, action: Action): ISnippetForm => {
  switch (action.type) {
    case ActionType.UPDATE_VALUE:
      return { ...state, [action.key]: action.value };
    default:
      return state;
  }
};

export const useSnippetForm = (snippet = initialState) => {
  const { mutate, isLoading, reset, isSuccess } = trpc.useMutation(['protected.snippets.upsert']);
  const [state, dispatch] = useReducer(reducer, { ...snippet });
  const [fieldErrors, setFieldErrors] = useState<
    Partial<inferFormattedError<typeof snippetSchema>>
  >({});

  const updateField = (key: keyof ISnippetForm) => {
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
    submit,
    updateField,
  };
};
