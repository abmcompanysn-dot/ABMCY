    // --- CONFIGURATION ---
const DEVIS_SHEET_NAME = 'Demandes de Devis';
const TESTIMONIALS_SHEET_NAME = 'Témoignages';
const PROJECTS_SHEET_NAME = 'Projets';
const PARTNERSHIP_REQUESTS_SHEET_NAME = 'Demandes de Partenariat';
const SECTORS_SHEET_NAME = 'Secteurs';
const PARTNERS_SHEET_NAME = 'Partenaires';
const CONFIG_SHEET_NAME = 'Configuration';
const VISION_SHEET_NAME = 'Candidatures Vision 2026';
const LOGS_SHEET_NAME = 'Logs du Projet';

// Variables globales pour la mise en cache de la configuration pendant une exécution
let scriptConfig = null;
// ---------------------------------------

/**
 * Crée un menu personnalisé dans la feuille de calcul à l'ouverture.
 */
function onOpen() {
    SpreadsheetApp.getUi()
        .createMenu('ABMCY Outils')
        .addItem('Initialiser les feuilles (Reset)', 'setup')
        .addItem('Mettre à jour la structure', 'updateSchema')
        .addSeparator()
        .addItem('Ouvrir le Panneau de Configuration', 'showConfigDialog')
        .addSeparator()
        .addItem('Approuver le Partenaire', 'approvePartner')
        .addSeparator()
        .addItem('Envoyer au Partenaire', 'sendToPartner')
        .addSeparator()
        .addItem('Tester Alerte WhatsApp', 'testCallMeBotError')
        .addToUi();
}

/**
 * Fonction à exécuter manuellement une seule fois pour créer et formater les feuilles.
 */
function setup() {
    const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    
    // Formatage de la feuille des Devis
    const devisHeaders = ['Timestamp', 'Nom', 'Type Client', 'Entreprise', 'Email', 'Téléphone', 'Service', 'Budget', 'Délai', 'Description', 'Newsletter', 'Statut'];
    formatSheet(spreadsheet, DEVIS_SHEET_NAME, devisHeaders);

    // Formatage de la feuille des Témoignages
    const testimonialsHeaders = ['ID', 'Auteur', 'Poste', 'Texte', 'Note (1-5)', 'ImageURL', 'Actif (Oui)'];
    formatSheet(spreadsheet, TESTIMONIALS_SHEET_NAME, testimonialsHeaders);

    // Formatage de la feuille des Projets
    const projectsHeaders = ['ID', 'Nom', 'Description', 'Secteur', 'ImageURL', 'LienPageProjet', 'LienVisite', 'Actif (Oui)'];
    formatSheet(spreadsheet, PROJECTS_SHEET_NAME, projectsHeaders);

    // NOUVEAU: Formatage de la feuille des Demandes de Partenariat
    const partnershipHeaders = ['Timestamp', 'ID Demande', 'Type', 'Nom Contact', 'Nom Entreprise', 'Email', 'Téléphone', 'Secteur', 'Message', 'Exemple 1', 'Exemple 2', 'Exemple 3', 'Statut'];
    formatSheet(spreadsheet, PARTNERSHIP_REQUESTS_SHEET_NAME, partnershipHeaders);

    // Formatage de la feuille Vision 2026
    const visionHeaders = ['Timestamp', 'Nom', 'Entreprise', 'Email', 'Téléphone', 'Secteur', 'Niveau', 'Description', 'Statut'];
    formatSheet(spreadsheet, VISION_SHEET_NAME, visionHeaders);

    // Formatage de la feuille des Logs
    const logsHeaders = ['Timestamp', 'Type', 'Message', 'Détails'];
    formatSheet(spreadsheet, LOGS_SHEET_NAME, logsHeaders);

    // Formatage de la feuille des Secteurs avec administrateurs
    const sectorsHeaders = ['ID', 'Nom du Secteur', 'Admin Email', 'Admin WhatsApp', 'Admin Webhook URL'];
    const sectorsSheet = formatSheet(spreadsheet, SECTORS_SHEET_NAME, sectorsHeaders);
    if (sectorsSheet.getLastRow() === 1) {
        sectorsSheet.appendRow(['communication-digitale', 'Communication Digitale', 'admin.com@example.com', '+22100000000']);
        sectorsSheet.appendRow(['marketing-strategique', 'Marketing Stratégique', 'admin.marketing@example.com', '+22100000001']);
        sectorsSheet.appendRow(['developpement-mobile', 'Développement Mobile', 'admin.dev@example.com', '+22100000002']);
        sectorsSheet.appendRow(['automatisation-intelligente', 'Automatisation Intelligente', '', '']);
        sectorsSheet.appendRow(['design-graphique', 'Design Graphique', '', '']);
        sectorsSheet.appendRow(['decoration-artistique', 'Décoration Artistique', '', '']);
        sectorsSheet.appendRow(['evenementiel-professionnel', 'Événementiel Professionnel', '', '']);
        sectorsSheet.appendRow(['audiovisuel-creatif', 'Audiovisuel Créatif', '', '']);
        sectorsSheet.appendRow(['ecommerce-moderne', 'E-commerce Moderne', '', '']);
        sectorsSheet.appendRow(['formation-digitale', 'Formation Digitale', '', '']);
        sectorsSheet.appendRow(['cybersecurite-numerique', 'Cybersécurité Numérique', '', '']);
        sectorsSheet.appendRow(['traduction-multilingue', 'Traduction Multilingue', '', '']);
        sectorsSheet.appendRow(['branding-premium', 'Branding Premium', '', '']);
        sectorsSheet.appendRow(['tableaux-dynamiques', 'Tableaux Dynamiques', '', '']);
        sectorsSheet.appendRow(['paiement-connecte', 'Paiement Connecté', '', '']);
        sectorsSheet.appendRow(['agriculture-intelligente', 'Agriculture Intelligente', '', '']);
        sectorsSheet.appendRow(['voyage-transport-hebergement', 'Voyage, Transport & Hébergement', 'admin.voyage@example.com', '+22100000003']);
    }

    // Formatage de la feuille des Partenaires
    const partnersHeaders = ['Nom du Partenaire', 'Email', 'Téléphone', 'WhatsApp (Optionnel)', 'SecteurID', 'Actif (Oui)'];
    const partnersSheet = formatSheet(spreadsheet, PARTNERS_SHEET_NAME, partnersHeaders);
    if (partnersSheet.getLastRow() === 1) {
        partnersSheet.appendRow(['Partenaire Voyage ABC', 'contact@partenaire-voyage.com', '+22111111111', 'voyage-transport-hebergement', 'Oui']);
        partnersSheet.appendRow(['Partenaire Marketing XYZ', 'contact@partenaire-marketing.com', '+22122222222', 'marketing-strategique', 'Oui']);
    }

    // Formatage de la feuille de Configuration
    const configHeaders = ['Key', 'Value', 'Description'];
    const configSheet = formatSheet(spreadsheet, CONFIG_SHEET_NAME, configHeaders);
    // Ajouter les valeurs par défaut si la feuille est vide
    if (configSheet.getLastRow() === 1) { // Si seulement les en-têtes sont présents
        configSheet.appendRow(['NOTIFICATION_EMAIL', 'votre_email@example.com', 'Adresse e-mail pour recevoir les notifications de devis.']);
        configSheet.appendRow(['WHATSAPP_WEBHOOK_URL', 'URL_WEBHOOK_WHATSAPP_A_REMPLACER', 'URL du service de webhook WhatsApp (ex: CallMeBot). Laissez vide pour désactiver.']);
        configSheet.appendRow(['WHATSAPP_ADMIN_NUMBERS', 'VOTRE_NUMERO_ICI', 'Numéros des admins principaux (séparés par une virgule).']);
        configSheet.appendRow(['DEFAULT_REDIRECT_URL', 'https://abmcy.vercel.app/', 'URL par défaut si une plateforme n\'est pas trouvée.']);
        configSheet.appendRow(['CALLMEBOT_PHONE', '', 'Numéro WhatsApp pour CallMeBot (avec indicatif, ex: +221...).']);
        configSheet.appendRow(['CALLMEBOT_API_KEY', '', 'Clé API CallMeBot.']);
        configSheet.appendRow(['ADMIN_ACCESS_CODE', '1234', 'Code pour accéder à la page de configuration.']);
    }

    SpreadsheetApp.flush();
    SpreadsheetApp.getUi().alert('Configuration des feuilles terminée !');
}

