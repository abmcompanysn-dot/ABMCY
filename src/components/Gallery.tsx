import { useState } from 'react';
import { AnimatePresence, LayoutGroup, motion } from 'motion/react';
import { CATEGORIES, PROJECTS, type Category } from '../data/projects';
import { EASE, Gold, Mockup, Reveal, Words } from './ui';

/** Tous les projets en ligne, avec leur vraie capture, filtrables par domaine. */
export default function Gallery() {
  const [cat, setCat] = useState<Category | 'tous'>('tous');
  const list = PROJECTS.filter(p => p.shot && (cat === 'tous' || p.cat === cat));
  const count = (c: Category | 'tous') => PROJECTS.filter(p => p.shot && (c === 'tous' || p.cat === c)).length;

  return (
    <section id="projets" className="sec">
      <div className="wrap">
        <Reveal><span className="kick">Tous nos projets</span></Reveal>
        <Words>{String(count('tous'))} sites et plateformes <Gold>en ligne aujourd'hui.</Gold></Words>
        <Reveal><p className="lead">Boutiques, plateformes, écoles, événements, institutions : chaque projet tel qu'il est en ligne, sur ordinateur et sur téléphone. Cliquez pour le visiter.</p></Reveal>
        <LayoutGroup>
          <Reveal className="filters" >
            {CATEGORIES.map(c => (
              <button key={c.id} type="button" className={cat === c.id ? 'on' : ''} onClick={() => setCat(c.id)} aria-pressed={cat === c.id}>
                {cat === c.id && <motion.span layoutId="fb" className="fb" transition={{ type: 'spring', stiffness: 380, damping: 32 }} />}
                <span>{c.label}<em>{count(c.id)}</em></span>
              </button>
            ))}
          </Reveal>
          <motion.div layout className="gal">
            <AnimatePresence mode="popLayout" initial={false}>
              {list.map(p => (
                <motion.a layout key={p.id} className="gc" href={p.url} target="_blank" rel="noopener"
                  initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.94 }} transition={{ duration: 0.45, ease: EASE }}
                  whileHover={{ y: -6 }}>
                  <div className="vis">{p.y2026 && <span className="y26">2026</span>}<Mockup shot={p.shot!} name={p.name} /></div>
                  <div className="tx"><small>{p.kicker}</small><b>{p.name}</b><p>{p.desc}</p><span className="lk">{p.host}</span></div>
                </motion.a>
              ))}
            </AnimatePresence>
          </motion.div>
        </LayoutGroup>
        <Reveal className="offres">
          <span>Nos offres de plateformes :</span>
          <a href="/plateforme-ecommerce">E-commerce</a><a href="/plateforme-valorisation-pro">Valorisation pro</a><a href="/plateforme-gestion">Gestion</a>
          <a href="/plateforme-evenementiel">Événementiel</a><a href="/plateforme-elearning">E-learning</a><a href="/realisation-reseau">Réseau ABMCY</a>
        </Reveal>
      </div>
    </section>
  );
}
