import { MarkdownPreview } from '@/components';
import { HTMLProps, useEffect, useState } from 'react';
import { FiEye, FiEyeOff, FiMaximize2, FiMinimize2 } from 'react-icons/fi';
import classNames from 'classnames';

export interface IEditorProps {
  value?: string;
  onChange?: (_value: string) => void;
  textAreaProps?: HTMLProps<HTMLTextAreaElement>;
}

export const Editor = ({ value, onChange: _onChange, textAreaProps }: IEditorProps) => {
  const [showPreview, setShowPreview] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    if (isFullscreen) {
      document.body.classList.add('h-screen', 'overflow-hidden');
    } else {
      document.body.classList.remove('h-screen', 'overflow-hidden');
    }

    return () => {
      document.body.classList.remove('h-screen', 'overflow-hidden');
    };
  }, [isFullscreen]);

  return (
    <div className={classNames('editor', isFullscreen ? 'fullscreen' : '')}>
      <div className="editor-toolbar">
        <button
          type="button"
          onClick={() => setShowPreview((prev) => !prev)}
          className="editor-toolbar-button"
        >
          {showPreview ? <FiEyeOff /> : <FiEye />}
        </button>
        <button
          type="button"
          onClick={() => setIsFullscreen((prev) => !prev)}
          className="editor-toolbar-button"
        >
          {isFullscreen ? <FiMinimize2 /> : <FiMaximize2 />}
        </button>
      </div>
      <div className="flex h-full items-stretch relative">
        <textarea
          className={classNames('editor-textarea', showPreview ? 'w-1/2' : 'w-full')}
          value={value}
          onChange={({ target }) => _onChange?.(target.value)}
          placeholder="Start writing ..."
          {...textAreaProps}
        />
        {showPreview && (
          <div className={classNames('editor-preview', showPreview ? 'w-1/2' : '')}>
            <MarkdownPreview value={value ?? ''} />
          </div>
        )}
      </div>
    </div>
  );
};
