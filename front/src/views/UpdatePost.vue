<template>
    <div>
        <MenuPage/>
        <main id="main" class="content">
            <div>
                <div class="update-post">

                    <!-- <p>{{ postInfo}}</p> -->

                <!-- Information user -->
                <div class="user-info">
                    <!-- <img :src="postInfo.User.imageUrl" alt="user-picture"> -->
                    <!-- <p class="user_name">{{ postInfo.User.first_name }} {{ postInfo.User.last_name }}</p> -->
                </div>

                <!-- Affichage publication -->
                <div class="post">
                    <div class="post-title">
                        <input type="text" v-model="state.input.title" class="title" placeholder='Nouveau titre' >
                        <span v-if="v$.input.title.$error" class="error">
                            {{ v$.input.title.$errors[0].$message }}
                        </span>
                    </div>

                    <div class="post-img">
                        <img :src="postInfo.imageUrl" ref="photoPublication" alt="photo de publication">
                        <div class="post-newimg">                            
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
                        <textarea id="content" v-model="state.input.content" name="textMessage" placeholder="Nouveau contenu" class="content" aria-describedby="contenu-publication"></textarea>
                        <span v-if="v$.input.content.$error" class="error">
                            {{ v$.input.content.$errors[0].$message }}
                        </span>
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
        const self = this; 
        this.$store.dispatch('getPost', urlId)
        .then(function() {
            self.state.input.title = self.postInfo.title;
            self.state.input.content = self.postInfo.content;
        }, function () {
        });
        // || this.user.userId != this.postInfo.UserId
        if(this.$store.state.user.userId == -1) {
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
     methods: {
        onFileSelected(event) {
            this.selectedFile = event.target.files[0];
            let reader = new FileReader();
            reader.onload = () => {
                this.$refs.filePreview.src = reader.result;
                this.$refs.filePreview.style.display = "";
                this.$refs.photoPublication.style.display = "none";
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
                    content: this.state.input.content
                }
                console.log(postData);
                fd.append('post', JSON.stringify(postData));
                fd.append('image_post', this.selectedFile);
                this.$store.dispatch('updatePost', {postInfos: fd, postId: this.postInfo.id}
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

/* #main {
    border: none;
    background-color: white;
} */

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