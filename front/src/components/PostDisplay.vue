<template>
    <div>
        <main id="main" class="main">

           <div class="displayPost">
                <!-- Affichage publication -->
            <div class="post">
                <div class="profile-info">
                    <p class="pofile-info-img"><img src="" alt="photo de profil"></p>
                    <p class="profile-info-user">Information de l'utilisateur qui a créé le post</p>
                    <!-- {{ post.user.first_name }}{{ post.user.last_name }} -->
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
        // if(this.$store.state.user.userId == -1) {
        //     this.$router.push('/');
        //     return; 
        // }
    },
}

</script>

<style scoped>

.displayPost {
    background-color: white;
    border-radius: 30px;
}

</style>