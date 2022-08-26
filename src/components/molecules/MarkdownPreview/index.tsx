import ReactMarkdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import remarkGfm from 'remark-gfm';

export interface IMarkdownPreview {
  value: string;
}

export const MarkdownPreview = ({ value }: IMarkdownPreview) => {
  return (
    <div className="prose">
      <ReactMarkdown
        rehypePlugins={[[rehypeHighlight, { ignoreMissing: true }]]}
        remarkPlugins={[remarkGfm]}
      >
        {value}
      </ReactMarkdown>
    </div>
  );
};