/**
 * Met à jour la structure des feuilles sans effacer les données existantes.
 */
function updateSchema() {
    const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    
    // S'assurer que la feuille Vision 2026 existe
    const visionHeaders = ['Timestamp', 'Nom', 'Entreprise', 'Email', 'Téléphone', 'Secteur', 'Niveau', 'Description', 'Statut'];
    ensureSheetExists(spreadsheet, VISION_SHEET_NAME, visionHeaders);

    // S'assurer que la feuille Logs existe
    const logsHeaders = ['Timestamp', 'Type', 'Message', 'Détails'];
    ensureSheetExists(spreadsheet, LOGS_SHEET_NAME, logsHeaders);

    // Vérification et ajout des clés de configuration manquantes dans la feuille Configuration
    const configSheet = getSheet(CONFIG_SHEET_NAME);
    const data = configSheet.getDataRange().getValues();
    // On suppose que la colonne A (index 0) contient les clés 'Key'
    const existingKeys = data.map(row => row[0]);

    const requiredConfigs = [
        ['ADMIN_ACCESS_CODE', '1234', 'Code pour accéder à la page de configuration.'],
        ['CALLMEBOT_PHONE', '', 'Numéro WhatsApp pour CallMeBot (avec indicatif).'],
        ['CALLMEBOT_API_KEY', '', 'Clé API CallMeBot.']
    ];

    requiredConfigs.forEach(config => {
        if (!existingKeys.includes(config[0])) {
            configSheet.appendRow(config);
        }
    });
    
    SpreadsheetApp.getUi().alert('Structure mise à jour avec succès !');
}

function ensureSheetExists(spreadsheet, sheetName, headers) {
    let sheet = spreadsheet.getSheetByName(sheetName);
    if (!sheet) {
        formatSheet(spreadsheet, sheetName, headers); // Utilise formatSheet pour créer si n'existe pas
    }
}

/**
 * Gère les requêtes GET (pour les redirections de liens).
 */
function doGet(e) {
    const params = e.parameter;
    const action = params.action;
    const config = getScriptConfig();

    // Accès au panneau d'administration (nécessite ?action=admin)
    if (action === 'admin') {
        const correctCode = config.ADMIN_ACCESS_CODE || '1234';
        // Vérification du code d'accès
        if (params.code === correctCode) {
            return HtmlService.createHtmlOutputFromFile('configuration.html')
                .setTitle('Panneau de Configuration ABMCY')
                .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.DEFAULT);
        } else {
            return createLoginPage();
        }
    }

    // Action pour récupérer des données (ex: témoignages, projets)
    if (action === 'getData' && params.sheet) {
        return ContentService.createTextOutput(JSON.stringify(getDataFromSheet(params.sheet))).setMimeType(ContentService.MimeType.JSON);
    }

    // Par défaut : Message de succès pour confirmer que l'API est en ligne
    return ContentService.createTextOutput("ABMCY API Active Success");
}

