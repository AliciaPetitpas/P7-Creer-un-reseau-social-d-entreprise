import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../views/HomePage.vue'
import HomeLogin from '../views/HomeLogin.vue'
import HomeRegister from '../views/HomeRegister.vue'
import UserProfile from '../views/UserProfile.vue'
import MainPage from '../views/MainPage.vue'
import PostDetail from '../views/PostDetail.vue'
import CreatePost from '../views/CreatePost.vue'
import ModifyPassword from '../views/ModifyPassword.vue'
import UpdatePost from '../views/UpdatePost.vue'

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
        name: 'createPost',
        component: CreatePost
    },
    {
        path: '/modifyPassword',
        name: 'modifyPassword',
        component: ModifyPassword
    },
    {
        path: '/updatePost',
        name: 'updatePost',
        component: UpdatePost
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router