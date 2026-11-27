// Textes du site : services, tarifs, témoignages, FAQ, contact.

export const CONTACT = {
  email: 'support@abmcy.com',
  phone: '+221 76 904 79 99',
  wa: 'https://wa.me/221769047999?text=' + encodeURIComponent('Bonjour ABMCY, je vous contacte depuis votre site.'),
  city: 'Dakar, Sénégal',
  hours: [['Lundi – vendredi', '8 h – 18 h'], ['Samedi', '9 h – 15 h'], ['Dimanche', 'Fermé']] as [string, string][],
};

// Adresse du script qui reçoit les demandes de devis (repli si config.js ne charge pas).
export const FORM_URL_FALLBACK = 'https://script.google.com/macros/s/AKfycbzdM_AkQoxz9vyCc3_auMmp5y9sD1uMLWLAICbqDBvpxwyzpkpPx99P2eeIyx5zs248kQ/exec';

export const BAND = ['Sites web premium', 'Boutiques en ligne', 'Applications mobiles', 'Automatisation & IA', 'Serveur mail professionnel',
  'Relances automatiques', 'Tableaux de bord', 'Branding', 'Paiement mobile money', 'Cybersécurité'];

export type IconName = 'web' | 'mob' | 'cart' | 'pen' | 'bolt' | 'chart' | 'qr' | 'shield' | 'mail' | 'loop' | 'target' | 'cam' | 'net' | 'lang' | 'cap' | 'star' | 'home' | 'plane' | 'plus';

export interface Service { icon: IconName; title: string; desc: string; points: string[]; value: string }

export const SERVICES: { tab: string; items: Service[] }[] = [
  { tab: 'Créer', items: [
    { icon: 'web', title: 'Sites web premium', desc: 'Des sites rapides, élégants et pensés sur mesure pour votre image.', points: ['Design sur mesure', 'Référencement', 'Hébergement inclus'], value: 'sites-web' },
    { icon: 'mob', title: 'Développement mobile', desc: 'Applications Android et iOS adaptées à votre métier.', points: ['Natives ou hybrides', 'Interface intuitive', 'Maintenance'], value: 'developpement-mobile' },
    { icon: 'cart', title: 'E-commerce & ventes en ligne', desc: 'Lancez ou boostez votre boutique en ligne, paiements compris.', points: ['Boutique complète', 'Paiement mobile money', 'Stocks et commandes'], value: 'ecommerce-ventes-ligne' },
    { icon: 'pen', title: 'Branding premium', desc: 'Une identité visuelle forte qui positionne votre marque.', points: ['Logo et charte', 'Supports de communication', 'Stratégie de marque'], value: 'branding-premium' },
  ] },
  { tab: 'Automatiser', items: [
    { icon: 'bolt', title: 'Automatisation & IA', desc: "Vos processus automatisés via WhatsApp, n8n et l'intelligence artificielle.", points: ['Chatbots', 'Scénarios n8n', 'Multicanal'], value: 'automatisation-workflow' },
    { icon: 'chart', title: 'Dashboards intelligents', desc: 'Vos indicateurs clés en temps réel pour décider vite et bien.', points: ['Visualisation dynamique', 'Rapports automatiques', 'Alertes'], value: 'dashboards-intelligents' },
    { icon: 'qr', title: 'Intégration QR / NFC', desc: 'Paiements, cartes de visite et menus sans contact.', points: ['Paiement rapide', 'Cartes digitales', 'Suivi des scans'], value: 'integration-qr-nfc' },
    { icon: 'shield', title: 'Cybersécurité & protection', desc: 'Vos outils et vos données sécurisés et conformes.', points: ['Audit de sécurité', 'Sauvegardes', 'Conformité'], value: 'cybersecurite-protection' },
    { icon: 'mail', title: 'Serveur mail professionnel', desc: 'Vos adresses email à votre nom (contact@votre-entreprise), sur un serveur mis en place et suivi par nos soins.', points: ['Adresses à votre domaine', 'Anti-spam et webmail', 'Sauvegardes'], value: 'serveur-mail' },
    { icon: 'loop', title: 'Relances & marketing automatisé', desc: "Vos relances WhatsApp et email partent toutes seules, et vos publications sortent à l'heure sur vos réseaux.", points: ['Relances WhatsApp et email', 'Publication sur 5 réseaux', 'Suivi des résultats et des ventes'], value: 'automatisation-marketing' },
  ] },
  { tab: 'Faire connaître', items: [
    { icon: 'target', title: 'Stratégie digitale', desc: 'Un plan numérique clair, efficace et rentable.', points: ['Audit digital', 'Campagnes publicitaires', 'Analyse et optimisation'], value: 'strategie-digitale' },
    { icon: 'cam', title: 'Communication & audiovisuel', desc: 'Vidéos, contenus et couverture qui font parler de vous.', points: ['Production vidéo', 'Réseaux sociaux', "Couverture d'événements"], value: 'communication-audiovisuel' },
    { icon: 'net', title: 'Réseau & marketing digital', desc: 'Affiliation et réseaux de vente pour multiplier vos ventes.', points: ["Plateforme d'affiliation", 'Tunnels de vente', 'Suivi des performances'], value: 'reseau-marketing-digital' },
    { icon: 'lang', title: 'Traduction & localisation', desc: 'Vos contenus adaptés pour un public international.', points: ['Traduction multilingue', 'Sous-titrage', 'Relecture'], value: 'traduction-localisation' },
  ] },
  { tab: 'Accompagner', items: [
    { icon: 'cap', title: 'Formation & coaching', desc: "Former vos équipes au digital, au branding et à l'automatisation.", points: ['Marketing digital', 'Ateliers pratiques', 'Coaching'], value: 'formation-coaching' },
    { icon: 'star', title: 'Événementiel', desc: 'Mariages, conférences, lancements : des événements mémorables.', points: ['Coordination complète', 'Concepts uniques', 'Prestataires'], value: 'evenementiel' },
    { icon: 'home', title: 'Décoration artistique', desc: 'Des ambiances sur mesure pour vos espaces et événements.', points: ['Ambiances sur mesure', 'Tous espaces', 'Conception et pose'], value: 'decoration-artistique' },
    { icon: 'plane', title: 'Voyage & tourisme', desc: 'Réservations et outils digitaux pour agences et hôtels.', points: ['Plateformes de réservation', 'Paiement en ligne', 'Marketing ciblé'], value: 'voyage-transport-hebergement' },
    { icon: 'plus', title: 'Solution sur mesure', desc: 'Un besoin hors liste ? Nous mobilisons notre réseau pour vous.', points: ['Analyse du besoin', 'Offre personnalisée', 'Suivi de A à Z'], value: 'autre' },
  ] },
];
export const SERVICE_COUNT = SERVICES.reduce((n, g) => n + g.items.length, 0);

