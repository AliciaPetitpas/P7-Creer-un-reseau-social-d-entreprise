<template>

<div id="body">
    <header id="log-header" class="log-header">
        <h1 class="log-header__title"><img src="../assets/icon-left-font-monochrome-black.svg" alt="Logo Groupomania Blanc" class="log-header__logo"></h1>
        <nav class="log-header__nav">
            <button @click="loginWindow = true; signupWindow = false" class="log-header__nav__login header__btn">
                Se connecter
            </button>
            <button @click="loginWindow = false; signupWindow = true" class="log-header__nav_signup header__btn">
                S'inscrire
            </button>
        </nav>
    </header>

    <main id="main">

        <!-- Connexion -->

        <div v-if="login" class="form">
            <input v-model="email" type="email" class="input-form" placeholder="Adresse mail"/>
            <input v-model="password" type="password" class="input-form" placeholder="Mot de passe"/>
            <!-- <button @click="login()" class="button"> -->
        </div>
        
        <!-- Inscription -->

        <div v-if="register" class="form">
            <input type="text" class="input-form" placeholder="Nom"/>
            <input type="text" class="input-form" placeholder="Prénom"/>
            <input v-model="email" type="email" class="input-form" placeholder="Adresse mail"/>
            <input v-model="password" type="password" class="input-form" placeholder="Mot de passe"/>
            <!-- <button @click="login()" class="button"> -->
        </div>

    </main>

</div>
    
</template>

<script>

</script>

<style scoped>

nav, main {
    display: flex;
    flex-direction: column;
    margin-left: auto;
    margin-right: auto;
}

nav {
    width: 200px;
}

</style>