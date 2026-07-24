# CRUD Produits - IndexedDB

En avançant sur JavaScript, Node.js et NestJS, j'ai réalisé qu'il était important de renforcer mes bases. Ce dépôt retrace mon apprentissage d'IndexedDB, d'une implémentation simple d'un CRUD jusqu'à une architecture plus propre.

Chaque version correspond à une étape d'apprentissage volontairement isolée : plutôt que de tout construire d'un coup, j'ajoute une couche de complexité à la fois (stockage → interface → filtres → architecture) pour bien comprendre ce que chaque étape résout.

## Fonctionnalités actuelles (v2)

- **CRUD complet** sur les produits : création, modification, suppression, via l'API IndexedDB native (sans wrapper comme Dexie.js).
- **Stockage d'images en `Blob`/`File`** directement dans IndexedDB, avec génération d'URL à l'affichage (`URL.createObjectURL`).
- **Catégories** liées aux produits par `category_id`, gérées dans leur propre object store.
- **Interface responsive** en Tailwind CSS (CDN), avec une modale d'ajout/édition en JavaScript pur (pas de librairie UI).
- **Filtres de base** : recherche texte par nom, filtre par catégorie (mobile + desktop synchronisés).
- Composants HTML générés dynamiquement (`insertAdjacentHTML`) plutôt qu'écrits en dur, pour préparer le terrain aux versions suivantes.

## Stack technique

| | |
|---|---|
| Stockage | IndexedDB (API native du navigateur) |
| Frontend | HTML, JavaScript (ES Modules), Tailwind CSS (CDN) |
| Aucune dépendance npm | Le projet tourne sans étape de build |

## Structure du projet

```
CRUD_PRODUCTS/
├── index.html
├── app.js                          # Orchestration : événements, filtres, ouverture/fermeture modale
└── src/
    └── database/
        ├── db.js                   # Connexion IndexedDB (open, upgrade, versionning)
        ├── productCRUD.js          # add / get / getAll / update / delete produits
        ├── categories.js           # CRUD catégories + peuplement des <select>
        ├── productDisplay.js       # Génération du HTML d'une carte produit
        ├── addProductModalContent.js  # Template + logique du formulaire d'ajout
        ├── editProductForm.js      # Template + logique du formulaire d'édition
        └── filterProducts.js       # Recherche, filtre catégorie, prix, stock
```

## Lancer le projet

Comme le projet utilise des `import`/`export` (ES Modules), il doit être servi par un vrai serveur local - **pas en ouvrant `index.html` directement** (`file://`), sinon les modules ne se chargeront pas.

1. Ouvrir le dossier du projet dans VS Code.
2. Clic droit sur `index.html` → **Open with Live Server** (extension VS Code).

Le navigateur s'ouvre automatiquement sur l'URL locale correspondante.

## Roadmap

| Version | Contenu | Statut |
|---|---|---|
| **v1** | Découverte de l'architecture IndexedDB : connexion, `object store`, transactions, CRUD produits minimal | Terminé |
| **v2** | Interface complète (modale, affichage, images), filtres de base (recherche, catégorie) | Terminé |
| **v2.1** | Filtres avancés : prix min/max, tri croissant/décroissant, disponibilité en stock | À venir |
| **v3** | Refonte en architecture MVC (séparation claire Modèle / Vue / Contrôleur) | À venir |

## Ce que j'en retiens

Ce projet m'a surtout servi à comprendre des mécanismes JS que j'utilisais sans toujours en maîtriser le fonctionnement interne :

- **La différence entre un callback et une Promise**, et pourquoi l'API IndexedDB doit systématiquement être enveloppée dans `new Promise(resolve, reject)` pour être utilisable avec `async`/`await`.
- **Pourquoi un `return` manquant dans une fonction fléchée avec accolades `{ }` casse silencieusement toute une chaîne asynchrone** - sans erreur visible, juste un `undefined` qui se propage.
- **La gestion d'état partagé** : dupliquer une variable comme `products` dans plusieurs scopes locaux (au lieu d'une seule source de vérité rechargée après chaque écriture) est une source de bugs difficiles à diagnostiquer, parce que rien ne plante - les données sont juste silencieusement obsolètes.
- **La délégation d'événements** est indispensable dès que le DOM est régénéré dynamiquement (`innerHTML`) : un `addEventListener` posé directement sur un élément recréé ne survit jamais à son remplacement.
- **IndexedDB peut stocker des `Blob`/`File` nativement** - inutile de passer par du base64 pour de simples images locales.

## Auteure

Zéïnab Aly Camara - Etudiante en M1 Informatique (Génie Logiciel) à l'Université de Montpellier, à la recherche d'une alternance.