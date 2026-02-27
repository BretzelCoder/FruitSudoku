/**
 * Configuration globale du jeu Sudoku
 */

// Définition des thèmes disponibles
const THEMES = {
    'fruits-legumes': {
        name: 'Fruits & Légumes', // Sera remplacé par i18n
        nameKey: 'theme.fruits-legumes',
        icons: ['🍎', '🍌', '🍊', '🍇', '🍓', '🥕', '🥬', '🍅', '🥒'],
        labelKeys: ['legend.apple', 'legend.banana', 'legend.orange', 'legend.grape', 
                    'legend.strawberry', 'legend.carrot', 'legend.lettuce', 'legend.tomato', 'legend.cucumber']
    },
    'fruits': {
        name: 'Fruits uniquement',
        nameKey: 'theme.fruits',
        icons: ['🍎', '🍌', '🍊', '🍇', '🍓', '🍑', '🥝', '🍍', '🥭'],
        labelKeys: ['legend.apple', 'legend.banana', 'legend.orange', 'legend.grape', 
                    'legend.strawberry', 'legend.peach', 'legend.kiwi', 'legend.pineapple', 'legend.mango']
    },
    'legumes': {
        name: 'Légumes uniquement',
        nameKey: 'theme.legumes',
        icons: ['🥕', '🥬', '🍅', '🥒', '🥔', '🧅', '🌶️', '🥦', '🌽'],
        labelKeys: ['legend.carrot', 'legend.lettuce', 'legend.tomato', 'legend.cucumber', 
                    'legend.potato', 'legend.onion', 'legend.pepper', 'legend.broccoli', 'legend.corn']
    }
};

// Configuration des niveaux de difficulté
const DIFFICULTY_CONFIG = {
    'facile': {
        cellsToKeep: 40,
        labelKey: 'difficulty.easy',
        descKey: 'difficulty.easy.desc',
        emoji: '🌱'
    },
    'moyen': {
        cellsToKeep: 30,
        labelKey: 'difficulty.medium',
        descKey: 'difficulty.medium.desc',
        emoji: '🌿'
    },
    'difficile': {
        cellsToKeep: 25,
        labelKey: 'difficulty.hard',
        descKey: 'difficulty.hard.desc',
        emoji: '🌳'
    }
};

// Langues disponibles
const AVAILABLE_LANGUAGES = {
    'fr': { name: 'Français', flag: '🇫🇷' },
    'en': { name: 'English', flag: '🇬🇧' },
    'de': { name: 'Deutsch', flag: '🇩🇪' }
};

// Constantes du jeu
const GRID_SIZE = 9;
const BLOCK_SIZE = 3;
const TOTAL_CELLS = 81;

// Types de messages
const MESSAGE_TYPES = {
    SUCCESS: 'success',
    WARNING: 'warning',
    ERROR: 'error',
    INFO: 'info'
};

// Durées d'animation (en millisecondes)
const ANIMATION_DURATIONS = {
    CELL_FEEDBACK: 2000,
    MESSAGE_DISPLAY: 3000,
    MESSAGE_FADE: 500,
    ERROR_SHAKE: 1000
};