<template>
    <div>
        <MenuPage/>
        <main id="main" class="main">
            <div class="update-post">
                <p>This is where we update the post</p>
                <p>USER {{ userInfo }}</p>
                <p>POST {{ post }}</p>
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
    props: {
        post: {
            type: Object
        }
    },
    mounted() {
        this.$store.dispatch('updatePost')
    },
    computed: {
        ...mapState({
            user:'user',
            userInfo: 'userInfo',
            postInfo: 'postInfo',
        }),
    },
}
</script>