/**
 * Crée la page de connexion pour l'accès admin.
 */
function createLoginPage() {
    const html = `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Connexion Admin ABMCY</title>
        <style>
            body { font-family: sans-serif; display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0; background: #1a1a1a; color: #fff; }
            .card { background: #2d2d2d; padding: 2rem; border-radius: 12px; box-shadow: 0 10px 25px rgba(0,0,0,0.5); text-align: center; width: 100%; max-width: 400px; border: 1px solid #444; }
            h2 { color: #FFD700; margin-bottom: 1.5rem; }
            input { padding: 12px; border: 1px solid #555; background: #333; color: white; border-radius: 6px; margin-bottom: 1.5rem; width: 100%; box-sizing: border-box; font-size: 16px; outline: none; }
            button { background: linear-gradient(135deg, #FFD700, #FFA500); border: none; padding: 12px; border-radius: 6px; cursor: pointer; font-weight: bold; width: 100%; color: #000; font-size: 16px; }
        </style>
    </head>
    <body>
        <div class="card">
            <h2>🔒 Accès Sécurisé</h2>
            <form method="GET">
                <input type="hidden" name="action" value="admin">
                <input type="password" name="code" placeholder="Code d'accès Admin" required autofocus>
                <button type="submit">Accéder</button>
            </form>
        </div>
    </body>
    </html>
    `;
    return HtmlService.createHtmlOutput(html)
        .setTitle('Connexion Admin ABMCY')
        .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.DEFAULT)
        .addMetaTag('viewport', 'width=device-width, initial-scale=1');
}

/**
 * Gère les requêtes POST (pour les formulaires de devis).
 */
function doPost(e) {
    const lock = LockService.getScriptLock();
    lock.waitLock(10000);

    try {
        const sheet = getSheet(DEVIS_SHEET_NAME);
        const postData = JSON.parse(e.postData.contents);
        const formType = postData.form_type || 'devis';

        if (formType === 'partnership') {
            handlePartnershipRequest(postData);
            return ContentService.createTextOutput(JSON.stringify({ 'result': 'success', 'type': 'partnership' })).setMimeType(ContentService.MimeType.JSON);
        }

        if (formType === 'vision_2026') {
            handleVisionRequest(postData);
            return ContentService.createTextOutput(JSON.stringify({ 'result': 'success', 'type': 'vision_2026' })).setMimeType(ContentService.MimeType.JSON);
        }

        // Si c'est un devis, continuer comme avant
        handleDevisRequest(postData);
        return ContentService.createTextOutput(JSON.stringify({ 'result': 'success', 'type': 'devis' })).setMimeType(ContentService.MimeType.JSON);

    } catch (err) {
        console.error("Erreur dans doPost: " + err.toString());
        logToSheet('ERROR', 'Erreur critique doPost', err.message);
        return ContentService.createTextOutput(JSON.stringify({ 'result': 'error', 'error': err.message })).setMimeType(ContentService.MimeType.JSON);
    } finally {
        lock.releaseLock();
    }
}

/**
 * Gère une nouvelle demande de devis.
 * @param {Object} data Les données du formulaire de devis.
 */
function handleDevisRequest(data) {
    const sheet = getSheet(DEVIS_SHEET_NAME);
        const newRow = [
            new Date(), data.nom || '', data.user_type || '', data.entreprise || '', data.email || '', 
            data.telephone || '', data.service || '', data.budget || '', data.delai || '', data.description || '',
            data.newsletter ? 'Oui' : 'Non', 'Nouveau' // Statut initial
        ];
        sheet.appendRow(newRow);
        logToSheet('INFO', 'Nouveau Devis', `Client: ${data.nom}, Service: ${data.service}`);

        // Notification Super Admin
        let adminMsg = `🔔 *Nouveau Devis*\n`;
        adminMsg += `👤 Nom: ${data.nom}\n`;
        adminMsg += `🏢 Entreprise: ${data.entreprise} (${data.user_type})\n`;
        adminMsg += `📧 Email: ${data.email}\n`;
        adminMsg += `📞 Tel: ${data.telephone}\n`;
        adminMsg += `🛠 Service: ${data.service}\n`;
        adminMsg += `💰 Budget: ${data.budget}\n`;
        adminMsg += `⏳ Délai: ${data.delai}\n`;
        adminMsg += `📝 Description: ${data.description}\n`;
        adminMsg += `📰 Newsletter: ${data.newsletter ? 'Oui' : 'Non'}`;
        sendSuperAdminAlert(adminMsg);

        // Envoyer les notifications après avoir enregistré les données
        try {
            sendEmailNotification(data);
        } catch(e) {
            console.error("Erreur lors de l'envoi de l'email: " + e.toString());
        }
        try {
            sendWhatsAppNotification(data);
        } catch(e) {
            console.error("Erreur lors de l'envoi de la notification WhatsApp: " + e.toString());
        }
}

/**
 * NOUVEAU: Gère une nouvelle demande de partenariat.
 * @param {Object} data Les données du formulaire de partenariat.
 */
