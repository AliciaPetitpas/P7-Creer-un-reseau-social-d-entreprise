<template>
<div>

    <HeaderPage />

        <!-- Connexion -->

        <div id="main" class="form">
            <input v-model="state.input.email" type="email" class="input-form" placeholder="Adresse mail"/>
            <span v-if="v$.input.email.$error" class="error">
                {{ v$.input.email.$errors[0].$message }}
            </span>
            <input v-model="state.input.password" type="password" class="input-form" placeholder="Mot de passe"/>
            <span v-if="v$.input.password.$error" class="error">
                {{ v$.input.password.$errors[0].$message }}
            </span>
            <button @click="profileWindow()" class="button">Se connecter</button>
            <span class="error">
                {{ error }}
            </span>
        </div>
</div>

</template>

<script>

import HeaderPage from '../components/HeaderPage.vue';
import useValidate from "@vuelidate/core";
import { required, email, helpers } from "@vuelidate/validators";
import { reactive, computed } from "vue";

export default {
    name: 'HomeLogin',
    components: {
        HeaderPage,
    },
    setup() {
        const state = reactive({
            input: {
                email: "",
                password: "",
            }
        });
        const rules = computed(() => {
            return {
                input: {
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
        };
    },
    methods: {
        profileWindow(){
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
            
        }
    }
}

</script>
