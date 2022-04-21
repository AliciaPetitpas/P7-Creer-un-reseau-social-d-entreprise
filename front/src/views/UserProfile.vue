<template>
    
<div>
    <MenuPage/>

<main class="main">

    <div class="profile">
        <!-- User Info -->
        <div class="user">
            <div class="user-profile-picture">
                <img :scr="userInfo.imageUrl" ref="photoProfil" alt="Photo de profil" class="user-picture">
                <img ref="filePreview" src="" alt="">
                <!-- :src="userProfile.imageURL" -->

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
                <!-- <p class="last_name">{{ last_name }}</p>
                <p class="first_name">{{ first_name }}</p> 
                <p class="email">{{ email }}</p> -->

                <!-- inputs SI modification activée -->
                <input type="email" class="input-form" placeholder="Adresse mail"/>
                <input type="password" class="input-form" placeholder="Mot de passe"/>
                <input type="password" class="input-form" placeholder="Confirmer le mot de passe"/>
            </div>
            <!-- Bouton à afficher si c'est notre profile -->
            <button class="modify-user-info">Modifier informations</button>
            <!-- Bouton à afficher SI modification activée -->
            <button class="new-user-info">Valider</button> 
        </div>
    </div>

</main>
</div>

</template>

<script>

import MenuPage from '../components/MenuPage.vue'
import { mapState } from 'vuex'

export default {
    name: 'UserProfile',
    components: {
        MenuPage,
    },
    data: function() {
        return {
            selectedFile: null,
            // last_name: this.$store.user.last_name,
            // first_name: this.$store.user.first_name,
            // email: this.$store.user.email,
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
            document.getElementById("email").value = self.userInfo.email;
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
        }
    },
}

</script>

<style scoped>

div {
    display: flex;
    flex-direction: column;
    margin: 10px auto 10px auto;
}

.profile {
    background-color: #fdd7d7 ;
    border: 1px solid black;
    border-radius: 30px;
}

.user {
    width: 80%;
}

.user-profile-picture {
    position: absolute;
    width: 150px;
    height: 150px;
    border: 1px solid black;
    border-radius: 150px;
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

.add-img {
    width: 200px;
    padding: 5px;
    position: absolute;
    bottom: -65px;
    left: 0;
}

.add-file {
    width: 200px;
    padding: 5px;
    position: absolute;
    bottom: -35px;
    left: 0;
}

input {
    margin: 5px;
}

/* RESPONSIVE MOBILE */
@media (max-width: 768px) {
    .user {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .user-profile-picture, .user-info {
        position: relative;
        margin: 0;
    }

    .user-info {
        bottom: -35px;
    }

    button {
        width: 90%;
    }

    /* .user-picture {
        width: 80px;
        height: 80px;
        border-radius: 70px;
    } */
}

</style>