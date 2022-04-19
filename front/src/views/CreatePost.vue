<template>
    
<div>
    <MenuPage/>

<main class="content">
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

.content {
    display: flex;
    flex-direction: column;
    margin: 10px auto 10px auto;
}

input {
    width: 100%;
    height: 300px;
    margin-bottom: 10px;
}

.create-post {
    background-color: #fdd7d7 ;
    border: 1px solid black;
    border-radius: 30px;
    margin-bottom: 10px;
}

button {
    border: none;
    background-color: black;
    color: white;
    padding: 5px;
    margin-left: 5px;
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

</style>