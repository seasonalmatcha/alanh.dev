import { AuthLayout, Editor } from '@/components';
import { updateSnippetSchema } from '@/schemas';
import { trpc } from '@/utils/trpc';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { ChangeEvent, FormEvent, useReducer, useState } from 'react';
import { inferFormattedError } from 'zod';
import { prisma } from '@/server/db/client';
import Link from 'next/link';
import Head from 'next/head';
import { HiOutlineArrowNarrowLeft } from 'react-icons/hi';
import { NextPageWithLayout } from '@/pages/page';

enum ActionType {
  UPDATE_VALUE,
  RESET,
}

type ISnippetForm = typeof updateSnippetSchema._type;

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

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const slug = params?.slug as string;
  if (!slug) {
    return {
      notFound: true,
    };
  }

  const snippet = await prisma.snippet.findUnique({ where: { slug } });

  if (!snippet) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      snippet,
    },
  };
};

const EditSnippetPage: NextPageWithLayout<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ snippet }) => {
  const { data: languages } = trpc.useQuery(['languages.index']);
  const { mutate, isLoading, reset, isSuccess } = trpc.useMutation(['protected.snippets.update']);
  const [snippetState, dispatch] = useReducer(reducer, { ...snippet });
  const [fieldErrors, setFieldErrors] = useState<
    Partial<inferFormattedError<typeof updateSnippetSchema>>
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

    const result = updateSnippetSchema.safeParse(snippetState);
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

  return (
    <>
      <Head>
        <title>Edit Snippet - {snippet.title}</title>
      </Head>

      <Link href="/admin/snippets" passHref>
        <a className="link flex items-center space-x-2 w-fit">
          <HiOutlineArrowNarrowLeft />
          <span>Back to index</span>
        </a>
      </Link>

      <h1 className="text-4xl mt-8">Update snippet</h1>

      <form className="flex flex-col space-y-4 mt-8" onSubmit={onSubmit}>
        <div className="form-group required">
          <label>Title</label>
          <input value={snippetState.title} onChange={onChange('title')} disabled={isLoading} />
          <div className="form-error">
            {fieldErrors.title?._errors.map((error) => (
              <p key={error}>{error}</p>
            ))}
          </div>
        </div>
        <div className="form-group required">
          <label>Slug</label>
          <input value={snippetState.slug} onChange={onChange('slug')} disabled={isLoading} />
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
          <input value={snippetState.logo} onChange={onChange('logo')} disabled={isLoading} />
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

EditSnippetPage.getLayout = (page) => <AuthLayout>{page}</AuthLayout>;

export default EditSnippetPage;
