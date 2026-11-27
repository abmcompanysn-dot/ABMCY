import { useLayoutEffect, useRef, useState } from 'react';
import { motion, useMotionValueEvent, useScroll, useSpring, useTransform } from 'motion/react';
import { BENTO, byId, COUNT_2026, FEATURED, USERS, type Project } from '../data/projects';
import { Arrow, Check, Counter, Ext, Gold, Mockup, Reveal, Words, usePauseOffscreen } from './ui';
import { scrollToId } from '../lib/scroll';

const mobileQuery = '(max-width:860px)';

function FeaturedCard({ p, n, on }: { p: Project; n: number; on: boolean }) {
  return (
    <article className={'pj' + (on ? ' on' : '') + (p.features ? ' wide' : '')}>
      <div className="scene"><Mockup shot={p.shot!} name={p.name} active={on} /></div>
      <div className="body">
        <div className="top"><span className="num">{String(n).padStart(2, '0')}</span><span className="ok"><Check />En ligne</span></div>
        <h3>{p.name}</h3>
        <p>{p.desc}</p>
        {p.users && <div className="met"><Counter className="goldtxt" to={p.users} suffix="+" /><span>utilisateurs</span></div>}
        {p.tags && <div className="tags">{p.tags.map(t => <span key={t}>{t}</span>)}</div>}
        {p.features && <ul className="feat">{p.features.map(f => <li key={f}>{f}</li>)}</ul>}
        <a className="go" href={p.url} target="_blank" rel="noopener">{p.host} <Ext /></a>
      </div>
    </article>
  );
}

function ShcodeCard({ on }: { on: boolean }) {
  const lines: [string, [string, string][]][] = [
    ['0s', [['#d18b3c', 'const'], ['#f4eddd', ' projet = '], ['#8fe0a5', '"Shcode"']]],
    ['.8s', [['#d18b3c', 'await'], ['#f4eddd', ' abmcy.'], ['#f3d58a', 'construire'], ['#f4eddd', '(projet)']]],
    ['1.6s', [['#7d776b', '// lancement en préparation']]],
    ['2.4s', [['#f4eddd', 'statut: '], ['#8fe0a5', '"bientôt en ligne"']]],
  ];
  return (
    <article className={'pj shc' + (on ? ' on' : '')}>
      <div className={'scene' + (on ? '' : ' paused')}>
        <svg viewBox="0 0 560 300" aria-hidden="true">
          <rect x="110" y="40" width="340" height="220" rx="16" fill="#0b0a08" stroke="rgba(212,166,74,.35)" />
          <circle cx="132" cy="60" r="5" fill="#e5604a" /><circle cx="150" cy="60" r="5" fill="#e0b75c" /><circle cx="168" cy="60" r="5" fill="#62c97c" />
          <text x="280" y="64" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="11" fill="#7d776b">shcode — bientôt</text>
          <g fontFamily="JetBrains Mono" fontSize="13">
            {lines.map(([dl, parts], i) => <text key={i} className="ln" x="134" y={108 + i * 32} style={{ ['--dl' as string]: dl }}>{parts.map(([c, t], j) => <tspan key={j} fill={c}>{t}</tspan>)}</text>)}
          </g>
          <rect className="cur" x="134" y="228" width="9" height="16" fill="#f3d58a" />
        </svg>
      </div>
      <div className="body">
        <div className="top"><span className="num">06</span><span className="soon">Bientôt</span></div>
        <h3>Shcode</h3>
        <p>Notre prochaine plateforme est en préparation. Elle rejoindra la famille ABMCY très bientôt.</p>
        <div className="tags"><span>En préparation</span></div>
      </div>
    </article>
  );
}

/** Frise épinglée : on défile vers le bas, les cartes glissent vers la gauche. */
function Track() {
  const pin = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const items = [...FEATURED.map(byId), null, 'end'] as const;
  const n = items.length;
  const [stops, setStops] = useState<number[]>([]);
  const [idx, setIdx] = useState(0);
  const [mobile, setMobile] = useState(() => matchMedia(mobileQuery).matches);
  const { scrollYProgress } = useScroll({ target: pin, offset: ['start start', 'end end'] });
  const smooth = useSpring(scrollYProgress, { stiffness: 120, damping: 28, mass: 0.4 });

  useLayoutEffect(() => {
    const measure = () => {
      setMobile(matchMedia(mobileQuery).matches);
      const t = track.current; if (!t) return;
      const cards = [...t.children] as HTMLElement[], pad = cards[0].offsetLeft, max = Math.max(0, t.scrollWidth - innerWidth + pad);
      setStops(cards.map(c => Math.min(max, c.offsetLeft - pad)));
    };
    measure();
    addEventListener('resize', measure);
    return () => removeEventListener('resize', measure);
  }, []);

  const x = useTransform(smooth, v => {
    if (!stops.length) return 0;
    const f = v * (n - 1), i = Math.min(n - 2, Math.floor(f));
    return -(stops[i] + (stops[i + 1] - stops[i]) * (f - i));
  });
  useMotionValueEvent(scrollYProgress, 'change', v => setIdx(Math.round(v * (n - 1))));

  const jump = (i: number) => {
    const el = pin.current!; const top = el.getBoundingClientRect().top + scrollY, len = el.offsetHeight - innerHeight;
    scrollTo({ top: top + (len * i) / (n - 1), behavior: 'smooth' });
  };

  return (
    <div className="pin" ref={pin} style={{ height: mobile ? undefined : `${n * 80}svh` }}>
      <div className="stick">
        <div className="wrap">
          <div className="rail">
            <motion.i className="fillr" style={{ scaleX: smooth }} />
            {items.map((it, i) => (
              <button key={i} type="button" className={'st' + (i <= idx ? ' on' : '')} style={{ left: `${(i / (n - 1)) * 100}%` }} onClick={() => jump(i)}
                aria-label={'Aller à ' + (it === null ? 'Shcode' : it === 'end' ? 'Votre projet' : it.name)}>
                <em>{it === null ? 'Shcode' : it === 'end' ? 'Votre projet' : it.name}</em>
              </button>
            ))}
          </div>
        </div>
        <motion.div className="track2" ref={track} style={mobile ? undefined : { x }}>
          {items.map((it, i) => {
            const on = mobile || i === idx;
            if (it === null) return <ShcodeCard key="shcode" on={on} />;
            if (it === 'end') return (
              <article key="end" className={'pj end' + (on ? ' on' : '')}>
                <span className="kick">Et maintenant</span>
                <h3 className="cz">Votre projet sera le prochain.</h3>
                <p>Nous mettons la même énergie au service de votre entreprise.</p>
                <a className="btn btn-or" href="#contact" onClick={e => { e.preventDefault(); scrollToId('contact'); }}>Parlons-en <i><Arrow /></i></a>
              </article>
            );
            return <FeaturedCard key={it.id} p={it} n={i + 1} on={on} />;
          })}
        </motion.div>
      </div>
    </div>
  );
}

