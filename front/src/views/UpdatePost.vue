<template>
    <div>
        <MenuPage/>
        <main id="main" class="content">
            <div>
                <div class="update-post">

                <!-- Information user -->
                <div class="user-info">
                    <img :src="postInfo.User.imageUrl" alt="user-picture">
                    <p class="user_name">{{ postInfo.User.first_name }} {{ postInfo.User.last_name }}</p>
                </div>

                <!-- Affichage publication -->
                <div class="post">
                    <div class="post-title">
                        <p class="title-text">{{ postInfo.title }}</p>
                        <input type="text" v-model="state.input.title" class="title" placeholder='Nouveau titre' >
                        <!-- <span v-if="v$.input.title.$error" class="error">
                            {{ v$.input.title.$errors[0].$message }}
                        </span> -->
                    </div>

                    <div class="post-img">
                        <img :src="postInfo.imageUrl" alt="photo de publication">
                        <div class="post-img">
                            <img src="" ref="photoPublication" alt="Photo de la publication" class="post-picture" style="display: none">
                            <img class="filePreview" ref="filePreview" src="" alt="">
                                
                            <input 
                                style="display: none"
                                type="file" 
                                accept=".png, .jpg, .jpeg" 
                                @change="onFileSelected"
                                ref="fileInput">
                            <button @click="$refs.fileInput.click()" class="add-file">Choisir une nouvelle image</button>
                        </div>
                    </div>

                    <div class="post-content">
                        <p class="content-text">{{ postInfo.content }}</p>
                        <textarea id="content" v-model="state.input.content" name="textMessage" placeholder="Nouveau contenu" class="content" aria-describedby="contenu-publication"></textarea>
                        <!-- <span v-if="v$.input.content.$error" class="error">
                            {{ v$.input.content.$errors[0].$message }}
                        </span> -->
                    </div>

                </div>

                <!-- Envoi de la publication -->
                <button @click="sendPost()" class="send-post">Envoyer</button>
                <p class="msg">{{ error }}</p>
                <p class="msg">{{ success }}</p>

                </div>
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
    name: 'updatePost',
    components: {
        MenuPage,
    },
    mounted() {
        const urlId = this.$route.params.id;
        // console.log(urlId);
        this.$store.dispatch('getPost', urlId);
        if(this.$store.state.user.userId == -1 || this.user.userId != this.postInfo.UserId) {
        this.$router.push('/');
        return; 
        }
    },
    computed: {
        ...mapState({
            user:'user',
            postInfo: 'postInfo',
        }),
    },
    data: function() {
        return {
            selectedFile: null,
            error: "",
            success: "",
        }
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
}
</script>

<style scoped>

/* #main {
    border: none;
    background-color: white;
} */

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

.post {
    border: 1px solid black;
    margin: 15px;
}

.post-title {
    font-size: 20px;
    font-style: bold;
    border-bottom: 1px solid black;
}

.post-img img {
    width: 90%;
}

.filePreview {
    max-width: 90%;
}

</style>