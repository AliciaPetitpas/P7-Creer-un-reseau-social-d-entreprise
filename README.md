# Projet 7 : Créez un réseau social d'entreprise

*Prérequis*
Pour installer ce projet, vous devez d'abord installer Node.js & MySQL

*Cloner le repo du projet*

*La base de données*
Ouvrir la console MySQL et créer un compte ou se connecter si vous en avez déjà un
Créer une base de données nommée `groupomania`
Importer le fichier `bdd_groupomania.sql`  qui se trouve à la racine du repo du projet

*Installation du Backend*
Dans le terminal, se placer dans le dossier /Back/

Modifier le fichier .env qui se situe dans le backend avec les informations de votre compte MySQL :
    - DB_USER="VOTRE_NOM_UTILISATEUR_MYSQL"
    - DB_PASSWORD="VOTRE_MOT_DE_PASSE_MYSQL"
Lancer le serveur de développement avec la commande => `nodemon server`

*Instalation du Frontend*
Dans le terminal, se placer dans le dossier /Front/

Lancer la construction du Frontend avec la commande => `npm run serve`

*Lancer l'application*
Ouvrir l'application en cliquant sur `http://localhost:8080/`

*Compte administrateur*
Le mot de passe pour passer un compte normal en compte administrateur est `admin`
