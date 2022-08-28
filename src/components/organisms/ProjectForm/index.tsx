import { CharacterCounters, Editor } from '@/components';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { IProjectForm, useProjectForm } from './useProjectForm';

export const ProjectForm = (props: IProjectForm) => {
  const { fieldErrors, isLoading, isSuccess, state, submit, updateField } = useProjectForm(props);

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
          <label>Url</label>
          <input
            value={state.href}
            onChange={updateField('href')}
            disabled={isLoading}
            placeholder="my-snippet"
          />
          <CharacterCounters text={state.href} max={1024} className="text-right text-sm" />
          <div className="form-error">
            {fieldErrors.href?._errors.map((error) => (
              <p key={error}>{error}</p>
            ))}
          </div>
        </div>
        <div className="form-group required">
          <label>Description</label>
          <Editor
            value={state.description}
            onChange={updateField('description')}
            textAreaProps={{
              disabled: isLoading,
              placeholder: '#Hello world!',
            }}
          />
          <CharacterCounters text={state.description} className="text-right text-sm" />
          <div className="form-error">
            {fieldErrors.description?._errors.map((error) => (
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
          Project has been successfully saved
        </div>
      )}
    </>
  );
};
