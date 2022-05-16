<template>
    <div>
        <MenuPage/>
        <main id="main" class="main">
            <div class="update-post">
                <p>POST {{ postInfo }}</p>
            </div>
        </main>
    </div>
</template>

<script>

import MenuPage from '../components/MenuPage.vue'
import { mapState } from 'vuex'

export default {
    name: 'updatePost',
    components: {
        MenuPage,
    },
    mounted() {
        //Controle user du post
        if(this.$store.state.user.userId == -1) {
        this.$router.push('/');
        return; 
        }
        const urlId = this.$route.params.id;
        console.log(urlId);
        this.$store.dispatch('getPost', urlId);
    },
    computed: {
        ...mapState({
            user:'user',
            postInfo: 'postInfo',
        }),
    },
}
</script>
