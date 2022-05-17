<template>
    <div class="commentBox"> 

            <div class="displayComment">

                <!-- <p>{{ comment }}</p> -->

                <!-- Affichage info user -->
                <div class="user-info">
                    <img :src="comment.User.imageUrl" alt="user-picture">
                    <p class="user_name">{{comment.User.first_name}} {{comment.User.last_name}}</p>
                </div>

                <!-- Affichage commentaires -->
                <div class="comment">
                    <div class="comment-content">
                        <p class="text">{{ comment.content }}</p>
                    </div>

                    <div v-if="update()" class="update-comment">
                        <form @submit.prevent="createComment()">
                            <input class="update-comment-input" type="text" placeholder="Nouveau commentaire" required>
                            <button type="submit" title="Publier le commentaire">Envoyer</button>
                        </form>
                    </div>

                </div>

                <div class="btns">
                    <div class="btn-update">
                        <!-- bouton modification si l'user à créé la publication -->
                        <img src="../assets/pen-icon.png" @click="updateComment()" v-if="user.userId === comment.UserId" class="update icon" alt="update" />
                    </div>
                
                    <div class="btn-delete">
                        <!-- bouton delete si créateur de la publication ou admin -->
                        <img src="../assets/bin-icon.png" @click="deleteComment()" v-if="userInfo.admin || user.userId === comment.UserId" class="delete icon" alt="update" />
                    </div>
                </div>

            </div>

    </div>
</template>

<script>

import { mapState } from 'vuex'

export default {
    name: 'CommentDisplay',
    data() {
        return {
            commentContent: null,
            comments: [],
        }
    },
    props: {
        comment: {
            type: Object
        }
    },
    computed: {
        ...mapState({
            user:'user',
            userInfo: 'userInfo',
            comments: 'comments',
            commentInfo: 'commentInfo',
        }),
    },
    // mounted() {
    //     this.refreshComments();
    // },
    methods: {
        updateComment() {
            console.log('Ok', this.comment.id)
        },
        deleteComment() {
            const self = this;
            this.$store.dispatch('deleteComment', this.comment.id)
            .then(function() {
                self.refreshComments();
                console.log('Comment deleted')
            }, function () {
                console.log('not ok')
            })
        },
        refreshComments: function() {
            const self = this;
            this.$store.dispatch('getComments')
            .then(function (response) {
                self.comments = response.data;
            }, function (error) {
                self.error = error.response.data.error;
            })
        },
    //     updatePost() {
    //         this.$router.push('/updatePost/' + this.post.id);
    //     },
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
    width: 30px;
    height: 30px;
    border-radius: 30px;
    border: 1px solid black;
}

.commentBox {
    margin: 0 10px 10px 10px;
    border: 1px solid black;
}

.displayComment {
    position: relative;
    height: 170px;
}

.comment {
    border: 1px solid black;
    background-color: black;
    color: white;
    position: absolute;
    text-align: left;
    height: 80px;
    width: 95%;
    margin: 5px;
}

.comment-content {   
    width: auto;
    height: 90%;
    margin: 0;
    overflow-y: scroll;
}

.update-comment-input {
    position: absolute;
    top: 0;
    margin: 5px;
    height: 80%; 
    width: 93%;
}

.btns {
    display: flex;
    flex-direction: row;
    margin: 10px;
    position: absolute;
    top: 0;
    right: 0;
}

.icon {
    width: 20px;
    height: 20px;
}

/* RESPONSIVE MOBILE */
 @media (max-width: 768px) {
     /* .comment {
        width: 80%;
     } */
 }

</style>