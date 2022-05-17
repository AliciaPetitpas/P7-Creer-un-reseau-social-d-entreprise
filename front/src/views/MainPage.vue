<template>

<div>
    <MenuPage />

    <main id="main" class="content">
        <div class="post">
            <button @click="toCreatePost()" class="createPost">Créer une publication</button>
        </div>

        <div v-for="item in posts" v-bind:key="item" class="displayPost">
            <PostDisplay :post="item" />
        </div>
    </main>
</div>

</template>

<script>

import MenuPage from '../components/MenuPage.vue'
import PostDisplay from '../components/PostDisplay.vue'
import { mapState } from 'vuex'

export default {
    name: 'MainPage',
    components: {
        MenuPage,
        PostDisplay,
    },
    mounted() {
        if(this.$store.state.user.userId == -1) {
        this.$router.push('/');
        return; 
        }
        this.$store.dispatch('getUserInfo', this.$store.state.user.userId);
        this.$store.dispatch('getPosts');
    },
    computed: {
        ...mapState({
            user:'user',
            userInfo: 'userInfo',
            posts: 'posts',
        })
    },
    methods: {
        toCreatePost() {
            this.$router.push('/createPost')
        },
        // toPostDetail() {
        //     this.$router.push('/postDetail')
        // }
    }
}

</script>

<style scoped>

.post, .displayPost {
    background-color: white;
    border: 1px solid black;
    border-radius: 30px;
    margin: 10px;
}

</style>