function handlePartnershipRequest(data) {
    const sheet = getSheet(PARTNERSHIP_REQUESTS_SHEET_NAME);
    const phone = data.phone || '';
    const demandId = phone.replace(/[^0-9]/g, ''); // Crée un ID à partir du numéro de téléphone

    const newRow = [
        new Date(),
        demandId,
        data.user_type || '',
        data.contact_name || '',
        data.company_name || '',
        data.email || '',
        phone,
        data.sector || '',
        data.message || '',
        data.example1 || '',
        data.example2 || '',
        data.example3 || '',
        'Nouveau' // Statut initial
    ];
    sheet.appendRow(newRow);
    logToSheet('INFO', 'Nouvelle Demande Partenariat', `Entreprise: ${data.company_name}, Secteur: ${data.sector}`);

    // Notification Super Admin
    let adminMsg = `🤝 *Nouvelle Demande Partenariat*\n`;
    adminMsg += `🆔 ID: ${demandId}\n`;
    adminMsg += `👤 Nom: ${data.contact_name}\n`;
    adminMsg += `🏢 Entreprise: ${data.company_name} (${data.user_type})\n`;
    adminMsg += `📧 Email: ${data.email}\n`;
    adminMsg += `📞 Tel: ${phone}\n`;
    adminMsg += `🏗 Secteur: ${data.sector}\n`;
    adminMsg += `💬 Message: ${data.message}\n`;
    if (data.example1) adminMsg += `🔗 Ex 1: ${data.example1}\n`;
    if (data.example2) adminMsg += `🔗 Ex 2: ${data.example2}\n`;
    if (data.example3) adminMsg += `🔗 Ex 3: ${data.example3}`;
    sendSuperAdminAlert(adminMsg);

    // Notifier l'admin principal
    const config = getScriptConfig();
    const adminEmail = config.NOTIFICATION_EMAIL;
    if (adminEmail && adminEmail !== 'votre_email@example.com') {
        const subject = `[ABMCY] Nouvelle Demande de Partenariat: ${data.company_name}`;
        const body = `Une nouvelle candidature de partenariat a été reçue.\n\nID Demande: ${demandId}\nNom: ${data.contact_name}\nEntreprise: ${data.company_name}\nSecteur: ${data.sector}\nContact: ${data.email} / ${data.phone}\n\nMessage:\n${data.message}`;
        MailApp.sendEmail(adminEmail, subject, body);
    }

    // NOUVEAU: Envoyer un email de confirmation au candidat
    const applicantEmail = data.email;
    if (applicantEmail) {
        const applicantSubject = `Votre demande de partenariat avec ABMCY a été reçue`;
        const applicantBody = `
            Bonjour ${data.contact_name},<br><br>
            Nous avons bien reçu votre candidature pour rejoindre notre réseau de partenaires. Merci de votre intérêt pour ABMCY.<br><br>
            Votre demande est enregistrée sous le numéro : <strong>${demandId}</strong><br><br>
            Veuillez conserver ce numéro. Si vous souhaitez nous envoyer des exemples de vos réalisations ou d'autres documents, merci de les adresser à notre email de contact en mentionnant ce numéro de demande.<br><br>
            Notre équipe examinera votre candidature et reviendra vers vous dans les plus brefs délais.<br><br>
            Cordialement,<br>
            L'équipe ABMCY
        `;
        MailApp.sendEmail(applicantEmail, applicantSubject, "", { htmlBody: applicantBody, name: 'ABMCY Partenariats' });
    }
}

/**
 * Gère une nouvelle demande pour Vision 2026.
 */
function handleVisionRequest(data) {
    const sheet = getSheet(VISION_SHEET_NAME);
    const newRow = [
        new Date(),
        data.nom_complet || '',
        data.nom_entreprise || '',
        data.email || '',
        data.telephone || '',
        data.secteur || '',
        data.niveau || '',
        data.description || '',
        'Nouveau'
    ];
    sheet.appendRow(newRow);
    logToSheet('INFO', 'Candidature Vision 2026', `Nom: ${data.nom_complet}, Niveau: ${data.niveau}`);

    // Notification Super Admin
    let adminMsg = `🚀 *Candidature Vision 2026*\n`;
    adminMsg += `👤 Nom: ${data.nom_complet}\n`;
    adminMsg += `🏢 Entreprise: ${data.nom_entreprise}\n`;
    adminMsg += `📧 Email: ${data.email}\n`;
    adminMsg += `📞 Tel: ${data.telephone}\n`;
    adminMsg += `🏗 Secteur: ${data.secteur}\n`;
    adminMsg += `📊 Niveau: ${data.niveau}\n`;
    adminMsg += `📝 Description: ${data.description}`;
    sendSuperAdminAlert(adminMsg);

    // Notification simple à l'admin
    const config = getScriptConfig();
    const adminEmail = config.NOTIFICATION_EMAIL;
    if (adminEmail && adminEmail !== 'votre_email@example.com') {
        MailApp.sendEmail(adminEmail, `[ABMCY] Nouvelle candidature Vision 2026`, `Une nouvelle candidature a été reçue pour le programme Vision 2026.\n\nNom: ${data.nom_complet}\nEntreprise: ${data.nom_entreprise}\nSecteur: ${data.secteur}`);
    }
    
    // Email de confirmation au candidat
    if (data.email) {
        const subject = "Confirmation de votre pré-inscription - Vision 2026";
        const body = `Bonjour ${data.nom_complet},\n\nNous avons bien reçu votre pré-inscription pour le programme Vision 2026 (Niveau: ${data.niveau}).\nNotre équipe technique vous contactera prochainement pour la mise en place de votre boutique.\n\nCordialement,\nL'équipe ABMCY`;
        MailApp.sendEmail(data.email, subject, body);
    }
}

