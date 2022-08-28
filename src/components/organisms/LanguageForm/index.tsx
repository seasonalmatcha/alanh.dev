import { CharacterCounters } from '@/components';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { ILanguageForm, useLanguageForm } from './useLanguageForm';

export const LanguageForm = (props: ILanguageForm) => {
  const { fieldErrors, isLoading, isSuccess, state, submit, updateField } = useLanguageForm(props);

  return (
    <>
      <div className="flex flex-col space-y-4">
        <div className="form-group required">
          <label>Name</label>
          <input
            value={state.name}
            onChange={updateField('name')}
            disabled={isLoading}
            placeholder="Typescript"
          />
          <CharacterCounters text={state.name} max={255} className="text-right text-sm" />
          <div className="form-error">
            {fieldErrors.name?._errors.map((error) => (
              <p key={error}>{error}</p>
            ))}
          </div>
        </div>
        <div className="form-group required">
          <label>Alias</label>
          <input
            value={state.alias}
            onChange={updateField('alias')}
            disabled={isLoading}
            placeholder="ts"
          />
          <CharacterCounters text={state.alias} max={1024} className="text-right text-sm" />
          <div className="form-error">
            {fieldErrors.alias?._errors.map((error) => (
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
          <button role="submit" className="btn-primary" onClick={submit} disabled={isLoading}>
            {isLoading ? <AiOutlineLoading3Quarters className="animate-spin w-6 h-6" /> : 'Save'}
          </button>
        </div>
      </div>
      {isSuccess && (
        <div className="fixed bottom-10 bg-green-400 text-green-800 px-4 py-2 rounded right-4">
          Language has been successfully saved
        </div>
      )}
    </>
  );
};
