/**
 * Point d'entrée de l'application
 */

// Initialisation de l'application au chargement du DOM
document.addEventListener('DOMContentLoaded', () => {
    try {
        // Créer l'instance du jeu
        const game = new SudokuGame();
        
        // Créer l'interface utilisateur
        const ui = new SudokuUI(game);
        
        // Afficher l'écran de menu
        ui.showMenuScreen();
        
        console.log('✅ Jeu Sudoku initialisé avec succès');
    } catch (error) {
        console.error('❌ Erreur lors de l\'initialisation du jeu:', error);
        alert('Une erreur est survenue lors du chargement du jeu. Veuillez recharger la page.');
    }
});

// Gestion des erreurs globales
window.addEventListener('error', (event) => {
    console.error('Erreur globale:', event.error);
});

// Message dans la console
console.log(`
🍎 Sudoku Fruits & Légumes 🥕
Version: 1.0.0
Développé avec ❤️
`);