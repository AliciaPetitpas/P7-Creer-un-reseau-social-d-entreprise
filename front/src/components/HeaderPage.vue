<template>
    
    <header id="log-header" class="log-header">
        <h1 class="log-header__title"><img src="../assets/icon-left-font-monochrome-black.svg" alt="Logo Groupomania Blanc" class="log-header__logo"></h1>
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
