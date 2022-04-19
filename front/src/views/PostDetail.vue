<template>
    
<div>
    <MenuPage />

<main class="post-detail">
    <div class="user-info" @click="toUserProfile()">
        <img src="" alt="user-picture">
        <p class="first_name">First name</p>
        <p class="last_name">Last name</p>
    </div>
    <div class="post-comments">
        <div class="post">
            Post here
        </div>
        <div class="comments">
            Comments here
        </div>
        <div class="add-comment">
            Add a comment here
            <button class="new-comment">Envoyer</button>
        </div>
    </div>
</main>
</div>

</template>

<script>

import MenuPage from '../components/MenuPage.vue'

export default {
    name: 'PostDetail',
    components: {
        MenuPage,
    },
    methods: {
    toUserProfile() {
        this.$router.push('/userProfile')
    }
    }
}

</script>

<style scoped>

main {
    display: flex;
    flex-direction: column;
    margin: 10px auto 10px auto;
}

.post-detail {
    background-color: #fdd7d7 ;
    border: 1px solid black;
    border-radius: 30px;
}

.user-info {
    align-items: center;
    display: flex;
    flex-direction: row;
}

.user-info img {
    width: 80px;
    height: 80px;
    border-radius: 80px;
    border: 1px solid black;
}

.user-info p {
    margin: 20px;
}

.post, .comments, .add-comment {
    border: 1px solid black
}

.new-comment {
    border: none;
    background-color: black;
    color: white;
    padding: 10px;
    margin-left: 5px;
}

/* RESPONSIVE MOBILE */
@media (max-width: 768px) {
    .user-info {
        flex-direction: column;
    }
}

</style>