<template>
<HeaderPage />
            
        <!-- Formulaire inscription -->

        <div class="form">
            <input v-model="firstname" type="text" class="input-form" placeholder="Nom"/>
            <input v-model="lastname" type="text" class="input-form" placeholder="Prénom"/>
            <input v-model="email" type="email" class="input-form" placeholder="Adresse mail"/>
            <input v-model="password" type="password" class="input-form" placeholder="Mot de passe"/>
            <button @click="createAccount()" class="button" :class="{'button--disabled' : !validateForm}">Créer mon compte</button>
        </div>

</template>

<script>
import { mapState } from 'vuex'

import HeaderPage from '../components/HeaderPage.vue'

export default {
    name: 'HomeLogin',
    components: {
        HeaderPage,
    },
    data: function () {
        return {
            mode: 'register',
            firstname: '',
            lastname: '',
            email: '',
            password: '',
        }
    },
    computed: {
        validateForm: function() {
            if (this.firstname != '' && this.lastname != '' && this.email != '' && this.password != '') {
                return true;
            } else {
                return false;
            }
        },
        ...mapState(['status'])
    },
    methods: {
        createAccount: function () {
            // console.log(this.firstname, this.lastname, this.email, this.password);
            this.$store.dispatch('createAccount', {
                firstname: this.firstname,
                lastname: this.lastname,
                email: this.email,
                password: this.password
            })
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