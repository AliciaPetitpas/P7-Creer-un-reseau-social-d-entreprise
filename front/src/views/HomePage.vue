<template>

    <HeaderPage />
    <main id="main">
        <div id="home-btn">
            <button @click="loginWindow()" class="log-header__nav__login header__btn">
                Se connecter
            </button>
            <button @click="registerWindow()" class="log-header__nav_signup header__btn">
                S'inscrire
            </button>
        </div>
    </main>
    
</template>

<script>

import HeaderPage from '../components/HeaderPage.vue'

export default {
    name: 'HomePage',
    components: {
        HeaderPage,
    },
    methods: {
loginWindow(){
    this.$router.push('/login');
},
registerWindow(){
    this.$router.push('/register');
}
}
}

</script>

<style scoped>

main, button {
    display: flex;
    flex-direction: column;
    margin: 10px auto 10px auto;
}

button {
    padding: 30px;
    width: 30%;
    align-items: center;
    border-style: none;
    background-color: black;
    color: white;
    font-weight: bold;
}

main {
    background-color: #fdd7d7 ;
    border: 1px solid black;
    border-radius: 30px;
}

/* RESPONSIVE MOBILE */
@media (max-width: 768px) {
    button {
        width: 70%;
    }
}

</style>