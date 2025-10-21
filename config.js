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
    },

    /**
     * Liens EXTERNES pour les boutons "Visiter notre plateforme" sur les pages de détail.
     * Par défaut, ils pointent vers la page "Bientôt Disponible".
     */
    externalPlatformLinks: {
        'ecommerce': {
    label: 'Marketplace ABMCY',
    url: 'https://abmcymarket.abmcy.com',
    external: true
  },

        'valorisation-pro': 'feuille-vierge.html',
        'gestion': 'abmedupilote.abmcy.com',
        'evenementiel': 'feuille-vierge.html',
        'elearning': 'feuille-vierge.html'
    },

    /**
     * Liens EXTERNES pour les cartes de la section "Réalisations".
     * Le script donnera la priorité à ces liens. Par défaut, ils pointent tous vers la page "Bientôt Disponible".
     */
    externalProjectLinks: {
        'realisation_ecommerce': {
    label: 'Marketplace ABMCY',
    url: 'https://abmcymarket.abmcy.com',
    external: true
  },

        'realisation_cvpro': 'feuille-vierge.html',
        'realisation_edupilote': 'abmedupilote.abmcy.com',
        'realisation_vehicule': 'abmedupilote.abmcy.com',
        'realisation_abmedu': 'feuille-vierge.html',
        // 'realisation_reseau': 'feuille-vierge.html' // La page 'realisation-reseau.html' existe, donc on ne met pas de lien externe ici.
    }

};
