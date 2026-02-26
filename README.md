# 🍎 Sudoku Fruits & Légumes 🥕

Un jeu de Sudoku moderne et coloré utilisant des fruits, légumes et autres thèmes amusants au lieu des chiffres traditionnels !

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)

## ✨ Fonctionnalités

- 🎨 **4 thèmes visuels** : Fruits & Légumes, Fruits uniquement, Légumes uniquement, Acteurs & Actrices
- 🎮 **3 niveaux de difficulté** : Facile (40 indices), Moyen (30 indices), Difficile (25 indices)
- 💡 **Système d'aide intelligent** : Obtenez la solution d'une case spécifique
- ✅ **Vérification en temps réel** : Vérifiez vos cases sans perdre votre progression
- ⏱️ **Chronomètre** : Suivez votre temps de résolution
- 📊 **Statistiques** : Temps, nombre d'aides, niveau de difficulté
- 🎯 **Interface moderne** : Design responsive avec animations fluides
- ♿ **Accessible** : Support clavier et optimisé pour tous les appareils

## 🚀 Installation

### Prérequis

- Un navigateur web moderne (Chrome, Firefox, Safari, Edge)
- Git (optionnel, pour cloner le projet)

### Méthode 1 : Cloner avec Git
```bash
# Cloner le projet
git clone https://github.com/votre-username/sudoku-fruits.git

# Se déplacer dans le dossier
cd sudoku-fruits

# Ouvrir index.html dans votre navigateur
```

### Méthode 2 : Téléchargement direct

1. Téléchargez le projet en ZIP
2. Extrayez l'archive
3. Ouvrez `index.html` dans votre navigateur

## 📁 Structure du Projet
```
sudoku-fruits/
├── index.html              # Page principale
├── css/
│   └── styles.css         # Feuille de styles
├── js/
│   ├── config.js          # Configuration et constantes
│   ├── sudoku-generator.js # Génération de grilles Sudoku
│   ├── game.js            # Logique de jeu
│   ├── ui.js              # Gestion de l'interface
│   └── main.js            # Point d'entrée
├── README.md              # Documentation
└── .gitignore             # Fichiers ignorés par Git
```

## 🎮 Comment Jouer

1. **Choisir un thème** : Sélectionnez votre thème préféré parmi les 4 disponibles
2. **Choisir la difficulté** : Facile, Moyen ou Difficile
3. **Remplir la grille** :
   - Cliquez sur une case vide
   - Sélectionnez un symbole dans le sélecteur en bas
   - Le symbole apparaît dans la case
4. **Utiliser les aides** :
   - Cliquez sur "💡 Aide" pour révéler une case
   - Cliquez sur "✅ Vérifier" pour valider vos réponses
5. **Changer de thème** : Vous pouvez changer de thème en cours de partie !

## 🛠️ Développement

### Architecture

Le projet suit une architecture modulaire pour une meilleure maintenabilité :

- **config.js** : Centralise toutes les configurations (thèmes, difficultés, constantes)
- **sudoku-generator.js** : Classe responsable de la génération des grilles
- **game.js** : Gestion de la logique métier (état du jeu, validations, timer)
- **ui.js** : Gestion de l'interface utilisateur et des événements
- **main.js** : Initialisation de l'application

### Technologies Utilisées

- HTML5
- CSS3 (avec variables CSS et animations)
- JavaScript ES6+ (Classes, Modules, Arrow Functions)
- Architecture Orientée Objet

### Bonnes Pratiques Implémentées

✅ Séparation des responsabilités (SoC)
✅ Code modulaire et réutilisable
✅ Gestion d'erreurs robuste
✅ Documentation avec JSDoc
✅ Responsive design
✅ Accessibilité (ARIA, focus management)
✅ Performance optimisée

## 🐛 Débogage

Pour activer les logs de développement, ouvrez la console du navigateur (F12).

## 📝 Améliorations Futures

- [ ] Sauvegarde automatique de la partie en cours
- [ ] Système de scores en ligne
- [ ] Plus de thèmes (animaux, drapeaux, etc.)
- [ ] Mode multijoueur
- [ ] Tutoriel interactif
- [ ] Support PWA (Progressive Web App)
- [ ] Modes de jeu supplémentaires (contre la montre, daily challenge)

## 🤝 Contribution

Les contributions sont les bienvenues ! N'hésitez pas à :

1. Fork le projet
2. Créer une branche (`git checkout -b feature/AmazingFeature`)
3. Commit vos changements (`git commit -m 'Add some AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## 👨‍💻 Auteur

Développé avec ❤️ par [Votre Nom]

## 🙏 Remerciements

- Merci à tous les testeurs
- Inspiré par les jeux de Sudoku classiques
- Emoji fournis par Unicode

---

**⭐ Si vous aimez ce projet, n'hésitez pas à lui donner une étoile sur GitHub !**