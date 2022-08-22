import { Section } from '@/components';
import { tools } from './tools';

export const ToolStackSection = () => {
  return (
    <Section
      title="Tools and Stack"
      subtitle="Tools and tech stack I use personally and professionally"
    >
      <div className="tools-stack-container mt-20">
        {tools.map(({ col, href, icon, row, title }, i) => (
          <div key={i} className="tool-item" style={{ gridColumnStart: col, gridRowStart: row }}>
            <a
              href={href}
              aria-label={title}
              title={title}
              className="block"
              target="_blank"
              rel="noreferrer"
            >
              {icon.call(null, { className: 'w-full h-full' })}
            </a>
          </div>
        ))}
      </div>
    </Section>
  );
};
