/**
 * Système d'internationalisation (i18n)
 * Supporte : Français, Anglais, Allemand
 */

const TRANSLATIONS = {
    'fr': {
        // Menu principal
        'title': '🍎 Sudoku Fruits & Légumes 🥕',
        'chooseTheme': 'Choisissez votre thème :',
        'chooseDifficulty': 'Choisissez votre niveau de difficulté :',
        
        // Thèmes
        'theme.fruits-legumes': 'Fruits & Légumes',
        'theme.fruits': 'Fruits uniquement',
        'theme.legumes': 'Légumes uniquement',
        
        // Difficultés
        'difficulty.easy': 'Facile',
        'difficulty.medium': 'Moyen',
        'difficulty.hard': 'Difficile',
        'difficulty.easy.desc': '40 indices',
        'difficulty.medium.desc': '30 indices',
        'difficulty.hard.desc': '25 indices',
        
        // Légende
        'legend.apple': 'Pomme',
        'legend.banana': 'Banane',
        'legend.orange': 'Orange',
        'legend.grape': 'Raisin',
        'legend.strawberry': 'Fraise',
        'legend.carrot': 'Carotte',
        'legend.lettuce': 'Salade',
        'legend.tomato': 'Tomate',
        'legend.cucumber': 'Concombre',
        'legend.peach': 'Pêche',
        'legend.kiwi': 'Kiwi',
        'legend.pineapple': 'Ananas',
        'legend.mango': 'Mangue',
        'legend.potato': 'Pomme de terre',
        'legend.onion': 'Oignon',
        'legend.pepper': 'Piment',
        'legend.broccoli': 'Brocoli',
        'legend.corn': 'Maïs',
        'legend.leonardo': 'Leonardo',
        'legend.scarlett': 'Scarlett',
        'legend.robert': 'Robert',
        'legend.emma': 'Emma',
        'legend.ryan': 'Ryan',
        'legend.jennifer': 'Jennifer',
        'legend.tom': 'Tom',
        'legend.meryl': 'Meryl',
        'legend.chris': 'Chris',
        
        // Interface de jeu
        'game.time': 'Temps',
        'game.helps': 'Aides',
        'game.theme': 'Thème',
        'game.level': 'Niveau',
        'game.verification': 'Vérification',
        
        // Boutons
        'btn.help': '💡 Aide',
        'btn.verify': '✅ Vérifier',
        'btn.changeTheme': '🎨 Changer thème',
        'btn.restart': '🔄 Recommencer',
        'btn.menu': '🏠 Menu',
        'btn.close': '❌ Fermer',
        
        // Messages
        'msg.selectCell': 'Sélectionnez d\'abord une cellule !',
        'msg.prefilledCell': 'Cette cellule est déjà remplie !',
        'msg.allCorrect': '🎉 Toutes les cases sont correctes !',
        'msg.errorsFound': 'erreur(s) détectée(s)',
        'msg.noCellFilled': 'Aucune case',
        'msg.confirmRestart': 'Êtes-vous sûr de vouloir recommencer ?',
        
        // Modal victoire
        'victory.title': '🎉 Félicitations ! 🎉',
        'victory.time': 'Temps',
        'victory.helps': 'Aides',
        'victory.level': 'Niveau',
        'victory.backToMenu': '🏠 Retour au menu',
        
        // Modal thème
        'themeModal.title': '🎨 Changer de thème'
    },
    
    'en': {
        // Main menu
        'title': '🍎 Fruits & Vegetables Sudoku 🥕',
        'chooseTheme': 'Choose your theme:',
        'chooseDifficulty': 'Choose your difficulty level:',
        
        // Themes
        'theme.fruits-legumes': 'Fruits & Vegetables',
        'theme.fruits': 'Fruits only',
        'theme.legumes': 'Vegetables only',
        
        // Difficulties
        'difficulty.easy': 'Easy',
        'difficulty.medium': 'Medium',
        'difficulty.hard': 'Hard',
        'difficulty.easy.desc': '40 clues',
        'difficulty.medium.desc': '30 clues',
        'difficulty.hard.desc': '25 clues',
        
        // Legend
        'legend.apple': 'Apple',
        'legend.banana': 'Banana',
        'legend.orange': 'Orange',
        'legend.grape': 'Grape',
        'legend.strawberry': 'Strawberry',
        'legend.carrot': 'Carrot',
        'legend.lettuce': 'Lettuce',
        'legend.tomato': 'Tomato',
        'legend.cucumber': 'Cucumber',
        'legend.peach': 'Peach',
        'legend.kiwi': 'Kiwi',
        'legend.pineapple': 'Pineapple',
        'legend.mango': 'Mango',
        'legend.potato': 'Potato',
        'legend.onion': 'Onion',
        'legend.pepper': 'Pepper',
        'legend.broccoli': 'Broccoli',
        'legend.corn': 'Corn',
        'legend.leonardo': 'Leonardo',
        'legend.scarlett': 'Scarlett',
        'legend.robert': 'Robert',
        'legend.emma': 'Emma',
        'legend.ryan': 'Ryan',
        'legend.jennifer': 'Jennifer',
        'legend.tom': 'Tom',
        'legend.meryl': 'Meryl',
        'legend.chris': 'Chris',
        
        // Game interface
        'game.time': 'Time',
        'game.helps': 'Helps',
        'game.theme': 'Theme',
        'game.level': 'Level',
        'game.verification': 'Verification',
        
        // Buttons
        'btn.help': '💡 Help',
        'btn.verify': '✅ Verify',
        'btn.changeTheme': '🎨 Change theme',
        'btn.restart': '🔄 Restart',
        'btn.menu': '🏠 Menu',
        'btn.close': '❌ Close',
        
        // Messages
        'msg.selectCell': 'Select a cell first!',
        'msg.prefilledCell': 'This cell is already filled!',
        'msg.allCorrect': '🎉 All cells are correct!',
        'msg.errorsFound': 'error(s) found',
        'msg.noCellFilled': 'No cell filled',
        'msg.confirmRestart': 'Are you sure you want to restart?',
        
        // Victory modal
        'victory.title': '🎉 Congratulations! 🎉',
        'victory.time': 'Time',
        'victory.helps': 'Helps',
        'victory.level': 'Level',
        'victory.backToMenu': '🏠 Back to menu',
        
        // Theme modal
        'themeModal.title': '🎨 Change theme'
    },
    
    'de': {
        // Hauptmenü
        'title': '🍎 Obst & Gemüse Sudoku 🥕',
        'chooseTheme': 'Wählen Sie Ihr Thema:',
        'chooseDifficulty': 'Wählen Sie Ihren Schwierigkeitsgrad:',
        
        // Themen
        'theme.fruits-legumes': 'Obst & Gemüse',
        'theme.fruits': 'Nur Obst',
        'theme.legumes': 'Nur Gemüse',
        
        // Schwierigkeiten
        'difficulty.easy': 'Einfach',
        'difficulty.medium': 'Mittel',
        'difficulty.hard': 'Schwer',
        'difficulty.easy.desc': '40 Hinweise',
        'difficulty.medium.desc': '30 Hinweise',
        'difficulty.hard.desc': '25 Hinweise',
        
        // Legende
        'legend.apple': 'Apfel',
        'legend.banana': 'Banane',
        'legend.orange': 'Orange',
        'legend.grape': 'Traube',
        'legend.strawberry': 'Erdbeere',
        'legend.carrot': 'Karotte',
        'legend.lettuce': 'Salat',
        'legend.tomato': 'Tomate',
        'legend.cucumber': 'Gurke',
        'legend.peach': 'Pfirsich',
        'legend.kiwi': 'Kiwi',
        'legend.pineapple': 'Ananas',
        'legend.mango': 'Mango',
        'legend.potato': 'Kartoffel',
        'legend.onion': 'Zwiebel',
        'legend.pepper': 'Paprika',
        'legend.broccoli': 'Brokkoli',
        'legend.corn': 'Mais',
        'legend.leonardo': 'Leonardo',
        'legend.scarlett': 'Scarlett',
        'legend.robert': 'Robert',
        'legend.emma': 'Emma',
        'legend.ryan': 'Ryan',
        'legend.jennifer': 'Jennifer',
        'legend.tom': 'Tom',
        'legend.meryl': 'Meryl',
        'legend.chris': 'Chris',
        
        // Spieloberfläche
        'game.time': 'Zeit',
        'game.helps': 'Hilfen',
        'game.theme': 'Thema',
        'game.level': 'Level',
        'game.verification': 'Überprüfung',
        
        // Schaltflächen
        'btn.help': '💡 Hilfe',
        'btn.verify': '✅ Überprüfen',
        'btn.changeTheme': '🎨 Thema ändern',
        'btn.restart': '🔄 Neu starten',
        'btn.menu': '🏠 Menü',
        'btn.close': '❌ Schließen',
        
        // Nachrichten
        'msg.selectCell': 'Wählen Sie zuerst eine Zelle!',
        'msg.prefilledCell': 'Diese Zelle ist bereits gefüllt!',
        'msg.allCorrect': '🎉 Alle Zellen sind korrekt!',
        'msg.errorsFound': 'Fehler gefunden',
        'msg.noCellFilled': 'Keine Zelle',
        'msg.confirmRestart': 'Möchten Sie wirklich neu starten?',
        
        // Siegesmodal
        'victory.title': '🎉 Glückwunsch! 🎉',
        'victory.time': 'Zeit',
        'victory.helps': 'Hilfen',
        'victory.level': 'Level',
        'victory.backToMenu': '🏠 Zurück zum Menü',
        
        // Themenmodal
        'themeModal.title': '🎨 Thema ändern'
    }
};