export const SERVICE_OPTIONS: { group: string; items: [string, string][] }[] = [
  { group: 'Plateformes', items: [['plateforme-ecommerce', 'Plateforme E-commerce'], ['plateforme-valorisation-pro', 'Plateforme Valorisation Pro'], ['plateforme-gestion', 'Plateforme de Gestion'], ['plateforme-evenementiel', 'Plateforme Événementiel'], ['plateforme-elearning', 'Plateforme E-learning']] },
  { group: 'Services', items: [...SERVICES.flatMap(g => g.items.map(s => [s.value, s.title] as [string, string])).filter(([v]) => v !== 'autre'), ['autre', 'Autre service ou consultation']] },
];

export const BUDGETS: [string, string][] = [['5-10', '5 000 – 10 000 FCFA'], ['10-50', '10 000 – 50 000 FCFA'], ['50-100', '50 000 – 100 000 FCFA'], ['100-500', '100 000 – 500 000 FCFA'],
  ['500-2000', '500 000 – 2 000 000 FCFA'], ['2000-5000', '2 000 000 – 5 000 000 FCFA'], ['5000-10000', '5 000 000 – 10 000 000 FCFA'], ['10000+', 'Plus de 10 000 000 FCFA']];
export const DELAIS: [string, string][] = [['urgent', 'Urgent (1-2 semaines)'], ['rapide', 'Rapide (3-4 semaines)'], ['standard', 'Standard (1-2 mois)'], ['flexible', 'Flexible (2 mois et plus)']];

export const SECTEURS: [string, string][] = [['marketing-strategique', 'Marketing & Stratégie'], ['branding-premium', 'Branding & Identité visuelle'], ['automatisation-intelligente', 'Automatisation & IA'],
  ['tableaux-dynamiques', 'Tableaux de bord & Data'], ['cybersecurite-numerique', 'Cybersécurité'], ['design-graphique', 'Design graphique'], ['audiovisuel-creatif', 'Audiovisuel & Podcast'],
  ['traduction-multilingue', 'Traduction & Localisation'], ['developpement-mobile', 'Application mobile'], ['ecommerce-moderne', 'E-commerce & Vente en ligne'], ['paiement-connecte', 'Paiement connecté (QR/NFC)'],
  ['evenementiel-professionnel', 'Événementiel & Décoration'], ['voyage-transport-hebergement', 'Voyage, Transport & Hébergement'], ['formation-digitale', 'Formation & E-learning'],
  ['agriculture-intelligente', 'Agriculture intelligente'], ['immobilier-construction', 'Immobilier & Construction'], ['sante-bien-etre', 'Santé & Bien-être'], ['communication-digitale', 'Communication digitale']];

