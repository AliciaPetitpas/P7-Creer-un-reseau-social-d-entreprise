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
        <input type="text" v-model="state.input.title" class="title" placeholder="Titre de la publication">
        <span v-if="v$.input.title.$error" class="error">
                {{ v$.input.title.$errors[0].$message }}
        </span>

        <textarea id="content" v-model="state.input.content" name="textMessage" placeholder="Créer une nouvelle publication" class="content" aria-describedby="contenu-publication"></textarea>
        <span v-if="v$.input.content.$error" class="error">
                {{ v$.input.content.$errors[0].$message }}
        </span>
        <!-- Ajout média ici -->
        <div class="post-img">
                <img class="filePreview" ref="filePreview" src="" alt="">
                
                <input 
                    style="display: none"
                    type="file" 
                    accept=".png, .jpg, .jpeg" 
                    @change="onFileSelected"
                    ref="fileInput">
                <button @click="$refs.fileInput.click()" class="add-file">Choisir une image</button>
            </div>

        <!-- Envoi de la publication -->
        <button @click="sendPost()" class="send-post">Envoyer</button>
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
                title: "",
                content: "",
            }
        });
        const rules = computed(() => {
            return {
                input: {
                    title: {
                        required: helpers.withMessage(
                            "Veuillez renseigner ce champ",
                            required
                        ),
                        minLength: helpers.withMessage(
                            "La publication doit contenir au moins 2 caractères",
                            minLength(2)
                        ),
                        maxLength: helpers.withMessage(
                            "La publication doit contenir au plus 50 caractères",
                            maxLength(50)
                        ),
                    },
                    content: {
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
        if(this.$store.state.user.userId == -1) {
        this.$router.push('/');
        return; 
        }
        this.$store.dispatch('getUserInfo', this.$store.state.user.userId)
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
                this.$refs.filePreview.style.display = "";
                this.$refs.fileInput.style.display = "none";
            }
            reader.readAsDataURL(this.selectedFile);
        },
        sendPost() {
            const self = this;
            this.v$.$validate();
            if (!this.v$.$error) {
                const fd = new FormData();
                let postData = {
                    title: this.state.input.title,
                    content: this.state.input.content,
                    UserId: this.user.userId
                }
                console.log(postData);
                fd.append('post', JSON.stringify(postData));
                fd.append('image_post', this.selectedFile);
                this.$store.dispatch('createPost', fd
                ).then(function () {
                    self.$router.push('/mainPage');
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
    font-weight: bold;
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

.filePreview {
    max-width: 90%;
}

#content {
    height: 200px; 
    width: 95%;
    margin-top: 10px;
}

input {
    width: 95%;
    height: 100px;
}

.title {
    height: auto;
}

</style>