/**
 * Fonction utilitaire pour obtenir ou créer une feuille de calcul.
 */
function getSheet(sheetName) {
    const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = spreadsheet.getSheetByName(sheetName);
    if (!sheet) {
        sheet = spreadsheet.insertSheet(sheetName);
    }
    return sheet;
}

/**
 * Récupère les données d'une feuille et les convertit en JSON.
 * Ne renvoie que les lignes où la colonne 'Actif' est 'Oui'.
 */
function getDataFromSheet(sheetName) {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName);
    if (!sheet) return [];

    const data = sheet.getDataRange().getValues();
    const headers = data.shift();
    const activeColumnIndex = headers.indexOf('Actif (Oui)');

    return data.filter(row => activeColumnIndex === -1 || row[activeColumnIndex] === 'Oui')
        .map(row => {
            const obj = {};
            headers.forEach((header, index) => {
                obj[header] = row[index];
            });
            return obj;
        });
}

/**
 * Utilitaire pour formater une feuille de calcul.
 */
function formatSheet(spreadsheet, sheetName, headers) {
    let sheet = spreadsheet.getSheetByName(sheetName);
    if (!sheet) {
        sheet = spreadsheet.insertSheet(sheetName);
    }
    sheet.clear();
    const headerRange = sheet.getRange(1, 1, 1, headers.length);
    headerRange.setValues([headers]);
    headerRange.setFontWeight('bold').setBackground('#4a4a4a').setFontColor('#ffffff');
    sheet.setFrozenRows(1);
    sheet.autoResizeColumns(1, headers.length);
    return sheet; // NOUVEAU: Retourner la feuille formatée
}

/**
 * Envoie une notification par e-mail pour une nouvelle demande de devis.
 */
function sendEmailNotification(data) {
    const recipients = getNotificationRecipients(data.service);
    if (recipients.emails.length === 0) {
        console.log("Aucun destinataire email configuré pour ce secteur.");
        return;
    }

    const userType = data.user_type === 'particulier' ? 'Particulier' : 'Entreprise';
    const subject = `[ABMCY] Devis (${userType}) pour ${data.service} - ${data.nom}`;
    const htmlBody = `
        <div style="font-family: Arial, sans-serif; line-height: 1.6;">
            <h2 style="color: #FFD700;">Nouvelle Demande de Devis sur ABMCY</h2>
            <p>Une nouvelle demande de devis a été soumise. Voici les détails :</p>
            <table style="width: 100%; border-collapse: collapse;">
                <tr style="background-color: #f2f2f2;"><td style="padding: 8px; border: 1px solid #ddd;"><strong>Type de Client :</strong></td><td style="padding: 8px; border: 1px solid #ddd;"><strong>${userType}</strong></td></tr>
                <tr style="background-color: #f2f2f2;"><td style="padding: 8px; border: 1px solid #ddd;"><strong>Nom :</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${data.nom}</td></tr>
                <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Entreprise :</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${data.entreprise}</td></tr>
                <tr style="background-color: #f2f2f2;"><td style="padding: 8px; border: 1px solid #ddd;"><strong>Email :</strong></td><td style="padding: 8px; border: 1px solid #ddd;"><a href="mailto:${data.email}">${data.email}</a></td></tr>
                <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Téléphone :</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${data.telephone}</td></tr>
                <tr style="background-color: #f2f2f2;"><td style="padding: 8px; border: 1px solid #ddd;"><strong>Service :</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${data.service}</td></tr>
                <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Budget :</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${data.budget}</td></tr>
                <tr style="background-color: #f2f2f2;"><td style="padding: 8px; border: 1px solid #ddd;"><strong>Délai :</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${data.delai}</td></tr>
                <tr><td style="padding: 8px; border: 1px solid #ddd;"><strong>Description :</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${data.description}</td></tr>
                <tr style="background-color: #f2f2f2;"><td style="padding: 8px; border: 1px solid #ddd;"><strong>Newsletter :</strong></td><td style="padding: 8px; border: 1px solid #ddd;">${data.newsletter ? 'Oui' : 'Non'}</td></tr>
            </table>
            <p>Connectez-vous à la feuille de calcul pour voir toutes les demandes.</p>
        </div>
    `;

    MailApp.sendEmail({
        to: recipients.emails.join(','),
        subject: subject,
        htmlBody: htmlBody,
        name: 'ABMCY Notifier' // Nom de l'expéditeur
    });
}

/**
 * Envoie une alerte WhatsApp à l'administrateur principal (Super Admin) via CallMeBot.
 * Utilisé pour le monitoring global (nouvelles demandes, erreurs).
 */
function sendSuperAdminAlert(message) {
    const config = getScriptConfig();
    const phone = config.CALLMEBOT_PHONE;
    const apiKey = config.CALLMEBOT_API_KEY;
    
    if (!phone || !apiKey) return; // Pas configuré

    try {
        const encodedPhone = encodeURIComponent(phone);
        const encodedMessage = encodeURIComponent(message);
        const url = `https://api.callmebot.com/whatsapp.php?phone=${encodedPhone}&text=${encodedMessage}&apikey=${apiKey}`;
        
        UrlFetchApp.fetch(url, { muteHttpExceptions: true });
    } catch (e) {
        console.error("Erreur CallMeBot: " + e.message);
    }
}

/**
 * Enregistre une action ou une erreur dans la feuille de logs.
 * Si c'est une erreur, envoie aussi une alerte WhatsApp.
 */
