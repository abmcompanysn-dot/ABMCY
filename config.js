const config = {
    /**
     * URL de votre script Google Apps Script pour la gestion des formulaires.
     * REMPLACEZ 'VOTRE_URL_APPS_SCRIPT_ICI' par votre véritable URL.
     */
    scriptUrl: 'https://script.google.com/macros/s/AKfycby42lBIO9mBK19kxYEbVmf8Nu1un3cuasNrFE981d2fr3zENHme0Jed0HG3WUbZecAV0w/exec',

    /**
     * Liens vers les pages de détail INTERNES de vos réalisations.
     * Le script utilisera ces liens si aucun lien externe n'est défini ci-dessous.
     */
    pageLinks: {
        'realisation_ecommerce': 'realisation-ecommerce',
        'realisation_cvpro': 'realisation-cvpro',
        'realisation_edupilote': 'realisation-edupilote',
        'realisation_vehicule': 'realisation-vehicule',
        'realisation_abmedu': 'realisation-abmedu',
        'realisation_reseau': 'realisation-reseau'
    }
  }

   
/**
 * Liens EXTERNES pour les boutons "Visiter notre plateforme" sur les pages de détail.
 * Par défaut, ils pointent vers la page "Bientôt Disponible".
 */
export const externalPlatformLinks = {
  ecommerce: {
    url: 'https://abmcymarket.abmcy.com',
    label: 'Marketplace ABMCY',
    external: true
  },
  valorisationPro: {
    url: 'feuille-vierge.html',
    label: 'Valorisation Pro',
    external: false
  },
  gestion: {
    url: 'https://abmedupilote.abmcy.com',
    label: 'Gestion ABMedu',
    external: true
  },
  evenementiel: {
    url: 'feuille-vierge.html',
    label: 'Événementiel',
    external: false
  },
  elearning: {
    url: 'feuille-vierge.html',
    label: 'E-learning',
    external: false
  }
}

/**
 * Liens EXTERNES pour les cartes de la section "Réalisations".
 * Le script donnera la priorité à ces liens. Par défaut, ils pointent tous vers la page "Bientôt Disponible".
 */
export const externalProjectLinks = {
  realisation_ecommerce: {
    url: 'https://abmcymarket.abmcy.com',
    label: 'Projet E-commerce',
    external: true
  },
  realisation_cvpro: {
    url: 'feuille-vierge.html',
    label: 'CV Pro',
    external: false
  },
  realisation_edupilote: {
    url: 'https://abmedupilote.abmcy.com',
    label: 'Édu Pilote',
    external: true
  },
  realisation_vehicule: {
    url: 'https://abmedupilote.abmcy.com',
    label: 'Gestion Véhicule',
    external: true
  },
  realisation_abmedu: {
    url: 'feuille-vierge.html',
    label: 'Plateforme ABMedu',
    external: false
  }
  // Pas de lien externe pour 'realisation_reseau' car la page existe en interne
}