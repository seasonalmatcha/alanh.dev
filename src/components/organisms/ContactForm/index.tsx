import { useEffect, useId, useRef } from 'react';
import { useContactForm } from './useContactForm';
import { ImSpinner2 } from 'react-icons/im';
import { motion } from 'framer-motion';

export const ContactForm = () => {
  const id = useId();
  const { formErrors, isError, isLoading, isSuccess, submit } = useContactForm();
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    formRef.current?.reset();
  }, [isSuccess, isError]);

  return (
    <form onSubmit={submit} ref={formRef} noValidate>
      {isSuccess && (
        <motion.div
          className="bg-teal-600 px-4 py-2 rounded-md text-white mb-6"
          initial={{ y: -50 }}
          animate={{ y: 0 }}
        >
          <p>Weeezz!! Your message has been delivered!</p>
        </motion.div>
      )}

      {isError && (
        <motion.div
          className="bg-red-600 px-4 py-2 rounded-md text-white mb-6"
          initial={{ y: -50 }}
          animate={{ y: 0 }}
        >
          <p>Oh no! Something went wrong, cannot deliver your message. Please try again later</p>
        </motion.div>
      )}

      <div className="flex flex-col space-y-4">
        <div className="flex flex-col space-y-2">
          <label htmlFor={`${id}-name`} className="block">
            Name
          </label>
          <input id={`${id}-name`} name="name" className="block w-full" />
          {formErrors?.name?._errors.map((value, i) => (
            <p key={i} className="text-sm text-red-400">
              {value}
            </p>
          ))}
        </div>
        <div className="flex flex-col space-y-2">
          <label htmlFor={`${id}-email`} className="block">
            Email
          </label>
          <input id={`${id}-email`} name="email" type="email" className="block w-full" />
          {formErrors?.email?._errors.map((value, i) => (
            <p key={i} className="text-sm text-red-400">
              {value}
            </p>
          ))}
        </div>
        <div className="flex flex-col space-y-2">
          <label htmlFor={`${id}-message`} className="block">
            Message
          </label>
          <textarea id={`${id}-message`} name="message" className="block w-full" rows={6} />
          {formErrors?.message?._errors.map((value, i) => (
            <p key={i} className="text-sm text-red-400">
              {value}
            </p>
          ))}
        </div>
        <div className="text-right">
          {isLoading ? (
            <ImSpinner2 className="inline-block animate-spin" size={24} />
          ) : (
            <input
              type="submit"
              value="Send"
              className="bg-teal-400 dark:bg-teal-500 hover:bg-teal-500 dark:hover:bg-teal-400 cursor-pointer text-white"
            />
          )}
        </div>
      </div>
    </form>
  );
};
