import Lenis from 'lenis';

// Défilement fluide (Lenis) ; reste natif si l'utilisateur préfère moins d'animations.
let lenis: Lenis | null = null;

export function startSmoothScroll() {
  if (lenis || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  lenis = new Lenis({ duration: 1.1, smoothWheel: true, wheelMultiplier: 1, touchMultiplier: 1.4 });
  const raf = (t: number) => { lenis?.raf(t); requestAnimationFrame(raf); };
  requestAnimationFrame(raf);
}

export function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  if (lenis) lenis.scrollTo(el, { offset: id === 'accueil' ? 0 : -20, duration: 1.4 });
  else el.scrollIntoView({ behavior: 'smooth' });
  history.replaceState(null, '', id === 'accueil' ? location.pathname : '#' + id);
}
