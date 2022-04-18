<template>
    
<MenuPage/>

<main class="main">

    <div class="profile">
        <!-- User Info -->
        <div class="user">
            <div class="user-profile-picture">
                <img src="" alt="user-picture">
                <!-- Bouton modification image SI modification activée -->
                <button class="change-picture">Importer un fichier</button>
            </div>
            <div class="user-info">
                <p class="first_name">First name</p>
                <p class="last_name">Last name</p>
                <p class="email">Email</p>
                <!-- input mail SI modification activée -->
                <input type="email" class="input-form" placeholder="Adresse mail"/>
            </div>
            <!-- Bouton à afficher si c'est notre profile -->
            <button class="modify-user-info">Modifier informations</button>
            <!-- Bouton à afficher SI modification activée -->
            <button class="new-user-info">Valider</button> 
        </div>
    </div>

</main>

</template>

<script>

import MenuPage from '../components/MenuPage.vue'

export default {
    name: 'UserProfile',
    components: {
        MenuPage,
    }
}

</script>

<style scoped>

div {
    display: flex;
    flex-direction: column;
    margin: 10px auto 10px auto;
}

.profile {
    background-color: #fdd7d7 ;
    border: 1px solid black;
    border-radius: 30px;
}

.user {
    width: 80%;
}

.user-profile-picture {
    position: absolute;
    width: 150px;
    height: 150px;
    border: 1px solid black;
    border-radius: 150px;
}

button {
    margin: 10px auto 10px auto;
    width: 30%;
    padding: 30px;
    border-style: none;
    background-color: black;
    color: white;
    font-weight: bold;
}

.change-picture {
    width: 200px;
    padding: 5px;
    position: absolute;
    bottom: -35px;
    left: 0;
}

/* RESPONSIVE MOBILE */
@media (max-width: 768px) {
    /* button {
        width: 70%;
    } */
    .user-profile-picture {
        width: 80px;
        height: 80px;
        border-radius: 80px;
    }
}

</style>