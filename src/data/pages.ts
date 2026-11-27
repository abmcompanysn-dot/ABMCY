// Contenu des pages « plateforme » et « réalisation » (repris de l'ancien site, réécrit plus court).

export interface InfoPage {
  kick: string; title: string; gold: string; lead: string; body: string[];
  visit?: { label: string; url: string };       // lien vers la plateforme en ligne
  shots?: string[];                             // captures (public/assets/projets) à montrer
  service: string;                              // valeur du formulaire de devis
  points?: string[];
}

export const INFO_PAGES: Record<string, InfoPage> = {
  '/plateforme-ecommerce': {
    kick: 'Plateforme · E-commerce', title: 'Des boutiques en ligne', gold: 'qui vendent.',
    lead: 'Des boutiques en ligne premium, pour tous les secteurs.',
    body: ["Notre plateforme e-commerce offre une expérience d'achat élégante et fluide : design sur mesure, catalogue complet et paiements sécurisés, y compris mobile money.",
      "Mode, électronique, alimentation ou services : la boutique s'adapte à votre activité pour transformer les visiteurs en clients fidèles."],
    points: ['Catalogue, stocks et commandes', 'Paiement Wave, Orange Money, carte', 'Votre adresse et votre marque', 'Tableau de bord sur téléphone'],
    visit: { label: 'Voir ABMCY Market', url: 'https://abmcymarket.abmcy.com' }, shots: ['abmcymarket', 'hanis', 'miad'], service: 'plateforme-ecommerce' },
  '/plateforme-valorisation-pro': {
    kick: 'Plateforme · Valorisation pro', title: 'Un CV qui', gold: 'ouvre les portes.',
    lead: 'Des CV intelligents et digitaux pour booster votre carrière.',
    body: ['Avec CV Pro+, créez un CV digital, optimisé pour les logiciels de tri des recruteurs (ATS) et pensé pour impressionner à la lecture.'],
    points: ['Optimisation par IA et par des experts', 'Rédaction sur mesure', 'Passe les filtres ATS', 'Version digitale à partager'],
    visit: { label: 'Voir CV Pro+', url: 'https://cvproplus.abmcy.com' }, shots: ['cvpro'], service: 'plateforme-valorisation-pro' },
  '/plateforme-gestion': {
    kick: 'Plateforme · Gestion', title: 'Vos opérations,', gold: 'enfin simples.',
    lead: 'Des systèmes de gestion sur mesure pour optimiser votre organisation.',
    body: ['Nos plateformes de gestion automatisent vos tâches administratives, suivent vos performances en temps réel grâce à des tableaux de bord et rendent toute l’organisation plus efficace.'],
    points: ['Processus automatisés', 'Tableaux de bord en temps réel', 'Accès par rôle pour chaque équipe', 'Rapports exportables'],
    shots: ['edupilote', 'pilote', 'disi'], service: 'plateforme-gestion' },
  '/plateforme-evenementiel': {
    kick: 'Plateforme · Événementiel', title: 'Des événements', gold: 'mémorables.',
    lead: "Des outils pour organiser vos événements, et la création artistique pour les sublimer.",
    body: ["De la billetterie en ligne à la gestion des invités, la plateforme couvre toute l'organisation d'un événement. Nos équipes de création et de décoration apportent la touche unique qui marque les esprits."],
    points: ['Inscriptions et confirmations de présence', 'Billetterie et liste des invités', 'Programme, artistes et partenaires', 'Décoration et création artistique'],
    visit: { label: 'Voir le Gala ENSETP 2026', url: 'https://ensetp.abmcy.com' }, shots: ['ensetp'], service: 'plateforme-evenementiel' },
  '/plateforme-elearning': {
    kick: 'Plateforme · E-learning', title: 'La formation', gold: 'en ligne.',
    lead: 'Des plateformes de formation pour partager le savoir.',
    body: ["Nos solutions e-learning permettent de créer et de gérer des cours en ligne, de suivre la progression des apprenants et de délivrer des certificats. L'outil idéal pour les entreprises, les écoles et les formateurs indépendants."],
    points: ['Cours, vidéos et quiz', 'Suivi de progression', 'Certificats', 'Paiement des formations'],
    visit: { label: 'Voir Junior Senior Gaps Killer', url: 'https://jsgk.abmcy.com' }, shots: ['jsgk', 'pilote'], service: 'plateforme-elearning' },
  '/realisation-edupilote': {
    kick: 'Réalisation · Éducation', title: 'ABM', gold: 'EduPilote.',
    lead: "La gestion universitaire simplifiée pour l'Afrique.",
    body: ["ABM EduPilote est une solution complète de gestion pour les établissements d'enseignement supérieur : administration simplifiée, meilleure communication entre étudiants et administration, suivi pédagogique moderne.",
      "Inscriptions, notes, bulletins et QR codes pour le contrôle d'accès et les présences : un outil puissant pour la transformation digitale de l'éducation en Afrique."],
    points: ['Inscriptions et dossiers', 'Notes et bulletins', 'Présences par QR code', 'Communication étudiants'],
    visit: { label: 'Visiter ABM EduPilote', url: 'https://abmedupilote.abmcy.com' }, shots: ['edupilote'], service: 'plateforme-gestion' },
  '/realisation-reseau': {
    kick: 'Réalisation · Partenariat', title: 'Le réseau', gold: 'ABMCY.',
    lead: "Un écosystème d'experts pour des solutions complètes.",
    body: ["Le réseau ABMCY réunit des partenaires, des experts et des freelances choisis avec soin. Il nous permet de mobiliser les meilleures compétences pour chaque projet, au-delà de nos services principaux.",
      "Nos clients gardent un seul interlocuteur, même pour des projets complexes. Nos partenaires, eux, accèdent à des projets qualifiés et participent à la transformation digitale du continent."],
    points: ['Experts triés sur le volet', 'Un seul interlocuteur', 'Projets dans toute l’Afrique', 'Rémunération à chaque mission'],
    visit: { label: 'Voir Africa Connecter', url: 'https://managers.abmcy.com' }, shots: ['managers'], service: 'autre' },
};
