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
</div>
    
</template>