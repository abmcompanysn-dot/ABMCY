import { useEffect, useState } from 'react';

// Petit routeur sans dépendance : chaque page a sa vraie adresse (/prix, /devenir-partenaire…),
// la navigation se fait sans recharger, et le bouton « retour » du navigateur fonctionne.

const EVT = 'abmcy-nav';

export function usePath() {
  const [path, setPath] = useState(() => clean(location.pathname));
  useEffect(() => {
    const on = () => setPath(clean(location.pathname));
    addEventListener('popstate', on);
    addEventListener(EVT, on);
    return () => { removeEventListener('popstate', on); removeEventListener(EVT, on); };
  }, []);
  return path;
}

function clean(p: string) {
  const s = p.replace(/\.html$/, '').replace(/\/+$/, '');
  return s === '' || s === '/index' ? '/' : s;
}

/** Va à une adresse interne (« /prix », « /#contact », « /solution-recommandee?secteur=x »). */
export function navigate(to: string) {
  const u = new URL(to, location.origin);
  const same = clean(u.pathname) === clean(location.pathname) && u.search === location.search;
  if (!same) {
    history.pushState(null, '', u.pathname + u.search + u.hash);
    dispatchEvent(new Event(EVT));
    if (!u.hash) scrollTo(0, 0);
  }
  if (u.hash) {
    const id = u.hash.slice(1);
    // laisser la page s'afficher avant de défiler jusqu'à la section
    setTimeout(() => dispatchEvent(new CustomEvent('abmcy-goto', { detail: id })), same ? 0 : 120);
  }
}

/** Intercepte les clics sur les liens internes pour éviter un rechargement complet. */
export function interceptLinks() {
  document.addEventListener('click', e => {
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    const a = (e.target as HTMLElement).closest('a');
    if (!a || a.target || a.hasAttribute('download')) return;
    const href = a.getAttribute('href');
    if (!href || !href.startsWith('/') || href.startsWith('//') || /\.(pdf|jpg|png|svg|js|xml)$/.test(href)) return;
    e.preventDefault();
    navigate(href);
  });
}
