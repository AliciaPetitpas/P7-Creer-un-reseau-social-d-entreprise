<template>
    
<div>
    <MenuPage />

<main id="main" class="post-detail">
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
    border: 1px solid black;
    margin: 2px;
}

/* RESPONSIVE MOBILE */
/* @media (max-width: 768px) {
    .user-info {
        flex-direction: column;
    }
} */

</style>