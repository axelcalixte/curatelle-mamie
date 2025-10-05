# Compte de gestion des biens pour l'année

[cours-appel.justice.fr](https://www.cours-appel.justice.fr/media/2572)

## Introduction

Ce projet a été réalisé dans le but d'aider ma mère, responsable de ma grand-mère par curatelle, à renseigner les pages 4 à 6 du formulaire de compte de gestion des biens.
Ma mère tenait un fichier Excel à jour chaque mois en y renseignant les dépenses et ressources mensuelles et occasionnelles de ma grand-mère.

J'ai voulu lui proposer une solution qui se souvienne des précédentes catégorisations des dépenses et ressources mensuelles afin qu'elle ne se concentre plus que sur ce qui est unique à chaque mois. J'ai aussi rendu automatique le calcul des sommes.

## Solution technique

J'ai voulu lui proposer un logiciel qu'elle puisse installer simplement sur son ordinateur. Je voulais éviter une solution avec serveur et base de donnée parce que l'outil sera utilisé occasionnellement. J'ai eu l'idée de lui fournir une solution qui puisse se démarrer en un seul fichier HTML grâce au plugin `vite-plugin-singlefile`. Cette webapp a besoin de plusieurs fichiers pour fonctionner :

- une sauvegarde des catégorisations précédentes (optionnel)
  - le fichier de sauvegarde est obtenu après un premier usage de l'outil
- un export des opérations de la Caisse d'Épargne du compte de ma grande-mère

Au final, le fichier index.html est complètement statique et pourrait très bien être déployé.

### Limites

1. La solution dépend énormément de si l'export csv d'une banque catégorise les opérations en attribuant un libellé simplifié **et** un libellé plus précis.
2. Seuls les fichiers CSV de la Caisse d'Épargne sont pris en charge.
