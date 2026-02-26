/**
 * Gestion de l'interface utilisateur
 */

class SudokuUI {
    constructor(game) {
        this.game = game;
        this.elements = this._getElements();
        this._setupEventListeners();
        this._initializeThemeButtons();
    }

    /**
     * Récupère tous les éléments DOM nécessaires
     * @private
     */
    _getElements() {
        return {
            // Écrans
            menuScreen: document.getElementById('menuScreen'),
            gameScreen: document.getElementById('gameScreen'),
            
            // Modals
            victoryModal: document.getElementById('victoryModal'),
            themeModal: document.getElementById('themeModal'),
            
            // Grille et sélecteur
            sudokuGrid: document.getElementById('sudokuGrid'),
            symbolSelector: document.getElementById('symbolSelector'),
            
            // Info de jeu
            timer: document.getElementById('timer'),
            helpCount: document.getElementById('helpCount'),
            currentTheme: document.getElementById('currentTheme'),
            currentLevel: document.getElementById('currentLevel'),
            verifyStatus: document.getElementById('verifyStatus'),
            
            // Boutons de contrôle
            hintBtn: document.getElementById('hintBtn'),
            verifyBtn: document.getElementById('verifyBtn'),
            themeSwitchBtn: document.getElementById('themeSwitchBtn'),
            restartBtn: document.getElementById('restartBtn'),
            menuBtn: document.getElementById('menuBtn'),
            
            // Stats de victoire
            finalTime: document.getElementById('finalTime'),
            finalHelps: document.getElementById('finalHelps'),
            finalLevel: document.getElementById('finalLevel'),
            victoryMenuBtn: document.getElementById('victoryMenuBtn'),
            
            // Thème
            themeLegend: document.getElementById('themeLegend'),
            menuThemeButtons: document.getElementById('menuThemeButtons'),
            modalThemeButtons: document.getElementById('modalThemeButtons'),
            closeThemeModalBtn: document.getElementById('closeThemeModalBtn')
        };
    }

    /**
     * Configure les écouteurs d'événements
     * @private
     */
    _setupEventListeners() {
        // Boutons de difficulté
        document.querySelectorAll('.difficulty-btn[data-difficulty]').forEach(btn => {
            btn.addEventListener('click', () => {
                const difficulty = btn.dataset.difficulty;
                this._onStartGame(difficulty);
            });
        });

        // Boutons de contrôle
        this.elements.hintBtn.addEventListener('click', () => this._onUseHint());
        this.elements.verifyBtn.addEventListener('click', () => this._onVerify());
        this.elements.themeSwitchBtn.addEventListener('click', () => this._onShowThemeModal());
        this.elements.restartBtn.addEventListener('click', () => this._onRestart());
        this.elements.menuBtn.addEventListener('click', () => this._onShowMenu());
        
        // Modal de victoire
        this.elements.victoryMenuBtn.addEventListener('click', () => this._onShowMenu());
        
        // Modal de thème
        this.elements.closeThemeModalBtn.addEventListener('click', () => this._onCloseThemeModal());
    }

    /**
     * Initialise les boutons de thème
     * @private
     */
    _initializeThemeButtons() {
        // Créer les boutons de thème pour le menu
        this._createThemeButtons(this.elements.menuThemeButtons);
        
        // Créer les boutons de thème pour le modal
        this._createThemeButtons(this.elements.modalThemeButtons);
        
        // Mettre à jour la légende
        this.updateThemeLegend();
    }

    /**
     * Crée les boutons de thème
     * @private
     */
    _createThemeButtons(container) {
        container.innerHTML = '';
        
        Object.keys(THEMES).forEach(themeId => {
            const theme = THEMES[themeId];
            const btn = document.createElement('button');
            btn.className = 'theme-btn';
            btn.dataset.theme = themeId;
            btn.textContent = `${theme.icons[0]}${theme.icons[5] || theme.icons[1]} ${theme.name}`;
            
            if (themeId === this.game.currentTheme) {
                btn.classList.add('active');
            }
            
            btn.addEventListener('click', () => this._onThemeChange(themeId));
            
            container.appendChild(btn);
        });
    }

