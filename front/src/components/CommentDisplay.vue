<template>
    <div class="commentBox"> 

        <div class="displayComment">

            <!-- Affichage info user -->
            <div class="user-info">
                <img :src="comment.User.imageUrl" alt="user-picture">
                <p class="user_name">{{comment.User.first_name}} {{comment.User.last_name}}</p>
                <!-- <p class="comment-time">{{ comment.createdAt }}</p> -->
            </div>

            <!-- Affichage commentaires -->
            <div class="comment">
                <div class="update-comment">
                    <!-- <input id="comment_input" v-model="this.commentContent" class="update-comment-input" type="text" required disabled> -->
                    <form @submit.prevent="sendComment()">
                    <textarea name="comment" ref="comment_input" v-model="this.commentContent" class="update-comment-input" disabled required></textarea>
                    <button type="submit" class="update-comment-btn" ref="comment_btn" title="Publier le commentaire" style="display:none">Modifier</button>
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
            commentInfo: 'commentInfo',
        }),
    },
    mounted() {
        this.commentContent = this.comment.content;
    },
    methods: {
        updateComment() {
            this.$refs.comment_input.disabled = false;
            this.$refs.comment_btn.style.display= "";
        },
        sendComment() {
            const self = this;
            const newComment = {
                commentId: this.comment.id,
                content: this.commentContent,
            }
            this.$store.dispatch("updateComment", newComment)
            .then(function () {
                self.$emit("refresh");
            }, function () {
            })
        },
        deleteComment() {
            const self = this;
            this.$store.dispatch('deleteComment', this.comment.id)
            .then(function() {
                self.$emit("refresh");
                console.log('Comment deleted')
            }, function () {
                console.log('not ok')
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
    height: 80px;
    width: 95%;
    margin: 5px;
}

.update-comment { 
    width: 100%;
    height: 90%;
    margin: 0;
}

.update-comment-input {
    margin: 5px 5px 0 5px;
    height: 50px; 
    width: 98%;
    text-overflow: ellipsis;
}

.update-comment-btn {
    color: red;
    background: none;
    border: none;
    margin: 0 0 0 5px;
    padding: 0;
    width: auto;
}

.update-comment-btn:hover {
    color: black;
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

    .update-comment-input{
        width: 93%;
    }
}

</style>