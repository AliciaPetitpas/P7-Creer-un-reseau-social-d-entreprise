<template>
    
    <header class="nav-header">
        <img src="../assets/icon-left-font-monochrome-black.svg" alt="Logo Groupomania" class="header-logo">
        <img src="../assets/icon.svg" alt="Logo Groupomania Mobile" class="header-logo_mobile">
        
        <nav class="nav-btn">
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

.header-logo_mobile {
    display: none;
}

/* RESPONSIVE MOBILE */
 @media (max-width: 768px) {

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