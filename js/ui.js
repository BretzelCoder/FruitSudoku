/**
 * Gestion de l'interface utilisateur
 */

class SudokuUI {
    constructor(game) {
        this.game = game;
        this.elements = this._getElements();
        this._setupEventListeners();
        this._setupLanguageSelector();
        this._initializeThemeButtons();
        this.updateAllTranslations();
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
     * Configure le sélecteur de langue (dropdown)
     * @private
     */
    _setupLanguageSelector() {
        const dropdownBtn = document.getElementById('langDropdownBtn');
        const dropdownMenu = document.getElementById('langDropdownMenu');
        const currentFlag = document.getElementById('currentFlag');
        const langOptions = document.querySelectorAll('.lang-option');
        
        // Mapping des langues vers les drapeaux
        const languageFlags = {
            'fr': '🇫🇷',
            'en': '🇬🇧',
            'de': '🇩🇪'
        };
        
        // Mettre à jour le drapeau actuel et marquer l'option active
        const updateCurrentLanguage = (lang) => {
            const flag = languageFlags[lang];
            if (flag) {
                currentFlag.textContent = flag;
            }
            
            // Marquer l'option active
            langOptions.forEach(option => {
                option.classList.toggle('active', option.dataset.lang === lang);
            });
        };
        
        // Initialiser avec la langue actuelle
        const currentLang = i18n.getLanguage();
        updateCurrentLanguage(currentLang);
        
        // Toggle du menu dropdown
        dropdownBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            const isOpen = !dropdownMenu.classList.contains('hidden');
            
            if (isOpen) {
                dropdownMenu.classList.add('hidden');
                dropdownBtn.classList.remove('open');
            } else {
                dropdownMenu.classList.remove('hidden');
                dropdownBtn.classList.add('open');
            }
        });
        
        // Fermer le dropdown si on clique ailleurs
        document.addEventListener('click', (e) => {
            if (!dropdownMenu.contains(e.target) && e.target !== dropdownBtn) {
                dropdownMenu.classList.add('hidden');
                dropdownBtn.classList.remove('open');
            }
        });
        
