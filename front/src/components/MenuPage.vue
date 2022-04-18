<template>
    
<header>
    <div class="nav-bar">
    
    <div class="main-btn" @click="toMainPage()">
        <img src="../assets/icon-left-font-monochrome-black.svg" alt="Logo Groupomania" class="header-logo">
        <img src="../assets/icon.svg" alt="Logo Groupomania Mobile" class="header-logo_mobile">
    </div>

    <div class="menu">
        <ul class="menu-list">
            <li @click="toUserProfile()">Profil</li>
        </ul>
    </div>
    </div>

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
    this.$router.push('/userProfile')
}
}
}

</script>

<style scoped>

header {
    border-bottom: 2px solid black;
}

.main-btn {
    margin: 0;
}

.nav-bar {
    display: flex;
    flex-direction: row;
    align-items: center;
}

.header-logo_mobile {
    display: none;
}

ul {
    list-style: none;
}

input {
    height: 10px;
    padding: 7px;
    margin-left: 20px;
    border-radius: 15px;
}

.menu {
    text-align: right;
    position: absolute;
    right: 40px;
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