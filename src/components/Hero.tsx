import { useEffect, useRef } from 'react';
import { motion, useInView, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { AFRICA, DOTS } from '../lib/africa';
import { COUNT_2026, USERS } from '../data/projects';
import { Arrow, Counter, EASE, Words, Gold } from './ui';
import { scrollToId } from '../lib/scroll';

/** Afrique en points dorés, dessinée sur canvas : lumière qui balaie, Dakar qui pulse, points qui s'allument sous le pointeur. */
function AfricaCanvas() {
  const wrap = useRef<HTMLDivElement>(null);
  const cv = useRef<HTMLCanvasElement>(null);
  const inView = useInView(wrap);
  const reduce = useReducedMotion();
  const ptr = useRef({ x: -999, y: -999 });

  useEffect(() => {
    if (!inView) return;
    const c = cv.current!, ctx = c.getContext('2d')!;
    const dpr = Math.min(2, devicePixelRatio || 1);
    c.width = AFRICA.W * dpr; c.height = AFRICA.H * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const base = DOTS.map(() => 0.28 + Math.random() * 0.4);
    const [dx, dy] = AFRICA.dakar, [ax, ay] = AFRICA.abidjan;
    const t0 = performance.now(); let raf = 0;
    const draw = (now: number) => {
      const t = (now - t0) / 1000;
      ctx.clearRect(0, 0, AFRICA.W, AFRICA.H);
      const sweep = ((t * 0.18) % 1.4) * (AFRICA.W + AFRICA.H) - AFRICA.H; // bande de lumière en diagonale
      const { x: px, y: py } = ptr.current;
      for (let i = 0; i < DOTS.length; i++) {
        const [x, y] = DOTS[i];
        const s = reduce ? 0 : Math.max(0, 1 - Math.abs(x + y * 0.6 - sweep) / 60);
        const p = Math.max(0, 1 - Math.hypot(x - px, y - py) / 70);
        const k = Math.min(1, base[i] + s * 0.5 + p * 0.75);
        ctx.globalAlpha = k;
        ctx.fillStyle = p > 0.35 || s > 0.6 ? '#fbe7a6' : '#d4a64a';
        ctx.beginPath(); ctx.arc(x, y, 2.6 + p * 0.8, 0, 7); ctx.fill();
      }
      // Arc lumineux Dakar -> Abidjan
      ctx.globalAlpha = 0.9; ctx.strokeStyle = '#f3d58a'; ctx.lineWidth = 1.6; ctx.setLineDash([4, 7]); ctx.lineDashOffset = -t * 18;
      ctx.beginPath(); ctx.moveTo(dx, dy); ctx.quadraticCurveTo((dx + ax) / 2, (dy + ay) / 2 - 40, ax, ay); ctx.stroke(); ctx.setLineDash([]);
      // Dakar : deux ondes
      for (const off of [0, 0.5]) {
        const u = (t / 2.6 + off) % 1;
        ctx.globalAlpha = 1 - u; ctx.strokeStyle = '#f3d58a'; ctx.lineWidth = 1.5;
        ctx.beginPath(); ctx.arc(dx, dy, 7 + u * 24, 0, 7); ctx.stroke();
      }
      ctx.globalAlpha = 1; ctx.fillStyle = '#fbe7a6'; ctx.beginPath(); ctx.arc(dx, dy, 5, 0, 7); ctx.fill();
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(raf);
  }, [inView, reduce]);

  const move = (e: React.PointerEvent) => {
    const r = wrap.current!.getBoundingClientRect();
    ptr.current = { x: ((e.clientX - r.left) / r.width) * AFRICA.W, y: ((e.clientY - r.top) / r.height) * AFRICA.H };
    if (!reduce) wrap.current!.style.transform = `perspective(900px) rotateY(${((e.clientX - r.left) / r.width - 0.5) * 8}deg) rotateX(${-((e.clientY - r.top) / r.height - 0.5) * 8}deg)`;
  };
  const leave = () => { ptr.current = { x: -999, y: -999 }; wrap.current!.style.transform = ''; };

  return (
    <div className="afr" ref={wrap} onPointerMove={move} onPointerLeave={leave} style={{ transition: 'transform .5s cubic-bezier(.2,.8,.2,1)' }}>
      <canvas ref={cv} aria-label="Carte de l'Afrique en points dorés, avec Dakar en lumière" role="img" />
      {([['MIAD Market', 'M', { left: '-4%', top: '8%' }], ['ABMCY Market', 'A', { right: '-2%', top: '20%' }], ['JEL DEM', 'J', { right: '2%', top: '58%' }], ['DIARRA', 'D', { left: '4%', bottom: '10%' }]] as const).map(([n, l, pos], i) => (
        <motion.div key={n} className="chipf" style={pos} initial={{ opacity: 0, y: 12, scale: 0.9 }} animate={{ opacity: 1, y: [0, -8, 0], scale: 1 }}
          transition={{ opacity: { delay: 0.8 + i * 0.15, duration: 0.6 }, scale: { delay: 0.8 + i * 0.15, duration: 0.6 }, y: { delay: 1.4 + i * 0.4, duration: 6, repeat: Infinity, ease: 'easeInOut' } }}>
          <i>{l}</i>{n}
        </motion.div>
      ))}
    </div>
  );
}

export default function Hero({ ready }: { ready: boolean }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const show = ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 };
  return (
    <section id="accueil" className="hero-s" ref={ref}>
      <motion.div className="wrap hero" style={{ y, opacity: fade }}>
        <div>
          <motion.span className="kick" initial={{ opacity: 0, y: 28 }} animate={show} transition={{ duration: 0.9, ease: EASE }}>Agence digitale · Dakar, Sénégal</motion.span>
          {ready && <Words as="h1">Nous construisons le numérique <Gold>de l'Afrique.</Gold></Words>}
          {!ready && <h1 style={{ opacity: 0 }}>Nous construisons le numérique de l'Afrique.</h1>}
          <motion.p className="lead" initial={{ opacity: 0, y: 28 }} animate={show} transition={{ duration: 0.9, ease: EASE, delay: 0.35 }}>
            Sites, plateformes, boutiques en ligne, automatisation et tableaux de bord : ABMCY conçoit, lance et fait grandir les projets digitaux des entreprises africaines.
          </motion.p>
          <motion.div className="ctas" initial={{ opacity: 0, y: 28 }} animate={show} transition={{ duration: 0.9, ease: EASE, delay: 0.5 }}>
            <a className="btn btn-or" href="#contact" onClick={e => { e.preventDefault(); scrollToId('contact'); }}>Demander un devis <i><Arrow /></i></a>
            <a className="btn btn-ghost" href="#projets" onClick={e => { e.preventDefault(); scrollToId('projets'); }}>Voir nos projets</a>
          </motion.div>
          <motion.div className="proof" initial={{ opacity: 0, y: 28 }} animate={show} transition={{ duration: 0.9, ease: EASE, delay: 0.65 }}>
            <div>{ready && <Counter to={COUNT_2026} />}projets lancés en 2026</div>
            <div>{ready && <Counter to={USERS} suffix="+" />}utilisateurs sur nos plateformes</div>
            <div><b>24 h</b>pour répondre à un devis</div>
          </motion.div>
        </div>
        {ready && <AfricaCanvas />}
      </motion.div>
      <a className="scrollcue" href="#objectif-2026" aria-label="Défiler vers l'objectif 2026" onClick={e => { e.preventDefault(); scrollToId('objectif-2026'); }} />
    </section>
  );
}
