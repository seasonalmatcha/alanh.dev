import { experienceSchema } from '@/schemas';
import { trpc } from '@/utils/trpc';
import { ChangeEvent, useReducer, useState } from 'react';
import { inferFormattedError } from 'zod';

enum ActionType {
  UPDATE_VALUE,
}

type ExperienceForm = typeof experienceSchema._type;

const defaultState: ExperienceForm = {
  description: '',
  subtitle: '',
  title: '',
};

type Action = {
  type: ActionType.UPDATE_VALUE;
  key: keyof ExperienceForm;
  value: string;
};

const reducer = (state: ExperienceForm, action: Action): ExperienceForm => {
  switch (action.type) {
    case ActionType.UPDATE_VALUE:
      return { ...state, [action.key]: action.value };
    default:
      return state;
  }
};

export interface IExperienceForm {
  initialState?: typeof experienceSchema._type;
}

export const useExperienceForm = ({ initialState = defaultState }: IExperienceForm) => {
  const { mutate, isLoading, reset, isSuccess } = trpc.useMutation([
    'protected.experiences.upsert',
  ]);
  const [state, dispatch] = useReducer(reducer, initialState);
  const [fieldErrors, setFieldErrors] = useState<
    Partial<inferFormattedError<typeof experienceSchema>>
  >({});

  const updateField = (key: keyof ExperienceForm) => {
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

    const result = experienceSchema.safeParse(state);
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
