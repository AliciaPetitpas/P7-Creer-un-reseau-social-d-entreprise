<template>
    
<header>
    <div class="nav-bar">
    <img src="../assets/icon-left-font-monochrome-black.svg" alt="Logo Groupomania" class="header-logo">
    <img src="../assets/icon.svg" alt="Logo Groupomania Mobile" class="header-logo_mobile">

    <input type="text" class="search-bar" placeholder="Rechercher...">
    <div class="menu">
        <ul class="menu-list">
            <li>Profil</li>
            <li>Paramètres</li>
        </ul>
    </div>
    </div>

</header>

</template>

<script>

</script>

<style scoped>

header {
    border-bottom: 2px solid black;
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
    margin-left: 20px;
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