function BrvmScene() {
  const [ref, paused] = usePauseOffscreen<HTMLDivElement>();
  return (
    <div ref={ref} className={'vis brvm' + paused}>
      <svg viewBox="0 0 320 170" aria-hidden="true">
        <g stroke="rgba(255,255,255,.06)"><path d="M30 40h260M30 80h260M30 120h260" /></g>
        <path className="ln2" d="M30 130 L70 112 L100 120 L135 92 L165 100 L200 70 L230 78 L262 46 L290 38" fill="none" stroke="url(#gor)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        <g className="sig"><rect x="176" y="120" width="112" height="28" rx="14" fill="rgba(98,201,124,.15)" stroke="#62c97c" /><text x="232" y="138" textAnchor="middle" fontFamily="Manrope" fontSize="11.5" fontWeight="800" fill="#8fe0a5">Achat possible</text></g>
      </svg>
    </div>
  );
}

export function Tile({ p, className = '' }: { p: Project; className?: string }) {
  return (
    <a className={'tl ' + className} href={p.url} target="_blank" rel="noopener">
      {p.shot ? <div className="vis"><Mockup shot={p.shot} name={p.name} /></div> : <BrvmScene />}
      <div className="tx"><small>{p.kicker}</small><b>{p.name}</b><p>{p.desc}</p><span className="lk">{p.host}</span></div>
    </a>
  );
}

export default function Recap() {
  const yr = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: yr, offset: ['start end', 'end 40%'] });
  const clip = useTransform(scrollYProgress, v => `inset(0 ${(100 - v * 100).toFixed(1)}% 0 0)`);
  const wide: Record<string, string> = { mahucards: 'w2', hanis: 'w2', core: 'w4' };

  return (
    <section id="objectif-2026" className="sec recap" style={{ paddingBottom: 0 }}>
      <div className="wrap">
        <div className="rc-head">
          <div>
            <Reveal><span className="kick">Récap · Objectif 2026</span></Reveal>
            <Words>Bâtir nos propres plateformes. <Gold>Objectif atteint.</Gold></Words>
            <Reveal><p className="lead">En 2026, nous nous étions fixé un défi : ne plus seulement livrer des sites, mais créer et faire tourner nos propres plateformes, conçues et hébergées par notre équipe. Voici le bilan.</p></Reveal>
          </div>
          <div className="year" ref={yr} aria-label="2026">2026<motion.b aria-hidden="true" style={{ clipPath: clip }}>2026</motion.b></div>
        </div>
        <div className="stats">
          <Reveal className="stat"><Counter className="goldtxt" to={COUNT_2026} /><small>projets lancés en 2026</small></Reveal>
          <Reveal className="stat" delay={0.08}><Counter className="goldtxt" to={USERS} suffix="+" /><small>utilisateurs sur MIAD Market et DIARRA</small></Reveal>
          <Reveal className="stat" delay={0.16}><Counter className="goldtxt" to={1} /><small>en préparation : Shcode</small></Reveal>
          <Reveal className="stat" delay={0.24}><b className="goldtxt">100 %</b><small>conçu et hébergé par ABMCY</small></Reveal>
        </div>
      </div>
      <Track />
      <div className="wrap more">
        <Reveal><span className="kick">Et aussi, lancés en 2026</span></Reveal>
        <Reveal><h3 className="t">{BENTO.length} autres plateformes, conçues et mises en ligne par notre équipe.</h3></Reveal>
        <div className="bento">
          {BENTO.map((id, i) => <Reveal key={id} delay={(i % 4) * 0.06} className={'bcell ' + (wide[id] ?? '')}><Tile p={byId(id)} /></Reveal>)}
        </div>
      </div>
    </section>
  );
}