    /**
     * Met à jour la légende des thèmes
     */
    updateThemeLegend() {
        const theme = this.game.getCurrentTheme();
        this.elements.themeLegend.innerHTML = '';
        
        theme.icons.forEach((icon, index) => {
            const item = document.createElement('div');
            item.className = 'legend-item';
            item.innerHTML = `
                <span class="legend-icon">${icon}</span>
                <span>${theme.labels[index]} = ${index + 1}</span>
            `;
            this.elements.themeLegend.appendChild(item);
        });
    }

    /**
     * Affiche l'écran de jeu
     */
    showGameScreen() {
        this.elements.menuScreen.classList.add('hidden');
        this.elements.gameScreen.classList.remove('hidden');
        this.elements.victoryModal.classList.add('hidden');
        this.elements.themeModal.classList.add('hidden');
    }

    /**
     * Affiche l'écran de menu
     */
    showMenuScreen() {
        this.game.stopTimer();
        this.elements.gameScreen.classList.add('hidden');
        this.elements.victoryModal.classList.add('hidden');
        this.elements.themeModal.classList.add('hidden');
        this.elements.menuScreen.classList.remove('hidden');
    }

    /**
     * Crée la grille de jeu
     */
    createGrid() {
        this.elements.sudokuGrid.innerHTML = '';
        
        for (let i = 0; i < GRID_SIZE; i++) {
            for (let j = 0; j < GRID_SIZE; j++) {
                const cell = this._createCell(i, j);
                this.elements.sudokuGrid.appendChild(cell);
            }
        }
    }

    /**
     * Crée une cellule
     * @private
     */
    _createCell(row, col) {
        const cell = document.createElement('div');
        cell.className = 'sudoku-cell';
        cell.dataset.row = row;
        cell.dataset.col = col;
        
        const value = this.game.state.grid[row][col];
        const isPrefilled = this.game.state.prefilled[row][col];
        
        if (isPrefilled && value !== 0) {
            cell.classList.add('prefilled');
            const theme = this.game.getCurrentTheme();
            cell.textContent = theme.icons[value - 1];
        }
        
        cell.addEventListener('click', () => this._onCellClick(row, col, cell));
        
        return cell;
    }

    /**
     * Crée le sélecteur de symboles
     */
    createSymbolSelector() {
        this.elements.symbolSelector.innerHTML = '';
        const theme = this.game.getCurrentTheme();
        
        theme.icons.forEach((icon, index) => {
            const btn = document.createElement('div');
            btn.className = 'symbol-btn';
            btn.textContent = icon;
            btn.dataset.value = index + 1;
            
            btn.addEventListener('click', () => this._onSymbolClick(index + 1));
            
            this.elements.symbolSelector.appendChild(btn);
        });
    }

    /**
     * Met à jour l'affichage de la grille avec le nouveau thème
     */
    updateGridTheme() {
        const theme = this.game.getCurrentTheme();
        
        document.querySelectorAll('.sudoku-cell').forEach(cell => {
            const row = parseInt(cell.dataset.row);
            const col = parseInt(cell.dataset.col);
            const value = this.game.state.grid[row][col];
            
            if (value !== 0) {
                cell.textContent = theme.icons[value - 1];
            }
        });
    }

    /**
     * Met à jour les informations de jeu
     */
    updateGameInfo() {
        const theme = this.game.getCurrentTheme();
        const difficulty = this.game.state.difficulty;
        
        this.elements.currentTheme.textContent = theme.name;
        this.elements.currentLevel.textContent = DIFFICULTY_CONFIG[difficulty]?.label || '-';
        this.elements.helpCount.textContent = this.game.state.helpUsed;
        this.elements.verifyStatus.textContent = '-';
        this.elements.verifyStatus.style.color = '#2c3e50';
    }

    /**
     * Affiche le modal de victoire
     */
    showVictoryModal() {
        this.game.stopTimer();
        const stats = this.game.getGameStats();
        
        this.elements.finalTime.textContent = stats.time;
        this.elements.finalHelps.textContent = stats.helps;
        this.elements.finalLevel.textContent = stats.difficultyLabel;
        
        this.elements.victoryModal.classList.remove('hidden');
    }

