<template>

    <MenuPage />

    <main class="content">
        <div class="post">
            <button @click="toCreatePost()" class="createPost">Créer une publication</button>
        </div>
        <div @click="toPostDetail()" class="post">Dernier post créé ici</div>
        <div @click="toPostDetail()" class="post">Avant dernier post créé ici</div>
    </main>

</template>

<script>

import MenuPage from '../components/MenuPage.vue'

export default {
    name: 'MainPage',
    components: {
        MenuPage,
    },
    methods: {
        toCreatePost() {
            this.$router.push('/createPost')
        },
        toPostDetail() {
            this.$router.push('/postDetail')
        }
    }
}

</script>

<style scoped>

.content {
    display: flex;
    flex-direction: column;
    margin: 10px auto 10px auto;
}

.post {
    background-color: #fdd7d7 ;
    border: 1px solid black;
    border-radius: 30px;
    margin-bottom: 10px;
}

.createPost {
    border: none;
    background-color: black;
    color: white;
    padding: 5px;
    margin-left: 5px;
}

</style>