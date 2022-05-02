<template>

<div>
        <HeaderPage />
        <Spinner/>
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
</div>
    
</template>

<script>

import HeaderPage from '../components/HeaderPage.vue'
import Spinner from '../components/LoadingSpinner.vue'

export default {
    name: 'HomePage',
    components: {
        HeaderPage,
        Spinner,
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
