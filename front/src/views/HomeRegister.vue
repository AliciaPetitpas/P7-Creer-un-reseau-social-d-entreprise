<template>
<div>
    <HeaderPage />
            
        <!-- Formulaire inscription -->

        <div class="form">
            <input v-model="state.input.last_name" type="text" class="input-form" placeholder="Nom"/>
            <span v-if="v$.input.last_name.$error" class="error">
                {{ v$.input.last_name.$errors[0].$message }}
            </span>
            <input v-model="state.input.first_name" type="text" class="input-form" placeholder="Prénom"/>
            <span v-if="v$.input.first_name.$error" class="error">
                {{ v$.input.first_name.$errors[0].$message }}
            </span>
            <input v-model="state.input.email" type="email" class="input-form" placeholder="Adresse mail"/>
            <span v-if="v$.input.email.$error" class="error">
                {{ v$.input.email.$errors[0].$message }}
            </span>
            <input v-model="state.input.password" type="password" class="input-form" placeholder="Mot de passe"/>
            <span v-if="v$.input.password.$error" class="error">
                {{ v$.input.password.$errors[0].$message }}
            </span>
            <button @click="createAccount()" class="button">Créer mon compte</button>
            <span class="error">
                {{ error }}
            </span>
        </div>
</div>

</template>

<script>

import HeaderPage from '../components/HeaderPage.vue'
import useValidate from "@vuelidate/core";
import { required, email, minLength, helpers } from "@vuelidate/validators";
import { reactive, computed } from "vue";

export default {
    name: 'HomeRegister',
    components: {
        HeaderPage,
    },
        setup() {
        const state = reactive({
            input: {
                last_name: "",
                first_name: "",
                email: "",
                password: "",
            }
        });
        const rules = computed(() => {
            return {
                input: {
                    last_name: {
                        required: helpers.withMessage(
                            "Veuillez renseigner ce champ !",
                            required
                        )
                    },
                    first_name: {
                        required: helpers.withMessage(
                            "Veuillez renseigner ce champ !",
                            required
                        )
                    },
                    email: {
                        required: helpers.withMessage(
                            "Veuillez renseigner ce champ !",
                            required
                        ),
                        email: helpers.withMessage(
                            "Veuillez saisir une adresse mail valide !",
                            email
                        ),
                    },
                    password: {
                        required: helpers.withMessage(
                            "Veuillez renseigner ce champ !",
                            required
                        ),
                        minLength: helpers.withMessage(
                            "Le mot de passe doit comporter 4 caractères minimum !",
                            minLength(4)
                        ),
                    },
                },
            };
        });
        const v$ = useValidate(rules, state);
        return {
            state,
            v$,
        };
    },
    data: function () {
        return {
            error: "",
        }
     },
    methods: {
        login: function () {
            this.v$.$validate();
            if (!this.v$.$error) {
                const self = this;
                this.$store.dispatch('loginAccount', {
                    email: this.state.input.email,
                    password: this.state.input.password
                }).then(function () {
                    self.$router.push('/userProfile');
                }, function (error) {
                    self.error = error.response.data.error;
                })
            }
        },
        createAccount: function () {
            // console.log(this.state.input.last_name, this.state.input.first_name, this.state.input.email, this.state.input.password);
            const self = this;
            this.$store.dispatch('createAccount', {           
                last_name: this.state.input.last_name,
                first_name: this.state.input.first_name,
                email: this.state.input.email,
                password: this.state.input.password
            }).then(function() {
                self.login();
            },function (error) {
                self.error = error.response.data.error;
            }
            )
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