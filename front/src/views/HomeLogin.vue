<template>
<div>

    <HeaderPage />

            <!-- Connexion -->

        <div class="form">
            <input v-model="email" type="email" class="input-form" placeholder="Adresse mail"/>
            <input v-model="password" type="password" class="input-form" placeholder="Mot de passe"/>
            <button @click="profileWindow()" class="button">Se connecter</button>
        </div>
</div>

</template>

<script>

import HeaderPage from '../components/HeaderPage.vue'

export default {
    name: 'HomeLogin',
    components: {
        HeaderPage,
    },
    methods: {
        profileWindow(){
        this.$router.push('/userProfile');
        }
    }
}

</script>

<style scoped>

div {
    display: flex;
    flex-direction: column;
    margin: 10px auto 10px auto;
}

.form {
    background-color: #fdd7d7 ;
    border: 1px solid black;
    border-radius: 30px;
}

input {
    margin: 5px;
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

/* RESPONSIVE MOBILE */
@media (max-width: 768px) {
    button {
        width: 70%;
    }
}

</style>