// Tous les projets ABMCY affichés sur le site.
// `shot` = nom des captures dans public/assets/projets (<shot>-pc.jpg et <shot>-tel.jpg).
// Pour ajouter un projet : capture ordinateur 1440 px + téléphone 390 px, puis une entrée ici.

export type Category = 'commerce' | 'education' | 'entreprises' | 'tech';

export const CATEGORIES: { id: Category | 'tous'; label: string }[] = [
  { id: 'tous', label: 'Tous' },
  { id: 'commerce', label: 'Commerce & boutiques' },
  { id: 'tech', label: 'Tech & IA' },
  { id: 'education', label: 'Éducation & événements' },
  { id: 'entreprises', label: 'Entreprises & institutions' },
];

export interface Project {
  id: string;
  name: string;
  host: string;          // adresse affichée
  url: string;
  cat: Category;
  y2026: boolean;        // lancé en 2026
  kicker: string;        // petite ligne au-dessus du nom
  desc: string;
  tags?: string[];
  users?: number;        // utilisateurs (affiché « N+ »)
  shot?: string;         // capture disponible
  features?: string[];   // liste détaillée (Yes.abmcy)
}

export const PROJECTS: Project[] = [
  // --- Les cinq grands projets de 2026 (frise) ---
  { id: 'miad', name: 'MIAD Market', host: 'miadmarket.com', url: 'https://miadmarket.com', cat: 'commerce', y2026: true, shot: 'miad', users: 270,
    kicker: 'Marketplace panafricaine', desc: 'La place de marché des produits africains : plusieurs vendeurs, plusieurs langues, des commandes qui partent vers le monde entier.',
    tags: ['Marketplace', 'Multi-vendeurs', 'Multilingue'] },
  { id: 'abmcymarket', name: 'ABMCY Market', host: 'abmcymarket.abmcy.com', url: 'https://abmcymarket.abmcy.com', cat: 'commerce', y2026: true, shot: 'abmcymarket',
    kicker: 'Boutiques en ligne', desc: 'Une boutique en ligne clé en main pour chaque commerçant : son adresse, son catalogue, ses paiements mobile money et son tableau de bord.',
    tags: ['Boutiques en ligne', 'Mobile money', 'Tableau de bord'] },
  { id: 'jeldem', name: 'JEL DEM', host: 'jeldem.abmcy.com', url: 'https://jeldem.abmcy.com', cat: 'tech', y2026: true, shot: 'jeldem',
    kicker: 'Magasin sans caisse', desc: "On badge à l'entrée, on prend ses produits, on sort. Les caméras et l'intelligence artificielle reconnaissent les articles et débitent le compte automatiquement.",
    tags: ['Intelligence artificielle', 'Vision par caméra', 'Badge RFID'] },
  { id: 'diarra', name: 'DIARRA', host: 'diarra.app', url: 'https://diarra.app', cat: 'commerce', y2026: true, shot: 'diarra', users: 570,
    kicker: 'Biens numériques', desc: 'Le marché des biens numériques : PDF, formations, modèles. Paiement par mobile money, affiliation pour les revendeurs et téléchargement sécurisé.',
    tags: ['Biens numériques', 'Affiliation', 'Mobile money'] },
  { id: 'yes', name: 'Yes.abmcy', host: 'yes.abmcy.com', url: 'https://yes.abmcy.com', cat: 'tech', y2026: true, shot: 'yes',
    kicker: 'Messagerie tout-en-un', desc: 'Notre messagerie, tout-en-un. Connexion sans mot de passe, par un code reçu par email.',
    features: ["Messages en temps réel, « lu », « en train d'écrire »", 'Appels audio et vidéo', 'Groupes et communautés', 'Webinaires', 'Boutique intégrée',
      'Assistant IA dans la conversation', 'Invitations par lien, WhatsApp ou email', "Contacts et recherche d'utilisateurs", 'Widget de chat pour votre site web',
      'Notifications push, même hors ligne', 'Application installable sur téléphone et ordinateur'] },

  // --- Les autres lancements de 2026 ---
  { id: 'mahucards', name: 'Mahu Cards', host: 'mahu.cards', url: 'https://mahu.cards', cat: 'tech', y2026: true, shot: 'mahucards',
    kicker: 'Cartes de visite NFC', desc: 'La carte de visite intelligente : un geste sur le téléphone ouvre votre profil, vos contacts et votre boutique. Livrée au Sénégal, au Bénin et au Burkina Faso.' },
  { id: 'mahupc', name: 'Ordinateur Mahu', host: 'call.mahu.cards', url: 'https://call.mahu.cards', cat: 'tech', y2026: true, shot: 'mahupc',
    kicker: 'Ordinateur dans une carte', desc: "Un ordinateur complet sur n'importe quel écran, rien à porter. Précommandes ouvertes." },
  { id: 'mahuia', name: 'Mahu IA', host: 'ai.mahu.cards', url: 'https://ai.mahu.cards', cat: 'tech', y2026: true, shot: 'mahuia',
    kicker: 'IA générative', desc: "Textes, images, voix off, musique et vidéos générés par l'intelligence artificielle." },
  { id: 'hanis', name: "HANI'S", host: 'hani.abmcy.com', url: 'https://hani.abmcy.com', cat: 'commerce', y2026: true, shot: 'hanis',
    kicker: 'Maison de couture', desc: 'Maison de couture à Dakar : collections femme et homme, sur mesure avec choix du tissu, commande en ligne et paiement Wave, Orange Money ou Free Money.' },
  { id: 'brvm', name: 'Bureau BRVM', host: 'brvm.abmcy.com', url: 'https://brvm.abmcy.com', cat: 'tech', y2026: true,
    kicker: 'Bourse · UEMOA', desc: "Assistant d'investissement à la Bourse régionale : cours, score par action et signaux, mis à jour trois fois par jour." },
  { id: 'eed', name: 'Église Évangélique de Dakar', host: 'eed.abmcy.com', url: 'https://eed.abmcy.com', cat: 'entreprises', y2026: true, shot: 'eed',
    kicker: 'Site institutionnel', desc: '« Lumière du Futur » : cultes, événements, ministères et ressources en ligne.' },
  { id: 'core', name: 'ABMCY Core', host: 'cors.abmcy.com', url: 'https://cors.abmcy.com', cat: 'tech', y2026: true, shot: 'core',
    kicker: 'Moteur des boutiques', desc: 'Un seul moteur pour toutes les boutiques que nous accompagnons : chacune garde ses données à part, son tableau de bord, ses commandes et ses paiements.' },

  // --- Tous les autres projets en ligne ---
  { id: 'miadtalent', name: 'MIAD Talent', host: 'alanni.abmcy.com', url: 'https://alanni.abmcy.com', cat: 'entreprises', y2026: true, shot: 'miadtalent',
    kicker: 'Recrutement', desc: 'Les meilleurs talents africains, avec vidéo de présentation et CV, pour les entreprises qui recrutent : profils anonymisés, identité transmise avec l’accord du candidat.' },
  { id: 'peniel', name: 'Peniel Fashion', host: 'pf.abmcy.com', url: 'https://pf.abmcy.com', cat: 'commerce', y2026: true, shot: 'peniel',
    kicker: 'Costumes sur mesure', desc: 'Costumes, smokings et tenues de cérémonie sur mesure : on choisit son modèle, on envoie ses mesures, la maison confectionne.' },
  { id: 'shoppro', name: 'SHOP PRO', host: 'memane.abmcy.com', url: 'https://memane.abmcy.com', cat: 'commerce', y2026: true, shot: 'shoppro',
    kicker: 'Tenues pro & scolaires', desc: 'Tenues professionnelles et scolaires personnalisées au logo de chaque école, centre ou entreprise, partout au Sénégal.' },
  { id: 'nathan', name: 'Nathan', host: 'nath.abmcy.com', url: 'https://nath.abmcy.com', cat: 'commerce', y2026: true, shot: 'nathan',
    kicker: 'Produits numériques', desc: 'Ebooks, modèles et fichiers prêts à télécharger, payés en Wave, Orange Money, MTN MoMo ou carte, avec lien de téléchargement immédiat.' },
  { id: 'paradis', name: 'Paradis Services', host: 'paradisservice.abmcy.com', url: 'https://paradisservice.abmcy.com', cat: 'entreprises', y2026: true, shot: 'paradis',
    kicker: 'Chambres & prestations', desc: 'Chambres à louer et services du quotidien (ménage, blanchisserie, sécurité, accueil) à Dakar et dans d’autres villes, sur une seule plateforme.' },
  { id: 'pilote', name: 'PILOTE', host: 'auto-ecole.abmcy.com', url: 'https://auto-ecole.abmcy.com', cat: 'education', y2026: true, shot: 'pilote',
    kicker: 'Logiciel auto-école', desc: 'Toute l’auto-école dans un seul outil : inscriptions, code en ligne avec prédiction de réussite, planning de conduite, livret numérique et examens.' },
  { id: 'ensetp', name: 'Gala ENSETP 2026', host: 'ensetp.abmcy.com', url: 'https://ensetp.abmcy.com', cat: 'education', y2026: true, shot: 'ensetp',
    kicker: 'Événement', desc: 'Le dîner de gala de fin d’année de l’ENSETP : artistes en live, confirmation de présence, partenaires et espace d’administration.' },
  { id: 'ifl', name: 'IFL Bénin', host: 'ifl.abmcy.com', url: 'https://ifl.abmcy.com', cat: 'entreprises', y2026: true, shot: 'ifl',
    kicker: 'Fiche de renseignement', desc: 'La fiche de renseignement en ligne des membres de la Ligue Internationale de l’Amitié – Bénin : identité, photo, profession et localisation.' },
  { id: 'disi', name: 'DISI UCAD', host: 'ucad-dissi.abmcy.com', url: 'https://ucad-dissi.abmcy.com', cat: 'education', y2026: true, shot: 'disi',
    kicker: 'Gestion des risques', desc: 'Plateforme de gestion des risques de sécurité : registre des risques, plan de traitement, maturité CMMI et rapports EBIOS RM pour la direction.' },
  { id: 'edupilote', name: 'ABM EduPilote', host: 'abmedupilote.abmcy.com', url: 'https://abmedupilote.abmcy.com', cat: 'education', y2026: false, shot: 'edupilote',
    kicker: 'Gestion universitaire', desc: 'Administration, présences par QR code et communication pour les établissements d’enseignement en Afrique.' },
  { id: 'jsgk', name: 'Junior Senior Gaps Killer', host: 'jsgk.abmcy.com', url: 'https://jsgk.abmcy.com', cat: 'education', y2026: false, shot: 'jsgk',
    kicker: 'Formation en ligne', desc: 'L’accélérateur de compétences : des cours en ligne pour passer de junior à senior, avec méthode et formateurs.' },
  { id: 'cvpro', name: 'CV Pro+', host: 'cvproplus.abmcy.com', url: 'https://cvproplus.abmcy.com', cat: 'entreprises', y2026: false, shot: 'cvpro',
    kicker: 'Carrière', desc: 'Optimisation et rédaction de CV, analysés par IA et par des experts pour passer les filtres des recruteurs.' },
  { id: 'monvehicule', name: 'Mon Véhicule', host: 'monvehicule.abmcy.com', url: 'https://monvehicule.abmcy.com', cat: 'commerce', y2026: false, shot: 'monvehicule',
    kicker: 'Automobile', desc: 'Achat, location et services automobiles de luxe au Sénégal : marques disponibles, véhicules d’occasion et réservation.' },
  { id: 'managers', name: 'Africa Connecter', host: 'managers.abmcy.com', url: 'https://managers.abmcy.com', cat: 'entreprises', y2026: false, shot: 'managers',
    kicker: 'Réseau ABMCY', desc: 'L’inscription au réseau Africa Connecter : experts et talents de tout le continent, par domaine de compétence.' },
];

export const FEATURED = ['miad', 'abmcymarket', 'jeldem', 'diarra', 'yes'];
export const BENTO = ['mahucards', 'mahupc', 'mahuia', 'hanis', 'brvm', 'eed', 'core'];
export const byId = (id: string) => PROJECTS.find(p => p.id === id)!;
export const COUNT_2026 = PROJECTS.filter(p => p.y2026).length; // calculé : un projet ajouté = compteur à jour
export const USERS = 840;      // MIAD Market + DIARRA