// Tarifs doublés le 27/11/2026 (avant : 179 900 / 364 900 / 524 900).
export interface Plan { tier: string; name: string; for: string; price: number; old?: number; steps: [string, number, number][]; incl: string[]; dur: string; cta: string; star?: boolean }
export const PLANS: Plan[] = [
  { tier: "L'Accélérateur", name: 'Landing page / One-page', for: 'Pour un lancement rapide, un événement ou un produit unique.', price: 359800,
    steps: [['À la commande', 50, 180000], ['À la livraison', 50, 179800]],
    incl: ['Site ultra-rapide (score Google 98/100)', 'Hébergement et domaine 1 an', "Outil d'administration simple", 'Bouton de chat WhatsApp', 'Référencement Google avancé'],
    dur: 'Livré en 2 semaines environ', cta: 'Lancer mon projet' },
  { tier: 'Le Partenaire', name: 'Site vitrine', for: 'Pour présenter votre entreprise, vos services et asseoir votre crédibilité.', price: 729800, old: 780000, star: true,
    steps: [['À la commande', 30, 219000], ['Développement', 40, 291920], ['À la livraison', 30, 218880]],
    incl: ['Site moderne et évolutif', 'Hébergement, domaine et sécurité renforcée 1 an', "Outil d'administration facile", 'Assistant IA qui répond 24 h/24', 'Référencement Google avancé', 'Maquette offerte avant de commencer'],
    dur: 'Livré en 2 mois environ', cta: 'Demander ma maquette' },
  { tier: 'Le Leader du marché', name: 'E-commerce / Portail', for: 'Pour vendre en ligne, gérer des réservations ou lancer une plateforme.', price: 1049800,
    steps: [['À la commande', 25, 262500], ['Étape 2', 30, 314940], ['Étape 3', 30, 314940], ['À la livraison', 15, 157420]],
    incl: ['Boutique ou plateforme complète, installable sur téléphone', 'Paiement mobile money intégré', 'Hébergement haute disponibilité 1 an', 'Administration e-commerce', 'Recommandations de produits par IA', 'Référencement Google avancé'],
    dur: 'Livré en 3 mois environ', cta: 'Planifier ma démo' },
];

export const QUOTES: [string, string][] = [
  ["J'ai découvert CV Pro+ sur les réseaux sociaux. Ce que j'ai le plus apprécié, c'est leur volonté de bien faire et de respecter le client. Service rapide et professionnel.", 'CADJA Manuella'],
  ["Recommandé par un ami, j'ai été bluffée par l'efficacité et la rapidité du service. Un travail sérieux et très satisfaisant, vraiment rien à dire !", 'Hanifah KONE'],
  ["CV Pro+ m'a été conseillé par une connaissance. Leur détermination à aider les autres est remarquable. Tout est bien pensé. Je recommande vivement.", 'Mouna Ana Mariam NIAMBA'],
  ["J'ai apprécié la disponibilité de l'équipe. Le service est fluide et professionnel. Je recommande sans hésiter.", 'Kouton Emmanuelle'],
  ["Ce que j'ai aimé, c'est leur implication et leur réactivité dans les échanges. Le contenu des messages est clair et pertinent.", 'Georges ENZANZA'],
];

export const FAQ: [string, string][] = [
  ['Quels services proposez-vous ?', 'Sites web, applications mobiles, boutiques en ligne, automatisation (WhatsApp, IA, relances), serveur mail professionnel, tableaux de bord, branding, stratégie digitale, formation et bien plus. Voyez la section Services pour la liste complète.'],
  ['Travaillez-vous uniquement au Sénégal ?', "Nous sommes basés à Dakar, mais notre vision est panafricaine : nous travaillons avec des clients et des partenaires dans toute l'Afrique, du Sénégal au Bénin en passant par la Côte d'Ivoire."],
  ['Combien coûte un site ?', 'De 359 800 FCFA pour une landing page à 1 049 800 FCFA pour une boutique ou une plateforme, hébergement et domaine compris la première année. Le paiement peut être étalé par étapes.'],
  ['Comment obtenir un devis ?', 'Remplissez le formulaire de contact ou écrivez-nous sur WhatsApp. Le simulateur de besoin vous donne aussi une première idée des solutions adaptées. Nous répondons sous 24 h.'],
  ['Comment devenir partenaire ?', 'Rendez-vous sur la page « Devenir partenaire » et remplissez le formulaire de candidature. Notre équipe étudie votre profil et vous recontacte.'],
];

export const fcfa = (n: number) => n.toLocaleString('fr-FR').replace(/\s/g, ' ');
