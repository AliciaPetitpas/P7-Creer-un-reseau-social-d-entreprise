<template>
    
    <header class="log-header">
        <img src="../assets/icon-left-font-monochrome-black.svg" alt="Logo Groupomania" class="header-logo">
        <img src="../assets/icon.svg" alt="Logo Groupomania Mobile" class="header-logo_mobile">
        
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

.header-logo_mobile {
    display: none;
}

button {
    padding: 10px;
    border-style: none;
    background-color: black;
    color: white;
    font-weight: bold;
}

/* RESPONSIVE TABLETTE */
@media (min-width: 768px) and (max-width: 991px) {
    header {
        max-width: 100%;
        margin: auto;
    }
}

/* RESPONSIVE MOBILE */
@media (max-width: 768px) {
    header {
        max-width: 100%;
        margin: auto;
    }

    .header-logo {
        display: none;
    }

    .header-logo_mobile {
        display: flex;
        height: 100px;
        margin: auto;
    }
}

</style>