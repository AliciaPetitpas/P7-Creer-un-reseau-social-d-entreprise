<template>
    
<div>
    <MenuPage/>

<main class="main">

    <div class="profile">
        <!-- User Info -->
        <div class="user">
            <div class="user-profile-picture">
                <img src="" alt="user-picture" class="user-picture">
                <!-- Bouton modification image SI modification activée -->
                <input 
                style="display: none"
                type="file" 
                @change="onFileSelected"
                ref="fileInput">
                <button @click="$refs.fileInput.click()">Choisir un fichier</button>
                <button @click="onUpload()" class="add-img">Importer un fichier</button>
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
import axios from 'axios'

export default {
    name: 'UserProfile',
    components: {
        MenuPage,
    },
    data: function() {
        return {
            // last_name: this.$store.user.last_name,
            // first_name: this.$store.user.first_name,
            // email: this.$store.user.email,
        }
    },
    methods: {
        onFileSelected(event) {
            this.selectedFile = event.target.files[0]
        },
        onUpload() {
            const fd = FormData();
            fd.append('image', this.selectedFile, this.selectedFile.name)
            axios.post('', fd, {
                onUploadProgress: uploadEvent => {
                    console.log('Upload progress: ' + Math.round(uploadEvent.loaded / uploadEvent.total * 100) + '%')
                }
            })
            .then (res => {
                console.log(res)
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