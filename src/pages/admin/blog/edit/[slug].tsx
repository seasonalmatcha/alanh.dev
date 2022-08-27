import { AuthLayout, Editor } from '@/components';
import { updatePostSchema } from '@/schemas';
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

type IPostForm = typeof updatePostSchema._type;

type Action = {
  type: ActionType.UPDATE_VALUE;
  key: keyof IPostForm;
  value: string;
};

const reducer = (state: IPostForm, action: Action): IPostForm => {
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

  const post = await prisma.post.findUnique({ where: { slug } });

  if (!post) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      post,
    },
  };
};

const EditPostPage: NextPageWithLayout<InferGetServerSidePropsType<typeof getServerSideProps>> = ({
  post,
}) => {
  const { mutate, isLoading, reset, isSuccess } = trpc.useMutation(['protected.posts.update']);
  const [postState, dispatch] = useReducer(reducer, { ...post });
  const [fieldErrors, setFieldErrors] = useState<
    Partial<inferFormattedError<typeof updatePostSchema>>
  >({});

  const onChange = (key: keyof IPostForm) => {
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

    const result = updatePostSchema.safeParse(postState);
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
        <title>Edit Post - {post.title}</title>
      </Head>

      <Link href="/admin/blog" passHref>
        <a className="link flex items-center space-x-2 w-fit">
          <HiOutlineArrowNarrowLeft />
          <span>Back to index</span>
        </a>
      </Link>

      <h1 className="text-4xl mt-8">Update post</h1>

      <form className="flex flex-col space-y-4 mt-8" onSubmit={onSubmit}>
        <div className="form-group required">
          <label>Title</label>
          <input value={postState.title} onChange={onChange('title')} disabled={isLoading} />
          <div className="form-error">
            {fieldErrors.title?._errors.map((error) => (
              <p key={error}>{error}</p>
            ))}
          </div>
        </div>
        <div className="form-group required">
          <label>Slug</label>
          <input value={postState.slug} onChange={onChange('slug')} disabled={isLoading} />
          <div className="form-error">
            {fieldErrors.slug?._errors.map((error) => (
              <p key={error}>{error}</p>
            ))}
          </div>
        </div>
        <div className="form-group required">
          <label>Content</label>
          <Editor
            value={postState.content}
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
          <label>Excerpt</label>
          <textarea value={postState.excerpt} onChange={onChange('excerpt')} disabled={isLoading} />
          <div className="form-error">
            {fieldErrors.excerpt?._errors.map((error) => (
              <p key={error}>{error}</p>
            ))}
          </div>
        </div>
        <div className="form-group">
          <label>Thumbnail</label>
          <input
            value={postState.thumbnail}
            onChange={onChange('thumbnail')}
            disabled={isLoading}
          />
          <div className="form-error">
            {fieldErrors.thumbnail?._errors.map((error) => (
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
          Post has been successfully saved
        </div>
      )}
    </>
  );
};

EditPostPage.getLayout = (page) => <AuthLayout>{page}</AuthLayout>;

export default EditPostPage;
