<template>
    
<div>
    <MenuPage/>

<main id="main" class="content">
    <div class="create-post">
            <!-- Information user -->
            <div class="user-info">
                <img :src="userInfo.imageUrl" alt="user-picture">
                <p class="user_name">{{ userInfo.first_name }} {{ userInfo.last_name }}</p>
            </div>

        <!-- Contenu de la publication -->
        <input type="text" v-model="state.input.newpost" class="new-post" placeholder="Créer une nouvelle publication">
        <span v-if="v$.input.newpost.$error" class="error">
                {{ v$.input.newpost.$errors[0].$message }}
            </span>
        <!-- Ajout média ici -->
        <div class="post-img">
                <img src="" ref="photoPublication" alt="Photo de la publication" class="post-picture">
                <!-- :src="post.imageUrl" -->
                <img ref="filePreview" src="" alt="">
                
                <input 
                    style="display: none"
                    type="file" 
                    accept=".png, .jpg, .jpeg" 
                    @change="onFileSelected"
                    ref="fileInput">
                <button @click="$refs.fileInput.click()" class="add-file">Choisir une image</button>
                <button @click="onUpload()" class="add-img">Importer</button>
                <p class="msg-img">{{ error }}</p>
                <p class="msg-img">{{ success }}</p>
            </div>

        <!-- Envoi de la publication -->
        <button @click="sendPost()" class="send-post">Envoyer</button>
    </div>
</main>
</div>

</template>

<script>

import MenuPage from '../components/MenuPage.vue'
import { mapState } from 'vuex'
import useValidate from '@vuelidate/core';
import { required, minLength, maxLength, helpers } from '@vuelidate/validators'
import { reactive, computed } from "vue";

export default {
    name: 'CreatePost',
    components: {
        MenuPage,
    },
    setup() {
        const state = reactive({
            input: {
                newpost: "",
            }
        });
        const rules = computed(() => {
            return {
                input: {
                    newpost: {
                        required: helpers.withMessage(
                            "Veuillez renseigner ce champ",
                            required
                        ),
                        minLength: helpers.withMessage(
                            "La publication doit contenir au moins 2 caractères",
                            minLength(2)
                        ),
                        maxLength: helpers.withMessage(
                            "La publication doit contenir au plus 400 caractères",
                            maxLength(400)
                        ),
                    },
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
            success: "",
        }
    },
    mounted() {
        this.$store.dispatch('getUserInfo', this.$store.state.user.userId)
        .then(function() {
            //console.log(self.userInfo)
        })
    },
    computed: {
        ...mapState({
            user: 'user',
            userInfo: 'userInfo'
        })
    },
    methods: {
        onFileSelected(event) {
            this.selectedFile = event.target.files[0];
            let reader = new FileReader();
            reader.onload = () => {
                this.$refs.filePreview.src = reader.result;
                this.$refs.photoPublication.style.display = "none";
            }
            reader.readAsDataURL(this.selectedFile);
        },
        onUpload() {
            // const self = this;
            // const fd = new FormData();
            // fd.append('image_post', this.selectedFile);
            // this.$store.dispatch('', {
            //     fdImage: fd,
            //     userId: this.user.userId
            // })
            // .then(function (response) {
            //     self.success = response.data.message;
            // }, function (error) {
            //     self.error = error.response.data.error;
            // })
        },
        sendPost() {
            //const self = this;
            this.v$.$validate();
            if (!this.v$.$error) {
                const postObjet = {
                    userId: this.user.userId,
                    post: {
                        content: this.state.input.newpost,
                        //imageUrl: this.state.imageUrl,
                    }
                }
                this.$store.dispatch('createPost', postObjet
                ).then (function() {
                    localStorage.setItem('Post', postObjet);
                    console.log(postObjet);
                    // self.$router.push('/mainPage');
                }, function (error) {
                    self.error = error.response.data.error;
                })
                }
        }, 
    },
}

</script>

<style scoped>

.user-info {
    align-items: center;
    display: flex;
    flex-direction: row;
}

.user-info img {
    margin: 10px;
    width: 80px;
    height: 80px;
    border-radius: 80px;
    border: 1px solid black;
}

.create-post {
    background-color: white;
    border: 1px solid black;
    border-radius: 30px;
    margin: 10px;
}

::placeholder {
    position: absolute;
}

input {
    width: 95%;
    height: 100px;
}

</style>