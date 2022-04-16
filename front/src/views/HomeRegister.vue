<template>
<HeaderPage />
            
        <!-- Inscription -->

        <div class="form">
            <input type="text" class="input-form" placeholder="Nom"/>
            <input type="text" class="input-form" placeholder="Prénom"/>
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