    /**
     * Affiche un message temporaire
     */
    showMessage(message, type = MESSAGE_TYPES.INFO) {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'temp-message';
        messageDiv.textContent = message;
        messageDiv.dataset.type = type;
        
        document.body.appendChild(messageDiv);
        
        // Animation d'entrée
        setTimeout(() => messageDiv.classList.add('show'), 10);
        
        // Retrait du message
        setTimeout(() => {
            messageDiv.classList.remove('show');
            setTimeout(() => {
                if (messageDiv.parentElement) {
                    messageDiv.parentElement.removeChild(messageDiv);
                }
            }, ANIMATION_DURATIONS.MESSAGE_FADE);
        }, ANIMATION_DURATIONS.MESSAGE_DISPLAY);
    }

    /**
     * Gestion du clic sur une cellule
     * @private
     */
    _onCellClick(row, col, clickedCell) {
        console.log(`Cellule cliquée: ligne ${row}, colonne ${col}`); // Debug
        
        const success = this.game.selectCell(row, col);
        
        if (!success) {
            console.log('Cellule non sélectionnable (pré-remplie)'); // Debug
            return;
        }
        
        // Retirer toutes les sélections
        document.querySelectorAll('.sudoku-cell').forEach(cell => {
            cell.classList.remove('selected');
        });
        
        // Sélectionner la nouvelle cellule
        clickedCell.classList.add('selected');
        console.log('Cellule sélectionnée avec succès'); // Debug
        
        // Retirer la sélection des symboles
        document.querySelectorAll('.symbol-btn').forEach(btn => {
            btn.classList.remove('selected');
        });
    }

    /**
     * Gestion du clic sur un symbole
     * @private
     */
    _onSymbolClick(value) {
        console.log(`Symbole cliqué: ${value}`); // Debug
        
        if (!this.game.state.selectedCell) {
            this.showMessage('Sélectionnez d\'abord une cellule !', MESSAGE_TYPES.WARNING);
            return;
        }
        
        const result = this.game.placeValue(value);
        
        if (!result.success) {
            this.showMessage(result.error, MESSAGE_TYPES.ERROR);
            return;
        }
        
        const { row, col } = this.game.state.selectedCell;
        const cell = document.querySelector(`[data-row="${row}"][data-col="${col}"]`);
        const theme = this.game.getCurrentTheme();
        
        // Mettre à jour la sélection visuelle des symboles
        document.querySelectorAll('.symbol-btn').forEach(btn => {
            btn.classList.toggle('selected', parseInt(btn.dataset.value) === value);
        });
        
        if (result.cellCleared) {
            // Effacer la cellule
            cell.textContent = '';
            cell.classList.remove('error', 'hint');
            console.log('Cellule effacée'); // Debug
        } else {
            // Placer le symbole
            cell.textContent = theme.icons[value - 1];
            cell.classList.remove('hint');
            
            if (!result.isValid) {
                // Afficher l'erreur
                cell.classList.add('error');
                setTimeout(() => cell.classList.remove('error'), ANIMATION_DURATIONS.ERROR_SHAKE);
                console.log('Placement invalide'); // Debug
            } else {
                cell.classList.remove('error');
                console.log('Placement valide'); // Debug
                
                if (result.isComplete) {
                    // Victoire !
                    console.log('Grille complète - Victoire !'); // Debug
                    setTimeout(() => this.showVictoryModal(), 500);
                }
            }
        }
    }

    /**
     * Gestion du démarrage d'une partie
     * @private
     */
    _onStartGame(difficulty) {
        console.log(`Démarrage d'une nouvelle partie en mode: ${difficulty}`); // Debug
        
        try {
            this.game.startNewGame(difficulty);
            this.showGameScreen();
            this.updateGameInfo();
            this.createGrid();
            this.createSymbolSelector();
            
            // Démarrer le timer
            this.game.startTimer((time) => {
                this.elements.timer.textContent = time;
            });
            
            console.log('Partie démarrée avec succès'); // Debug
        } catch (error) {
            console.error('Erreur lors du démarrage de la partie:', error);
            this.showMessage('Erreur lors du démarrage de la partie', MESSAGE_TYPES.ERROR);
        }
    }

