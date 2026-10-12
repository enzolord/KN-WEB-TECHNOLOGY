import { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';

export default function StatCounter({ value, suffix = '', duration = 1.6, label }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let start = null;
    const target = Number(value) || 0;

    const step = (ts) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    const frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [inView, value, duration]);

  return (
    <div className="stat-counter" ref={ref}>
      <span className="stat-counter-value">
        {display}
        {suffix}
      </span>
      {label && <span className="stat-counter-label">{label}</span>}
    </div>
  );
}
