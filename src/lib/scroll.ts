import Lenis from 'lenis';
import { navigate } from './router';

// Défilement fluide (Lenis) ; reste natif si l'utilisateur préfère moins d'animations.
let lenis: Lenis | null = null;

export function startSmoothScroll() {
  if (lenis || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  lenis = new Lenis({ duration: 1.1, smoothWheel: true, wheelMultiplier: 1, touchMultiplier: 1.4 });
  const raf = (t: number) => { lenis?.raf(t); requestAnimationFrame(raf); };
  requestAnimationFrame(raf);
}

/** Remonte en haut sans animation (changement de page). */
export function scrollTopNow() {
  if (lenis) { lenis.resize(); lenis.scrollTo(0, { immediate: true }); }
  else scrollTo(0, 0);
}

function scrollToEl(el: HTMLElement, id: string) {
  if (lenis) { lenis.resize(); lenis.scrollTo(el, { offset: id === 'accueil' ? 0 : -20, duration: 1.4 }); } // resize : la page vient peut-être de changer de hauteur
  else el.scrollIntoView({ behavior: 'smooth' });
}

/** Va à une section : sur la page en cours si elle y est, sinon sur l'accueil. */
export function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) { navigate('/#' + id); return; }
  scrollToEl(el, id);
  history.replaceState(null, '', id === 'accueil' ? location.pathname + location.search : location.pathname + location.search + '#' + id);
}

// Arrivée sur une page avec une ancre : on attend que la section existe.
addEventListener('abmcy-goto', e => {
  const id = (e as CustomEvent<string>).detail;
  let n = 0;
  const tryGo = () => { const el = document.getElementById(id); if (el) scrollToEl(el, id); else if (n++ < 30) setTimeout(tryGo, 100); };
  tryGo();
});
