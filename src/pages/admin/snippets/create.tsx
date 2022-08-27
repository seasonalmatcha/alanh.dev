import { Editor } from '@/components';
import { newSnippetSchema } from '@/schemas';
import { trpc } from '@/utils/trpc';
import { NextPage } from 'next';
import { ChangeEvent, FormEvent, useReducer, useState } from 'react';
import { inferFormattedError } from 'zod';
import { HiOutlineArrowNarrowLeft } from 'react-icons/hi';
import Link from 'next/link';
import Head from 'next/head';

enum ActionType {
  UPDATE_VALUE,
  RESET,
}

const initialState: ISnippetForm = {
  content: '',
  description: '',
  excerpt: '',
  languageId: '',
  logo: '',
  slug: '',
  title: '',
};

type ISnippetForm = typeof newSnippetSchema._type;

type Action =
  | {
      type: ActionType.UPDATE_VALUE;
      key: keyof ISnippetForm;
      value: string;
    }
  | {
      type: ActionType.RESET;
    };

const reducer = (state: ISnippetForm, action: Action): ISnippetForm => {
  switch (action.type) {
    case ActionType.UPDATE_VALUE:
      return { ...state, [action.key]: action.value };
    case ActionType.RESET:
      return {
        content: '',
        slug: '',
        title: '',
        description: '',
        excerpt: '',
        languageId: '',
        logo: '',
      };
    default:
      return state;
  }
};

const CreateSnippetPage: NextPage = () => {
  const { data: languages } = trpc.useQuery(['languages.index']);
  const { mutate, isLoading, reset, isSuccess } = trpc.useMutation(['snippets.create']);
  const [snippetState, dispatch] = useReducer(reducer, { ...initialState });
  const [fieldErrors, setFieldErrors] = useState<
    Partial<inferFormattedError<typeof newSnippetSchema>>
  >({});

  const onChange = (key: keyof ISnippetForm) => {
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

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFieldErrors({});

    const result = newSnippetSchema.safeParse(snippetState);
    if (!result.success) {
      setFieldErrors(result.error.format());
      return;
    }

    mutate(result.data, {
      onSuccess: () => {
        dispatch({ type: ActionType.RESET });
        setTimeout(() => {
          reset();
        }, 3000);
      },
    });
  };

  return (
    <>
      <Head>
        <title>Create Snippet</title>
      </Head>

      <Link href="/admin/snippets" passHref>
        <a className="link flex items-center space-x-2 w-fit">
          <HiOutlineArrowNarrowLeft />
          <span>Back to index</span>
        </a>
      </Link>

      <h1 className="text-4xl mt-8">Create new snippet</h1>

      <form className="flex flex-col space-y-4 mt-8" onSubmit={onSubmit}>
        <div className="form-group required">
          <label>Title</label>
          <input
            value={snippetState.title}
            onChange={onChange('title')}
            disabled={isLoading}
            placeholder="My Snippet Title"
          />
          <div className="form-error">
            {fieldErrors.title?._errors.map((error) => (
              <p key={error}>{error}</p>
            ))}
          </div>
        </div>
        <div className="form-group required">
          <label>Slug</label>
          <input
            value={snippetState.slug}
            onChange={onChange('slug')}
            disabled={isLoading}
            placeholder="my-snippet"
          />
          <div className="form-error">
            {fieldErrors.slug?._errors.map((error) => (
              <p key={error}>{error}</p>
            ))}
          </div>
        </div>
        <div className="form-group required">
          <label>Content</label>
          <Editor
            value={snippetState.content}
            onChange={onChange('content')}
            textAreaProps={{
              disabled: isLoading,
              placeholder: '#Hello world!',
            }}
          />
          <div className="form-error">
            {fieldErrors.content?._errors.map((error) => (
              <p key={error}>{error}</p>
            ))}
          </div>
        </div>
        <div className="form-group">
          <label>Description</label>
          <textarea
            value={snippetState.description}
            onChange={onChange('description')}
            disabled={isLoading}
            placeholder="Snippet's long description"
          />
          <div className="form-error">
            {fieldErrors.description?._errors.map((error) => (
              <p key={error}>{error}</p>
            ))}
          </div>
        </div>
        <div className="form-group">
          <label>Excerpt</label>
          <textarea
            value={snippetState.excerpt}
            onChange={onChange('excerpt')}
            disabled={isLoading}
            placeholder="Snippet's short description"
          />
          <div className="form-error">
            {fieldErrors.excerpt?._errors.map((error) => (
              <p key={error}>{error}</p>
            ))}
          </div>
        </div>
        <div className="form-group">
          <label>Language</label>
          <select
            value={snippetState.languageId}
            onChange={onChange('languageId')}
            disabled={isLoading}
          >
            <option value=""></option>
            {languages?.map((language) => (
              <option key={language.id} value={language.id}>
                {language.name}
              </option>
            ))}
          </select>
          <div className="form-error">
            {fieldErrors.languageId?._errors.map((error) => (
              <p key={error}>{error}</p>
            ))}
          </div>
        </div>
        <div className="form-group">
          <label>Logo</label>
          <input
            value={snippetState.logo}
            onChange={onChange('logo')}
            disabled={isLoading}
            placeholder="https://..."
          />
          <div className="form-error">
            {fieldErrors.logo?._errors.map((error) => (
              <p key={error}>{error}</p>
            ))}
          </div>
        </div>
        <div className="text-right">
          <button role="submit" className="btn-primary">
            Save
          </button>
        </div>
      </form>
      {isSuccess && (
        <div className="fixed bottom-10 bg-green-400 text-green-800 px-4 py-2 rounded right-4">
          Snippet has been successfully saved
        </div>
      )}
    </>
  );
};

export default CreateSnippetPage;
