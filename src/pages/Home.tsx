import { useEffect } from 'react';
import Hero from '../components/Hero';
import Recap from '../components/Recap';
import Gallery from '../components/Gallery';
import { About, Band, Contact, PartnerFaq, Pricing, Services, Simulator, Testimonials } from '../components/Sections';
import { BAND } from '../data/content';
import { setMeta } from '../lib/form';

export default function Home({ ready }: { ready: boolean }) {
  useEffect(() => setMeta('ABMCY — African Business Manager Company · Agence digitale à Dakar',
    "ABMCY construit la robotique et le numérique de l'Afrique depuis Dakar : sites web, plateformes, e-commerce, automatisation, serveur mail et tableaux de bord. Plus de vingt projets lancés en 2026."), []);
  return (
    <>
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
    </>
  );
}
