/**
 * Honestly can't think a better name for this component lmao
 */

import { HTMLProps, ReactNode } from 'react';
import classNames from 'classnames';

export interface IXMLizeProps {
  title?: ReactNode;
  text: ReactNode;
  divProps?: HTMLProps<HTMLDivElement>;
  textProps?: HTMLProps<HTMLParagraphElement>;
  inLine?: boolean;
}

export const XMLize = ({ title, text, divProps, textProps, inLine }: IXMLizeProps) => {
  const divClassName = divProps?.className;
  const textClassName = textProps?.className;

  const textElement = () => {
    if (text instanceof Array && text.every((item) => typeof item === 'string')) {
      return (
        <ul>
          {text.map((item, i) => (
            <li key={i} className="flex pl-4 space-x-2">
              <span aria-hidden>&#8226;</span>
              <p className={textClassName} {...textProps}>
                {item}
              </p>
            </li>
          ))}
        </ul>
      );
    } else if (typeof text === 'string') {
      return (
        <p className={classNames('pl-4', textClassName)} {...textProps}>
          {text}
        </p>
      );
    } else {
      return (
        <div className={classNames('pl-4', textClassName)} {...textProps}>
          {text}
        </div>
      );
    }
  };

  return (
    <div
      className={classNames(
        'font-mono',
        divClassName,
        inLine ? 'flex flex-wrap items-center space-x-1' : '',
      )}
    >
      <div className="text-red-400 text-sm flex">
        <span aria-hidden>&lt;</span>
        {title}
        <span aria-hidden>&gt;</span>
      </div>
      {textElement()}
      <span aria-hidden className="text-red-400 text-sm flex">
        &lt;&#47;{title}&gt;
      </span>
    </div>
  );
};
