import { Fragment } from 'react';

/**
 * Renders a dictionary string with a tiny markup, so translators keep the
 * whole sentence together instead of splitting it into fragments:
 *
 *   [texte]     → highlighted part (<span> by default, see `highlight`)
 *   **texte**   → <strong>
 *   \n          → <br />
 *
 * Example: "Ce que nous concevons pour [vous]"
 */
export default function Rich({ text, highlight = 'span', highlightClass }) {
  if (typeof text !== 'string') return text ?? null;
  const Highlight = highlight;

  const lines = text.split('\n');
  return lines.map((line, li) => (
    <Fragment key={li}>
      {li > 0 && <br />}
      {line.split(/(\[[^\]]+\]|\*\*[^*]+\*\*)/g).map((part, i) => {
        if (part.startsWith('[') && part.endsWith(']')) {
          return (
            <Highlight key={i} className={highlightClass}>
              {part.slice(1, -1)}
            </Highlight>
          );
        }
        if (part.startsWith('**') && part.endsWith('**')) {
          return <strong key={i}>{part.slice(2, -2)}</strong>;
        }
        return part;
      })}
    </Fragment>
  ));
}