    /**
     * Gestion de l'utilisation d'une aide
     * @private
     */
    _onUseHint() {
        const result = this.game.useHint();
        
        if (!result.success) {
            this.showMessage(result.error, MESSAGE_TYPES.WARNING);
            return;
        }
        
        const { row, col } = this.game.state.selectedCell;
        const cell = document.querySelector(`[data-row="${row}"][data-col="${col}"]`);
        const theme = this.game.getCurrentTheme();
        
        cell.textContent = theme.icons[result.value - 1];
        cell.classList.add('hint');
        cell.classList.remove('error');
        
        this.elements.helpCount.textContent = result.totalHelps;
        
        if (result.isComplete) {
            setTimeout(() => this.showVictoryModal(), 500);
        }
    }

    /**
     * Gestion de la vérification
     * @private
     */
    _onVerify() {
        const result = this.game.verifyGrid();
        
        // Effacer les classes précédentes
        document.querySelectorAll('.sudoku-cell').forEach(cell => {
            cell.classList.remove('correct', 'incorrect');
        });
        
        // Appliquer les nouvelles classes
        result.details.forEach(detail => {
            if (!detail.isPrefilled) {
                const cell = document.querySelector(`[data-row="${detail.row}"][data-col="${detail.col}"]`);
                if (cell) {
                    cell.classList.add(detail.isCorrect ? 'correct' : 'incorrect');
                    
                    setTimeout(() => {
                        cell.classList.remove('correct', 'incorrect');
                    }, ANIMATION_DURATIONS.CELL_FEEDBACK);
                }
            }
        });
        
        // Mettre à jour le statut
        if (result.totalFilled === 0) {
            this.elements.verifyStatus.textContent = 'Aucune case';
            this.elements.verifyStatus.style.color = '#7f8c8d';
        } else if (result.incorrect === 0) {
            this.elements.verifyStatus.textContent = `${result.correct}/${result.totalFilled} ✓`;
            this.elements.verifyStatus.style.color = '#27ae60';
            this.showMessage('🎉 Toutes les cases sont correctes !', MESSAGE_TYPES.SUCCESS);
        } else {
            this.elements.verifyStatus.textContent = `${result.correct}/${result.totalFilled} (${result.incorrect} erreurs)`;
            this.elements.verifyStatus.style.color = '#e74c3c';
            this.showMessage(`${result.incorrect} erreur(s) détectée(s)`, MESSAGE_TYPES.WARNING);
        }
    }

    /**
     * Gestion du changement de thème
     * @private
     */
    _onThemeChange(themeId) {
        console.log(`Changement de thème vers: ${themeId}`); // Debug
        
        this.game.changeTheme(themeId);
        
        // Mettre à jour tous les boutons de thème
        document.querySelectorAll('.theme-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.theme === themeId);
        });
        
        // Mettre à jour l'affichage
        this.updateThemeLegend();
        this.elements.currentTheme.textContent = THEMES[themeId].name;
        
        // Si une partie est en cours, mettre à jour la grille
        if (!this.elements.gameScreen.classList.contains('hidden')) {
            this.updateGridTheme();
            this.createSymbolSelector();
        }
        
        // Fermer le modal de thème si ouvert
        this._onCloseThemeModal();
    }

    /**
     * Gestion du redémarrage
     * @private
     */
    _onRestart() {
        if (confirm('Êtes-vous sûr de vouloir recommencer ?')) {
            this._onStartGame(this.game.state.difficulty);
        }
    }

    /**
     * Gestion du retour au menu
     * @private
     */
    _onShowMenu() {
        this.showMenuScreen();
    }

    /**
     * Gestion de l'affichage du modal de thème
     * @private
     */
    _onShowThemeModal() {
        this.elements.themeModal.classList.remove('hidden');
    }

    /**
     * Gestion de la fermeture du modal de thème
     * @private
     */
    _onCloseThemeModal() {
        this.elements.themeModal.classList.add('hidden');
    }
}