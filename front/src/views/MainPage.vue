<template>

<div>
    <MenuPage />

    <main id="main" class="content">
        <div class="post">
            <button @click="toCreatePost()" class="createPost">Créer une publication</button>
        </div>

        <div class="displayPost">
            <PostDisplay />
        <!-- @click="toPostDetail()" -->
        </div>

        <div class="displayPost">
            <PostDisplay />
        <!-- @click="toPostDetail()" -->
        </div>
        
    </main>
</div>

</template>

<script>

import MenuPage from '../components/MenuPage.vue'
import PostDisplay from '../components/PostDisplay.vue'

export default {
    name: 'MainPage',
    components: {
        MenuPage,
        PostDisplay,
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