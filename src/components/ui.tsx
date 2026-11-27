import { Children, isValidElement, useEffect, useRef, useState, type ReactNode } from 'react';
import { animate, motion, useInView, useReducedMotion } from 'motion/react';
import { AFRICA } from '../lib/africa';
import { RATIOS } from '../lib/ratios';
import type { IconName } from '../data/content';

export const EASE = [0.2, 0.8, 0.2, 1] as const;

/* Dégradés et symboles partagés (une seule fois dans la page) */
export function SvgDefs() {
  return (
    <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true">
      <defs>
        <linearGradient id="gor" x1="0" y1="0" x2="0.4" y2="1"><stop offset="0" stopColor="#fbe7a6" /><stop offset=".45" stopColor="#e0b75c" /><stop offset="1" stopColor="#a97b2c" /></linearGradient>
        <symbol id="afrique" viewBox={`0 0 ${AFRICA.W} ${AFRICA.H}`}><path d={AFRICA.dCont} /><path d={AFRICA.dMada} /></symbol>
      </defs>
    </svg>
  );
}

export const Africa = ({ className, style }: { className?: string; style?: React.CSSProperties }) => (
  <svg className={className} style={style} viewBox={`0 0 ${AFRICA.W} ${AFRICA.H}`} aria-hidden="true"><use href="#afrique" fill="url(#gor)" /></svg>
);

export const Arrow = () => <svg viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /></svg>;
export const Ext = () => <svg viewBox="0 0 24 24"><path d="M7 17 17 7M8 7h9v9" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /></svg>;
export const Check = () => <svg viewBox="0 0 20 20"><path d="M5 10.5l3.2 3L15 7" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" /></svg>;

const ICONS: Record<IconName, ReactNode> = {
  web: <><rect x="3" y="4" width="18" height="14" rx="2" /><path d="M3 8h18M8 21h8" /></>,
  mob: <><rect x="7" y="2" width="10" height="20" rx="2" /><path d="M11 18h2" /></>,
  cart: <><path d="M3 4h2l2.4 11h10.2L20 7H6.2" /><circle cx="9" cy="19.5" r="1.5" /><circle cx="17" cy="19.5" r="1.5" /></>,
  pen: <><path d="m4 20 4-1L19 8l-3-3L5 16l-1 4Z" /><path d="m14 7 3 3" /></>,
  bolt: <path d="M13 2 4 14h7l-1 8 9-12h-7l1-8Z" />,
  chart: <path d="M4 20V10M10 20V4M16 20v-7M22 20H2" />,
  qr: <><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><path d="M14 14h3v3M21 14v7h-7" /></>,
  shield: <><path d="M12 3 4 6v6c0 5 3.5 8 8 9 4.5-1 8-4 8-9V6l-8-3Z" /><path d="m9 12 2 2 4-4" /></>,
  mail: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></>,
  loop: <><path d="M4 12a8 8 0 0 1 14-5.3L20 9" /><path d="M20 4v5h-5" /><path d="M20 12a8 8 0 0 1-14 5.3L4 15" /><path d="M4 20v-5h5" /></>,
  target: <><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="5" /><circle cx="12" cy="12" r="1" /></>,
  cam: <><rect x="2" y="7" width="15" height="12" rx="2" /><path d="m17 11 5-3v10l-5-3" /></>,
  net: <><circle cx="12" cy="5" r="2.5" /><circle cx="5" cy="18" r="2.5" /><circle cx="19" cy="18" r="2.5" /><path d="M12 7.5v4M12 11.5 6.5 16M12 11.5l5.5 4.5" /></>,
  lang: <><path d="M4 5h9M8.5 3v2M6 5c0 4 3 7 6 8M11 5c0 3-3 7-7 8" /><path d="m13 21 4-9 4 9M14.5 18h5" /></>,
  cap: <><path d="m2 9 10-5 10 5-10 5L2 9Z" /><path d="M6 11v5c3 2 9 2 12 0v-5" /></>,
  star: <path d="m12 3 2.6 5.6 6 .7-4.5 4.1 1.2 6L12 16.5 6.7 19.4l1.2-6L3.4 9.3l6-.7L12 3Z" />,
  home: <><path d="M3 11 12 4l9 7v9H3v-9Z" /><path d="M9 20v-6h6v6" /></>,
  plane: <path d="M10 14 3 11l1-2 8 1 5-6c1-1 3-1 3 1l-5 6 1 8-2 1-3-7" />,
  plus: <path d="M12 5v14M5 12h14" />,
};
export const Icon = ({ name }: { name: IconName }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">{ICONS[name]}</svg>
);

