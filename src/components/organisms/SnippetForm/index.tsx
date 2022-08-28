import { CharacterCounters, Editor } from '@/components';
import { trpc } from '@/utils/trpc';
import { ISnippetForm, useSnippetForm } from './useSnippetForm';

export const SnippetForm = ({ snippet }: { snippet?: ISnippetForm }) => {
  const { data: languages } = trpc.useQuery(['languages.index']);
  const { fieldErrors, isLoading, isSuccess, state, submit, updateField } = useSnippetForm(snippet);

  return (
    <>
      <div className="flex flex-col space-y-4">
        <div className="form-group required">
          <label>Title</label>
          <input
            value={state.title}
            onChange={updateField('title')}
            disabled={isLoading}
            placeholder="My Snippet Title"
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
            placeholder="my-snippet"
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
          <label>Description</label>
          <textarea
            value={state.description}
            onChange={updateField('description')}
            disabled={isLoading}
            placeholder="Snippet's long description"
          />
          <CharacterCounters text={state.description} className="text-right text-sm" />
          <div className="form-error">
            {fieldErrors.description?._errors.map((error) => (
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
            placeholder="Snippet's short description"
          />
          <CharacterCounters text={state.excerpt} max={255} className="text-right text-sm" />
          <div className="form-error">
            {fieldErrors.excerpt?._errors.map((error) => (
              <p key={error}>{error}</p>
            ))}
          </div>
        </div>
        <div className="form-group">
          <label>Language</label>
          <select
            value={state.languageId}
            onChange={updateField('languageId')}
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
            value={state.logo}
            onChange={updateField('logo')}
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
          <button role="submit" className="btn-primary" onClick={submit}>
            Save
          </button>
        </div>
      </div>
      {isSuccess && (
        <div className="fixed bottom-10 bg-green-400 text-green-800 px-4 py-2 rounded right-4">
          Snippet has been successfully saved
        </div>
      )}
    </>
  );
};