function logToSheet(type, message, details = '') {
    try {
        const sheet = getSheet(LOGS_SHEET_NAME);
        sheet.appendRow([new Date(), type, message, details]);
    } catch (e) {
        console.error("Erreur lors de l'écriture dans les logs: " + e.toString());
    }

    if (type === 'ERROR' || type === 'CRITICAL') {
        sendSuperAdminAlert(`⚠️ [${type}] ${message}\n${details}`);
    }
}

/**
 * Fonction de test pour vérifier l'envoi d'alertes WhatsApp via CallMeBot.
 * À exécuter manuellement depuis le menu ou l'éditeur.
 */
function testCallMeBotError() {
    logToSheet('ERROR', 'Test Manuel CallMeBot', 'Ceci est un test pour vérifier que les alertes WhatsApp fonctionnent correctement.');
    SpreadsheetApp.getUi().alert('Test envoyé ! Vérifiez votre WhatsApp et la feuille Logs.');
}

/**
 * Envoie une notification par WhatsApp via un service de Webhook.
 */
function sendWhatsAppNotification(data) {
    const recipients = getNotificationRecipients(data.service);
    const webhookUrl = recipients.webhookUrl;

    if (!webhookUrl || webhookUrl === 'URL_WEBHOOK_WHATSAPP_A_REMPLACER') {
        console.log("L'URL du webhook WhatsApp n'est pas configurée. Notification ignorée.");
        return;
    }
    if (recipients.phones.length === 0) {
        console.log("Aucun numéro WhatsApp à notifier.");
        return;
    }

    const userType = data.user_type === 'particulier' ? 'Particulier' : 'Entreprise';
    const message = `*Nouveau Devis ABMCY (${userType})*\n\n*Secteur:* ${data.service}\n*Nom:* ${data.nom}\n*Contact:* ${data.email} / ${data.telephone}\n\n*Besoin:*\n${data.description}`;

    recipients.phones.forEach(phone => {
        try {
            const payload = {
                'phone': phone,
                'text': message,
            };
            const options = {
                'method': 'post',
                'contentType': 'application/json',
                'payload': JSON.stringify(payload)
            };
            UrlFetchApp.fetch(webhookUrl, options);
        } catch (e) {
            console.error(`Erreur envoi WhatsApp à ${phone}: ${e.toString()}`);
        }
    });
}

/**
 * Lit la feuille de configuration et met en cache les valeurs.
 * @returns {Object} Un objet contenant les paires clé-valeur de la configuration.
 */
function getScriptConfig() {
    if (scriptConfig) {
        return scriptConfig; // Retourne la configuration mise en cache
    }

    const sheet = getSheet(CONFIG_SHEET_NAME);
    const data = sheet.getDataRange().getValues();
    const headers = data.shift(); // Supprime les en-têtes

    scriptConfig = {};
    data.forEach(row => {
        const key = row[headers.indexOf('Key')];
        const value = row[headers.indexOf('Value')];
        if (key && value) {
            scriptConfig[key] = value;
        }
    });
    return scriptConfig;
}

/**
 * NOUVEAU: Récupère la liste des destinataires pour une notification.
 * @param {string} secteurId L'ID du secteur concerné.
 * @returns {{emails: string[], phones: string[], webhookUrl: string}}
 */
function getNotificationRecipients(secteurId) {
    const config = getScriptConfig();
    const emails = new Set();
    const phones = new Set();

    // 1. Ajouter l'admin principal
    if (config.NOTIFICATION_EMAIL && config.NOTIFICATION_EMAIL !== 'votre_email@example.com') {
        emails.add(config.NOTIFICATION_EMAIL);
    }
    if (config.WHATSAPP_ADMIN_NUMBERS) {
        config.WHATSAPP_ADMIN_NUMBERS.split(',').forEach(num => {
            if (num.trim()) phones.add(num.trim());
        });
    }

    // 2. Ajouter l'admin du secteur
    const sectorsSheet = getSheet(SECTORS_SHEET_NAME);
    const sectorsData = sectorsSheet.getDataRange().getValues();
    const sectorHeaders = sectorsData.shift();
    const sectorRow = sectorsData.find(row => row[sectorHeaders.indexOf('ID')] === secteurId);

    if (sectorRow) {
        const adminEmail = sectorRow[sectorHeaders.indexOf('Admin Email')]; // Assurez-vous que le nom de la colonne est exact
        const adminPhone = sectorRow[sectorHeaders.indexOf('Admin WhatsApp')]; 
        const adminWebhook = sectorRow[sectorHeaders.indexOf('Admin Webhook URL')];
        if (adminEmail) emails.add(adminEmail);
        if (adminPhone) phones.add(adminPhone);
        // Utilise le webhook du secteur s'il existe, sinon celui par défaut
        if (adminWebhook) webhookUrl = adminWebhook;
    }
    // 3. Ajouter le partenaire actif pour le secteur
    const partnersSheet = getSheet(PARTNERS_SHEET_NAME);
    const partnersData = partnersSheet.getDataRange().getValues();
    const partnerHeaders = partnersData.shift();
    const activePartner = partnersData.find(row => row[partnerHeaders.indexOf('SecteurID')] === secteurId && row[partnerHeaders.indexOf('Actif (Oui)')] === 'Oui');

    if (activePartner) {
        const partnerEmail = activePartner[partnerHeaders.indexOf('Email')];
        if (partnerEmail) emails.add(partnerEmail);
    }

    return {
        emails: Array.from(emails),
        phones: Array.from(phones),
        webhookUrl: webhookUrl || config.WHATSAPP_WEBHOOK_URL || ''
    };
}

