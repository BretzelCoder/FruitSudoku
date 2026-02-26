/**
 * Générateur de grilles Sudoku
 */

class SudokuGenerator {
    constructor() {
        this.grid = [];
        this.solution = [];
    }

    /**
     * Génère une nouvelle grille Sudoku
     * @param {string} difficulty - Niveau de difficulté ('facile', 'moyen', 'difficile')
     * @returns {Object} - { grid, solution, prefilled }
     */
    generate(difficulty) {
        if (!DIFFICULTY_CONFIG[difficulty]) {
            throw new Error(`Difficulté invalide: ${difficulty}`);
        }

        // Initialiser les grilles
        this.solution = this._createEmptyGrid();
        
        // Générer une solution complète
        this._fillGrid(this.solution);
        
        // Copier la solution dans la grille de jeu
        this.grid = this._copyGrid(this.solution);
        
        // Créer le masque de cellules pré-remplies
        const prefilled = this._createPrefilledMask(difficulty);
        
        return {
            grid: this.grid,
            solution: this.solution,
            prefilled: prefilled
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
     * Copie une grille
     * @private
     */
    _copyGrid(grid) {
        return grid.map(row => [...row]);
    }

    /**
     * Remplit la grille avec une solution valide
     * @private
     */
    _fillGrid(grid) {
        // Remplir la première ligne aléatoirement
        const numbers = this._shuffleArray([1, 2, 3, 4, 5, 6, 7, 8, 9]);
        for (let j = 0; j < GRID_SIZE; j++) {
            grid[0][j] = numbers[j];
        }
        
        // Remplir le reste avec backtracking
        this._solve(grid);
    }

    /**
     * Résout le Sudoku avec backtracking
     * @private
     */
    _solve(grid) {
        for (let i = 0; i < GRID_SIZE; i++) {
            for (let j = 0; j < GRID_SIZE; j++) {
                if (grid[i][j] === 0) {
                    const numbers = this._shuffleArray([1, 2, 3, 4, 5, 6, 7, 8, 9]);
                    
                    for (let num of numbers) {
                        if (this.isValidPlacement(grid, i, j, num)) {
                            grid[i][j] = num;
                            
                            if (this._solve(grid)) {
                                return true;
                            }
                            
                            grid[i][j] = 0;
                        }
                    }
                    return false;
                }
            }
        }
        return true;
    }

    /**
     * Vérifie si un placement est valide
     * @param {Array} grid - La grille
     * @param {number} row - Ligne
     * @param {number} col - Colonne
     * @param {number} num - Nombre à placer
     * @returns {boolean}
     */
    isValidPlacement(grid, row, col, num) {
        // Vérifier la ligne
        for (let j = 0; j < GRID_SIZE; j++) {
            if (grid[row][j] === num) return false;
        }
        
        // Vérifier la colonne
        for (let i = 0; i < GRID_SIZE; i++) {
            if (grid[i][col] === num) return false;
        }
        
        // Vérifier le bloc 3x3
        const startRow = Math.floor(row / BLOCK_SIZE) * BLOCK_SIZE;
        const startCol = Math.floor(col / BLOCK_SIZE) * BLOCK_SIZE;
        
        for (let i = startRow; i < startRow + BLOCK_SIZE; i++) {
            for (let j = startCol; j < startCol + BLOCK_SIZE; j++) {
                if (grid[i][j] === num) return false;
            }
        }
        
        return true;
    }

    /**
     * Crée le masque de cellules pré-remplies
     * @private
     */
    _createPrefilledMask_old(difficulty) {
        const config = DIFFICULTY_CONFIG[difficulty];
        const cellsToKeep = config.cellsToKeep;
        const cellsToRemove = TOTAL_CELLS - cellsToKeep;
        
        // Créer une liste de toutes les positions
        const positions = [];
        for (let i = 0; i < GRID_SIZE; i++) {
            for (let j = 0; j < GRID_SIZE; j++) {
                positions.push([i, j]);
            }
        }
        
        // Mélanger et sélectionner les cellules à retirer
        this._shuffleArray(positions);
        
        // Retirer les cellules
        for (let k = 0; k < cellsToRemove; k++) {
            const [i, j] = positions[k];
            this.grid[i][j] = 0;
        }
        
        // Créer le masque de cellules pré-remplies
        const prefilled = this._createEmptyGrid();
        for (let i = 0; i < GRID_SIZE; i++) {
            for (let j = 0; j < GRID_SIZE; j++) {
                prefilled[i][j] = this.grid[i][j] !== 0;
            }
        }
        
        return prefilled;
    }

    /**
     * Crée le masque de cellules pré-remplies avec distribution uniforme
     * @private
     */
    _createPrefilledMask(difficulty) {
        const config = DIFFICULTY_CONFIG[difficulty];
        const cellsToKeep = config.cellsToKeep;
        const cellsToRemove = TOTAL_CELLS - cellsToKeep;
        
        // Créer une liste de toutes les positions
        const positions = [];
        for (let i = 0; i < GRID_SIZE; i++) {
            for (let j = 0; j < GRID_SIZE; j++) {
                positions.push([i, j]);
            }
        }
        
        // Mélanger VRAIMENT aléatoirement avec Fisher-Yates
        for (let i = positions.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [positions[i], positions[j]] = [positions[j], positions[i]];
        }
        
        // Retirer les cellules selon l'ordre mélangé
        for (let k = 0; k < cellsToRemove; k++) {
            const [i, j] = positions[k];
            this.grid[i][j] = 0;
        }
        
        // Créer le masque de cellules pré-remplies
        const prefilled = this._createEmptyGrid();
        for (let i = 0; i < GRID_SIZE; i++) {
            for (let j = 0; j < GRID_SIZE; j++) {
                prefilled[i][j] = this.grid[i][j] !== 0;
            }
        }
        
        return prefilled;
    }

    /**
     * Mélange un tableau (Fisher-Yates)
     * @private
     */
    _shuffleArray(array) {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    }
}