import { useRef, useState } from 'react';
import { toString } from 'mdast-util-to-string';
import { CodeProps, Element } from 'react-markdown/lib/ast-to-react';
import { MdOutlineContentCopy } from 'react-icons/md';

export const MarkdownCode = ({ node, ...props }: CodeProps) => {
  const [showAlert, setShowAlert] = useState(false);
  const timeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const onCopyClick = (node: Element) => {
    navigator.clipboard.writeText(toString(node));
    setShowAlert(true);
    if (timeout.current) {
      clearTimeout(timeout.current);
    }

    timeout.current = setTimeout(() => {
      setShowAlert(false);
    }, 2000);
  };

  return (
    <div className="relative group">
      <div className="absolute top-0 right-0 flex flex-col items-end gap-2">
        <button
          className="border border-white rounded w-fit p-2 opacity-0 group-hover:opacity-100 transition-all duration-200"
          onClick={() => onCopyClick(node)}
        >
          <MdOutlineContentCopy />
        </button>
        <div
          className={`bg-zinc-700 text-white px-4 py-2 rounded transition-all duration-200 ${
            showAlert ? 'opacity-100' : 'opacity-0'
          }`}
        >
          Copied to clipboard
        </div>
      </div>
      <code {...props} />
    </div>
  );
};
