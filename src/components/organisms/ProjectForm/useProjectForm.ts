import { projectSchema } from '@/schemas';
import { trpc } from '@/utils/trpc';
import { ChangeEvent, useReducer, useState } from 'react';
import { inferFormattedError } from 'zod';

enum ActionType {
  UPDATE_VALUE,
}

type ProjectForm = typeof projectSchema._type;

const defaultState: ProjectForm = {
  description: '',
  href: '',
  title: '',
  thumbnail: '',
};

type Action = {
  type: ActionType.UPDATE_VALUE;
  key: keyof ProjectForm;
  value: string;
};

const reducer = (state: ProjectForm, action: Action): ProjectForm => {
  switch (action.type) {
    case ActionType.UPDATE_VALUE:
      return { ...state, [action.key]: action.value };
    default:
      return state;
  }
};

export interface IProjectForm {
  initialState?: typeof projectSchema._type;
}

export const useProjectForm = ({ initialState = defaultState }: IProjectForm) => {
  const { mutate, isLoading, reset, isSuccess } = trpc.useMutation(['protected.projects.upsert']);
  const [state, dispatch] = useReducer(reducer, initialState);
  const [fieldErrors, setFieldErrors] = useState<
    Partial<inferFormattedError<typeof projectSchema>>
  >({});

  const updateField = (key: keyof ProjectForm) => {
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

    const result = projectSchema.safeParse(state);
    if (!result.success) {
      setFieldErrors(result.error.format());
      return;
    }

    mutate(result.data, {
      onSuccess: (project) => {
        setTimeout(() => {
          reset();
        }, 3000);
        dispatch({ type: ActionType.UPDATE_VALUE, key: 'id', value: project.id });
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
