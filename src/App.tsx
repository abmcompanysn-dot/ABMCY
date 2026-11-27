import { useEffect, useState } from 'react';
import { MotionConfig } from 'motion/react';
import Intro from './components/Intro';
import Header from './components/Header';
import Hero from './components/Hero';
import Recap from './components/Recap';
import Gallery from './components/Gallery';
import { About, Band, Contact, Footer, PartnerFaq, Pricing, Services, Simulator, Testimonials } from './components/Sections';
import { SvgDefs } from './components/ui';
import { BAND } from './data/content';
import { scrollToId, startSmoothScroll } from './lib/scroll';

export default function App() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    startSmoothScroll();
    // Lien direct vers une section (ex. abmcy.com/#tarifs)
    const id = location.hash.slice(1);
    if (id) setTimeout(() => scrollToId(id), 400);
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      <SvgDefs />
      <Intro onDone={() => setReady(true)} />
      <Header />
      <main>
        <Hero ready={ready} />
        <Band items={BAND} />
        <Recap />
        <Gallery />
        <Services />
        <Simulator />
        <Pricing />
        <About />
        <Testimonials />
        <Contact />
        <PartnerFaq />
      </main>
      <Footer />
    </MotionConfig>
  );
}