/**
 * NOUVEAU: Envoie les détails d'un devis à un partenaire.
 * Se déclenche depuis le menu "ABMCY Outils".
 */
function sendToPartner() {
    const ui = SpreadsheetApp.getUi();
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(DEVIS_SHEET_NAME);
    const activeRange = sheet.getActiveRange();
    
    if (activeRange.getRow() <= 1 || activeRange.getNumRows() > 1) {
        ui.alert("Veuillez sélectionner une seule ligne de devis (pas l'en-tête).");
        return;
    }

    const row = activeRange.getRow();
    const rowData = sheet.getRange(row, 1, 1, sheet.getLastColumn()).getValues()[0];
    
    const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    const devis = {};
    headers.forEach((header, index) => {
        devis[header] = rowData[index];
    });

    if (devis['Statut'] === 'Transféré au partenaire') {
        const response = ui.alert('Ce devis a déjà été transféré. Voulez-vous le renvoyer ?', ui.ButtonSet.YES_NO);
        if (response !== ui.Button.YES) {
            return;
        }
    }

    const secteurId = devis['Service'];
    if (!secteurId) {
        ui.alert("Le secteur d'activité (colonne 'Service') n'est pas défini pour ce devis.");
        return;
    }

    // Trouver un partenaire pour ce secteur
    const partnersSheet = getSheet(PARTNERS_SHEET_NAME);
    const partnersData = partnersSheet.getDataRange().getValues();
    const partnerHeaders = partnersData.shift();
    
    const activePartner = partnersData.find(partnerRow => {
        const partnerSecteur = partnerRow[partnerHeaders.indexOf('SecteurID')];
        const isPartnerActive = partnerRow[partnerHeaders.indexOf('Actif (Oui)')] === 'Oui';
        return partnerSecteur === secteurId && isPartnerActive;
    });

    if (!activePartner) {
        ui.alert(`Aucun partenaire actif trouvé pour le secteur : ${secteurId}`);
        return;
    }

    const partner = {};
    partnerHeaders.forEach((header, index) => {
        partner[header] = activePartner[index];
    });

    const partnerEmail = partner['Email'];
    const partnerName = partner['Nom du Partenaire'];

    const confirmation = ui.alert(`Envoyer ce devis à ${partnerName} (${partnerEmail}) ?`, ui.ButtonSet.OK_CANCEL);
    if (confirmation !== ui.Button.OK) {
        return;
    }

    // Envoyer l'email au partenaire
    const subject = `[ABMCY] Nouvelle opportunité de projet : ${devis['Service']}`;
    const body = `
        Bonjour ${partnerName},<br><br>
        Nous vous transférons une nouvelle demande de devis qui correspond à votre secteur d'activité.<br><br>
        <strong>Détails de la demande :</strong><br>
        <ul>
            <li><strong>Nom du client :</strong> ${devis['Nom']}</li>
            <li><strong>Entreprise :</strong> ${devis['Entreprise']}</li>
            <li><strong>Contact :</strong> ${devis['Email']} / ${devis['Téléphone']}</li>
            <li><strong>Description du besoin :</strong><br>${devis['Description'].replace(/\n/g, '<br>')}</li>
        </ul>
        <br>
        Merci de prendre contact avec le client.<br><br>
        Cordialement,<br>
        L'équipe ABMCY
    `;
    MailApp.sendEmail(partnerEmail, subject, "", { htmlBody: body, name: 'ABMCY Partenariats' });

    // Mettre à jour le statut dans la feuille
    sheet.getRange(row, headers.indexOf('Statut') + 1).setValue('Transféré au partenaire');
    ui.alert(`Le devis a été transféré avec succès à ${partnerName}.`);
}

/**
 * NOUVEAU: Approuve un partenaire et lui envoie un email de bienvenue.
 */
