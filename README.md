# 📘 ECF3 – Automatisation des tests end-to-end avec Playwright

Ce projet a été réalisé dans le cadre de l’**ECF 3**.  
Il met en œuvre des **tests end-to-end (E2E)** automatisés avec **Playwright**, une **intégration CI/CD via GitHub Actions**, ainsi qu’une **gestion des données et de l’environnement grâce à Docker Compose**.

L’application testée est **Medibook**, démarrée localement via Docker.

---

## Prérequis

Avant de lancer le projet, assurez-vous d’avoir installé les outils suivants sur votre machine :

- **Node.js** (version LTS recommandée – v18 ou supérieure)
- **npm**
- **Docker**
- **Git**

---

## Structure du projet

```text

ECF3/
├── .github/
│ └── workflows/
│ └── tests.yml # Pipeline CI GitHub Actions
│
├── medibook/
│ ├── docker-compose.yml # Services Docker de l’application
│ └── ... # Code applicatif Medibook
│
├── tests/
│ └── tests/
│ ├── spec/ #Scénario de test
│ ├── pages/ #Déclaration des locators + fonction d'intéraction avec le DOM
│ └── data/ #Données de test
├── playwright.config.ts # Configuration Playwright
├── .gitignore
└── README.md
```
---

## 📦 Installation du projet

### 1 Cloner le dépôt

```bash
git clone https://github.com/dodo120/ECF3.git
cd ECF3/tests
```

### 2 Installer les dépendances Node.js
```bash
npm ci
```

### 3 Installer les navigateurs Playwright
```bash
npx playwright install --with-deps
```

## Lancer l’application Medibook
Les tests Playwright nécessitent que l’application Medibook soit démarrée.

```bash
cd ../medibook
docker compose up -d --build
```

## Lancer les tests Playwright
```bash
cd ../tests
npx playwright test
```

## Rapports de tests
Les rapports HTML générés par Playwright sont disponibles dans le dossier : /tests/playwright-report

## Arrêter l’application et nettoyer les données
Pour arrêter les containers Docker et supprimer toutes les données générées (bases de données, volumes, états persistants) :
```bash
cd ../medibook
docker compose down -v
```
Cette commande permet de :
- Arrêter tous les containers
- Supprimer les volumes et les données persistantes

## Gestion des données de test

La gestion des données de test est assurée via **Docker Compose** afin de garantir des tests reproductibles et un environnement propre à chaque exécution.

### Création des données de test

Les données nécessaires aux tests automatisés sont initialisées grâce au fichier : seed.sql

Ce script SQL est exécuté lors du démarrage des services Docker et permet :
- d’initialiser la base de données
- de créer des jeux de données de test cohérents
- de garantir un état connu et maîtrisé pour l’exécution des tests Playwright

Cette approche permet d’assurer la fiabilité des scénarios de test et d’éviter toute dépendance à des données persistantes ou manuelles.

### Nettoyage des données

Les données créées pour les tests ne sont pas conservées après l’exécution.  
Lors de l’arrêt des services avec la commande suivante :

```bash
docker compose down -v
```

- les containers Docker sont arrêtés
- les volumes sont supprimés
- l’ensemble des données générées (y compris celles issues de seed.sql) est supprimé

Cette méthode garantit que chaque nouvelle exécution des tests démarre sur un environnement propre, répondant ainsi aux bonnes pratiques de gestion des données de test.