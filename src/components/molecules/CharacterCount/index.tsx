import classNames from 'classnames';
import { HTMLProps } from 'react';

interface ICharacterCountersProps extends HTMLProps<HTMLDivElement> {
  text?: string;
  max?: number;
}
export const CharacterCounters = ({
  text,
  max = Infinity,
  className,
  ...restProps
}: ICharacterCountersProps) => {
  if (!text || text.length < 1) return null;

  return (
    <div className={classNames(className, text.length > max ? 'text-red-500' : '')} {...restProps}>
      {text.length} {max !== Infinity && <span>of {max}</span>} chars
    </div>
  );
};