// Langue par défaut
let currentLanguage = 'fr';

/**
 * Classe de gestion de l'internationalisation
 */
class I18n {
    constructor() {
        this.currentLang = 'fr';
        this.loadLanguageFromStorage();
    }
    
    /**
     * Charge la langue depuis le localStorage
     */
    loadLanguageFromStorage() {
        const savedLang = localStorage.getItem('sudoku-language');
        if (savedLang && TRANSLATIONS[savedLang]) {
            this.currentLang = savedLang;
            currentLanguage = savedLang;
        }
    }
    
    /**
     * Sauvegarde la langue dans le localStorage
     */
    saveLanguageToStorage() {
        localStorage.setItem('sudoku-language', this.currentLang);
    }
    
    /**
     * Change la langue
     * @param {string} lang - Code de langue ('fr', 'en', 'de')
     */
    setLanguage(lang) {
        if (TRANSLATIONS[lang]) {
            this.currentLang = lang;
            currentLanguage = lang;
            this.saveLanguageToStorage();
            return true;
        }
        return false;
    }
    
    /**
     * Obtient la langue actuelle
     * @returns {string}
     */
    getLanguage() {
        return this.currentLang;
    }
    
    /**
     * Traduit une clé
     * @param {string} key - Clé de traduction
     * @param {Object} params - Paramètres à interpoler
     * @returns {string}
     */
    t(key, params = {}) {
        const translation = TRANSLATIONS[this.currentLang][key] || TRANSLATIONS['fr'][key] || key;
        
        // Interpolation simple
        let result = translation;
        Object.keys(params).forEach(param => {
            result = result.replace(`{${param}}`, params[param]);
        });
        
        return result;
    }
    
    /**
     * Met à jour tous les éléments avec data-i18n
     */
    updatePageTranslations() {
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            element.textContent = this.t(key);
        });
        
        document.querySelectorAll('[data-i18n-html]').forEach(element => {
            const key = element.getAttribute('data-i18n-html');
            element.innerHTML = this.t(key);
        });
        
        document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
            const key = element.getAttribute('data-i18n-placeholder');
            element.placeholder = this.t(key);
        });
    }
}

// Instance globale
const i18n = new I18n();