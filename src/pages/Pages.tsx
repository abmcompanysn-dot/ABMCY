import { useEffect, useMemo, useState, type ReactNode } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { CONTACT, SECTEURS } from '../data/content';
import { INFO_PAGES } from '../data/pages';
import { SIMULATOR } from '../data/simulator';
import { byId } from '../data/projects';
import { Pricing } from '../components/Sections';
import { Arrow, Check, EASE, Gold, Mockup, Reveal, Words } from '../components/ui';
import { sendForm, setMeta } from '../lib/form';
import { navigate } from '../lib/router';
import { scrollToId } from '../lib/scroll';

/* ---------- Briques communes ---------- */
function PageHero({ kick, children, lead, extra }: { kick: string; children: ReactNode; lead: string; extra?: ReactNode }) {
  return (
    <section className="page-hero">
      <div className="wrap">
        <Reveal><a className="back" href="/">← Accueil</a></Reveal>
        <Reveal delay={0.05}><span className="kick">{kick}</span></Reveal>
        <Words as="h1">{children}</Words>
        <Reveal delay={0.25}><p className="lead">{lead}</p></Reveal>
        {extra && <Reveal delay={0.35} className="ph-extra">{extra}</Reveal>}
      </div>
    </section>
  );
}

type Status = 'idle' | 'sending' | 'ok' | 'err';
function useSend(okText: string) {
  const [state, setState] = useState<Status>('idle');
  const submit = async (form: HTMLFormElement, data: Record<string, unknown>) => {
    if (!form.checkValidity()) { form.reportValidity(); return false; }
    setState('sending');
    try { await sendForm(data); form.reset(); setState('ok'); return true; } catch { setState('err'); return false; }
  };
  const Msg = () => (
    <AnimatePresence>
      {(state === 'ok' || state === 'err') && (
        <motion.div className={'msg ' + (state === 'ok' ? 'ok2' : 'err')} role="status" initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
          {state === 'ok' ? okText : `L'envoi n'a pas abouti. Réessayez, ou écrivez-nous sur WhatsApp au ${CONTACT.phone}.`}
        </motion.div>
      )}
    </AnimatePresence>
  );
  return { state, submit, Msg };
}

