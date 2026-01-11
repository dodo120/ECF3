# Stratégie d’automatisation des tests – MediBook

## Introduction et objectifs de l’automatisation

HealthTech Solutions est une startup française évoluant dans le domaine de la e-santé. Elle développe **MediBook**, une application web dédiée à la prise de rendez-vous médicaux en ligne. À ce jour, l’ensemble des activités de tests est réalisé manuellement par l’équipe QA, ce qui engendre des délais importants et rend difficile le respect du rythme de livraison des nouvelles versions.

Afin d’améliorer l’efficacité du processus de validation, l’équipe souhaite mettre en place une stratégie d’automatisation des tests avec les objectifs suivants :

- Réduire le temps de validation d’une release de **5 jours à 1 jour**
- Diminuer par **5 le nombre de régressions en production**
- Atteindre **60 % de couverture de tests automatisés**

Cette stratégie vise à identifier les tests les plus pertinents à automatiser, à définir un périmètre clair et à structurer l’organisation du projet d’automatisation.

L’automatisation présente de nombreux bénéfices : elle permet une exécution rapide et fréquente des tests, une détection précoce des anomalies et la possibilité de lancer plusieurs campagnes simultanément. Elle libère également les testeurs des tâches répétitives, limitant ainsi les erreurs humaines. Les rapports générés sont exploitables par l’ensemble des parties prenantes (QA, développeurs, managers) et contribuent à une amélioration continue de la qualité logicielle. Enfin, la détection anticipée des défauts réduit la dette technique et sécurise les mises en production.

---

## Périmètre de l’automatisation

### 1. Types de tests à automatiser

Afin d’atteindre l’objectif de couverture automatisée de 60 %, il est essentiel de prioriser les tests à forte valeur ajoutée, fréquemment exécutés et suffisamment stables. Deux notions clés doivent être prises en compte :

- **Observabilité** : capacité à analyser le comportement du système via des logs et métriques
- **Contrôlabilité** : aptitude à préparer et ajuster les conditions de test

Les catégories de tests suivantes seront automatisées :

- **Tests unitaires (TU)**  
  Rapides à exécuter et simples à automatiser, ils permettent d’identifier les anomalies très tôt dans le cycle de développement. L’objectif est d’automatiser **100 % des tests unitaires** sur les composants React (frontend) et les services Node.js (backend).

- **Tests API**  
  Essentiels pour valider les échanges entre le frontend et le backend, ces tests sont généralement stables et critiques. Ils couvriront notamment les endpoints liés à l’authentification et à la prise de rendez-vous.

- **Tests de régression**  
  Les parcours utilisateurs sensibles (inscription, recherche de praticien, prise et confirmation de rendez-vous) seront automatisés afin de réduire les risques de régression lors des mises en production.

- **Smoke tests**  
  Ces tests rapides permettront de vérifier les fonctionnalités clés (connexion, accès aux pages principales) en pré-production avant tout déploiement.

- **Tests End-to-End (E2E)**  
  Plus complexes et coûteux à maintenir, ils seront intégrés progressivement dans une phase ultérieure.

Cette approche permettra d’atteindre l’objectif global en se concentrant sur :

- 100 % des tests unitaires des fonctionnalités critiques
- 80 % des tests API
- Les parcours métier essentiels en régression
- Les smoke tests

#### Plan de déploiement proposé

- **Phase 1 (Sprints 1–2)** : automatisation des tests unitaires et API
- **Phase 2 (Sprints 3–4)** : automatisation des parcours critiques de régression
- **Phase 3 (Sprint 5)** : mise en place des smoke tests
- **Phases suivantes** : extension progressive aux tests E2E

---

### 2. Critères d’éligibilité

L’automatisation répond à plusieurs enjeux : les tests manuels sont chronophages, répétitifs et sujets aux erreurs humaines. Corriger un bug détecté tardivement est également bien plus coûteux qu’une correction anticipée. Dans un contexte Agile, où les livraisons sont fréquentes, les tests continus deviennent indispensables.

Un test est éligible à l’automatisation s’il répond aux critères suivants :

- Exécuté de manière répétitive à chaque release
- Stable et basé sur une fonctionnalité mature
- Critique d’un point de vue métier
- Long ou complexe à exécuter manuellement
- Facilement intégrable dans un pipeline CI/CD

---

### 3. Environnements cibles

Les tests automatisés seront exécutés sur plusieurs environnements afin de garantir une qualité continue :

- **DEV**  
  Environnement destiné aux tests unitaires et d’intégration, permettant aux développeurs de valider rapidement leurs modifications.

- **RECETTE**  
  Utilisé pour les tests fonctionnels automatisés et les scénarios BDD, en collaboration avec les équipes QA et PO.

- **PRE-PROD**  
  Environnement de validation finale avant la mise en production, notamment pour l’exécution des smoke tests.

La fiabilité des tests repose sur une bonne maîtrise des environnements et des données. Les jeux de données devront être dédiés, anonymisés et versionnés. L’utilisation de Docker permettra de provisionner des environnements éphémères et reproductibles, avec des données isolées pour chaque contexte.

