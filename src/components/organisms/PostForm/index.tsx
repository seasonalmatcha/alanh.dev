import { Editor } from '@/components';
import classNames from 'classnames';
import { HTMLProps, useRef } from 'react';
import { FiPlus } from 'react-icons/fi';
import { IPostForm, usePostForm } from './usePostForm';

interface ICharacterCountersProps extends HTMLProps<HTMLDivElement> {
  text?: string;
  max?: number;
}
const CharacterCounters = ({
  text,
  max = Infinity,
  className,
  ...restProps
}: ICharacterCountersProps) => {
  if (!text || text.length < 1) return null;

  return (
    <div className={classNames(className, text.length > max ? 'text-red-500' : '')} {...restProps}>
      {text.length} {max !== Infinity && <span>of {max}</span>} chars
    </div>
  );
};

export const PostForm = ({ post }: { post?: IPostForm }) => {
  const categoryInputRef = useRef<HTMLInputElement>(null);
  const {
    addCategory,
    fieldErrors,
    isLoading,
    isSuccess,
    removeCategory,
    state,
    submit,
    updateField,
  } = usePostForm(post);

  const onAddCategory = () => {
    if (!categoryInputRef.current) return;

    const value = categoryInputRef.current.value;
    if (!value) return;

    addCategory(value);
    categoryInputRef.current.value = '';
  };

  return (
    <>
      <div className="flex flex-col space-y-4">
        <div className="form-group required">
          <label>Title</label>
          <input
            value={state.title}
            onChange={updateField('title')}
            disabled={isLoading}
            placeholder="My Post Title"
          />
          <CharacterCounters text={state.title} max={255} className="text-right text-sm" />
          <div className="form-error">
            {fieldErrors.title?._errors.map((error) => (
              <p key={error}>{error}</p>
            ))}
          </div>
        </div>
        <div className="form-group required">
          <label>Slug</label>
          <input
            value={state.slug}
            onChange={updateField('slug')}
            disabled={isLoading}
            placeholder="my-post"
          />
          <CharacterCounters text={state.slug} max={255} className="text-right text-sm" />
          <div className="form-error">
            {fieldErrors.slug?._errors.map((error) => (
              <p key={error}>{error}</p>
            ))}
          </div>
        </div>
        <div className="form-group required">
          <label>Content</label>
          <Editor
            value={state.content}
            onChange={updateField('content')}
            textAreaProps={{
              disabled: isLoading,
              placeholder: '#Hello world!',
            }}
          />
          <CharacterCounters text={state.content} className="text-right text-sm" />
          <div className="form-error">
            {fieldErrors.content?._errors.map((error) => (
              <p key={error}>{error}</p>
            ))}
          </div>
        </div>
        <div className="form-group">
          <label>Excerpt</label>
          <textarea
            value={state.excerpt}
            onChange={updateField('excerpt')}
            disabled={isLoading}
            placeholder="Post's short description"
          />
          <CharacterCounters text={state.excerpt} max={255} className="text-right text-sm" />
          <div className="form-error">
            {fieldErrors.excerpt?._errors.map((error) => (
              <p key={error}>{error}</p>
            ))}
          </div>
        </div>
        <div className="form-group">
          <label>Thumbnail</label>
          <input
            value={state.thumbnail}
            onChange={updateField('thumbnail')}
            disabled={isLoading}
            placeholder="https://..."
          />
          <div className="form-error">
            {fieldErrors.thumbnail?._errors.map((error) => (
              <p key={error}>{error}</p>
            ))}
          </div>
        </div>
        <div className="form-group">
          <label>Categories</label>
          <div className="flex flex-wrap">
            {state.categories.map(({ name }, i) => (
              <button
                key={name}
                type="button"
                className="border rounded-full px-4 py-1 hover:border-red-400 hover:text-red-400 mr-2"
                onClick={removeCategory(i)}
              >
                {name}
              </button>
            ))}
          </div>
          <div className="flex items-stretch">
            <input
              ref={categoryInputRef}
              disabled={isLoading}
              placeholder="Story"
              className="w-full rounded-r-none"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  onAddCategory();
                }
              }}
            />
            <button
              className="px-4 bg-teal-400 hover:bg-teal-500 text-white rounded-r"
              type="button"
              role="button"
              onClick={onAddCategory}
            >
              <FiPlus />
            </button>
          </div>
        </div>
      </div>
      <div className="text-right mt-8">
        <button className="btn-primary" onClick={submit}>
          Save
        </button>
      </div>
      {isSuccess && (
        <div className="fixed bottom-10 bg-green-400 text-green-800 px-4 py-2 rounded right-4">
          Post has been successfully saved
        </div>
      )}
    </>
  );
};