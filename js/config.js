/**
 * Configuration globale du jeu Sudoku
 */

// Définition des thèmes disponibles
const THEMES = {
    'fruits-legumes': {
        name: 'Fruits & Légumes',
        icons: ['🍎', '🍌', '🍊', '🍇', '🍓', '🥕', '🥬', '🍅', '🥒'],
        labels: ['Pomme', 'Banane', 'Orange', 'Raisin', 'Fraise', 'Carotte', 'Salade', 'Tomate', 'Concombre']
    },
    'fruits': {
        name: 'Fruits uniquement',
        icons: ['🍎', '🍌', '🍊', '🍇', '🍓', '🍑', '🥝', '🍍', '🥭'],
        labels: ['Pomme', 'Banane', 'Orange', 'Raisin', 'Fraise', 'Pêche', 'Kiwi', 'Ananas', 'Mangue']
    },
    'legumes': {
        name: 'Légumes uniquement',
        icons: ['🥕', '🥬', '🍅', '🥒', '🥔', '🧅', '🌶️', '🥦', '🌽'],
        labels: ['Carotte', 'Salade', 'Tomate', 'Concombre', 'Pomme de terre', 'Oignon', 'Piment', 'Brocoli', 'Maïs']
    },
    'acteurs': {
        name: 'Acteurs & Actrices',
        icons: ['👨‍🎤', '👩‍🎤', '🕴️', '👸', '🤵', '👩‍💼', '👨‍💼', '🧙‍♀️', '🦸‍♂️'],
        labels: ['Leonardo', 'Scarlett', 'Robert', 'Emma', 'Ryan', 'Jennifer', 'Tom', 'Meryl', 'Chris']
    }
};

// Configuration des niveaux de difficulté
const DIFFICULTY_CONFIG = {
    'facile': {
        cellsToKeep: 40,
        label: 'Facile',
        emoji: '🌱'
    },
    'moyen': {
        cellsToKeep: 30,
        label: 'Moyen',
        emoji: '🌿'
    },
    'difficile': {
        cellsToKeep: 25,
        label: 'Difficile',
        emoji: '🌳'
    }
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