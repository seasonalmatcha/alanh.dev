import { FormEvent, useState } from 'react';

import { messageSchema, MessageSchemaErrorType } from '@/schemas';
import { trpc } from '@/utils/trpc';

export const useContactForm = () => {
  const [formErrors, setFormErrors] = useState<MessageSchemaErrorType>();
  const { mutate, isLoading, isError, isSuccess, reset } = trpc.useMutation(['contacts.index']);

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    reset();

    setFormErrors({
      _errors: [],
      email: undefined,
      message: undefined,
      name: undefined,
    });

    const inputElements = Array.from(e.currentTarget.elements) as HTMLInputElement[];

    const messageObject: Record<string, string> = inputElements.reduce(
      (messageObject, current: HTMLInputElement) => {
        if (!current.name) return messageObject;
        messageObject[current.name] = current.value;
        return messageObject;
      },
      {} as Record<string, string>,
    );

    const validate = messageSchema.safeParse(messageObject);

    if (!validate.success) {
      setFormErrors(() => validate.error.format());

      return;
    }

    mutate(validate.data);
  };

  return {
    formErrors,
    isError,
    isLoading,
    isSuccess,
    submit,
  };
};