        // Gestion du clic sur une option de langue
        langOptions.forEach(option => {
            option.addEventListener('click', () => {
                const lang = option.dataset.lang;
                
                // Changer la langue
                this._onLanguageChange(lang);
                
                // Mettre à jour l'affichage
                updateCurrentLanguage(lang);
                
                // Fermer le dropdown
                dropdownMenu.classList.add('hidden');
                dropdownBtn.classList.remove('open');
            });
        });
    }

    /**
     * Gestion du changement de langue
     * @private
     */
    _onLanguageChange(lang) {
        console.log(`Changement de langue vers: ${lang}`);
        
        // Changer la langue
        i18n.setLanguage(lang);
        
        // Mettre à jour les boutons
        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.lang === lang);
        });
        
        // Mettre à jour toutes les traductions
        this.updateAllTranslations();
        
        // Mettre à jour l'attribut lang du HTML
        document.documentElement.lang = lang;
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
            
            const translatedName = i18n.t(theme.nameKey);
            btn.textContent = `${theme.icons[0]}${theme.icons[5] || theme.icons[1]} ${translatedName}`;
            
            if (themeId === this.game.currentTheme) {
                btn.classList.add('active');
            }
            
            btn.addEventListener('click', () => this._onThemeChange(themeId));
            
            container.appendChild(btn);
        });
    }

    /**
     * Met à jour les boutons de thème avec les traductions
     * @private
     */
    _updateThemeButtons() {
        document.querySelectorAll('.theme-btn[data-theme]').forEach(btn => {
            const themeId = btn.dataset.theme;
            const theme = THEMES[themeId];
            if (theme) {
                const translatedName = i18n.t(theme.nameKey);
                btn.textContent = `${theme.icons[0]}${theme.icons[5] || theme.icons[1]} ${translatedName}`;
            }
        });
    }

    /**
     * Met à jour toutes les traductions de la page
     */
    updateAllTranslations() {
        // Traductions automatiques via data-i18n
        i18n.updatePageTranslations();
        
        // Mettre à jour les éléments dynamiques
        this.updateThemeLegend();
        this._updateThemeButtons();
        
        // Mettre à jour les infos de jeu si une partie est en cours
        if (!this.elements.gameScreen.classList.contains('hidden')) {
            this.updateGameInfo();
        }
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
            
            const labelKey = theme.labelKeys[index];
            const translatedLabel = i18n.t(labelKey);
            
            item.innerHTML = `
                <span class="legend-icon">${icon}</span>
                <span>${translatedLabel} = ${index + 1}</span>
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
        
        const translatedThemeName = i18n.t(theme.nameKey);
        const translatedDifficultyLabel = i18n.t(DIFFICULTY_CONFIG[difficulty]?.labelKey);
        
        this.elements.currentTheme.textContent = translatedThemeName;
        this.elements.currentLevel.textContent = translatedDifficultyLabel || '-';
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
        this.elements.finalLevel.textContent = i18n.t(DIFFICULTY_CONFIG[this.game.state.difficulty]?.labelKey);
        
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
        console.log(`Cellule cliquée: ligne ${row}, colonne ${col}`);
        
        const success = this.game.selectCell(row, col);
        
        if (!success) {
            console.log('Cellule non sélectionnable (pré-remplie)');
            return;
        }
        
        // Retirer toutes les sélections
        document.querySelectorAll('.sudoku-cell').forEach(cell => {
            cell.classList.remove('selected');
        });
        
        // Sélectionner la nouvelle cellule
        clickedCell.classList.add('selected');
        console.log('Cellule sélectionnée avec succès');
        
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
        console.log(`Symbole cliqué: ${value}`);
        
        if (!this.game.state.selectedCell) {
            this.showMessage(i18n.t('msg.selectCell'), MESSAGE_TYPES.WARNING);
            return;
        }
        
        const result = this.game.placeValue(value);
        
        if (!result.success) {
            const errorMsg = result.errorKey ? i18n.t(result.errorKey) : result.error;
            this.showMessage(errorMsg, MESSAGE_TYPES.ERROR);
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
            console.log('Cellule effacée');
        } else {
            // Placer le symbole
            cell.textContent = theme.icons[value - 1];
            cell.classList.remove('hint');
            
            if (!result.isValid) {
                // Afficher l'erreur
                cell.classList.add('error');
                setTimeout(() => cell.classList.remove('error'), ANIMATION_DURATIONS.ERROR_SHAKE);
                console.log('Placement invalide');
            } else {
                cell.classList.remove('error');
                console.log('Placement valide');
                
                if (result.isComplete) {
                    // Victoire !
                    console.log('Grille complète - Victoire !');
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
        console.log(`Démarrage d'une nouvelle partie en mode: ${difficulty}`);
        
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
            
            console.log('Partie démarrée avec succès');
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
            const errorMsg = result.errorKey ? i18n.t(result.errorKey) : result.error;
            this.showMessage(errorMsg, MESSAGE_TYPES.WARNING);
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
            this.elements.verifyStatus.textContent = i18n.t('msg.noCellFilled');
            this.elements.verifyStatus.style.color = '#7f8c8d';
        } else if (result.incorrect === 0) {
            this.elements.verifyStatus.textContent = `${result.correct}/${result.totalFilled} ✓`;
            this.elements.verifyStatus.style.color = '#27ae60';
            this.showMessage(i18n.t('msg.allCorrect'), MESSAGE_TYPES.SUCCESS);
        } else {
            this.elements.verifyStatus.textContent = `${result.correct}/${result.totalFilled} (${result.incorrect} ${i18n.t('msg.errorsFound')})`;
            this.elements.verifyStatus.style.color = '#e74c3c';
            this.showMessage(`${result.incorrect} ${i18n.t('msg.errorsFound')}`, MESSAGE_TYPES.WARNING);
        }
    }

    /**
     * Gestion du changement de thème
     * @private
     */
    _onThemeChange(themeId) {
        console.log(`Changement de thème vers: ${themeId}`);
        
        this.game.changeTheme(themeId);
        
        // Mettre à jour tous les boutons de thème
        document.querySelectorAll('.theme-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.theme === themeId);
        });
        
        // Mettre à jour l'affichage
        this.updateThemeLegend();
        const translatedName = i18n.t(THEMES[themeId].nameKey);
        this.elements.currentTheme.textContent = translatedName;
        
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
        if (confirm(i18n.t('msg.confirmRestart'))) {
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