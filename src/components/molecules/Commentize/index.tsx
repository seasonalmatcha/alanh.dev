/**
 * Help!! Cant think of a better name
 */

import { HTMLProps } from 'react';

export interface ICommentizeProps extends HTMLProps<HTMLDivElement> {
  text: string | string[];
}

export const Commentize = ({ text, ...divProps }: ICommentizeProps) => {
  const textElement = () => {
    if (text instanceof Array) {
      return (
        <ul>
          {text.map((item, i) => (
            <li key={i} className="flex space-x-2">
              <span aria-hidden>&nbsp;&nbsp;&#42;</span>
              <p className="italic">{item}</p>
            </li>
          ))}
        </ul>
      );
    }

    return (
      <div className="flex space-x-2">
        <span aria-hidden>&nbsp;&nbsp;&#42;</span>
        <p className="italic">{text}</p>
      </div>
    );
  };

  return (
    <div {...divProps}>
      <span aria-hidden>&#47;&#42;&#42;</span>
      {textElement()}
      <span aria-hidden>&nbsp;&#42;&#47;</span>
    </div>
  );
};