function approvePartner() {
    const ui = SpreadsheetApp.getUi();
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(PARTNERSHIP_REQUESTS_SHEET_NAME);
    const activeRange = sheet.getActiveRange();

    if (activeRange.getRow() <= 1 || activeRange.getNumRows() > 1) {
        ui.alert("Veuillez sélectionner une seule ligne de demande de partenariat.");
        return;
    }

    const row = activeRange.getRow();
    const rowData = sheet.getRange(row, 1, 1, sheet.getLastColumn()).getValues()[0];
    const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    
    const partnerRequest = {};
    headers.forEach((header, index) => {
        partnerRequest[header] = rowData[index];
    });

    if (partnerRequest['Statut'] === 'Approuvé') {
        ui.alert('Ce partenaire est déjà approuvé.');
        return;
    }

    const partnerEmail = partnerRequest['Email'];
    const partnerName = partnerRequest['Nom Contact'];
    const partnerSector = partnerRequest['Secteur'];
    const partnerWhatsapp = partnerRequest['WhatsApp (Optionnel)'];

    const confirmation = ui.alert(`Approuver ${partnerName} comme partenaire pour le secteur "${partnerSector}" et lui envoyer un email de bienvenue ?`, ui.ButtonSet.OK_CANCEL);
    if (confirmation !== ui.Button.OK) {
        return;
    }

    // Ajouter le partenaire à la feuille des partenaires
    const partnersSheet = getSheet(PARTNERS_SHEET_NAME);
    partnersSheet.appendRow([
        partnerRequest['Nom Entreprise'] || partnerName,
        partnerEmail,
        partnerRequest['Téléphone'],
        partnerWhatsapp || '',
        partnerSector,
        'Oui' // Actif par défaut
    ]);

    // Envoyer l'email de bienvenue
    const subject = `Félicitations, votre partenariat avec ABMCY est validé !`;
    const body = `
        Bonjour ${partnerName},<br><br>
        Excellente nouvelle ! Après examen de votre candidature, nous sommes ravis de vous accueillir dans le réseau de partenaires d'excellence ABMCY pour le secteur : <strong>${partnerSector}</strong>.<br><br>
        Nous vous contacterons prochainement pour discuter des prochaines étapes et des opportunités de collaboration.<br><br>
        Bienvenue dans l'aventure !<br><br>
        Cordialement,<br>
        L'équipe ABMCY
    `;
    MailApp.sendEmail(partnerEmail, subject, "", { htmlBody: body, name: 'ABMCY Partenariats' });

    // Envoyer une notification WhatsApp si le numéro est fourni
    if (partnerWhatsapp) {
        const config = getScriptConfig();
        const webhookUrl = config.WHATSAPP_WEBHOOK_URL;
        if (webhookUrl && webhookUrl !== 'URL_WEBHOOK_WHATSAPP_A_REMPLACER') {
            try {
                const message = `*Félicitations ${partnerName} !* Votre partenariat avec ABMCY pour le secteur *${partnerSector}* est validé. Bienvenue dans notre réseau d'excellence !`;
                const payload = { 'phone': partnerWhatsapp, 'text': message };
                const options = {
                    'method': 'post',
                    'contentType': 'application/json',
                    'payload': JSON.stringify(payload)
                };
                UrlFetchApp.fetch(webhookUrl, options);
            } catch (e) {
                console.error(`Erreur envoi WhatsApp au nouveau partenaire ${partnerName}: ${e.toString()}`);
            }
        }
    }

    // Mettre à jour le statut
    sheet.getRange(row, headers.indexOf('Statut') + 1).setValue('Approuvé');
    ui.alert(`Le partenaire ${partnerName} a été approuvé et notifié.`);
}

/**
 * NOUVEAU: Fonctions exposées pour la page de configuration web.
 */
function getConfigsForAdminPage() {
    const generalConfig = getScriptConfig();
    const sectors = getDataFromSheet(SECTORS_SHEET_NAME);
    const partners = getDataFromSheet(PARTNERS_SHEET_NAME);
    const spreadsheetUrl = SpreadsheetApp.getActiveSpreadsheet().getUrl();

    return {
        general: generalConfig,
        sectors: sectors,
        partners: partners,
        spreadsheetUrl: spreadsheetUrl
    };
}

function saveGeneralConfig(data) {
    try {
        const configSheet = getSheet(CONFIG_SHEET_NAME);
        const configData = configSheet.getDataRange().getValues();
        const headers = configData.shift();
        const keyIndex = headers.indexOf('Key');
        const valueIndex = headers.indexOf('Value');

        const keysToUpdate = Object.keys(data);

        configData.forEach((row, index) => {
            const key = row[keyIndex];
            if (keysToUpdate.includes(key)) {
                // Mettre à jour la valeur dans la feuille
                configSheet.getRange(index + 2, valueIndex + 1).setValue(data[key]);
            }
        });

        // Invalider le cache pour que les prochaines lectures prennent en compte les modifs
        scriptConfig = null;

        return "Configuration sauvegardée avec succès !";
    } catch (e) {
        console.error("Erreur lors de la sauvegarde de la configuration: " + e.toString());
        throw new Error("Impossible de sauvegarder la configuration. Vérifiez les permissions et la structure de la feuille 'Configuration'.");
    }
}

/**
 * NOUVEAU: Ajoute un nouveau secteur.
 */
function addNewSector(sector) {
    try {
        const sectorsSheet = getSheet(SECTORS_SHEET_NAME);
        sectorsSheet.appendRow([sector.id, sector.name, sector.adminEmail, sector.adminWhatsapp]);
        return "Nouveau secteur ajouté avec succès !";
    } catch (e) {
        console.error("Erreur lors de l'ajout du secteur: " + e.toString());
        throw new Error("Impossible d'ajouter le nouveau secteur.");
    }
}

/**
 * NOUVEAU: Sauvegarde la configuration des secteurs.
 */
function saveSectorsConfig(sectors) {
    try {
        const sectorsSheet = getSheet(SECTORS_SHEET_NAME);
        const sheetData = sectorsSheet.getDataRange().getValues();
        const headers = sheetData.shift();
        const idIndex = headers.indexOf('ID');
        const emailIndex = headers.indexOf('Admin Email');
        const whatsappIndex = headers.indexOf('Admin WhatsApp');
        const webhookIndex = headers.indexOf('Admin Webhook URL');

        sheetData.forEach((row, index) => {
            const sectorId = row[idIndex];
            if (sectors[sectorId]) {
                sectorsSheet.getRange(index + 2, emailIndex + 1).setValue(sectors[sectorId].adminEmail);
                sectorsSheet.getRange(index + 2, whatsappIndex + 1).setValue(sectors[sectorId].adminWhatsapp);
                sectorsSheet.getRange(index + 2, webhookIndex + 1).setValue(sectors[sectorId].adminWebhook);
            }
        });
        return "Configuration des secteurs sauvegardée avec succès !";
    } catch (e) {
        throw new Error("Impossible de sauvegarder la configuration des secteurs.");
    }
}

function showConfigDialog() {
    const html = HtmlService.createHtmlOutputFromFile('configuration.html').setWidth(1000).setHeight(750);
    SpreadsheetApp.getUi().showModalDialog(html, 'Panneau de Configuration ABMCY');
}
