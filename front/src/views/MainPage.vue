<template>

<div>
    <MenuPage />

    <main id="main" class="content">
        <div class="post">
            <button @click="toCreatePost()" class="createPost">Créer une publication</button>
        </div>
        <div @click="toPostDetail()" class="post">Dernier post créé ici</div>
        <div @click="toPostDetail()" class="post">Avant dernier post créé ici</div>
    </main>
</div>

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

.post {
    background-color: white;
    border: 1px solid black;
    border-radius: 30px;
    margin: 10px;
}

</style>