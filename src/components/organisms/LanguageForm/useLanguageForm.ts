import { languageSchema } from '@/schemas';
import { trpc } from '@/utils/trpc';
import { ChangeEvent, useReducer, useState } from 'react';
import { inferFormattedError } from 'zod';

enum ActionType {
  UPDATE_VALUE,
}

type LanguageForm = typeof languageSchema._type;

const defaultState: LanguageForm = {
  alias: '',
  logo: '',
  name: '',
};

type Action = {
  type: ActionType.UPDATE_VALUE;
  key: keyof LanguageForm;
  value: string;
};

const reducer = (state: LanguageForm, action: Action): LanguageForm => {
  switch (action.type) {
    case ActionType.UPDATE_VALUE:
      return { ...state, [action.key]: action.value };
    default:
      return state;
  }
};

export interface ILanguageForm {
  initialState?: typeof languageSchema._type;
}

export const useLanguageForm = ({ initialState = defaultState }: ILanguageForm) => {
  const { mutate, isLoading, reset, isSuccess } = trpc.useMutation(['protected.languages.upsert']);
  const [state, dispatch] = useReducer(reducer, initialState);
  const [fieldErrors, setFieldErrors] = useState<
    Partial<inferFormattedError<typeof languageSchema>>
  >({});

  const updateField = (key: keyof LanguageForm) => {
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

    const result = languageSchema.safeParse(state);
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