---

### 4. Choix des outils d’automatisation

Les outils sélectionnés doivent être compatibles avec l’architecture technique de MediBook et répondre aux exigences de performance et de fiabilité :

- **Tests UI** : Playwright  
  Adapté aux applications React, rapide, multi-navigateurs et facilement intégrable en CI/CD.

- **Tests API** : Postman  
  Permet de valider les endpoints du backend Node.js et de s’intégrer aux pipelines d’intégration continue.

- **Gestion et traçabilité** : Xray Jira  
  Centralisation des campagnes de tests et suivi des anomalies.

- **CI/CD** : Github CI  
  Exécution automatique des tests à chaque commit et orchestration des pipelines via Docker.

---

## Organisation

### 1. Analyse de l’organisation Agile

HealthTech Solutions adopte une méthodologie Agile, favorisant des livraisons fréquentes et une validation rapide des incréments. Cette approche est particulièrement adaptée à l’automatisation, car elle encourage la collaboration entre développeurs, testeurs et PO autour des critères d’acceptation.

Cependant, elle implique une maintenance continue des scripts automatisés et une communication fluide entre les équipes afin d’anticiper les impacts des évolutions fonctionnelles.

---

### 2. Intégration du Shift-Left Testing

Le **shift-left testing** consiste à intégrer les activités de test le plus tôt possible dans le cycle de développement. Les tests unitaires et d’intégration sont automatisés dès la phase de développement et exécutés via le pipeline CI/CD.

Cette approche permet de détecter rapidement les anomalies, de réduire les coûts de correction et d’améliorer la qualité globale du produit, tout en s’inscrivant dans une logique DevOps.

---

### 3. Utilisation du BDD avec Gherkin

Le **Behavior Driven Development (BDD)** facilite la collaboration entre les équipes techniques et fonctionnelles grâce à l’utilisation d’un langage naturel structuré (Gherkin).

#### Scénario 1 : Inscription d'un patient

```gherkin
Fonctionnalité: Inscription patient

  Scénario: Inscription réussie
    Etant donné que je suis sur la page d'inscription
    Quand je saisis "Test" dans le champ "Prénom"
    Et je saisis "Automatise" dans le champ "Nom"
    Et je saisis "test.auto@email.com" dans le champ "Email"
    Et je saisis "Password123!" dans le champ "Mot de passe"
    Et je saisis "Password123!" dans le champ "Confirmer le mot de passe"
    Et je coche "J'accepte les CGU"
    Et je clique sur "Créer mon compte"
    Alors je vois le message "Compte créé avec succès"

  Scénario: Inscription échouée - Email déjà utilisé
    Etant donné que je suis sur la page d'inscription
    Quand je saisis un email déjà existant "jean.dupont@email.com"
    Et je remplis les autres champs correctement
    Et je clique sur "Créer mon compte"
    Alors je vois le message d'erreur "Email déjà utilisé"
```

#### Scénario 2 : Recherche de praticien

```gherkin
Fonctionnalité: Recherche de praticien

  Scénario: Recherche par spécialité et ville
    Etant donné que je suis sur la page de recherche
    Quand je sélectionne "Médecin généraliste" dans le filtre spécialité
    Et je saisis "Paris" dans le champ ville
    Et je clique sur "Rechercher"
    Alors je vois une liste de praticiens
    Et chaque résultat affiche le nom, la spécialité et la ville

  Scénario: Recherche sans résultat
    Etant donné que je suis sur la page de recherche
    Quand je recherche un "Cardiologue" à "Village Inexistant"
    Alors je vois le message "Aucun praticien trouvé"
```

#### Scénario 3 : Prise de rendez-vous

```gherkin
Fonctionnalité: Prise de rendez-vous

  Scénario: Réservation d'un créneau
    Etant donné que je suis connecté comme patient
    Et que je suis sur la page du Dr. Claire Martin
    Quand je sélectionne une date disponible
    Et je sélectionne un créneau horaire
    Et je clique sur "Confirmer le rendez-vous"
    Alors je vois le message "Rendez-vous confirmé"
    Et le rendez-vous apparaît dans "Mes rendez-vous"
```
Cette approche garantit une meilleure compréhension des exigences, une traçabilité renforcée et une automatisation alignée sur les besoins métier.

## Conclusion

La mise en œuvre d’une stratégie d’automatisation des tests pour MediBook représente un levier majeur pour atteindre les objectifs de qualité de HealthTech Solutions. En réduisant les délais de validation, en limitant les régressions et en atteignant une couverture automatisée de 60 %, l’entreprise pourra sécuriser ses livraisons tout en gagnant en efficacité.

La priorisation des tests unitaires, API et des parcours critiques, combinée à une intégration dans un pipeline CI/CD robuste, permettra d’améliorer durablement la qualité du produit. L’adoption du shift-left testing et du BDD renforcera la collaboration entre les équipes, tandis que la maîtrise des environnements et des données assurera la stabilité des campagnes de tests.

Cette stratégie constitue ainsi un socle solide pour une automatisation progressive, efficace et pérenne.