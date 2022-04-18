import { createRouter, createWebHashHistory } from 'vue-router'
import HomePage from '../views/HomePage.vue'
import HomeLogin from '../views/HomeLogin.vue'
import HomeRegister from '../views/HomeRegister.vue'
import UserProfile from '../views/UserProfile.vue'
import MainPage from '../views/MainPage.vue'
import PostDetail from '../views/PostDetail.vue'
import CreatePost from '../views/CreatePost.vue'

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
    },
    {
        path: '/mainPage',
        name: 'mainPage',
        component: MainPage
    },
    {
        path: '/postDetail',
        name: 'postDetail',
        component: PostDetail
    },
    {
        path: '/createPost',
        came: 'createPost',
        component: CreatePost
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router