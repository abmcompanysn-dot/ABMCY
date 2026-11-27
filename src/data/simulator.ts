// Repris tel quel de l'ancienne page solution-recommandee.html (solutions et questions par secteur).
export interface Question { name: string; text: string; type: 'radio' | 'checkbox' | 'text'; options?: string[]; placeholder?: string }
export interface Secteur { titre: string; solutions: { titre: string; desc: string }[]; questions: Question[] }
export const SIMULATOR: Record<string, Secteur> = {
 "communication-digitale": {
  "titre": "Communication Digitale",
  "solutions": [
   {
    "titre": "Stratégie Digitale",
    "desc": "Définir une feuille de route claire pour votre présence en ligne."
   },
   {
    "titre": "Branding Premium",
    "desc": "Créer une identité de marque forte et mémorable."
   },
   {
    "titre": "Communication & Audiovisuel",
    "desc": "Produire des contenus percutants pour engager votre audience."
   }
  ],
  "questions": [
   {
    "name": "goal",
    "text": "Quel est votre principal objectif de communication ?",
    "type": "radio",
    "options": [
     "Augmenter ma notoriété",
     "Générer des ventes",
     "Engager ma communauté"
    ]
   },
   {
    "name": "has_charte",
    "text": "Avez-vous déjà une charte graphique ?",
    "type": "radio",
    "options": [
     "Oui",
     "Non",
     "En cours de création"
    ]
   },
   {
    "name": "content_types",
    "text": "Quels types de contenus souhaitez-vous produire ? (Plusieurs choix possibles)",
    "type": "checkbox",
    "options": [
     "Vidéos",
     "Articles de blog",
     "Podcasts",
     "Publications sur les réseaux sociaux"
    ]
   }
  ]
 },
 "ecommerce-moderne": {
  "titre": "E-commerce Moderne",
  "solutions": [
   {
    "titre": "E-commerce & Ventes en ligne",
    "desc": "Lancer une boutique en ligne performante et optimisée."
   },
   {
    "titre": "Paiement Connecté (QR/NFC)",
    "desc": "Intégrer des solutions de paiement modernes et rapides."
   },
   {
    "titre": "Automatisation Workflow",
    "desc": "Automatiser la gestion des commandes et la relation client."
   }
  ],
  "questions": [
   {
    "name": "interest_type",
    "text": "Vous souhaitez une solution clé en main ou un service sur mesure ?",
    "type": "radio",
    "options": [
     "Solution clé en main (Plateforme)",
     "Service sur mesure"
    ]
   },
   {
    "name": "product_count",
    "text": "Combien de produits souhaitez-vous vendre environ ?",
    "type": "text",
    "placeholder": "Ex: 10-50 produits"
   },
   {
    "name": "features",
    "text": "Quelles fonctionnalités sont importantes pour vous ?",
    "type": "checkbox",
    "options": [
     "Gestion des stocks",
     "Facturation automatique",
     "Suivi des livraisons",
     "Programme de fidélité"
    ]
   }
  ]
 },
 "marketing-strategique": {
  "titre": "Marketing Stratégique",
  "solutions": [
   {
    "titre": "Stratégie Digitale",
    "desc": "Analyse de marché et définition de votre plan d'action marketing."
   },
   {
    "titre": "Branding Premium",
    "desc": "Positionner votre marque pour attirer et fidéliser votre clientèle cible."
   },
   {
    "titre": "Communication & Audiovisuel",
    "desc": "Créer des campagnes percutantes sur les bons canaux."
   }
  ],
  "questions": [
   {
    "name": "target_audience",
    "text": "Quelle est votre audience cible principale ?",
    "type": "text",
    "placeholder": "Ex: Jeunes adultes, professionnels B2B..."
   },
   {
    "name": "competitors",
    "text": "Quels sont vos concurrents directs et indirects ?",
    "type": "text",
    "placeholder": "Listez 2 ou 3 concurrents"
   },
   {
    "name": "budget",
    "text": "Quel est votre budget marketing mensuel approximatif ?",
    "type": "radio",
    "options": [
     "Moins de 50 000 FCFA",
     "50 000 - 200 000 FCFA",
     "Plus de 200 000 FCFA"
    ]
   }
  ]
 },
 "branding-premium": {
  "titre": "Branding & Identité Visuelle",
  "solutions": [
   {
    "titre": "Branding Premium",
    "desc": "Création de votre logo, charte graphique et univers de marque."
   },
   {
    "titre": "Stratégie de Marque",
    "desc": "Définir votre positionnement, vos valeurs et votre message."
   },
   {
    "titre": "Supports de Communication",
    "desc": "Conception de tous vos supports (cartes de visite, flyers, etc.)."
   }
  ],
  "questions": [
   {
    "name": "has_brand",
    "text": "Avez-vous déjà une identité de marque (logo, couleurs) ?",
    "type": "radio",
    "options": [
     "Non, je pars de zéro",
     "Oui, mais je veux la moderniser",
     "Oui, et elle me convient"
    ]
   },
   {
    "name": "target_feeling",
    "text": "Quelle émotion principale votre marque doit-elle évoquer ?",
    "type": "text",
    "placeholder": "Ex: Luxe, confiance, innovation, accessibilité..."
   },
   {
    "name": "supports_needed",
    "text": "De quels supports avez-vous besoin en priorité ?",
    "type": "checkbox",
    "options": [
     "Logo",
     "Cartes de visite",
     "Signature email",
     "Modèles pour réseaux sociaux"
    ]
   }
  ]
 },
 "developpement-mobile": {
  "titre": "Développement Mobile",
  "solutions": [
   {
    "titre": "Développement Mobile",
    "desc": "Création d'applications natives ou hybrides pour Android et iOS."
   },
   {
    "titre": "Stratégie Digitale",
    "desc": "Définir la stratégie de lancement et de monétisation de votre application."
   },
   {
    "titre": "Branding Premium",
    "desc": "Créer une identité visuelle forte pour votre application."
   }
  ],
  "questions": [
   {
    "name": "main_function",
    "text": "Quelle est la fonction principale de votre future application ?",
    "type": "text",
    "placeholder": "Ex: Réservation, information, jeu..."
   },
   {
    "name": "platforms",
    "text": "Sur quelles plateformes souhaitez-vous la déployer ?",
    "type": "checkbox",
    "options": [
     "iOS (iPhone)",
     "Android",
     "Les deux"
    ]
   },
   {
    "name": "features",
    "text": "Avez-vous besoin de fonctionnalités spécifiques ?",
    "type": "checkbox",
    "options": [
     "Connexion utilisateur",
     "Paiement intégré",
     "Notifications push",
     "Géolocalisation"
    ]
   }
  ]
 },
 "automatisation-intelligente": {
  "titre": "Automatisation Intelligente",
  "solutions": [
   {
    "titre": "Automatisation Workflow",
    "desc": "Optimiser vos processus répétitifs avec des outils comme n8n."
   },
   {
    "titre": "Dashboards Intelligents",
    "desc": "Suivre la performance de vos automatisations en temps réel."
   },
   {
    "titre": "Formation & Coaching",
    "desc": "Former vos équipes à l'utilisation des nouveaux outils automatisés."
   }
  ],
  "questions": [
   {
    "name": "task_to_automate",
    "text": "Quelle est la tâche la plus répétitive et chronophage dans votre entreprise ?",
    "type": "text",
    "placeholder": "Ex: Envoyer des emails de suivi"
   },
   {
    "name": "current_tools",
    "text": "Quels logiciels utilisez-vous actuellement (CRM, messagerie, etc.) ?",
    "type": "text",
    "placeholder": "Ex: Gmail, Excel, WhatsApp"
   },
   {
    "name": "expected_result",
    "text": "Quel est le résultat attendu de cette automatisation ?",
    "type": "radio",
    "options": [
     "Gain de temps",
     "Réduction des erreurs",
     "Meilleur suivi client"
    ]
   }
  ]
 },
 "design-graphique": {
  "titre": "Design Graphique",
  "solutions": [
   {
    "titre": "Branding Premium",
    "desc": "Création de votre logo et de votre charte graphique complète."
   },
   {
    "titre": "Communication & Audiovisuel",
    "desc": "Conception de tous vos supports de communication (flyers, bannières, etc.)."
   },
   {
    "titre": "Stratégie Digitale",
    "desc": "Création de visuels percutants pour vos campagnes publicitaires."
   }
  ],
  "questions": [
   {
    "name": "has_logo",
    "text": "Avez-vous déjà un logo ou une identité visuelle ?",
    "type": "radio",
    "options": [
     "Oui",
     "Non"
    ]
   },
   {
    "name": "supports",
    "text": "Quels sont les supports dont vous avez besoin ?",
    "type": "checkbox",
    "options": [
     "Logo",
     "Carte de visite",
     "Bannière web",
     "Flyer"
    ]
   },
   {
    "name": "message",
    "text": "Quel est le message ou l'émotion que votre design doit transmettre ?",
    "type": "text",
    "placeholder": "Ex: Professionnel, jeune, luxueux..."
   }
  ]
 },
 "decoration-artistique": {
  "titre": "Décoration Artistique",
  "solutions": [
   {
    "titre": "Décoration Artistique",
    "desc": "Conception et réalisation d'ambiances uniques pour vos espaces."
   },
   {
    "titre": "Événementiel",
    "desc": "Création de décors thématiques pour vos événements."
   }
  ],
  "questions": [
   {
    "name": "space_type",
    "text": "Quel type d'espace souhaitez-vous décorer ?",
    "type": "radio",
    "options": [
     "Bureau",
     "Chambre",
     "Salle d'événement",
     "Autre"
    ]
   },
   {
    "name": "theme",
    "text": "Avez-vous un thème ou un style en tête ?",
    "type": "text",
    "placeholder": "Ex: Moderne, traditionnel, coloré..."
   },
   {
    "name": "area",
    "text": "Quelle est la superficie approximative de l'espace (en m²) ?",
    "type": "text",
    "placeholder": "Ex: 20m²"
   }
  ]
 },
 "evenementiel-professionnel": {
  "titre": "Événementiel Professionnel",
  "solutions": [
   {
    "titre": "Événementiel",
    "desc": "Organisation de A à Z de vos conférences, séminaires, et lancements."
   },
   {
    "titre": "Communication & Audiovisuel",
    "desc": "Couverture photo et vidéo professionnelle de votre événement."
   },
   {
    "titre": "Décoration Artistique",
    "desc": "Création d'un décor mémorable pour marquer les esprits."
   }
  ],
  "questions": [
   {
    "name": "event_type",
    "text": "Quel type d'événement organisez-vous ?",
    "type": "radio",
    "options": [
     "Conférence",
     "Mariage",
     "Anniversaire",
     "Lancement de produit"
    ]
   },
   {
    "name": "guest_count",
    "text": "Quel est le nombre d'invités attendus ?",
    "type": "text",
    "placeholder": "Ex: 50-100 personnes"
   },
   {
    "name": "date_location",
    "text": "Avez-vous déjà une date et un lieu ?",
    "type": "radio",
    "options": [
     "Oui",
     "Non, j'ai besoin d'aide"
    ]
   }
  ]
 },
 "audiovisuel-creatif": {
  "titre": "Audiovisuel Créatif",
  "solutions": [
   {
    "titre": "Communication & Audiovisuel",
    "desc": "Production de spots publicitaires, reportages, interviews, podcasts..."
   },
   {
    "titre": "Stratégie Digitale",
    "desc": "Diffusion stratégique de vos contenus sur les plateformes adaptées."
   }
  ],
  "questions": [
   {
    "name": "content_type",
    "text": "Quel type de contenu audiovisuel souhaitez-vous créer ?",
    "type": "radio",
    "options": [
     "Vidéo publicitaire",
     "Podcast",
     "Reportage",
     "Voix-off"
    ]
   },
   {
    "name": "objective",
    "text": "Quel est l'objectif de ce contenu ?",
    "type": "text",
    "placeholder": "Ex: Promouvoir un produit, informer..."
   },
   {
    "name": "script",
    "text": "Avez-vous un script ou une idée de scénario ?",
    "type": "radio",
    "options": [
     "Oui",
     "Non"
    ]
   }
  ]
 },
 "formation-digitale": {
  "titre": "Formation Digitale",
  "solutions": [
   {
    "titre": "Formation & Coaching",
    "desc": "Ateliers sur mesure pour monter en compétence sur les outils digitaux."
   },
   {
    "titre": "E-commerce & Ventes en ligne",
    "desc": "Création de votre propre plateforme de formation en ligne (e-learning)."
   }
  ],
  "questions": [
   {
    "name": "topics",
    "text": "Sur quels sujets souhaitez-vous former vos équipes ?",
    "type": "text",
    "placeholder": "Ex: Marketing digital, automatisation..."
   },
   {
    "name": "people_count",
    "text": "Combien de personnes sont à former ?",
    "type": "text",
    "placeholder": "Ex: 1-5 personnes"
   },
   {
    "name": "format",
    "text": "Préférez-vous une formation en présentiel ou en ligne ?",
    "type": "radio",
    "options": [
     "Présentiel",
     "En ligne",
     "Hybride"
    ]
   }
  ]
 },
 "cybersecurite-numerique": {
  "titre": "Cybersécurité Numérique",
  "solutions": [
   {
    "titre": "Cybersécurité & Protection",
    "desc": "Audit de sécurité, protection contre les intrusions et sauvegarde de données."
   },
   {
    "titre": "Formation & Coaching",
    "desc": "Sensibilisation de vos équipes aux bonnes pratiques de cybersécurité."
   }
  ],
  "questions": [
   {
    "name": "had_attack",
    "text": "Avez-vous déjà subi une cyberattaque ou une perte de données ?",
    "type": "radio",
    "options": [
     "Oui",
     "Non",
     "Je ne sais pas"
    ]
   },
   {
    "name": "sensitive_data",
    "text": "Quels sont les types de données les plus sensibles que vous manipulez ?",
    "type": "text",
    "placeholder": "Ex: Données clients, financières..."
   },
   {
    "name": "need_audit",
    "text": "Souhaitez-vous un audit complet de votre infrastructure ?",
    "type": "radio",
    "options": [
     "Oui",
     "Non"
    ]
   }
  ]
 },
 "traduction-multilingue": {
  "titre": "Traduction Multilingue",
  "solutions": [
   {
    "titre": "Traduction & Localisation",
    "desc": "Adaptation de vos contenus (site web, documents, vidéos) pour un public international."
   }
  ],
  "questions": [
   {
    "name": "languages",
    "text": "Dans quelles langues souhaitez-vous traduire vos contenus ?",
    "type": "text",
    "placeholder": "Ex: Anglais, Chinois, Arabe..."
   },
   {
    "name": "content_type",
    "text": "Quel type de contenu est-ce ?",
    "type": "radio",
    "options": [
     "Technique",
     "Marketing",
     "Juridique",
     "Général"
    ]
   },
   {
    "name": "volume",
    "text": "Quel est le volume approximatif à traduire ?",
    "type": "text",
    "placeholder": "Ex: 5 pages, 2000 mots..."
   }
  ]
 },
 "tableaux-dynamiques": {
  "titre": "Tableaux Dynamiques",
  "solutions": [
   {
    "titre": "Dashboards Intelligents",
    "desc": "Création de tableaux de bord sur mesure pour suivre vos performances."
   }
  ],
  "questions": [
   {
    "name": "kpis",
    "text": "Quels sont les 3 indicateurs les plus importants pour votre activité ?",
    "type": "text",
    "placeholder": "Ex: Chiffre d'affaires, nouveaux clients..."
   },
   {
    "name": "data_source",
    "text": "D'où proviennent les données à afficher ?",
    "type": "checkbox",
    "options": [
     "Fichier Excel/CSV",
     "Base de données",
     "API externe",
     "Google Analytics"
    ]
   },
   {
    "name": "update_frequency",
    "text": "À quelle fréquence avez-vous besoin de mettre à jour ces rapports ?",
    "type": "radio",
    "options": [
     "En temps réel",
     "Quotidiennement",
     "Hebdomadairement"
    ]
   }
  ]
 },
 "paiement-connecte": {
  "titre": "Paiement Connecté",
  "solutions": [
   {
    "titre": "Intégration QR/NFC",
    "desc": "Mise en place de solutions de paiement sans contact modernes."
   },
   {
    "titre": "E-commerce & Ventes en ligne",
    "desc": "Intégration de passerelles de paiement en ligne sur votre site."
   }
  ],
  "questions": [
   {
    "name": "payment_location",
    "text": "Où souhaitez-vous accepter les paiements ?",
    "type": "checkbox",
    "options": [
     "En ligne (site web)",
     "En magasin (TPE)",
     "Sur mobile (QR Code)"
    ]
   },
   {
    "name": "payment_methods",
    "text": "Quels moyens de paiement sont les plus populaires auprès de vos clients ?",
    "type": "text",
    "placeholder": "Ex: Orange Money, Wave, Carte bancaire..."
   },
   {
    "name": "need_invoicing",
    "text": "Avez-vous besoin d'un système de facturation automatique ?",
    "type": "radio",
    "options": [
     "Oui",
     "Non"
    ]
   }
  ]
 },
 "agriculture-intelligente": {
  "titre": "Agriculture Intelligente",
  "solutions": [
   {
    "titre": "Automatisation Workflow",
    "desc": "Automatisation de l'irrigation ou du suivi des cultures."
   },
   {
    "titre": "Dashboards Intelligents",
    "desc": "Tableaux de bord pour suivre la météo, l'humidité des sols et le rendement."
   },
   {
    "titre": "E-commerce & Ventes en ligne",
    "desc": "Création d'une plateforme pour vendre votre production en direct."
   }
  ],
  "questions": [
   {
    "name": "farming_type",
    "text": "Quel type de culture ou d'élevage pratiquez-vous ?",
    "type": "text",
    "placeholder": "Ex: Maraîchage, élevage de volailles..."
   },
   {
    "name": "main_challenge",
    "text": "Quelle est la plus grande difficulté que vous rencontrez actuellement ?",
    "type": "text",
    "placeholder": "Ex: Irrigation, gestion des stocks..."
   },
   {
    "name": "real_time_tracking",
    "text": "Souhaitez-vous suivre vos données de production en temps réel ?",
    "type": "radio",
    "options": [
     "Oui",
     "Non"
    ]
   }
  ]
 },
 "voyage-transport-hebergement": {
  "titre": "Voyage, Transport & Hébergement",
  "solutions": [
   {
    "titre": "Recherche & Réservation Personnalisée",
    "desc": "Nous trouvons pour vous les meilleures offres (hôtels, vols, etc.) grâce à notre réseau de partenaires."
   },
   {
    "titre": "Développement Mobile",
    "desc": "Application de réservation de billets et d'hôtels pour une expérience utilisateur optimale."
   },
   {
    "titre": "E-commerce & Ventes en ligne",
    "desc": "Plateforme de réservation en ligne avec paiement sécurisé intégré."
   }
  ],
  "questions": [
   {
    "name": "user_type",
    "text": "Vous êtes :",
    "type": "radio",
    "options": [
     "Un Particulier (je cherche un service)",
     "Une Entreprise (je veux une solution)"
    ]
   },
   {
    "name": "service_needed",
    "text": "Quel service recherchez-vous ?",
    "type": "text",
    "placeholder": "Ex: Chambre à louer à Dakar, billet d'avion..."
   },
   {
    "name": "details",
    "text": "Précisez vos dates, votre budget ou d'autres détails importants.",
    "type": "text",
    "placeholder": "Ex: Du 10 au 20 décembre, budget max 30 000 FCFA/nuit..."
   }
  ]
 },
 "immobilier-construction": {
  "titre": "Immobilier & Construction",
  "solutions": [
   {
    "titre": "Stratégie Digitale",
    "desc": "Création de campagnes publicitaires ciblées pour la vente ou la location."
   },
   {
    "titre": "Communication & Audiovisuel",
    "desc": "Visites virtuelles, photos et vidéos professionnelles de vos biens."
   },
   {
    "titre": "Développement Web",
    "desc": "Création d'un site web ou d'une plateforme pour présenter vos projets immobiliers."
   }
  ],
  "questions": [
   {
    "name": "activity_type",
    "text": "Quelle est votre activité principale ?",
    "type": "radio",
    "options": [
     "Agence immobilière",
     "Promoteur",
     "Architecte",
     "Artisan"
    ]
   },
   {
    "name": "property_types",
    "text": "Quel type de biens proposez-vous ?",
    "type": "checkbox",
    "options": [
     "Appartements",
     "Villas",
     "Terrains",
     "Bureaux"
    ]
   },
   {
    "name": "main_goal",
    "text": "Quel est votre objectif principal ?",
    "type": "text",
    "placeholder": "Ex: Vendre plus vite, trouver des locataires, gagner en notoriété..."
   }
  ]
 },
 "sante-bien-etre": {
  "titre": "Santé & Bien-être",
  "solutions": [
   {
    "titre": "Développement Mobile",
    "desc": "Application de prise de rendez-vous et de suivi pour vos patients."
   },
   {
    "titre": "Stratégie Digitale",
    "desc": "Améliorer votre visibilité en ligne pour attirer de nouveaux patients."
   },
   {
    "titre": "Formation & E-learning",
    "desc": "Créer des contenus informatifs ou des formations pour vos patients."
   }
  ],
  "questions": [
   {
    "name": "profession",
    "text": "Quelle est votre profession ?",
    "type": "text",
    "placeholder": "Ex: Médecin, coach sportif, nutritionniste..."
   },
   {
    "name": "need_booking",
    "text": "Avez-vous besoin d'un système de prise de rendez-vous en ligne ?",
    "type": "radio",
    "options": [
     "Oui, absolument",
     "Ce serait un plus",
     "Non, pas pour l'instant"
    ]
   },
   {
    "name": "communication_goal",
    "text": "Quel est votre objectif de communication ?",
    "type": "radio",
    "options": [
     "Éduquer le public",
     "Trouver de nouveaux patients",
     "Fidéliser ma patientèle"
    ]
   }
  ]
 },
 "default": {
  "titre": "Général",
  "solutions": [
   {
    "titre": "Stratégie Digitale",
    "desc": "Définir une feuille de route claire pour votre présence en ligne."
   },
   {
    "titre": "Développement Mobile",
    "desc": "Créer une application pour engager vos utilisateurs."
   },
   {
    "titre": "Automatisation Workflow",
    "desc": "Optimiser vos processus internes pour gagner en efficacité."
   }
  ],
  "questions": [
   {
    "name": "main_challenge",
    "text": "Quel est le principal défi que vous souhaitez résoudre ?",
    "type": "text",
    "placeholder": "Décrivez votre problème"
   },
   {
    "name": "target_audience",
    "text": "Quelle est votre cible principale ?",
    "type": "text",
    "placeholder": "Ex: Entreprises, grand public..."
   },
   {
    "name": "specific_project",
    "text": "Avez-vous un projet spécifique en tête ?",
    "type": "text",
    "placeholder": "Décrivez votre idée"
   }
  ]
 }
};
