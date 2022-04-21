<template>
    
<div>
    <MenuPage/>

<main id="main" class="content">
    <div class="create-post">
            <div class="user-info">
                <img src="" alt="user-picture">
                <p class="first_name">First name</p>
                <p class="last_name">Last name</p>
            </div>

        <input type="text" class="new-post" placeholder="Créer une nouvelle publication">
        <!-- Ajout média ici -->
        <button class="add-img">Ajouter une image</button>
        <button class="send-post">Envoyer</button>
    </div>
</main>
</div>

</template>

<script>

import MenuPage from '../components/MenuPage.vue'

export default {
    name: 'CreatePost',
    components: {
        MenuPage,
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

.create-post {
    background-color: white;
    border: 1px solid black;
    border-radius: 30px;
    margin: 10px;
}

::placeholder {
    position: absolute;
}

input {
    width: 95%;
    height: 100px;
}

</style>