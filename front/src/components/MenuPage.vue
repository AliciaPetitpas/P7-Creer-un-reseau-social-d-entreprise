<template>
    
<header class="nav-header">
    <img src="../assets/icon-left-font-monochrome-black.svg" alt="Logo Groupomania" class="header-logo">
    <img src="../assets/icon.svg" alt="Logo Groupomania Mobile" class="header-logo_mobile">

    <nav class="nav-btn">
        <button @click="toMainPage()" class="btn-mainpage">Accueil</button>
        <button @click="toUserProfile()" class="btn-profile">Profil</button>
        <button @click="logout()" class="btn-logout">Se déconnecter</button>
    </nav>
</header>

</template>

<script>

export default {
    name: 'MenuPage',
    methods: {
        toMainPage(){
            this.$router.push('/mainPage');
        },
        toUserProfile(){
            this.$router.push('/userProfile');
        },
        logout: function() {
            localStorage.removeItem('user')
            // console.log(localStorage.getItem('user'))
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