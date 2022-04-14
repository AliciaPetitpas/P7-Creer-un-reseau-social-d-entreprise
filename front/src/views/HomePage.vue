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
        <!-- <div v-if="login" class="login">          
            <div class="form">
            <input v-model="password" type="password" class="input-form" placeholder="Mot de passe"/>
        </div>
        <div class="form" v-if="mode == 'login' && status == 'error_login'">
            Adresse mail et/ou mot de passe invalide
        </div>
        <div class="form">
            <button @click="login()" class="button" :class="{'button--disabled' : !validatedFields}" v-if="mode == 'login'">
                <span v-if="status == 'loading'">Connexion en cours...</span>
                <span v-else>Connexion</span>
            </button>
        </div>
        </div> -->
        
        <!-- Inscription -->
    </main>

</div>
    
</template>