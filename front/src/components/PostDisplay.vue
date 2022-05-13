<template>
    <div>
            <!-- <p>{{post}}</p> -->

            <div class="displayPost">

                <!-- Affichage info user -->
                <div class="user-info">
                    <img :src="post.User.imageUrl" alt="user-picture">
                    <p class="user_name">{{post.User.first_name}} {{post.User.last_name}}</p>
                </div>

                <!-- Affichage publication -->
                <div class="post">
                    <div class="post-title">
                        <p class="title-text">{{ post.title }}</p>
                    </div>

                    <div class="post-img">
                        <img :src="post.imageUrl" alt="photo de publication">
                        <!-- v-if="!postImg()" -->
                    </div>

                    <div class="post-content">
                        <p class="content-text">{{ post.content }}</p>
                        <!-- btn delete si user à créé le post ou si admin -->
                    </div>
                </div>

                <div class="btn-update">
                    <!-- bouton modification si l'user à créé la publication -->
                    <button v-if="user.userId === post.UserId" @click="modifyPost()" class="update">Modifier</button>
                </div>
                
                <div class="btn-delete">
                    <!-- bouton delete si créateur de la publication ou admin -->
                    <button v-if="userInfo.admin" @click="deletePost()" class="delete">Supprimer</button>
                </div>

                <!-- Affichage commentaires -->
                <!-- <div class="post-comments"> -->
                    <!-- v-for="comment in publication.Comments" :key="comment.id" -->
                    <!-- <div class="user-info">
                            <p class="user-info-img"><img src="" alt="photo de profil"></p>
                            <p>Commentaire de l'utilisateur</p> -->
                            <!-- {{ comment.user.first_name }} {{ comment.user.last_name }} -->
                            
                            <!-- btn delete si user à créé le commentaire ou si admin -->
                            <!-- <button v-if="statutUser" @click="deleteComment()" class="delete">Supprimer</button>
                        </div>
                        <p>Contenu du commentaire</p>
                </div> -->

                <!-- Nouveaux commentaires de publiication -->
                <!-- <div class="comments">
                    <div class="new-comments">
                        <form @submit.prevent="createComment(posts.id)">
                            <textarea type="text" class="new-comment-input" placeholder="Commenter..." v-model="commentContent" required></textarea>
                            <button type="submit" title="Publier le commentaire">Envoyer</button>
                        </form>
                    </div>
                </div>-->
            </div>
    </div>
</template>

<script>

import { mapState } from 'vuex'

export default {
    name: 'PostDisplay',
    props: {
        post: {
            type: Object
        }
    },
    data() {
        return {
            commentContent: null,
        }
    },
    computed: {
        ...mapState({
            user:'user',
            userInfo: 'userInfo',
            posts: 'posts',
        }),
        // postUser: function() {
        //     return this.postInfo.userId;
        // },
    },
    mounted() {
        // const self = this; 
        // this.$store.dispatch('getPost', this.$store.state.postInfo)
        // .then(function() {
        //     // self.posts.title = self.postInfo.title;
        // }, function () {
        //     // self.logout();
        // })
    },
    methods: {
        // postUser() {
        //     if(this.user.userId === this.post.userId) {
        //         return
        //     }
        // },
        deletePost() {
            // console.log("Le bouton delete fonctionne !");
            // const self = this;
            this.$store.dispatch('deletePost')
            .then(function() {
                console.log('ok')
            }, function () {
                
            })
        },
        // updatePost() {
        //     console.log("Le bouton update fonctionne !");
        // },
        deleteComment() {
            console.log("Ok!")
        },
        modifyPost() {
            this.$router.push('/modifyPost');
        }
    }
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

</style>