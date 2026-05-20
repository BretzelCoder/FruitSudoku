/**
 * Gestion de la logique du jeu
 */

class SudokuGame {
    constructor() {
        this.generator = new SudokuGenerator();
        this.state = this._createInitialState();
        this.currentTheme = 'fruits-legumes';
    }

    /**
     * Crée l'état initial du jeu
     * @private
     */
    _createInitialState() {
        return {
            grid: this._createEmptyGrid(),
            solution: this._createEmptyGrid(),
            prefilled: this._createEmptyGrid(),
            selectedCell: null,
            difficulty: null,
            startTime: null,
            helpUsed: 0,
            timerInterval: null
        };
    }

    /**
     * Crée une grille vide
     * @private
     */
    _createEmptyGrid() {
        return Array(GRID_SIZE).fill(null).map(() => Array(GRID_SIZE).fill(0));
    }

    /**
     * Démarre une nouvelle partie
     * @param {string} difficulty - Niveau de difficulté
     */
    startNewGame(difficulty) {
        if (!DIFFICULTY_CONFIG[difficulty]) {
            throw new Error(`Difficulté invalide: ${difficulty}`);
        }

        // Générer une nouvelle grille
        const generated = this.generator.generate(difficulty);
        
        // Mettre à jour l'état
        this.state.grid = generated.grid;
        this.state.solution = generated.solution;
        this.state.prefilled = generated.prefilled;
        this.state.difficulty = difficulty;
        this.state.startTime = Date.now();
        this.state.helpUsed = 0;
        this.state.selectedCell = null;

        // Arrêter le timer précédent si existant
        if (this.state.timerInterval) {
            clearInterval(this.state.timerInterval);
        }
    }

    /**
     * Sélectionne une cellule
     * @param {number} row - Ligne
     * @param {number} col - Colonne
     * @returns {boolean} - True si la sélection a réussi
     */
    selectCell(row, col) {
        // Vérifier les limites
        if (row < 0 || row >= GRID_SIZE || col < 0 || col >= GRID_SIZE) {
            return false;
        }

        // Ne pas permettre de sélectionner une cellule pré-remplie
        if (this.state.prefilled[row][col]) {
            return false;
        }

        this.state.selectedCell = { row, col };
        return true;
    }

    /**
     * Place une valeur dans la cellule sélectionnée
     * @param {number} value - Valeur à placer (1-9)
     * @returns {Object} - { success, isValid, isComplete, cellCleared }
     */
    placeValue(value) {
        if (!this.state.selectedCell) {
            return { success: false, errorKey: 'msg.selectCell' };
        }

        if (value < 1 || value > 9) {
            return { success: false, error: 'Valeur invalide' };
        }

        const { row, col } = this.state.selectedCell;

        // Vérifier si la cellule est pré-remplie
        if (this.state.prefilled[row][col]) {
            return { success: false, errorKey: 'msg.prefilledCell' };
        }

        // Si c'est la même valeur, effacer la cellule
        const cellCleared = this.state.grid[row][col] === value;
        
        if (cellCleared) {
            this.state.grid[row][col] = 0;
            return {
                success: true,
                cellCleared: true,
                isValid: true,
                isComplete: false
            };
        }

        // Placer la nouvelle valeur
        this.state.grid[row][col] = value;

        // Vérifier si le placement est valide
        const isValid = this._isValidPlacement(row, col, value);

        // Vérifier si la grille est complète
        const isComplete = isValid && this._isGridComplete();

        return {
            success: true,
            cellCleared: false,
            isValid,
            isComplete
        };
    }

    /**
     * Vérifie si un placement est valide
     * @private
     */
    _isValidPlacement(row, col, value) {
        // Sauvegarder temporairement la valeur
        const temp = this.state.grid[row][col];
        this.state.grid[row][col] = 0;

        // Vérifier avec le générateur
        const isValid = this.generator.isValidPlacement(this.state.grid, row, col, value);

        // Restaurer la valeur
        this.state.grid[row][col] = temp;

        return isValid;
    }

    /**
     * Vérifie si la grille est complète et correcte
     * @private
     */
    _isGridComplete() {
        // Vérifier qu'il n'y a pas de cases vides
        for (let i = 0; i < GRID_SIZE; i++) {
            for (let j = 0; j < GRID_SIZE; j++) {
                if (this.state.grid[i][j] === 0) {
                    return false;
                }
            }
        }

        // Vérifier que tous les placements sont valides
        for (let i = 0; i < GRID_SIZE; i++) {
            for (let j = 0; j < GRID_SIZE; j++) {
                if (!this._isValidPlacement(i, j, this.state.grid[i][j])) {
                    return false;
                }
            }
        }

        return true;
    }

