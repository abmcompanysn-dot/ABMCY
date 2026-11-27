import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { AFRICA, DOTS } from '../lib/africa';
import { EASE } from './ui';

const KEY = 'abmcy-intro';

/** Ouverture : les points d'or volent de partout et forment l'Afrique, puis le nom apparaît. Une fois par visite. */
export default function Intro({ onDone }: { onDone: () => void }) {
  const [show, setShow] = useState(() => {
    try { return !sessionStorage.getItem(KEY) && !matchMedia('(prefers-reduced-motion: reduce)').matches; } catch { return false; }
  });
  const [phase, setPhase] = useState(0); // 0 points, 1 logo plein + nom
  const cv = useRef<HTMLCanvasElement>(null);

  useEffect(() => { if (!show) onDone(); }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!show) return;
    document.documentElement.style.overflow = 'hidden';
    const c = cv.current!, ctx = c.getContext('2d')!;
    const dpr = Math.min(2, devicePixelRatio || 1);
    c.width = AFRICA.W * dpr; c.height = AFRICA.H * dpr; ctx.scale(dpr, dpr);
    const pts = DOTS.filter((_, i) => i % 2 === 0).map(([x, y]) => {
      const a = Math.random() * Math.PI * 2, r = 220 + Math.random() * 520;
      return { x, y, sx: x + Math.cos(a) * r, sy: y + Math.sin(a) * r, d: Math.random() * 0.55 };
    });
    const t0 = performance.now(); let raf = 0;
    const ease = (t: number) => 1 - Math.pow(1 - t, 4);
    const draw = (now: number) => {
      const t = (now - t0) / 1000;
      ctx.clearRect(0, 0, AFRICA.W, AFRICA.H);
      ctx.fillStyle = '#f3d58a';
      for (const p of pts) {
        const k = ease(Math.min(1, Math.max(0, (t - p.d) / 1.25)));
        const fade = t > 1.9 ? Math.max(0, 1 - (t - 1.9) / 0.7) : 1;
        ctx.globalAlpha = Math.min(1, k * 1.6) * fade;
        ctx.beginPath(); ctx.arc(p.sx + (p.x - p.sx) * k, p.sy + (p.y - p.sy) * k, 1.4 + k * 1.6, 0, 7); ctx.fill();
      }
      if (t < 2.7) raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);
    const a = setTimeout(() => setPhase(1), 1500);
    const b = setTimeout(close, 3700);
    return () => { cancelAnimationFrame(raf); clearTimeout(a); clearTimeout(b); };
  }, [show]); // eslint-disable-line react-hooks/exhaustive-deps

  function close() {
    try { sessionStorage.setItem(KEY, '1'); } catch { /* navigation privée */ }
    document.documentElement.style.overflow = '';
    setShow(false); onDone();
  }

  return (
    <AnimatePresence>
      {show && (
        <motion.div className="intro" aria-hidden="true" onClick={close} exit={{ opacity: 0 }} transition={{ duration: 0.7, ease: EASE }}>
          <motion.div className="rays" initial={{ opacity: 0 }} animate={{ opacity: phase ? 1 : 0 }} transition={{ duration: 1 }} />
          <div className="box">
            <canvas ref={cv} />
            <motion.svg className="fill" viewBox={`0 0 ${AFRICA.W} ${AFRICA.H}`} initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: phase ? 1 : 0, scale: phase ? 1 : 0.96 }} transition={{ duration: 0.9, ease: EASE }}>
              <use href="#afrique" fill="url(#gor)" />
            </motion.svg>
            <div className="name goldtxt">
              {'ABMCY'.split('').map((l, i) => (
                <motion.span key={i} className="goldtxt" initial={{ opacity: 0, y: 40 }} animate={phase ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.9, ease: EASE, delay: 0.35 + i * 0.09 }}>{l}</motion.span>
              ))}
            </div>
            <motion.div className="tag" initial={{ opacity: 0, letterSpacing: '0.5em' }} animate={phase ? { opacity: 1, letterSpacing: '0.16em' } : {}} transition={{ duration: 1.4, ease: EASE, delay: 0.9 }}>
              African Business Manager Company
            </motion.div>
          </div>
          <button className="skip" type="button" onClick={close}>Passer</button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
