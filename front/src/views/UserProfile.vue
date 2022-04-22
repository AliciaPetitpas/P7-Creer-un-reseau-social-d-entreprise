<template>
    
<div>
    <MenuPage/>

<main id="main" class="main">

    <div class="profile">
        <!-- User Info -->
        <div class="user">
            <div class="user-profile-picture">
                <img src="" ref="photoProfil" alt="Photo de profil" class="user-picture">
                <img ref="filePreview" src="" alt="">
                <!-- :src="userProfile.imageUrl" -->
                <p>{{ this.user.imageUrl }}</p>
                

                <!-- Bouton modification image SI modification activée -->

                <input 
                    style="display: none"
                    type="file" 
                    accept=".png, .jpg, .jpeg"
                    @change="onFileSelected"
                    ref="fileInput">
                <button @click="$refs.fileInput.click()" class="add-file">Choisir une image</button>
                <button @click="onUpload()" class="add-img">Importer</button>

            </div>

            <div class="user-info">
                <p class="last_name">{{ this.userInfo.last_name }}</p>
                <p class="first_name">{{ this.userInfo.first_name }}</p> 
                <p class="email">{{ this.userInfo.email }}</p>
            </div>

            <!-- Inputs modifications -->
            <p>Modifier le mot de passe :</p>
            <input v-model="state.input.newpassword" type="password" class="input-form" placeholder="Nouveau mot de passe"/>
            <span v-if="v$.input.newpassword.$error" class="error">
                {{ v$.input.newpassword.$errors[0].$message }}
            </span>
            <input v-model="state.input.newpasswordconfirmed" type="password" class="input-form" placeholder="Confirmer le mot de passe"/>
            <span v-if="v$.input.newpasswordconfirmed.$error" class="error">
                {{ v$.input.newpasswordconfirmed.$errors[0].$message }}
            </span>
            
               
                <!-- Bouton modification profil -->
            <button @click="modifyUser()" class="modify-user-info">Modifier informations</button>
            
        </div>
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
    name: 'UserProfile',
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
        }
    },
    mounted() {
        if(this.$store.state.user.userId == -1) {
            this.$router.push('/');
            return; 
        }
        // const self = this; 
        this.$store.dispatch('getUserInfo', this.$store.state.user.userId)
        .then(function() {
            // document.getElementById("email").input = self.userInfo.email;
        }, function () {
            // self.logout();
        })
    },
    computed: {
        ...mapState({
            user:'user',
            userInfo: 'userInfo'
        })
    },
    methods: { //logout method
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
            const fd = new FormData();
            fd.append('image_profil', this.selectedFile);
            this.$store.dispatch('updateImage', {
                fdImage: fd,
                userId: this.user.userId
            })
            .then(function (response) {
                console.log(response);
            }, function (error) {
                console.log(error);
            })
        },
        login: function () {
            const self = this;
            this.$store.dispatch('loginAccount', {
                email: this.userInfo.email,
                password: this.state.input.newpassword
            }).then(function () {
                self.$router.push('/userProfile');
            }, function (error) {
                self.error = error.response.data.error;
            })
        },
        modifyUser: function () {
            const self = this;
            this.v$.$validate();
            // console.log(this.state.input.newpassword, this.state.input.newpasswordconfirmed);
            if (!this.v$.$error) {
                // console.log(this.state.input.newpassword);
                this.$store.dispatch('getUserInfo', {
                    password: this.state.input.newpassword,
                })
                .then(function() {
                    self.login();
                }, function (error) {
                    self.error = error.response.data.error;
                }
                )
            } // else {
            //     console.log('validation didnt work')
            // }
        },
    },
}

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