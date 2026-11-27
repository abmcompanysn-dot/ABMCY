import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useScroll, useSpring } from 'motion/react';
import { Africa, Arrow } from './ui';
import { scrollToId } from '../lib/scroll';

export const NAV: [string, string][] = [['objectif-2026', 'Objectif 2026'], ['projets', 'Projets'], ['services', 'Services'], ['tarifs', 'Tarifs'], ['apropos', 'À propos'], ['contact', 'Contact']];

export default function Header() {
  const [pill, setPill] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('');
  const { scrollY, scrollYProgress } = useScroll();
  const bar = useSpring(scrollYProgress, { stiffness: 140, damping: 30, restDelta: 0.001 });

  useEffect(() => scrollY.on('change', v => setPill(v > 60)), [scrollY]);

  // Lien actif selon la section visible
  useEffect(() => {
    const els = NAV.map(([id]) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(es => es.forEach(e => e.isIntersecting && setActive(e.target.id)), { rootMargin: '-45% 0px -50% 0px' });
    els.forEach(e => io.observe(e));
    return () => io.disconnect();
  }, []);

  useEffect(() => { document.documentElement.style.overflow = open ? 'hidden' : ''; }, [open]);

  const go = (id: string) => (e: React.MouseEvent) => { e.preventDefault(); setOpen(false); scrollToId(id); };

  return (
    <>
      <motion.div className="progress" style={{ scaleX: bar }} />
      <header className={'hd' + (pill ? ' pill' : '')}>
        <a className="brand" href="#accueil" onClick={go('accueil')} aria-label="ABMCY, accueil"><Africa /><b className="goldtxt">ABMCY</b></a>
        <nav aria-label="Navigation principale">
          {NAV.map(([id, label]) => (
            <a key={id} href={'#' + id} onClick={go(id)} className={active === id ? 'on' : ''}>
              {active === id && <motion.span layoutId="navbg" className="navbg" transition={{ type: 'spring', stiffness: 380, damping: 32 }} />}
              {label}
            </a>
          ))}
        </nav>
        <a className="btn btn-or" href="#contact" onClick={go('contact')}>Devis <i><Arrow /></i></a>
        <button className={'burger' + (open ? ' open' : '')} type="button" aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'} aria-expanded={open} onClick={() => setOpen(o => !o)}><span /><span /></button>
      </header>
      <AnimatePresence>
        {open && (
          <motion.div className="menu" role="dialog" aria-label="Menu" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            {NAV.map(([id, label], i) => (
              <motion.a key={id} href={'#' + id} onClick={go(id)} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 * i }}>{label}</motion.a>
            ))}
            <motion.a href="/vision-2026" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 * NAV.length }}>Vision 2026</motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
