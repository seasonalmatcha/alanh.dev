import { ReactNode } from 'react';
import { XMLize, IXMLizeProps } from '../XMLize';

export interface ISectionProps {
  title?: string;
  subtitle?: IXMLizeProps['text'];
  titleProps?: {
    divProps: IXMLizeProps['divProps'];
    textProps: IXMLizeProps['textProps'];
  };
  children: ReactNode;
  inLineTitle?: IXMLizeProps['inLine'];
}

export const Section = ({ children, title, subtitle, titleProps, inLineTitle }: ISectionProps) => {
  const titleElement = () => {
    if (typeof title === 'string') {
      return <h3>{title}</h3>;
    }

    return title;
  };

  return (
    <section>
      <XMLize
        text={subtitle}
        title={titleElement()}
        divProps={{ className: 'mb-4', ...titleProps?.divProps }}
        textProps={{ className: 'section-title', ...titleProps?.textProps }}
        inLine={inLineTitle}
      />
      {children}
    </section>
  );
};
