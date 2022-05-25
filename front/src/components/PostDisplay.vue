<template>
    <div>
            <!-- <p>{{post}}</p> -->

            <div class="displayPost">

                <!-- Affichage info user -->
                <div class="user-info">
                    <img :src="post.User.imageUrl" alt="user-picture">
                    <p class="user_name">{{post.User.first_name}} {{post.User.last_name}}</p>
                    <!-- <p class="post-time">{{ post.createdAt }}</p> -->
                </div>

                <!-- Affichage publication -->
                <div class="post">
                    <div class="post-title">
                        <p class="title-text">{{ post.title }}</p>
                    </div>

                    <div class="post-img">
                        <img v-if="post.imageUrl != null" :src="post.imageUrl" alt="photo de publication">
                    </div>

                    <div class="post-content">
                        <p class="content-text">{{ post.content }}</p>
                        <!-- btn delete si user à créé le post ou si admin -->
                    </div>
                </div>

                <div class="btns">
                    <div class="btn-update">
                        <!-- bouton modification si l'user à créé la publication -->
                        <img src="../assets/pen-icon.png" @click="updatePost()" v-if="user.userId === post.UserId" class="update icon" alt="update" />
                    </div>
                
                    <div class="btn-delete">
                        <!-- bouton delete si créateur de la publication ou admin -->
                        <img src="../assets/bin-icon.png" @click="deletePost()" v-if="userInfo.admin || user.userId === post.UserId" class="delete icon" alt="update" />
                    </div>
                </div>

                <!-- Nouveaux commentaires de publiication -->
                <div class="comments">
                    <div class="new-comments">
                        <form @submit.prevent="createComment()">
                            <textarea type="text" class="new-comment-input" placeholder="Commenter..." v-model="commentContent" required></textarea>
                            <button type="submit" title="Publier le commentaire">Envoyer</button>
                        </form>
                    </div>
                </div>

                <!-- Affichage commentaires -->
                <div class="comments-display">
                    <div v-for="item in comments" v-bind:key="item" class="displayComment">
                    <CommentDisplay :comment="item" @refresh="refreshComments()"/>
                    </div>
                </div>

            </div>
    </div>
</template>

<script>

import CommentDisplay from '../components/CommentDisplay.vue'
import { mapState } from 'vuex'

export default {
    name: 'PostDisplay',
    components: {
        CommentDisplay,
    },
    props: {
        post: {
            type: Object
        }
    },
    data() {
        return {
            commentContent: null,
            comments: [],
        }
    },
    computed: {
        ...mapState({
            user:'user',
            userInfo: 'userInfo',
            posts: 'posts',
            postInfo: 'postInfo',
        }),
    },
    mounted() {
        this.refreshComments();
    },
    methods: {
        deletePost() {
            const self = this;
            this.$store.dispatch('deletePost', this.post.id)
            .then(function() {
                self.refreshData();
            }, function () {
                
            })
        },
        updatePost() {
            this.$router.push('/updatePost/' + this.post.id);
        },
        refreshData: function() {
            const self = this;
            this.$store.dispatch('getPosts')
            .then(function () {
            }, function (error) {
                self.error = error.response.data.error;
            })
        },
        createComment() {
            const self = this;
            let commentData = {
                content : this.commentContent,
                UserId : this.user.userId,
                PostId : this.post.id,
            }
            this.$store.dispatch('createComment', commentData)
            .then(function () {
                self.commentContent = "";
                self.refreshComments();
            }, function (error) {
                self.error = error.response.data.error;
            })
        },
        refreshComments: function() {
            const self = this;
            this.$store.dispatch('getComments', this.post.id)
            .then(function (response) {
                self.comments = response.data;
            }, function (error) {
                self.error = error.response.data.error;
            })
        },
    },
}

</script>

<style scoped>

#main {
    border: none;
    background-color: white;
}

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

.displayPost {
    position: relative;
}

.comments-display {
    margin: 15px;
    max-height: 300px;
    overflow-y: scroll;
}

.btns {
    display: flex;
    flex-direction: row;
    margin: 10px;
    position: absolute;
    top: 60px;
    right: 0;
}

.icon {
    width: 25px;
    height: 25px;
}

textarea {
    width: 90%;
    height: 50px;
}

/* RESPONSIVE MOBILE */
 @media (max-width: 768px) {

    textarea {
        width: 80%;
    }
}

</style>