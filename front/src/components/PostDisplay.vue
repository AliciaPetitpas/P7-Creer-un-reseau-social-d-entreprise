<template>
    <div>
        <main id="main" class="main">

           <div class="displayPost">
                <!-- Affichage publication -->
            <div class="post">
                <div class="profile-info">
                    <p class="pofile-info-img"><img src="" alt="photo de profil"></p>
                    <p class="profile-info-user">Informations user</p>
                    <!-- {{ post.user.first_name }}{{ post.user.last_name }} -->
                </div>

                <div class="post-title">
                    <p class="title-text">{{ post.title }}</p>
                </div>

                <div class="post-content">
                    <p class="content-text">{{ post.content }}</p>
                    <!-- btn delete si user à créé le post ou si admin -->
                </div>
            </div>

            <!-- Nouveaux commentaires de publiication -->
            <div class="comments">
                <div class="new-comments">
                    <form @submit.prevent="createComment(post.id)">
                        <textarea type="text" class="new-comment-input" placeholder="Commenter..." v-model="commentContent" required></textarea>
                        <button type="submit" title="Publier le commentaire">Envoyer</button>
                    </form>
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
                    </div>
                    <p>Contenu du commentaire</p>
                    <!--  -->
            </div>
           </div>

        </main>
    </div>
</template>

<script>

import { mapState } from 'vuex'

export default {
    name: 'PostDisplay',
    data() {
        return {
            post: [],
            commentContent: null,
        }
    },
    computed: {
        ...mapState({
            user:'user',
            userInfo: 'userInfo',
            post: ''
        })
    },
    mounted() {
        // const self = this; 
        this.$store.dispatch('getPost', this.$store.state.postInfo)
        .then(function() {
            console.log(this.$store.state.postInfo);
        }, function () {
            // self.logout();
        })
    },
}

</script>

<style scoped>

#main {
    border: none;
    background-color: white;
}

</style>