# Tester les applications Angular autrement

mais les tester tout de même !

## Présentation

[Slides](https://goo.gl/1emYMd)

## Demo

Pour démarrer l'API back et l'appli front

    npm run go

Lancer les tests Jest

    npm run test

Lancer les tests Cypress

    npm run e2e

Lancer les tests Cypress en mode console

    npm run e2e:ci


## Intro

Nul ne peut remettre en question l'**apport positif** des **tests automatisés** dans un projet informatique.

Par contre **le constat est contradictoire** : Peu, voir très **très** **peu d'équipes les** **adoptent** et y restent fidèles... et on parle même pas de trouver une équipe qui, en plus de les adopter, elle **"aime"** les faire et n'arrive pas à s'en passer.

Les raisons sont multiples: Ça va de la **culture d'entreprise** à la **difficulté** technique de **l'implementation** en passant par la **sensibilisation** du **client** sur le coût initial des tests.

Mais les experts des tests sont unanimes, c'est la **difficulté technique** de l'implementation qui **pose le plus problème**, car même si on trouve un contexte (client, budget, délai...) favorisant, rien n'est gagné d'avance et l'équipe peut facilement se casser les dents au cours du chemin si **elle ne sait pas faire** ou si **elle** **n’est** **pas bien** **outillée**.

Dans cette présentation, je remettrai les [**développeurs, développeurs, développeurs....**](https://www.youtube.com/watch?v=Vhh_GeBPOhs) au centre du débat. On verra comment la communauté JavaScript tendent actuellement à l**aisser tomber l'outillage orthodoxe d'Angular (Karma, Protractor)** pour le remplacer par d'autres outils beaucoup plus '**developer-friendly**'.

