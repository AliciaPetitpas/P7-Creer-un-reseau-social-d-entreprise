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
            console.log('Ok')
        },
        deleteComment() {
            console.log('Ok2')
        },
    //     deletePost() {
    //         const self = this;
    //         this.$store.dispatch('deletePost', this.post.id)
    //         .then(function() {
    //             self.refreshData();
    //         }, function () {
                
    //         })
    //     },
    //     updatePost() {
    //         this.$router.push('/updatePost/' + this.post.id);
    //     },
    //     refreshData: function() {
    //         const self = this;
    //         this.$store.dispatch('getPosts')
    //         .then(function () {
    //         }, function (error) {
    //             self.error = error.response.data.error;
    //         })
    //     },
    //     createComment() {
    //         const self = this;
    //         let commentData = {
    //             content : this.commentContent,
    //             UserId : this.user.userId,
    //             PostId : this.post.id,
    //         }
    //         this.$store.dispatch('createComment', commentData)
    //         .then(function () {
    //             self.commentContent = "";
    //             self.refreshComments();
    //         }, function (error) {
    //             self.error = error.response.data.error;
    //         })
    //     },
    //     refreshComments: function() {
    //         const self = this;
    //         this.$store.dispatch('getComments', this.post.id)
    //         .then(function (response) {
    //             self.comments = response.data;
    //         }, function (error) {
    //             self.error = error.response.data.error;
    //         })
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
    height: 80px;
}

.comment {
    position: absolute;
    width: 90%;
    height: 150px;
    left: 50px;
    top: 40px;
    /* overflow-y: scroll; */
}

.comment-content {
    /* background-color: white; */
    border: 1px solid black;
    box-shadow: inset 0px 0px 20px 10px rgba(0,0,0,0.3);
    /* border-radius: 20px; */
    text-align: left;
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
     .comment {
        width: 70%;
     }
 }

</style>