/* Apparition douce à l'entrée dans l'écran */
export function Reveal({ children, delay = 0, y = 28, className, as = 'div', style }: { children: ReactNode; delay?: number; y?: number; className?: string; as?: 'div' | 'span' | 'article' | 'p' | 'li'; style?: React.CSSProperties }) {
  const reduce = useReducedMotion();
  const M = motion[as] as typeof motion.div;
  return (
    <M className={className} style={style} initial={reduce ? false : { opacity: 0, y }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -8% 0px' }} transition={{ duration: 0.9, ease: EASE, delay }}>
      {children}
    </M>
  );
}

/* Titre qui monte mot par mot. Le texte doré est passé dans <Gold>. */
export const Gold = ({ children }: { children: string }) => <>{children}</>;
export function Words({ children, as = 'h2', className, id, delay = 0 }: { children: ReactNode; as?: 'h1' | 'h2'; className?: string; id?: string; delay?: number }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLHeadingElement>(null);
  const inView = useInView(ref, { once: true, margin: '0px 0px -8% 0px' });
  const parts: { t: string; gold: boolean }[] = [];
  Children.forEach(children, c => {
    if (typeof c === 'string') parts.push({ t: c, gold: false });
    else if (isValidElement<{ children: string }>(c)) parts.push({ t: c.props.children, gold: true });
  });
  let i = 0;
  const Tag = as;
  return (
    <Tag ref={ref} id={id} className={'words ' + (className ?? '')}>
      {parts.map((p, k) => p.t.split(/(\s+)/).map((w, j) => {
        if (!w) return null;
        if (/^\s+$/.test(w)) return ' ';
        const n = i++;
        return (
          <span className="w" key={k + '-' + j}>
            <motion.span className={p.gold ? 'goldtxt' : undefined} initial={reduce ? false : { y: '105%' }} animate={inView || reduce ? { y: 0 } : undefined}
              transition={{ duration: 1, ease: EASE, delay: delay + n * 0.06 }}>{w}</motion.span>
          </span>
        );
      }))}
    </Tag>
  );
}

/* Compteur qui monte jusqu'à sa valeur */
export function Counter({ to, suffix = '', fr = false, className }: { to: number; suffix?: string; fr?: boolean; className?: string }) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduce = useReducedMotion();
  const fmt = (v: number) => (fr ? Math.round(v).toLocaleString('fr-FR').replace(/\s/g, ' ') : String(Math.round(v)));
  const [txt, setTxt] = useState(reduce ? fmt(to) + suffix : '0');
  useEffect(() => {
    if (!inView || reduce) return;
    const c = animate(0, to, { duration: 1.3, ease: [0.16, 1, 0.3, 1], onUpdate: v => setTxt(fmt(v)), onComplete: () => setTxt(fmt(to) + suffix) });
    return () => c.stop();
  }, [inView]); // eslint-disable-line react-hooks/exhaustive-deps
  return <b ref={ref} className={className}>{txt}</b>;
}

/* Cadre ordinateur + téléphone avec la vraie capture qui défile toute seule (seulement à l'écran) */
export function Mockup({ shot, name, active }: { shot: string; name: string; active?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: '100px 0px' });
  const reduce = useReducedMotion();
  const sp = Math.max(0, 1 - 0.625 / (RATIOS[`${shot}-pc`] ?? 0.625)) * 100;
  const st = Math.max(0, 1 - (844 / 390) / (RATIOS[`${shot}-tel`] ?? 2.164)) * 100;
  const run = inView && (active ?? true) && !reduce;
  return (
    <div ref={ref} className={'mk' + (run ? ' run' : '')} role="img" aria-label={`Le site ${name} sur ordinateur et sur téléphone`}>
      <div className="lap"><div className="scr"><img src={`/assets/projets/${shot}-pc.jpg`} alt="" loading="lazy" decoding="async" style={{ ['--sh' as string]: `-${sp.toFixed(1)}%` }} /></div><div className="base" /></div>
      <div className="tel"><div className="scr"><img src={`/assets/projets/${shot}-tel.jpg`} alt="" loading="lazy" decoding="async" style={{ ['--sh' as string]: `-${st.toFixed(1)}%` }} /></div></div>
    </div>
  );
}

/* Met en pause les animations CSS d'un bloc quand il sort de l'écran */
export function usePauseOffscreen<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const inView = useInView(ref, { margin: '100px 0px' });
  return [ref, inView ? '' : ' paused'] as const;
}
