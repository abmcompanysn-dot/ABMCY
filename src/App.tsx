import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, MotionConfig, motion } from 'motion/react';
import Intro from './components/Intro';
import Header from './components/Header';
import { Contact, Footer } from './components/Sections';
import { SvgDefs } from './components/ui';
import Home from './pages/Home';
import { InfoPageView, LegalPage, PartnerPage, PrixPage, SolutionPage, SoonPage, VisionPage, } from './pages/Pages';
import { INFO_PAGES } from './data/pages';
import { interceptLinks, usePath } from './lib/router';
import { scrollTopNow, scrollToId, startSmoothScroll } from './lib/scroll';

function Page({ path, ready }: { path: string; ready: boolean }) {
  switch (path) {
    case '/': return <Home ready={ready} />;
    case '/prix': return <PrixPage />;
    case '/devenir-partenaire': return <PartnerPage />;
    case '/vision-2026': return <VisionPage />;
    case '/solution-recommandee': return <SolutionPage />;
    case '/mentions-legales': return <LegalPage />;
    case '/feuille-vierge': return <SoonPage />;
    default: return INFO_PAGES[path] ? <InfoPageView path={path} /> : <SoonPage notFound />;
  }
}

// Pages qui ont leur propre formulaire : pas besoin du bloc contact en bas.
const OWN_FORM = new Set(['/', '/devenir-partenaire', '/vision-2026', '/solution-recommandee']);

export default function App() {
  const path = usePath();
  const home = path === '/';
  // L'ouverture ne se joue qu'en arrivant sur l'accueil (pas en y revenant depuis une autre page, ni avec une ancre).
  const introOk = useRef(home && !location.hash).current;
  const [ready, setReady] = useState(!introOk);

  useEffect(() => {
    startSmoothScroll();
    interceptLinks();
    const id = location.hash.slice(1);
    if (id) setTimeout(() => scrollToId(id), 500);
  }, []);
  useEffect(() => { if (!location.hash) scrollTopNow(); }, [path]);

  return (
    <MotionConfig reducedMotion="user">
      <SvgDefs />
      {introOk && <Intro onDone={() => setReady(true)} />}
      <Header path={path} />
      <AnimatePresence mode="wait">
        <motion.main key={path} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.35 }}>
          <Page path={path} ready={ready} />
          {!OWN_FORM.has(path) && path !== '/feuille-vierge' && <Contact />}
        </motion.main>
      </AnimatePresence>
      <Footer />
    </MotionConfig>
  );
}
