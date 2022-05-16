<template>
    <div> 

            <div class="displayComment">

                <p>{{ comment }}</p>

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
    // methods: {
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
    // },
}

</script>