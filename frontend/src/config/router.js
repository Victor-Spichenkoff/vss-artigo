import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '@/components/home/Home'
import AdminPages from '@/components/admin/AdminPages'
import ArticlesByCategory from'../components/article/ArticlesByCategory'
import ArticleById from '../components/article/ArticleById'

Vue.use(VueRouter)

const routes = [
    {
        name: 'home',
        path: '/',
        component: Home
    },

    {
        name: 'adminPages',
        path: '/admin',
        component: AdminPages
    }, 
    {
        name: 'articlesByCategory',
        path: '/categories/:id/articles',
        component: ArticlesByCategory
    }, 
    {
        name:'articleById',
        path: '/articles/:id',
        component: ArticleById
    }
]

const router = new VueRouter({
    mode: 'history',//ou hash(# na url)
    routes//array que eu fiz

})

export default router