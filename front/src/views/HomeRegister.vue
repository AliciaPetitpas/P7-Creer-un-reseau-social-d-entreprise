<template>
<div>
    <HeaderPage />
            
        <!-- Formulaire inscription -->

        <div class="form">
            <input v-model="first_name" type="text" class="input-form" placeholder="Nom"/>
            <input v-model="last_name" type="text" class="input-form" placeholder="Prénom"/>
            <input v-model="email" type="email" class="input-form" placeholder="Adresse mail"/>
            <input v-model="password" type="password" class="input-form" placeholder="Mot de passe"/>
            <button @click="createAccount()" class="button" :class="{'button--disabled' : !validateForm}">Créer mon compte</button>
        </div>
</div>

</template>

<script>

import { mapState } from 'vuex'

import HeaderPage from '../components/HeaderPage.vue'

export default {
    name: 'HomeRegister',
    components: {
        HeaderPage,
    },
    data: function () {
        return {
            mode: 'register',
            first_name: '',
            last_name: '',
            email: '',
            password: '',
        }
    },
    computed: {
        validateForm: function() {
            if (this.first_name != '' && this.last_name != '' && this.email != '' && this.password != '') {
                return true;
            } else {
                return false;
            }
        },
        ...mapState(['status'])
    },
    methods: {
        createAccount: function () {
            // console.log(this.first_name, this.last_name, this.email, this.password);
            this.$store.dispatch('createAccount', {
                first_name: this.first_name,
                last_name: this.last_name,
                email: this.email,
                password: this.password
            })
        }
    }
}

</script>

<style scoped>

.form {
    display: flex;
    flex-direction: column;
    margin: 10px auto 10px auto;
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