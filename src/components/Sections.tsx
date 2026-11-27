import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, LayoutGroup, motion } from 'motion/react';
import { BUDGETS, CONTACT, DELAIS, FAQ, FORM_URL_FALLBACK, PLANS, QUOTES, SECTEURS, SERVICE_COUNT, SERVICE_OPTIONS, SERVICES, fcfa } from '../data/content';
import { PROJECTS } from '../data/projects';
import { Africa, Arrow, Counter, EASE, Gold, Icon, Reveal, Words, usePauseOffscreen } from './ui';
import { scrollToId } from '../lib/scroll';
import { navigate } from '../lib/router';

/* Préremplir le formulaire de devis depuis n'importe quelle section */
type Prefill = { service?: string; offre?: string };
export const askQuote = (detail: Prefill) => { dispatchEvent(new CustomEvent<Prefill>('abmcy-devis', { detail })); scrollToId('contact'); };

/* ---------- Bande défilante ---------- */
export function Band({ items }: { items: string[] }) {
  const [ref, paused] = usePauseOffscreen<HTMLDivElement>();
  return <div className={'band' + paused} ref={ref} aria-hidden="true"><div className="track">{[...items, ...items].map((t, i) => <span key={i}>{t}</span>)}</div></div>;
}

/* ---------- Services ---------- */
export function Services() {
  const [tab, setTab] = useState(0);
  return (
    <section id="services" className="sec">
      <div className="wrap">
        <Reveal><span className="kick">Services</span></Reveal>
        <Words>Tout ce qu'il faut pour <Gold>grandir en ligne.</Gold></Words>
        <Reveal><p className="lead">{SERVICE_COUNT} savoir-faire, réunis en quatre familles. Choisissez, nous nous occupons du reste.</p></Reveal>
        <Reveal className="tabs">
          <div role="tablist" aria-label="Familles de services" style={{ display: 'contents' }}>
            {SERVICES.map((g, i) => (
              <button key={g.tab} type="button" role="tab" aria-selected={tab === i} className={tab === i ? 'on' : ''} onClick={() => setTab(i)}>
                {tab === i && <motion.span layoutId="tb" className="tb" transition={{ type: 'spring', stiffness: 380, damping: 32 }} />}{g.tab}
              </button>
            ))}
          </div>
        </Reveal>
        <div className="svc" role="tabpanel">
          <AnimatePresence mode="wait">
            <motion.div key={tab} style={{ display: 'contents' }} initial="h" animate="s" exit="h">
              {SERVICES[tab].items.map((s, k) => (
                <motion.article key={s.title} className="sv" variants={{ h: { opacity: 0, y: 24 }, s: { opacity: 1, y: 0 } }} transition={{ duration: 0.5, ease: EASE, delay: k * 0.06 }}
                  onPointerMove={e => { const r = e.currentTarget.getBoundingClientRect(); e.currentTarget.style.setProperty('--mx', e.clientX - r.left + 'px'); e.currentTarget.style.setProperty('--my', e.clientY - r.top + 'px'); }}>
                  <span className="ic"><Icon name={s.icon} /></span>
                  <h3>{s.title}</h3><p>{s.desc}</p>
                  <ul>{s.points.map(x => <li key={x}>{x}</li>)}</ul>
                  <button type="button" onClick={() => askQuote({ service: s.value })}>Demander un devis →</button>
                </motion.article>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

/* ---------- Simulateur ---------- */
export function Simulator() {
  const [sect, setSect] = useState('');
  const [err, setErr] = useState(false);
  return (
    <section id="simulateur" className="sec tight">
      <div className="wrap">
        <Reveal className="sim">
          <div>
            <span className="kick">Simulateur de besoin</span>
            <h2>Pas sûr de ce qu'il vous faut ?</h2>
            <p className="lead">Dites-nous qui vous êtes et votre secteur : nous vous montrons les solutions adaptées, en une minute.</p>
          </div>
          <form onSubmit={e => { e.preventDefault(); if (!sect) { setErr(true); return; } navigate('/solution-recommandee?secteur=' + encodeURIComponent(sect)); }}>
            <div className="seg" role="radiogroup" aria-label="Vous êtes">
              <label><input type="radio" name="user_type_simulator" value="entreprise" defaultChecked />Une entreprise</label>
              <label><input type="radio" name="user_type_simulator" value="particulier" />Un particulier</label>
            </div>
            <label className="fld"><span>Votre secteur{err && <b style={{ color: '#f0a08f' }}> — choisissez-en un</b>}</span>
              <select className="inp" value={sect} onChange={e => { setSect(e.target.value); setErr(false); }}>
                <option value="">Sélectionnez votre secteur</option>
                {SECTEURS.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
              </select>
            </label>
            <button className="btn btn-or" type="submit" style={{ justifySelf: 'start' }}>Voir les solutions <i><Arrow /></i></button>
          </form>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- Tarifs ---------- */
export function Pricing() {
  const [etale, setEtale] = useState(false);
  return (
    <section id="tarifs" className="sec tight">
      <div className="wrap">
        <Reveal><span className="kick">Tarifs</span></Reveal>
        <Words>Un site qui vend, <Gold>à prix clair.</Gold></Words>
        <Reveal><p className="lead">Création, hébergement et nom de domaine compris la première année. Payez en une fois, ou par étapes au rythme du projet.</p></Reveal>
        <LayoutGroup>
          <Reveal className="bill">
            {([['Paiement classique', false], ['Paiement étalé', true]] as const).map(([l, v]) => (
              <button key={l} type="button" className={etale === v ? 'on' : ''} aria-pressed={etale === v} onClick={() => setEtale(v)}>
                {etale === v && <motion.span layoutId="bb" className="bb" transition={{ type: 'spring', stiffness: 380, damping: 32 }} />}{l}
              </button>
            ))}
          </Reveal>
        </LayoutGroup>
        <div className={'plans' + (etale ? ' etale' : '')}>
          {PLANS.map((p, i) => (
            <Reveal key={p.tier} as="article" className={'plan' + (p.star ? ' star' : '')} delay={i * 0.08}>
              {p.star && <span className="pop2">★ Le plus choisi</span>}
              <div><small>{p.tier}</small><h3>{p.name}</h3></div>
              <p className="for">{p.for}</p>
              <div className="price"><Counter className="goldtxt" to={p.price} fr /><span>FCFA</span>{p.old && <s>{fcfa(p.old)}</s>}</div>
              <AnimatePresence initial={false}>
                {etale && (
                  <motion.div className="steps" initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.45, ease: EASE }}>
                    <div className="bar">{p.steps.map(([, pc], k) => <motion.i key={k} style={{ flex: pc }} initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.8, ease: EASE, delay: 0.1 + k * 0.15 }} />)}</div>
                    <ul>{p.steps.map(([l, pc, v]) => <li key={l}>{l} ({pc} %)<b>{fcfa(v)} FCFA</b></li>)}</ul>
                  </motion.div>
                )}
              </AnimatePresence>
              <ul className="inc">{p.incl.map(x => <li key={x}>{x}</li>)}</ul>
              <span className="dur">{p.dur}</span>
              <button className="btn btn-or" type="button" onClick={() => askQuote({ service: 'sites-web', offre: `${p.tier} — ${p.name} (${fcfa(p.price)} FCFA)${etale ? ' — paiement étalé' : ''}` })}>{p.cta} <i><Arrow /></i></button>
            </Reveal>
          ))}
        </div>
        <Reveal className="tnote">
          <span>✦ <b>Le code vous appartient</b> à 100 % à la livraison.</span>
          <span>✦ Après la 1re année : hébergement et domaine <b>≈ 35 000 FCFA / an</b>.</span>
          <span>✦ Score Google garanti : <b>80/100 minimum</b>, sinon on continue gratuitement.</span>
          <a href="/prix">Voir le comparatif complet →</a>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- À propos ---------- */
export function About() {
  const vals: [string, string][] = [['Excellence', 'La plus haute qualité dans chaque projet, sans compromis.'], ['Innovation', 'Repousser les limites pour créer les solutions de demain.'],
    ['Partenariat', 'La force de la collaboration pour atteindre des objectifs communs.'], ['Impact', "Contribuer, projet après projet, au développement de l'Afrique."]];
  return (
    <section id="apropos" className="sec tight">
      <div className="wrap about">
        <div>
          <Reveal><span className="kick">Notre histoire, votre futur</span></Reveal>
          <Words>La technologie comme <Gold>levier pour l'Afrique.</Gold></Words>
          <div className="vm">
            <Reveal><h3>Notre vision</h3><p>Un continent où chaque entreprise, quelle que soit sa taille, a accès à des outils numériques de classe mondiale, et où la technologie relie les talents d'ici aux marchés du monde.</p></Reveal>
            <Reveal delay={0.1}><h3>Notre mission</h3><p>Concevoir et déployer des solutions sur mesure, solides et élégantes. Nous partons de l'écoute, travaillons main dans la main avec nos clients, et pensons chaque ligne de code pour créer une valeur qui dure.</p></Reveal>
          </div>
        </div>
        <div className="vals">
          {vals.map(([t, d], i) => <Reveal key={t} className="val" delay={i * 0.08}><b className="goldtxt">0{i + 1}</b><div><h4>{t}</h4><p>{d}</p></div></Reveal>)}
        </div>
      </div>
    </section>
  );
}

/* ---------- Témoignages ---------- */
export function Testimonials() {
  const [ref, paused] = usePauseOffscreen<HTMLDivElement>();
  const card = (k: string, hidden: boolean) => QUOTES.map(([q, n], i) => (
    <figure className="q" key={k + i} aria-hidden={hidden || undefined}><p>{q}</p><div><b>{n}</b><span>Client(e) CV Pro+</span></div></figure>
  ));
  return (
    <section className="sec tight" aria-labelledby="tq">
      <div className="wrap">
        <Reveal><span className="kick">Ils en parlent</span></Reveal>
        <Words id="tq">Ce que disent <Gold>nos clients.</Gold></Words>
      </div>
      <div className={'quotes' + paused} ref={ref}><div className="track">{card('a', false)}{card('b', true)}</div></div>
    </section>
  );
}

/* ---------- Contact & devis ---------- */
declare const config: { scriptUrl?: string } | undefined;
const WA_ICON = <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.2-.4.7-1.4.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.8 11.8 0 0 0 4.5 4c1.7.7 2.3.8 3.2.6.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.2-1.2-.1-.1-.3-.2-.5-.3Z" /></svg>;

export function Contact() {
  const form = useRef<HTMLFormElement>(null);
  const [service, setService] = useState('');
  const [desc, setDesc] = useState('');
  const [state, setState] = useState<'idle' | 'sending' | 'ok' | 'err'>('idle');

  useEffect(() => {
    const on = (e: Event) => {
      const d = (e as CustomEvent<Prefill>).detail;
      if (d.service) setService(d.service);
      if (d.offre) setDesc(v => `Offre choisie : ${d.offre}.\n` + v.replace(/^Offre choisie : .*\n/, ''));
      setTimeout(() => form.current?.querySelector<HTMLInputElement>('[name=nom]')?.focus({ preventScroll: true }), 900);
    };
    addEventListener('abmcy-devis', on);
    return () => removeEventListener('abmcy-devis', on);
  }, []);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const f = form.current!;
    if (!f.checkValidity()) { f.reportValidity(); return; }
    const url = (typeof config !== 'undefined' && config?.scriptUrl) || FORM_URL_FALLBACK;
    setState('sending');
    try {
      await fetch(url, { method: 'POST', mode: 'no-cors', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(Object.fromEntries(new FormData(f).entries())) });
      f.reset(); setService(''); setDesc(''); setState('ok');
    } catch { setState('err'); }
  };

  return (
    <section id="contact" className="sec tight">
      <div className="wrap">
        <Reveal><span className="kick">Contact &amp; devis</span></Reveal>
        <Words>Démarrons <Gold>votre transformation.</Gold></Words>
        <Reveal><p className="lead">Consultation gratuite. Nous répondons à chaque demande sous 24 h.</p></Reveal>
        <div className="ct">
          <Reveal className="card">
            <form ref={form} onSubmit={submit} noValidate>
              <input type="hidden" name="form_type" value="devis" />
              <div className="seg" role="radiogroup" aria-label="Vous êtes">
                <label><input type="radio" name="user_type" value="entreprise" defaultChecked />Une entreprise</label>
                <label><input type="radio" name="user_type" value="particulier" />Un particulier</label>
              </div>
              <div className="grid2">
                <label className="fld"><span>Nom complet *</span><input className="inp" name="nom" required autoComplete="name" /></label>
                <label className="fld"><span>Entreprise</span><input className="inp" name="entreprise" autoComplete="organization" /></label>
                <label className="fld"><span>Email *</span><input className="inp" type="email" name="email" required autoComplete="email" /></label>
                <label className="fld"><span>Téléphone *</span><input className="inp" type="tel" name="telephone" required autoComplete="tel" placeholder="+221 …" /></label>
              </div>
              <label className="fld"><span>Service souhaité *</span>
                <select className="inp" name="service" required value={service} onChange={e => setService(e.target.value)}>
                  <option value="">Sélectionnez un service</option>
                  {SERVICE_OPTIONS.map(g => <optgroup key={g.group} label={g.group}>{g.items.map(([v, l]) => <option key={v} value={v}>{l}</option>)}</optgroup>)}
                </select>
              </label>
              <div className="grid2">
                <label className="fld"><span>Budget estimé</span><select className="inp" name="budget" defaultValue=""><option value="">Sélectionnez</option>{BUDGETS.map(([v, l]) => <option key={v} value={v}>{l}</option>)}</select></label>
                <label className="fld"><span>Délai souhaité</span><select className="inp" name="delai" defaultValue=""><option value="">Sélectionnez</option>{DELAIS.map(([v, l]) => <option key={v} value={v}>{l}</option>)}</select></label>
              </div>
              <label className="fld"><span>Décrivez votre projet *</span><textarea className="inp" name="description" required value={desc} onChange={e => setDesc(e.target.value)} placeholder="Votre activité, ce que vous voulez obtenir, vos idées…" /></label>
              <label className="check"><input type="checkbox" name="newsletter" value="oui" />Je souhaite recevoir les actualités ABMCY</label>
              <AnimatePresence>
                {(state === 'ok' || state === 'err') && (
                  <motion.div className={'msg ' + (state === 'ok' ? 'ok2' : 'err')} role="status" initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                    {state === 'ok' ? 'Merci ! Votre demande est bien partie. Notre équipe vous recontacte sous 24 h.' : `L'envoi n'a pas abouti. Réessayez, ou écrivez-nous sur WhatsApp au ${CONTACT.phone}.`}
                  </motion.div>
                )}
              </AnimatePresence>
              <button className="btn btn-or" type="submit" disabled={state === 'sending'} style={{ justifySelf: 'start' }}>{state === 'sending' ? 'Envoi en cours…' : 'Envoyer ma demande'} <i><Arrow /></i></button>
            </form>
          </Reveal>
          <Reveal className="card info" delay={0.1}>
            <a className="row" href={CONTACT.wa} target="_blank" rel="noopener"><span className="ic">{WA_ICON}</span><span><small>WhatsApp</small><b>{CONTACT.phone}</b></span></a>
            <a className="row" href={'mailto:' + CONTACT.email}><span className="ic"><Icon name="mail" /></span><span><small>Email</small><b>{CONTACT.email}</b></span></a>
            <div className="row"><span className="ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21Z" /><circle cx="12" cy="9.5" r="2.5" /></svg></span><span><small>Adresse</small><b>{CONTACT.city}</b></span></div>
            <div><small>Horaires</small><div className="hours">{CONTACT.hours.map(([d, h]) => [<span key={d}>{d}</span>, <b key={d + 'h'}>{h}</b>])}</div></div>
            <a className="wa" href={CONTACT.wa} target="_blank" rel="noopener">{WA_ICON}Écrire sur WhatsApp</a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ---------- Partenaire + FAQ ---------- */
export function PartnerFaq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="sec tight">
      <div className="wrap">
        <Reveal className="part">
          <div><h2>Devenez partenaire ABMCY</h2><p>Vous êtes expert dans votre domaine et partagez notre exigence ? Rejoignez notre réseau et accédez à de nouveaux projets.</p></div>
          <a className="btn btn-dark" href="/devenir-partenaire">Postuler <i><Arrow /></i></a>
        </Reveal>
        <div id="faq" style={{ marginTop: 'clamp(80px,10vw,120px)' }}>
          <Reveal><span className="kick">Questions fréquentes</span></Reveal>
          <Words>Vous vous demandez <Gold>peut-être…</Gold></Words>
          <div className="faq">
            {FAQ.map(([q, a], i) => (
              <Reveal key={q} className={'fq' + (open === i ? ' open' : '')} delay={i * 0.05}>
                <button type="button" aria-expanded={open === i} onClick={() => setOpen(open === i ? null : i)}>{q}</button>
                <AnimatePresence initial={false}>
                  {open === i && <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.4, ease: EASE }}><p>{a}</p></motion.div>}
                </AnimatePresence>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Pied de page ---------- */
export function Footer() {
  const [toast, setToast] = useState('');
  const share = async () => {
    const d = { title: 'ABMCY', text: "ABMCY, l'agence digitale qui construit le numérique de l'Afrique.", url: 'https://abmcy.com/' };
    if (navigator.share) { try { await navigator.share(d); } catch { /* annulé */ } return; }
    try { await navigator.clipboard.writeText(d.url); setToast('Lien copié !'); } catch { setToast('abmcy.com'); }
    setTimeout(() => setToast(''), 2200);
  };
  const y26 = PROJECTS.filter(p => p.y2026).slice(0, 8);
  return (
    <footer>
      <div className="wrap">
        <div className="ft">
          <div>
            <a className="brand" href="/" onClick={e => { e.preventDefault(); scrollToId('accueil'); }}><Africa style={{ width: 34 }} /><b className="goldtxt" style={{ fontSize: 22 }}>ABMCY</b></a>
            <p>African Business Manager Company. Votre partenaire de confiance pour la transformation digitale en Afrique.</p>
            <button className="share" type="button" onClick={share}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" /><path d="m8.6 13.5 6.8 4M15.4 6.5l-6.8 4" /></svg>Partager le site</button>
          </div>
          <div><h4>Objectif 2026</h4><ul>{y26.map(p => <li key={p.id}><a href={p.url} target="_blank" rel="noopener">{p.name}</a></li>)}<li><a href="/#projets" onClick={e => { e.preventDefault(); scrollToId('projets'); }}>Tous les projets →</a></li></ul></div>
          <div><h4>ABMCY</h4><ul><li><a href="/vision-2026">Vision 2026</a></li><li><a href="/prix">Tarifs et comparatif</a></li><li><a href="/plateforme-ecommerce">Plateforme e-commerce</a></li><li><a href="/realisation-reseau">Réseau ABMCY</a></li><li><a href="/#simulateur" onClick={e => { e.preventDefault(); scrollToId('simulateur'); }}>Simulateur de besoin</a></li><li><a href="/devenir-partenaire">Devenir partenaire</a></li><li><a href="/#faq" onClick={e => { e.preventDefault(); scrollToId('faq'); }}>FAQ</a></li></ul></div>
          <div><h4>Contact</h4><ul><li>{CONTACT.city}</li><li><a href={CONTACT.wa} target="_blank" rel="noopener">{CONTACT.phone}</a></li><li><a href={'mailto:' + CONTACT.email}>{CONTACT.email}</a></li></ul></div>
        </div>
        <div className="legal"><span>© 2026 ABMCY — African Business Manager Company. Tous droits réservés.</span><a href="/mentions-legales">Mentions légales</a></div>
      </div>
      <AnimatePresence>{toast && <motion.div className="toast" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }}>{toast}</motion.div>}</AnimatePresence>
    </footer>
  );
}
