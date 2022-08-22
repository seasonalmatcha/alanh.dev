import { ReactNode } from 'react';
import { XMLize, IXMLizeProps } from '../XMLize';

export interface ISectionProps {
  title?: string;
  subtitle?: string;
  titleProps?: {
    divProps: IXMLizeProps['divProps'];
    textProps: IXMLizeProps['textProps'];
  };
  children: ReactNode;
}

export const Section = ({ children, title, subtitle, titleProps }: ISectionProps) => {
  return (
    <section>
      <XMLize
        text={subtitle}
        title={<h3>{title}</h3>}
        divProps={{ className: 'mb-4', ...titleProps?.divProps }}
        textProps={{ className: 'section-title', ...titleProps?.textProps }}
      />
      {children}
    </section>
  );
};
