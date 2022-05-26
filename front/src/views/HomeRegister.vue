<template>
<div>
    <HeaderPage />
            
        <!-- Formulaire inscription -->

        <div id="main" class="form">
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
            <input v-model="state.input.passwordconfirmed" type="password" class="input-form" placeholder="Confirmer le mot de passe"/>
            <span v-if="v$.input.passwordconfirmed.$error" class="error">
                {{ v$.input.passwordconfirmed.$errors[0].$message }}
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
import { required, email, minLength, helpers, maxLength, sameAs } from "@vuelidate/validators";
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
                passwordconfirmed: "",
            }
        });
        const rules = computed(() => {
            return {
                input: {
                    last_name: {
                        required: helpers.withMessage(
                            "Veuillez renseigner ce champ",
                            required
                        ),
                        minLength: helpers.withMessage(
                            "Le nom de peut comporter qu'une seule lettre",
                            minLength(2)
                        ),
                    },
                    first_name: {
                        required: helpers.withMessage(
                            "Veuillez renseigner ce champ",
                            required
                        ),
                        minLength: helpers.withMessage(
                            "Le prénom de peut comporter qu'une seule lettre",
                            minLength(2)
                        ),
                    },
                    email: {
                        required: helpers.withMessage(
                            "Veuillez renseigner ce champ",
                            required
                        ),
                        email: helpers.withMessage(
                            "Veuillez saisir une adresse mail valide",
                            email
                        ),
                    },
                    password: {
                        required: helpers.withMessage(
                            "Veuillez renseigner ce champ",
                            required
                        ),
                        minLength: helpers.withMessage(
                            "Le mot de passe doit comporter 4 caractères minimum",
                            minLength(4)
                        ),
                        maxLength: helpers.withMessage(
                            "Le mot de passe ne peut comporter que 100 caractères maximum",
                            maxLength(100)
                        ),
                    },
                    passwordconfirmed: {
                        required: helpers.withMessage(
                            "Veuillez renseigner ce champ",
                            required
                        ),
                        sameAs: helpers.withMessage(
                            "Les mots de passe de correspondent pas",
                            sameAs(state.input.password)
                        ),
                    }
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
                const self = this;
                this.$store.dispatch('loginAccount', {
                    email: this.state.input.email,
                    password: this.state.input.password
                }).then(function () {
                    self.$router.push('/userProfile');
                }, function (error) {
                    self.error = error.response.data.error;
                })
        },
        createAccount: function () {
            const self = this;
            this.v$.$validate();
            if (!this.v$.$error) {
            this.$store.dispatch('createAccount', {           
                last_name: this.state.input.last_name,
                first_name: this.state.input.first_name,
                email: this.state.input.email,
                password: this.state.input.password,
                passwordconfirmed: this.state.input.passwordconfirmed,
            }).then(function() {
                self.login();
            },function (error) {
                self.error = error.response.data.error;
            }
            )
        }}
    }
}

</script>