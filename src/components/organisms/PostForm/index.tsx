import { CharacterCounters, Editor } from '@/components';
import { useRef } from 'react';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { FiPlus } from 'react-icons/fi';
import { IPostForm, usePostForm } from './usePostForm';

export const PostForm = (props: IPostForm) => {
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
  } = usePostForm(props);

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
              className="btn-primary rounded-l-none"
              onClick={onAddCategory}
              disabled={isLoading}
            >
              <FiPlus />
            </button>
          </div>
        </div>
      </div>
      <div className="text-right mt-8">
        <button className="btn-primary" onClick={submit} disabled={isLoading}>
          {isLoading ? <AiOutlineLoading3Quarters className="animate-spin w-6 h-6" /> : 'Save'}
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
