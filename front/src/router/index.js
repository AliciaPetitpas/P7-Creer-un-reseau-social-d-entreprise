import { createRouter, createWebHashHistory } from 'vue-router'
import HomePage from '../views/HomePage.vue'
import HomeLogin from '../views/HomeLogin.vue'
import HomeRegister from '../views/HomeRegister.vue'
import UserProfile from '../views/UserProfile.vue'

const routes = [{
        path: '/',
        name: 'home',
        component: HomePage
    },
    {
        path: '/login',
        name: 'Login',
        component: HomeLogin
    },
    {
        path: '/register',
        name: 'Register',
        component: HomeRegister
    },
    {
        path: '/userProfile',
        name: 'userProfile',
        component: UserProfile
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router