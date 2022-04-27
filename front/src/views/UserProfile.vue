<template>
    
<div>
    <MenuPage/>

<main id="main" class="main">

    <div class="profile">
        <!-- User Info -->
        <div class="user">
            <button @click="goAdmin()" class="user-admin">Administrateur</button>
            
            <div class="user-profile-picture">
                <img src="" ref="photoProfil" alt="Photo de profil" class="user-picture">
                <img ref="filePreview" src="" alt="">
                <!-- src="userInfo.imageUrl" -->
                
                <!-- Bouton modification image SI modification activée -->

                <input 
                    style="display: none"
                    type="file" 
                    accept=".png, .jpg, .jpeg"
                    @change="onFileSelected"
                    ref="fileInput">
                <button @click="$refs.fileInput.click()" class="add-file">Choisir une image</button>
                <button @click="onUpload()" class="add-img">Importer</button>
                <p>{{ error }}</p>
                <p>{{ success }}</p>

            </div>

            <div class="user-info">
                <p id="last_name" class="last_name"></p>
                <p id="first_name" class="first_name"></p> 
                <p id="email" class="email"></p>
                <!-- <p>{{ userInfo }}</p> -->
            </div>

            <!-- Inputs modifications -->
            <p>Modifier Informations :</p>
            <input v-model="state.input.newlast_name" type="text" class="input-form" placeholder="Nom"/>
            <span v-if="v$.input.newlast_name.$error" class="error">
                {{ v$.input.newlast_name.$errors[0].$message }}
            </span>
            <input v-model="state.input.newfirst_name" type="text" class="input-form" placeholder="Prénom"/>
            <span v-if="v$.input.newfirst_name.$error" class="error">
                {{ v$.input.newfirst_name.$errors[0].$message }}
            </span>
            <input v-model="state.input.newemail" type="email" class="input-form" placeholder="Adresse mail"/>
            <span v-if="v$.input.newemail.$error" class="error">
                {{ v$.input.newemail.$errors[0].$message }}
            </span>
            <input v-model="state.input.newpassword" type="password" class="input-form" placeholder="Nouveau mot de passe"/>
            <span v-if="v$.input.newpassword.$error" class="error">
                {{ v$.input.newpassword.$errors[0].$message }}
            </span>
            <input v-model="state.input.newpasswordconfirmed" type="password" class="input-form" placeholder="Confirmer le mot de passe"/>
            <span v-if="v$.input.newpasswordconfirmed.$error" class="error">
                {{ v$.input.newpasswordconfirmed.$errors[0].$message }}
            </span>            
               
                <!-- Bouton modification profil -->
            <button @click="modifyUser()" class="modify-user-info">Valider informations</button>
            
            <button @click="deactivate()" class="deactivate">Désactiver mon compte</button>
            <!-- span erreur -->

        </div>
    </div>

</main>
</div>

</template>

<script>

import MenuPage from '../components/MenuPage.vue'
import { mapState } from 'vuex'
import useValidate from '@vuelidate/core';
import { required, minLength, helpers, maxLength, sameAs, email } from '@vuelidate/validators'
import { reactive, computed } from "vue";

export default {
    name: 'UserProfile',
    components: {
        MenuPage,
    },
    setup() {
        const state = reactive({
            input: {
                newlast_name: "",
                newfirst_name: "",
                newemail: "",
                newpassword: "",
                newpasswordconfirmed: "",
            }
        });
        const rules = computed(() => {
            return {
                input: {
                    newlast_name : {
                        required: helpers.withMessage(
                            "Veuillez renseigner ce champ",
                            required
                        ),
                        minLength: helpers.withMessage(
                            "Le nom de peut comporter qu'une seule lettre",
                            minLength(2)
                        ),
                    },
                    newfirst_name: {
                        required: helpers.withMessage(
                            "Veuillez renseigner ce champ",
                            required
                        ),
                        minLength: helpers.withMessage(
                            "Le prénom de peut comporter qu'une seule lettre",
                            minLength(2)
                        ),
                    },
                    newemail: {
                        required: helpers.withMessage(
                            "Veuillez renseigner ce champ",
                            required
                        ),
                        email: helpers.withMessage(
                            "Veuillez saisir une adresse mail valide",
                            email
                        ),
                    },
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
                    }
                }
            }
        });
        const v$ = useValidate(rules, state);
        return {
            state,
            v$,
        };
    },
    data: function() {
        return {
            selectedFile: null,
            error: "",
            success: '',
        }
    },
    mounted() {
        if(this.$store.state.user.userId == -1) {
            this.$router.push('/');
            return; 
        }
        const self = this; 
        this.$store.dispatch('getUserInfo', this.$store.state.user.userId)
        .then(function() {
            document.getElementById("last_name").textContent = self.userInfo.last_name;
            document.getElementById("first_name").textContent = self.userInfo.first_name;
            document.getElementById("email").textContent = self.userInfo.email;
        }, function () {
            self.logout();
        })
    },
    computed: {
        ...mapState({
            user:'user',
            userInfo: 'userInfo'
        })
    },
    methods: {
        logout: function() {
        localStorage.removeItem('user')
        // console.log(localStorage.getItem('user'))
        this.$router.push('/');
        },
        onFileSelected(event) {
            this.selectedFile = event.target.files[0];
            let reader = new FileReader();
            reader.onload = () => {
                this.$refs.filePreview.src = reader.result;
                this.$refs.photoProfil.style.display = "none";
            }
            reader.readAsDataURL(this.selectedFile);
        },
        onUpload() {
            const self = this;
            const fd = new FormData();
            fd.append('image_profil', this.selectedFile);
            this.$store.dispatch('updateImage', {
                fdImage: fd,
                userId: this.user.userId
            })
            .then(function (response) {
                self.success = response.data.message;
            }, function (error) {
                self.error = error.response.data.error;
            })
        },
        modifyUser: function () {
            const self = this;
            this.v$.$validate();
            if (!this.v$.$error) {
                const userObjet = {
                    userId: this.user.userId,
                    user: {
                        last_name: this.state.input.newlast_name,
                        first_name: this.state.input.newfirst_name,
                        email: this.state.input.newemail,
                        password: this.state.input.newpassword,
                        passwordconfirmed: this.state.input.newpasswordconfirmed,
                    }
                }
                this.$store.dispatch('updateUser', userObjet
                ).then(function () {
                self.$router.push('/UserProfile');
            }, function (error) {
                self.error = error.response.data.error;
            })
            }
        },
        deactivate() {
            const self = this;
            this.$store.dispatch('deactivateAccount', this.$store.state.user.userId 
                ).then(function () {
                self.logout();
            }, function (error) {
                self.error = error.response.data.error;
            })
    },
}}

</script>

<style scoped>

/* .user-profile-picture img {
    width: 150px;
    height: 150px;
    border: 1px solid black;
    border-radius: 150px;
} */

/* RESPONSIVE MOBILE */
/* @media (max-width: 768px) {

} */

</style>