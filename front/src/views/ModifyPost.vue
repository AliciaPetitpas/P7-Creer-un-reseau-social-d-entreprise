<template>
    <div>
        <MenuPage/>
        <main id="main" class="main">
            <div class="modify-post">
                <p>This is where we update the post</p>
                <p>{{ userInfo }}</p>
                <p>{{ postInfo }}</p>
                <!-- <p>{{ posts }}</p> -->
            </div>
        </main>
    </div>
</template>

<script>

import MenuPage from '../components/MenuPage.vue'
import { mapState } from 'vuex'

export default {
    name: 'modifyPost',
    components: {
        MenuPage,
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
