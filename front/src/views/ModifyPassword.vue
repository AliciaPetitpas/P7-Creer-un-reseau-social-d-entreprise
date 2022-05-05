<template>
    <div>
        <MenuPage/>
        <main id="main" class="main">
            
            <div class="modify-password">
                <!-- BTN NOUVEAU MDP ? -->
                <input v-model="state.input.newpassword" type="password" class="input-form" placeholder="Nouveau mot de passe"/>
                <span v-if="v$.input.newpassword.$error" class="error">
                    {{ v$.input.newpassword.$errors[0].$message }}
                </span>
                <input v-model="state.input.newpasswordconfirmed" type="password" class="input-form" placeholder="Confirmer le mot de passe"/>
                <span v-if="v$.input.newpasswordconfirmed.$error" class="error">
                    {{ v$.input.newpasswordconfirmed.$errors[0].$message }}
                </span>   
                <button @click="validatePassword()" >Valider</button>
                <p class="msg">{{ error }}</p>
                <p class="msg">{{ success }}</p>     
               
            </div>
        </main>
    </div>
</template>

<script>

import MenuPage from '../components/MenuPage.vue'
import { mapState } from 'vuex'
import useValidate from '@vuelidate/core';
import { required, minLength, helpers, maxLength, sameAs } from '@vuelidate/validators'
import { reactive, computed } from "vue";

export default {
    name: 'modifyPassword',
    components: {
        MenuPage,
    },
    setup() {
        const state = reactive({
            input: {
                newpassword: "",
                newpasswordconfirmed: "",
            }
        });
        const rules = computed(() => {
            return {
                input: {
                    newpassword: {
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
                    newpasswordconfirmed: {
                        required: helpers.withMessage(
                            "Veuillez renseigner ce champ",
                            required
                        ),
                        sameAs: helpers.withMessage(
                            "Les mots de passe de correspondent pas",
                            sameAs(state.input.newpassword)
                        ),
                    },
                }
            }
        });
        const v$ = useValidate(rules, state);
        return {
            state,
            v$
        };
    },
    data: function() {
        return {
            error: "",
            success: "",
        }
    },
    computed: {
        ...mapState({
            user:'user',
            userInfo: 'userInfo'
        })
    },
    methods: {
        validatePassword: function () {
            const self = this;
            this.v$.$validate();
            if (!this.v$.$error) {
                const userObjet = {
                    userId: this.user.userId,
                    user: {
                        password: this.state.input.newpassword,
                    }
                }
                this.$store.dispatch('updatePassword', userObjet
                ).then(function (response) {
                self.success = response.data.message;
            }, function (error) {
                self.error = error.response.data.error;
            })
            }

        }
    }
}

</script>

<style scoped>

.msg {
    color: red;
    font-size: 14px;
    font-style: italic;
}

</style>