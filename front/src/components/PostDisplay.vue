<template>
    <div>
        <main id="main" class="main">
            <p>{{post}}</p>

           <div class="displayPost">
                <!-- Affichage publication -->
            <div class="post">
                <div class="profile-info">
                    <p class="pofile-info-img"><img src="" alt="photo de profil"></p>
                    <p class="profile-info-user">Informations user</p>
                    <!-- {{ posts.user.first_name }}{{ posts.user.last_name }} -->
                </div>

                <div class="post-img">
                    <img src="" alt="photo de publication">
                    <!-- :src="posts.imageUrl" -->
                </div>

                <div class="post-title">
                    <p class="title-text">{{ posts.title }}</p>
                </div>

                <div class="post-content">
                    <p class="content-text">{{ posts.content }}</p>
                    <!-- btn delete si user à créé le post ou si admin -->
                </div>

                <div class="btn-update">
                    <!-- bouton modification si l'user à créé la publication -->
                    <!-- <button v-if="postUser" @click="updatePost()" class="update">Modifier</button> -->
                </div>

                <div class="btn-delte">
                    <!-- bouton delete si créateur de la publication ou admin -->
                    <button v-if="statutUser" @click="deletePost()" class="delete">Supprimer</button>
                </div>
            </div>

            <!-- Affichage commentaires -->
            <div class="post-comments">
                <!-- v-for="comment in publication.Comments" :key="comment.id" -->
                <div class="user-info">
                        <p class="user-info-img"><img src="" alt="photo de profil"></p>
                        <p>Commentaire de l'utilisateur</p>
                        <!-- {{ comment.user.first_name }} {{ comment.user.last_name }} -->
                        
                        <!-- btn delete si user à créé le commentaire ou si admin -->
                        <button v-if="statutUser" @click="deleteComment()" class="delete">Supprimer</button>
                    </div>
                    <p>Contenu du commentaire</p>
                    <!--  -->
            </div>

            <!-- Nouveaux commentaires de publiication -->
            <!-- <div class="comments">
                <div class="new-comments">
                    <form @submit.prevent="createComment(posts.id)">
                        <textarea type="text" class="new-comment-input" placeholder="Commenter..." v-model="commentContent" required></textarea>
                        <button type="submit" title="Publier le commentaire">Envoyer</button>
                    </form>
                </div>
            </div>
             -->
           </div>

        </main>
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
        deletePost() {
            console.log("Le bouton delete fonctionne !");
        },
        // updatePost() {
        //     console.log("Le bouton update fonctionne !");
        // },
        deleteComment() {
            console.log("Ok!")
        }
    }
}

</script>

<style scoped>

#main {
    border: none;
    background-color: white;
}

</style>