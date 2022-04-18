<template>
<HeaderPage />

            <!-- Connexion -->

        <div class="form">
            <input v-model="email" type="email" class="input-form" placeholder="Adresse mail"/>
            <input v-model="password" type="password" class="input-form" placeholder="Mot de passe"/>
            <!-- <button @click="login()" class="button"> -->
        </div>

</template>

<script>

import HeaderPage from '../components/HeaderPage.vue'

export default {
    name: 'HomeLogin',
    components: {
        HeaderPage,
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
    background-color: white ;
    border: 1px solid black;
    border-radius: 30px;
}

input {
    margin: 5px;
}

button {
    margin-top: 10px;
    padding: 10px;
    align-items: center;
    border-style: none;
    background-color: black;
    color: white;
}

</style>