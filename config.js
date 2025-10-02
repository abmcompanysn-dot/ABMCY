const config = {
    /**
     * URL de votre script Google Apps Script pour la gestion des formulaires.
     * REMPLACEZ 'VOTRE_URL_APPS_SCRIPT_ICI' par votre véritable URL.
     */
    scriptUrl: 'VOTRE_URL_APPS_SCRIPT_ICI',

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
        'ecommerce': 'feuille-vierge.html',
        'valorisation-pro': 'feuille-vierge.html',
        'gestion': 'feuille-vierge.html',
        'evenementiel': 'feuille-vierge.html',
        'elearning': 'feuille-vierge.html'
    },

    /**
     * Liens EXTERNES pour les cartes de la section "Réalisations".
     * Le script donnera la priorité à ces liens. Par défaut, ils pointent tous vers la page "Bientôt Disponible".
     */
    externalProjectLinks: {
        'realisation_ecommerce': 'feuille-vierge.html',
        'realisation_cvpro': 'feuille-vierge.html',
        'realisation_edupilote': 'feuille-vierge.html',
        'realisation_vehicule': 'feuille-vierge.html',
        'realisation_abmedu': 'feuille-vierge.html',
        // 'realisation_reseau': 'feuille-vierge.html' // La page 'realisation-reseau.html' existe, donc on ne met pas de lien externe ici.
    }
};