function CtaBand({ service }: { service?: string }) {
  return (
    <section className="sec tight">
      <div className="wrap">
        <Reveal className="part">
          <div><h2>Passez à l'action</h2><p>Un devis gratuit sous 24 h, ou une première idée des solutions adaptées à votre secteur en une minute.</p></div>
          <div className="part-btns">
            <a className="btn btn-dark" href={'/#contact'} onClick={e => { e.preventDefault(); navigate('/#contact'); if (service) setTimeout(() => dispatchEvent(new CustomEvent('abmcy-devis', { detail: { service } })), 400); }}>Obtenir un devis <i><Arrow /></i></a>
            <a className="btn btn-dark ghost" href="/#simulateur">Trouver ma solution</a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

const share = async (title: string, text: string) => {
  const d = { title, text, url: location.href };
  if (navigator.share) { try { await navigator.share(d); } catch { /* annulé */ } return; }
  try { await navigator.clipboard.writeText(d.url); alert('Lien copié !'); } catch { /* rien */ }
};

/* ---------- Tarifs (/prix) ---------- */
const CMP: [string, string, string, string | true | false][] = [
  ['Technologie', 'Site statique ultra-rapide', 'React, évolutif', 'Application installable (PWA)'],
  ['Hébergement et domaine', '1 an inclus', '1 an inclus, sécurité renforcée', '1 an inclus, haute disponibilité'],
  ["Outil d'administration", 'Simple', 'Facile, complet', 'Spécial e-commerce'],
  ['Vitesse (score Google)', '98/100', '90+/100', '85+/100'],
  ['Intelligence artificielle', 'Chat WhatsApp', 'Assistant IA 24 h/24', 'Recommandations de produits'],
];
export function PrixPage() {
  useEffect(() => setMeta('Tarifs — Sites web à prix clair | ABMCY', "Landing page 359 800 FCFA, site vitrine 729 800 FCFA, e-commerce 1 049 800 FCFA : hébergement et domaine compris la première année, paiement étalé possible."), []);
  const [open, setOpen] = useState<number | null>(0);
  const faq: [string, string][] = [
    ['Y a-t-il des coûts cachés ?', 'Non. Nos tarifs comprennent tout pour la première année : création, hébergement et nom de domaine. Ensuite, seuls l’hébergement et le domaine (environ 35 000 FCFA par an) sont à renouveler. Toute fonctionnalité ajoutée en cours de projet fait l’objet d’un devis clair.'],
    ['À qui appartient le code du site ?', 'À vous, à 100 %. À la livraison, vous recevez l’accès complet au code source et à tous les comptes associés.'],
    ['Comment fonctionne le paiement étalé ?', 'Chaque paiement débloque une étape du projet (maquette, développement, livraison). Vous gardez le contrôle de l’avancement et de la qualité, tout en préservant votre trésorerie. Les échéances sont fixées dans le contrat.'],
  ];
  return (
    <>
      <PageHero kick="Tarifs" lead="Des sites rapides, sécurisés et pensés pour grandir avec vous, en Afrique de l'Ouest et au-delà.">Construisez l'avenir de <Gold>votre marque.</Gold></PageHero>
      <Pricing />
      <section className="sec tight">
        <div className="wrap">
          <Reveal><span className="kick">Comparatif</span></Reveal>
          <Words>Ce que comprend <Gold>chaque offre.</Gold></Words>
          <Reveal className="cmp-wrap">
            <table className="cmp">
              <thead><tr><th /><th>L'Accélérateur</th><th className="hl">Le Partenaire</th><th>Le Leader du marché</th></tr></thead>
              <tbody>
                {CMP.map(([k, a, b, c]) => <tr key={k}><th>{k}</th><td>{a}</td><td className="hl">{b}</td><td>{String(c)}</td></tr>)}
                <tr><th>Paiement mobile money intégré</th><td><span className="no">—</span></td><td className="hl"><span className="no">—</span></td><td><span className="yes"><Check /></span></td></tr>
                <tr><th>Référencement Google avancé</th><td><span className="yes"><Check /></span></td><td className="hl"><span className="yes"><Check /></span></td><td><span className="yes"><Check /></span></td></tr>
              </tbody>
            </table>
          </Reveal>
          <Reveal className="guar"><b className="goldtxt cz">80/100</b><div><h3>Garantie de performance</h3><p>Si votre site n'atteint pas un score Google PageSpeed de 80/100 minimum, nous continuons à l'optimiser gratuitement jusqu'à ce que l'objectif soit atteint.</p></div></Reveal>
          <div className="faq" style={{ marginTop: 40 }}>
            {faq.map(([q, a], i) => (
              <Reveal key={q} className={'fq' + (open === i ? ' open' : '')} delay={i * 0.05}>
                <button type="button" aria-expanded={open === i} onClick={() => setOpen(open === i ? null : i)}>{q}</button>
                <AnimatePresence initial={false}>{open === i && <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.4, ease: EASE }}><p>{a}</p></motion.div>}</AnimatePresence>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <CtaBand service="sites-web" />
    </>
  );
}

/* ---------- Devenir partenaire ---------- */
export function PartnerPage() {
  useEffect(() => setMeta('Devenir partenaire — Rejoignez le réseau ABMCY', "Étudiants, freelances, agences : rejoignez gratuitement le réseau de partenaires ABMCY et recevez des projets rémunérés partout en Afrique."), []);
  const [type, setType] = useState('particulier');
  const { state, submit, Msg } = useSend('Merci ! Votre candidature est bien partie. Vous allez recevoir un email de confirmation.');
  const who: [string, string][] = [['Étudiants & jeunes talents', "Gagnez de l'expérience sur des projets réels."], ['Professionnels & freelances', 'Accédez à des projets qualifiés, régulièrement.'], ['Agences & entreprises', "Collaborez sur des mandats d'envergure."]];
  const steps = ['Postulez avec le formulaire ci-dessous en présentant votre savoir-faire.', 'Notre équipe étudie votre candidature pour vérifier qu’elle répond à nos standards.', 'Si votre profil est retenu, vous rejoignez officiellement le réseau.', 'Vous recevez des projets et êtes rémunéré pour chaque mission.'];
  const why: [string, string][] = [['Impact continental', "Des projets qui façonnent l'avenir digital de l'Afrique."], ['Croissance', 'Une communauté qui valorise le talent, l’engagement et la solidarité.'], ['Liberté', 'Vous travaillez selon vos disponibilités et votre expertise, et chaque mission est payée.']];
  return (
    <>
      <PageHero kick="Devenir partenaire" lead="Notre objectif : un grand réseau de partenaires compétents et engagés, pour servir l'Afrique avec qualité et passion. L'inscription est gratuite.">ABMCY, l'aventure <Gold>qui grandit.</Gold></PageHero>
      <section className="sec tight">
        <div className="wrap">
          <Reveal><span className="kick">Qui peut nous rejoindre ?</span></Reveal>
          <Words>Tout le monde, <Gold>vraiment.</Gold></Words>
          <div className="trio">{who.map(([t, d], i) => <Reveal key={t} className="val" delay={i * 0.08}><b className="goldtxt">0{i + 1}</b><div><h4>{t}</h4><p>{d}</p></div></Reveal>)}</div>
        </div>
      </section>
      <section className="sec tight">
        <div className="wrap about">
          <div>
            <Reveal><span className="kick">Comment ça marche</span></Reveal>
            <Words>Quatre étapes, <Gold>c'est tout.</Gold></Words>
            <ol className="steps4">{steps.map((s, i) => <Reveal as="li" key={i} delay={i * 0.1}><span className="cz goldtxt">{i + 1}</span><p>{s}</p></Reveal>)}</ol>
          </div>
          <div className="vals" style={{ alignSelf: 'end' }}>
            {why.map(([t, d], i) => <Reveal key={t} className="val" delay={i * 0.08}><b className="goldtxt">✦</b><div><h4>{t}</h4><p>{d}</p></div></Reveal>)}
          </div>
        </div>
      </section>
      <section className="sec tight" id="candidature">
        <div className="wrap">
          <Reveal><span className="kick">Candidature</span></Reveal>
          <Words>Prêt à <Gold>nous rejoindre ?</Gold></Words>
          <Reveal><p className="lead">Dites-nous quel service de qualité vous pouvez apporter.</p></Reveal>
          <Reveal className="card" style={{ marginTop: 34 }}>
            <form className="fgrid" noValidate onSubmit={e => { e.preventDefault(); const f = e.currentTarget; void submit(f, Object.fromEntries(new FormData(f).entries())); }}>
              <input type="hidden" name="form_type" value="partnership" />
              <div className="seg" role="radiogroup" aria-label="Vous êtes">
                <label><input type="radio" name="user_type" value="entreprise" checked={type === 'entreprise'} onChange={() => setType('entreprise')} />Une entreprise</label>
                <label><input type="radio" name="user_type" value="particulier" checked={type === 'particulier'} onChange={() => setType('particulier')} />Un particulier / freelance</label>
              </div>
              <div className="grid2">
                <label className="fld"><span>Nom du contact *</span><input className="inp" name="contact_name" required autoComplete="name" /></label>
                <label className="fld"><span>Nom de l'entreprise{type === 'entreprise' ? ' *' : ' (si applicable)'}</span><input className="inp" name="company_name" required={type === 'entreprise'} autoComplete="organization" /></label>
                <label className="fld"><span>Email *</span><input className="inp" type="email" name="email" required autoComplete="email" /></label>
                <label className="fld"><span>Téléphone *</span><input className="inp" type="tel" name="phone" required autoComplete="tel" placeholder="+221 …" /></label>
              </div>
              <label className="fld"><span>Votre principal secteur d'expertise *</span>
                <select className="inp" name="sector" required defaultValue="">
                  <option value="">Sélectionnez un secteur</option>
                  {[['communication-digitale', 'Communication digitale'], ['marketing-strategique', 'Marketing stratégique'], ['automatisation-intelligente', 'Automatisation intelligente'], ['design-graphique', 'Design graphique'], ['voyage-transport-hebergement', 'Voyage, transport & hébergement'], ['autre', 'Autre (précisez ci-dessous)']].map(([v, l]) => <option key={v} value={v}>{l}</option>)}
                </select>
              </label>
              <label className="fld"><span>Présentez votre activité et votre valeur ajoutée *</span><textarea className="inp" name="message" required placeholder="Votre métier, votre expérience, ce que vous apportez…" /></label>
              <div className="grid3">
                <label className="fld"><span>Une réalisation (lien)</span><input className="inp" type="url" name="example1" placeholder="https://…" /></label>
                <label className="fld"><span>Deuxième (optionnel)</span><input className="inp" type="url" name="example2" placeholder="https://…" /></label>
                <label className="fld"><span>Troisième (optionnel)</span><input className="inp" type="url" name="example3" placeholder="https://…" /></label>
              </div>
              <Msg />
              <button className="btn btn-or" type="submit" disabled={state === 'sending'} style={{ justifySelf: 'start' }}>{state === 'sending' ? 'Envoi en cours…' : 'Envoyer ma candidature'} <i><Arrow /></i></button>
            </form>
          </Reveal>
        </div>
      </section>
    </>
  );
}

/* ---------- Vision 2026 ---------- */
const VISION_SECTEURS = ['Agriculture & Élevage', 'Artisanat & Création', 'Automobile & Transport', 'Beauté & Cosmétique', 'BTP & Construction', 'Commerce & Distribution', 'Communication & Marketing',
  'Éducation & Formation', 'Événementiel', 'Hôtellerie & Restauration', 'Immobilier', 'Informatique & Technologie', 'Mode & Habillement', 'Santé & Bien-être', 'Services aux Entreprises', 'Services à la Personne', 'Tourisme & Voyage', 'Autre'];
export function VisionPage() {
  useEffect(() => setMeta('Vision 2026 : ABMCY Market — votre boutique en ligne | ABMCY', "Votre propre boutique en ligne avec votre adresse, votre logo, vos paiements mobile money et un tableau de bord sur téléphone. Inscription au programme Vision 2026."), []);
  const [niveau, setNiveau] = useState('debutant');
  const { state, submit, Msg } = useSend('Félicitations ! Votre pré-inscription est enregistrée. Notre équipe vous contacte pour configurer votre boutique.');
  const cards: [string, string][] = [
    ['Votre identité', 'Plus seulement un vendeur dans une liste : votre propre adresse (ex. coiffure-fatou.abmcy.com), votre logo et votre catalogue pro.'],
    ['Paiements flexibles', 'Débutant : nous encaissons pour vous. Pro : branchez vos propres comptes Wave ou Orange Money et recevez l’argent directement.'],
    ['Gestion simplifiée', 'Un tableau de bord unique, sur téléphone, pour vos produits, vos réservations et vos ventes en temps réel.'],
  ];
  return (
    <>
      <PageHero kick="Nouveau programme · Vision 2026" lead="Nous transformons notre place de marché en un véritable écosystème : chaque entrepreneur a sa propre boutique en ligne, nous nous occupons de la technique."
        extra={<button className="btn btn-ghost" type="button" onClick={() => share('Vision 2026 : ABMCY Market', "Créez votre boutique en ligne avec l'écosystème ABMCY.")}>Partager l'opportunité</button>}>
        Votre boutique, <Gold>votre marque.</Gold>
      </PageHero>
      <section className="sec tight">
        <div className="wrap">
          <div className="trio">{cards.map(([t, d], i) => <Reveal key={t} className="val" delay={i * 0.08}><b className="goldtxt">0{i + 1}</b><div><h4>{t}</h4><p>{d}</p></div></Reveal>)}</div>
          <Reveal className="vis-shots">{['hanis', 'abmcymarket', 'nathan'].map(s => <div key={s} className="vis"><Mockup shot={s} name={byId(s).name} /></div>)}</Reveal>
        </div>
      </section>
      <section className="sec tight" id="inscription">
        <div className="wrap">
          <Reveal><span className="kick">Rejoindre le programme</span></Reveal>
          <Words>Soyez parmi <Gold>les premiers.</Gold></Words>
          <Reveal className="card" style={{ marginTop: 34 }}>
            <form className="fgrid" noValidate onSubmit={e => { e.preventDefault(); const f = e.currentTarget; void submit(f, Object.fromEntries(new FormData(f).entries())); }}>
              <input type="hidden" name="form_type" value="vision_2026" />
              <div className="grid2">
                <label className="fld"><span>Nom complet *</span><input className="inp" name="nom_complet" required autoComplete="name" /></label>
                <label className="fld"><span>Entreprise / marque *</span><input className="inp" name="nom_entreprise" required autoComplete="organization" /></label>
                <label className="fld"><span>Email *</span><input className="inp" type="email" name="email" required autoComplete="email" /></label>
                <label className="fld"><span>Téléphone / WhatsApp *</span><input className="inp" type="tel" name="telephone" required autoComplete="tel" placeholder="+221 …" /></label>
              </div>
              <label className="fld"><span>Secteur d'activité *</span><select className="inp" name="secteur" required defaultValue=""><option value="">Sélectionnez votre secteur</option>{VISION_SECTEURS.map(s => <option key={s} value={s}>{s}</option>)}</select></label>
              <div className="fld"><span>Niveau souhaité *</span>
                <div className="lvl">
                  {([['debutant', 'Débutant', 'Paiement via ABMCY. Pas de frais techniques au départ.'], ['professionnel', 'Professionnel', 'Vos propres moyens de paiement. Abonnement mensuel.']] as const).map(([v, t, d]) => (
                    <label key={v} className={niveau === v ? 'on' : ''}><input type="radio" name="niveau" value={v} checked={niveau === v} onChange={() => setNiveau(v)} required /><b>{t}</b><small>{d}</small></label>
                  ))}
                </div>
              </div>
              <label className="fld"><span>Votre activité *</span><textarea className="inp" name="description" required placeholder="Ce que vous vendez ou proposez, vos clients…" /></label>
              <Msg />
              <button className="btn btn-or" type="submit" disabled={state === 'sending'} style={{ justifySelf: 'start' }}>{state === 'sending' ? 'Envoi en cours…' : 'Créer ma boutique'} <i><Arrow /></i></button>
            </form>
          </Reveal>
        </div>
      </section>
    </>
  );
}

/* ---------- Solutions recommandées (simulateur) ---------- */
export function SolutionPage() {
  const secteur = useMemo(() => new URLSearchParams(location.search).get('secteur') || 'default', []);
  const data = SIMULATOR[secteur] ?? SIMULATOR.default;
  useEffect(() => setMeta(`Solutions pour le secteur ${data.titre} | ABMCY`, `Les services ABMCY recommandés pour le secteur ${data.titre}, et un questionnaire pour obtenir un devis adapté.`), [data]);
  const { state, submit, Msg } = useSend('Merci ! Votre demande est envoyée. Notre équipe vous contacte très vite.');
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = e.currentTarget, fd = new FormData(f);
    let message = `Demande pour le secteur : ${data.titre}\n\n`;
    data.questions.forEach(q => { const r = q.type === 'checkbox' ? fd.getAll(q.name).join(', ') : fd.get(q.name); if (r) message += `Q: ${q.text}\nR: ${r}\n\n`; });
    void submit(f, { nom: fd.get('nom-complet'), email: fd.get('email'), service: secteur, description: message, telephone: fd.get('telephone'), entreprise: '', budget: '', delai: '', newsletter: false });
  };
  return (
    <>
      <PageHero kick="Simulateur de besoin" lead="Voici les services que nous recommandons pour faire décoller votre activité. Répondez à quelques questions : nous préparons un devis adapté."
        extra={<select className="inp sect-pick" aria-label="Changer de secteur" value={SIMULATOR[secteur] ? secteur : ''} onChange={e => { location.href = '/solution-recommandee?secteur=' + e.target.value; }}>
          <option value="">Changer de secteur…</option>{SECTEURS.map(([v, l]) => <option key={v} value={v}>{l}</option>)}</select>}>
        Solutions pour <Gold>{data.titre + '.'}</Gold>
      </PageHero>
      <section className="sec tight">
        <div className="wrap">
          <div className="sols">
            {data.solutions.map((s, i) => (
              <Reveal key={s.titre} className="sv" delay={i * 0.08}>
                <span className="ic cz goldtxt" style={{ fontSize: 20, fontWeight: 700 }}>{i + 1}</span>
                <h3>{s.titre}</h3><p>{s.desc}</p>
                <button type="button" onClick={() => share(`Solution ABMCY : ${s.titre}`, `Recommandé par ABMCY pour le secteur ${data.titre} : ${s.titre} — ${s.desc}`)}>Partager →</button>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <section className="sec tight">
        <div className="wrap">
          <Reveal><span className="kick">Affinez votre demande</span></Reveal>
          <Words>Quelques questions, <Gold>un devis précis.</Gold></Words>
          <Reveal className="card" style={{ marginTop: 34 }}>
            <form className="fgrid" noValidate onSubmit={onSubmit}>
              {data.questions.map(q => (
                <div className="fld" key={q.name}><span>{q.text}</span>
                  {q.type === 'text' ? <input className="inp" name={q.name} placeholder={q.placeholder || 'Votre réponse…'} />
                    : <div className="opts">{q.options!.map(o => <label key={o}><input type={q.type} name={q.name} value={o} /><span>{o}</span></label>)}</div>}
                </div>
              ))}
              <div className="grid3">
                <label className="fld"><span>Nom complet *</span><input className="inp" name="nom-complet" required autoComplete="name" /></label>
                <label className="fld"><span>Email *</span><input className="inp" type="email" name="email" required autoComplete="email" /></label>
                <label className="fld"><span>Téléphone *</span><input className="inp" type="tel" name="telephone" required autoComplete="tel" placeholder="+221 …" /></label>
              </div>
              <Msg />
              <button className="btn btn-or" type="submit" disabled={state === 'sending'} style={{ justifySelf: 'start' }}>{state === 'sending' ? 'Envoi en cours…' : 'Envoyer et obtenir un devis'} <i><Arrow /></i></button>
            </form>
          </Reveal>
        </div>
      </section>
    </>
  );
}

/* ---------- Pages plateforme / réalisation ---------- */
export function InfoPageView({ path }: { path: string }) {
  const p = INFO_PAGES[path];
  useEffect(() => setMeta(`${p.kick.split('·')[1]?.trim() ?? p.kick} — ${p.lead} | ABMCY`, p.lead + ' ' + p.body[0]), [p]);
  return (
    <>
      <PageHero kick={p.kick} lead={p.lead} extra={p.visit && <a className="btn btn-or" href={p.visit.url} target="_blank" rel="noopener">{p.visit.label} <i><Arrow /></i></a>}>{p.title} <Gold>{p.gold}</Gold></PageHero>
      <section className="sec tight">
        <div className="wrap about">
          <div className="prose">{p.body.map((t, i) => <Reveal key={i} delay={i * 0.08}><p>{t}</p></Reveal>)}</div>
          {p.points && <ul className="inc big">{p.points.map((x, i) => <Reveal as="li" key={x} delay={i * 0.06}>{x}</Reveal>)}</ul>}
        </div>
      </section>
      {p.shots && (
        <section className="sec tight">
          <div className="wrap">
            <Reveal><span className="kick">En ligne aujourd'hui</span></Reveal>
            <div className="gal" style={{ marginTop: 24 }}>
              {p.shots.map(s => { const pr = byId(s); return (
                <Reveal key={s}><a className="gc" href={pr.url} target="_blank" rel="noopener"><div className="vis"><Mockup shot={s} name={pr.name} /></div><div className="tx"><small>{pr.kicker}</small><b>{pr.name}</b><p>{pr.desc}</p><span className="lk">{pr.host}</span></div></a></Reveal>
              ); })}
            </div>
          </div>
        </section>
      )}
      {path === '/realisation-reseau'
        ? <section className="sec tight"><div className="wrap"><Reveal className="part"><div><h2>Vous êtes un expert ?</h2><p>Si vous partagez notre exigence et voulez contribuer à des projets ambitieux en Afrique, votre place est parmi nous.</p></div><a className="btn btn-dark" href="/devenir-partenaire">Devenir partenaire <i><Arrow /></i></a></Reveal></div></section>
        : <CtaBand service={p.service} />}
    </>
  );
}

/* ---------- Mentions légales ---------- */
export function LegalPage() {
  useEffect(() => setMeta('Mentions légales | ABMCY', "Mentions légales et politique de confidentialité du site abmcy.com, édité par Africa Business Manager Company (ABMCY), Dakar."), []);
  const blocks: [string, ReactNode][] = [
    ["1. Éditeur du site", <ul><li>Entité : Africa Business Manager Company (ABMCY)</li><li>Adresse : Médina, Dakar, Sénégal</li><li>Responsable de la publication : ATEKOSSI Brunel Mahuzonsou</li><li>Contact : <a href={'mailto:' + CONTACT.email}>{CONTACT.email}</a> · {CONTACT.phone}</li></ul>],
    ['2. Hébergement', <p>L'hébergement et l'exploitation du site sont gérés par MAHU (Mahu Digital System), Médina, Dakar, Sénégal.</p>],
    ['3. Propriété intellectuelle', <p>L'ensemble des éléments du site (code, design, textes, images, logos, vidéos) est la propriété exclusive d'Africa Business Manager Company (ABMCY). Toute reproduction, même partielle, sans autorisation écrite préalable est interdite et constitue une contrefaçon, exposant son auteur à des poursuites civiles et pénales. Les captures des sites présentés appartiennent à leurs propriétaires respectifs et sont montrées en tant que réalisations.</p>],
    ['4. Données personnelles', <ul><li>Données collectées : celles que vous nous donnez volontairement dans nos formulaires (nom, email, téléphone, détails du projet).</li><li>Utilisation : uniquement pour répondre à vos demandes, établir des devis et échanger avec vous. Elles ne sont jamais vendues ni partagées à des fins publicitaires.</li><li>Vos droits : conformément à la loi sénégalaise n° 2008-12 sur la protection des données personnelles, vous pouvez accéder à vos données, les rectifier ou les faire supprimer en écrivant à <a href={'mailto:' + CONTACT.email}>{CONTACT.email}</a>.</li></ul>],
    ['5. Cookies', <p>Le site n'utilise pas de cookies publicitaires ni de suivi. Seul le stockage technique nécessaire à son fonctionnement est utilisé (par exemple, ne pas rejouer l'animation d'ouverture à chaque page).</p>],
  ];
  return (
    <>
      <PageHero kick="Mentions légales" lead="Dernière mise à jour : 27 novembre 2026.">Mentions <Gold>légales.</Gold></PageHero>
      <section className="sec tight"><div className="wrap legal-doc">{blocks.map(([t, c], i) => <Reveal key={t} className="card" delay={i * 0.04}><h3 className="cz">{t}</h3>{c}</Reveal>)}</div></section>
    </>
  );
}

/* ---------- Bientôt / introuvable ---------- */
export function SoonPage({ notFound }: { notFound?: boolean }) {
  useEffect(() => setMeta(notFound ? 'Page introuvable | ABMCY' : 'Bientôt disponible | ABMCY', 'ABMCY, agence digitale à Dakar.'), [notFound]);
  return (
    <section className="page-hero soon-page">
      <div className="wrap" style={{ textAlign: 'center' }}>
        <Reveal><span className="kick">{notFound ? 'Erreur 404' : 'En préparation'}</span></Reveal>
        <Words as="h1">{notFound ? 'Cette page ' : 'Bientôt '}<Gold>{notFound ? "n'existe pas." : 'disponible.'}</Gold></Words>
        <Reveal><p className="lead" style={{ marginInline: 'auto' }}>{notFound ? 'Le lien est peut-être ancien. Tout le reste vous attend sur la page d’accueil.' : 'Nous terminons cette section. Revenez très vite.'}</p></Reveal>
        <Reveal className="ph-extra" style={{ justifyContent: 'center' }}><a className="btn btn-or" href="/">Retour à l'accueil <i><Arrow /></i></a><button className="btn btn-ghost" type="button" onClick={() => scrollToId('contact')}>Nous contacter</button></Reveal>
      </div>
    </section>
  );
}
