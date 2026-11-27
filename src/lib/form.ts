import { FORM_URL_FALLBACK } from '../data/content';

declare const config: { scriptUrl?: string } | undefined;

/** Envoie un formulaire au script ABMCY (même destination que l'ancien site). */
export async function sendForm(data: Record<string, unknown>) {
  const url = (typeof config !== 'undefined' && config?.scriptUrl) || FORM_URL_FALLBACK;
  await fetch(url, { method: 'POST', mode: 'no-cors', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
}

/** Titre et description de la page (référencement). */
export function setMeta(title: string, description: string) {
  document.title = title;
  document.querySelector('meta[name="description"]')?.setAttribute('content', description);
  document.querySelector('link[rel="canonical"]')?.setAttribute('href', 'https://abmcy.com' + (location.pathname === '/' ? '/' : location.pathname));
}