    /**
     * Utilise une aide pour la cellule sélectionnée
     * @returns {Object} - { success, value, error }
     */
    useHint() {
        if (!this.state.selectedCell) {
            return { success: false, errorKey: 'msg.selectCell' };
        }

        const { row, col } = this.state.selectedCell;

        if (this.state.prefilled[row][col]) {
            return { success: false, errorKey: 'msg.prefilledCell' };
        }

        // Obtenir la valeur correcte
        const correctValue = this.state.solution[row][col];

        // Placer la valeur
        this.state.grid[row][col] = correctValue;
        this.state.helpUsed++;

        // Vérifier si la grille est complète
        const isComplete = this._isGridComplete();

        return {
            success: true,
            value: correctValue,
            isComplete,
            totalHelps: this.state.helpUsed
        };
    }

    /**
     * Vérifie les cellules remplies par rapport à la solution
     * @returns {Object} - { totalFilled, correct, incorrect, details }
     */
    verifyGrid() {
        let totalFilled = 0;
        let correct = 0;
        let incorrect = 0;
        const details = [];

        for (let i = 0; i < GRID_SIZE; i++) {
            for (let j = 0; j < GRID_SIZE; j++) {
                if (this.state.grid[i][j] !== 0) {
                    totalFilled++;
                    
                    const isCorrect = this.state.grid[i][j] === this.state.solution[i][j];
                    
                    if (isCorrect) {
                        correct++;
                    } else {
                        incorrect++;
                    }

                    details.push({
                        row: i,
                        col: j,
                        value: this.state.grid[i][j],
                        isCorrect,
                        isPrefilled: this.state.prefilled[i][j]
                    });
                }
            }
        }

        return {
            totalFilled,
            correct,
            incorrect,
            details
        };
    }

    /**
     * Change le thème actuel
     * @param {string} themeId - ID du thème
     * @returns {boolean} - True si le changement a réussi
     */
    changeTheme(themeId) {
        if (!THEMES[themeId]) {
            return false;
        }

        this.currentTheme = themeId;
        return true;
    }

    /**
     * Obtient le thème actuel
     * @returns {Object} - Objet du thème
     */
    getCurrentTheme() {
        return THEMES[this.currentTheme];
    }

    /**
     * Obtient le temps écoulé
     * @returns {number} - Temps en secondes
     */
    getElapsedTime() {
        if (!this.state.startTime) {
            return 0;
        }
        return Math.floor((Date.now() - this.state.startTime) / 1000);
    }

    /**
     * Formate le temps en MM:SS
     * @param {number} seconds - Temps en secondes
     * @returns {string}
     */
    formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }

    /**
     * Démarre le timer
     * @param {Function} callback - Fonction appelée à chaque tick
     */
    startTimer(callback) {
        if (this.state.timerInterval) {
            clearInterval(this.state.timerInterval);
        }

        this.state.timerInterval = setInterval(() => {
            const elapsed = this.getElapsedTime();
            callback(this.formatTime(elapsed));
        }, 1000);
    }

    /**
     * Arrête le timer
     */
    stopTimer() {
        if (this.state.timerInterval) {
            clearInterval(this.state.timerInterval);
            this.state.timerInterval = null;
        }
    }

    /**
     * Obtient les statistiques de fin de partie
     * @returns {Object}
     */
    getGameStats() {
        return {
            time: this.formatTime(this.getElapsedTime()),
            helps: this.state.helpUsed,
            difficulty: this.state.difficulty,
            difficultyLabel: DIFFICULTY_CONFIG[this.state.difficulty]?.label || '-'
        };
    }

    /**
     * Sauvegarde les statistiques de la partie courante
     */
    saveGameStats() {
        const history = this.getHistory();
        const newEntry = {
            date: new Date().toISOString(),
            difficulty: this.state.difficulty,
            time: this.getElapsedTime(),
            helps: this.state.helpUsed,
            theme: this.currentTheme
        };
        
        history.push(newEntry);
        localStorage.setItem('sudoku_fruits_history', JSON.stringify(history));
    }

    /**
     * Récupère l'historique des parties
     * @returns {Array} Liste des parties jouées
     */
    getHistory() {
        const stored = localStorage.getItem('sudoku_fruits_history');
        return stored ? JSON.parse(stored) : [];
    }
}