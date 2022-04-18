<template>
    
    <header id="log-header" class="log-header">
        <img src="../assets/icon-left-font-monochrome-black.svg" alt="Logo Groupomania Blanc" class="log-header__logo">
        <nav class="log-header__nav">
            <button @click="HomePage()">Retourner à l'accueil</button>
        </nav>
    </header>

</template>

<script>

export default {
    name: 'HeaderPage',
    methods: {
        HomePage(){
            this.$router.push('/');
        }
    }
}

</script>

<style scoped>

header {
    padding-bottom: 10px;
    border-bottom: 2px solid black;
}

button {
    padding: 10px;
    border-style: none;
    background-color: black;
    color: white;
}

</style>