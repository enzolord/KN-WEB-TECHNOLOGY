import { useId } from 'react';
import Reveal from './Reveal';
import { useT } from '../i18n/LanguageContext';
import './ValuesConstellation.css';

// Radial layout: a central "hub" (the agency) connected by animated flow-lines
// to each value / vision / mission node, so the diagram itself shows how these
// elements feed into one another rather than listing them as separate columns.
const LAYOUT = [
  { angle: -90, radius: 1 }, // top
  { angle: -18, radius: 1 },
  { angle: 54, radius: 1 },
  { angle: 126, radius: 1 },
  { angle: 198, radius: 1 },
];

export default function ValuesConstellation({ values, vision, missionStatement }) {
  const uid = useId().replace(/:/g, '');
  const t = useT();
  const nodes = [
    { key: 'vision', label: t('constellation.vision'), title: t('constellation.visionTitle'), text: vision, kind: 'vision' },
    ...values.map((v) => ({ key: `val-${v.n}`, label: t('constellation.value', { n: v.n }), title: v.title, text: v.desc, kind: 'value' })),
    { key: 'mission', label: t('constellation.mission'), title: t('constellation.missionTitle'), text: missionStatement, kind: 'mission' },
  ];

  const size = 560;
  const center = size / 2;
  const nodeRadius = size * 0.38;

  const positions = nodes.map((n, i) => {
    const { angle } = LAYOUT[i % LAYOUT.length];
    const rad = (angle * Math.PI) / 180;
    return {
      ...n,
      x: center + Math.cos(rad) * nodeRadius,
      y: center + Math.sin(rad) * nodeRadius,
    };
  });

  return (
    <div className="values-constellation">
      <Reveal className="constellation-diagram" direction="none">
        <svg
          className="constellation-svg"
          viewBox={`0 0 ${size} ${size}`}
          preserveAspectRatio="xMidYMid meet"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id={`${uid}-line`} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.1" />
              <stop offset="50%" stopColor="var(--primary)" stopOpacity="0.8" />
              <stop offset="100%" stopColor="var(--accent)" stopOpacity="0.1" />
            </linearGradient>
            <radialGradient id={`${uid}-hub`}>
              <stop offset="0%" stopColor="var(--primary)" />
              <stop offset="100%" stopColor="var(--primary-2)" />
            </radialGradient>
          </defs>

          {positions.map((n, i) => (
            <line
              key={`line-${n.key}`}
              x1={center}
              y1={center}
              x2={n.x}
              y2={n.y}
              stroke={`url(#${uid}-line)`}
              strokeWidth="1.5"
              className="constellation-link"
              style={{ animationDelay: `${i * 0.25}s` }}
            />
          ))}

          {positions.map((n, i) => (
            <circle
              key={`pulse-${n.key}`}
              r="4"
              fill="var(--accent)"
              className="constellation-pulse"
              style={{ animationDelay: `${i * 0.5}s` }}
            >
              <animateMotion
                dur="3.2s"
                repeatCount="indefinite"
                begin={`${i * 0.5}s`}
                path={`M${center},${center} L${n.x},${n.y}`}
              />
            </circle>
          ))}

          <circle cx={center} cy={center} r={size * 0.1} fill={`url(#${uid}-hub)`} className="constellation-hub-circle" />
          <text x={center} y={center + 5} textAnchor="middle" className="constellation-hub-label">
            KN WEB
          </text>
        </svg>

        <div className="constellation-nodes">
          {positions.map((n, i) => (
            <Reveal
              as="div"
              key={n.key}
              className={`constellation-node constellation-node-${n.kind}`}
              style={{ left: `${(n.x / size) * 100}%`, top: `${(n.y / size) * 100}%` }}
              delay={0.1 + i * 0.08}
            >
              <span className="constellation-node-tag">{n.label}</span>
              <h4>{n.title}</h4>
              <p>{n.text}</p>
            </Reveal>
          ))}
        </div>
      </Reveal>

      <div className="constellation-mobile">
        {positions.map((n) => (
          <Reveal as="div" key={`m-${n.key}`} className={`constellation-mobile-item constellation-node-${n.kind}`}>
            <span className="constellation-node-tag">{n.label}</span>
            <h4>{n.title}</h4>
            <p>{n.text}</p>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
