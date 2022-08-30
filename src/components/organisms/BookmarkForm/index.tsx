import { CharacterCounters } from '@/components';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { IBookmarkForm, useBookmarkForm } from './useBookmarkForm';

export const BookmarkForm = (props: IBookmarkForm) => {
  const { fieldErrors, isLoading, isSuccess, state, submit, updateField } = useBookmarkForm(props);

  return (
    <>
      <div className="flex flex-col space-y-4">
        <div className="form-group required">
          <label>Title</label>
          <input
            value={state.title}
            onChange={updateField('title')}
            disabled={isLoading}
            placeholder="My Bookmark Title"
          />
          <CharacterCounters text={state.title} max={255} className="text-right text-sm" />
          <div className="form-error">
            {fieldErrors.title?._errors.map((error) => (
              <p key={error}>{error}</p>
            ))}
          </div>
        </div>
        <div className="form-group required">
          <label>Url</label>
          <input
            value={state.url}
            onChange={updateField('url')}
            disabled={isLoading}
            placeholder="https://..."
          />
          <CharacterCounters text={state.url} max={1024} className="text-right text-sm" />
          <div className="form-error">
            {fieldErrors.url?._errors.map((error) => (
              <p key={error}>{error}</p>
            ))}
          </div>
        </div>
        <div className="form-group required">
          <label>Url Display Text</label>
          <input
            value={state.urlText}
            onChange={updateField('urlText')}
            disabled={isLoading}
            placeholder="My important bookmark"
          />
          <CharacterCounters text={state.urlText} max={255} className="text-right text-sm" />
          <div className="form-error">
            {fieldErrors.urlText?._errors.map((error) => (
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
            placeholder="Bookmark's short description"
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
        <div className="text-right">
          <button role="submit" className="btn-primary" onClick={submit} disabled={isLoading}>
            {isLoading ? <AiOutlineLoading3Quarters className="animate-spin w-6 h-6" /> : 'Save'}
          </button>
        </div>
      </div>
      {isSuccess && (
        <div className="fixed bottom-10 bg-green-400 text-green-800 px-4 py-2 rounded right-4">
          Bookmark has been successfully saved
        </div>
      )}
    </>
  );
};
