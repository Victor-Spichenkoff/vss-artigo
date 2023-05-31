import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '@/components/home/Home'
import AdminPages from '@/components/admin/AdminPages.vue'
import ArticlesByCategory from'../components/article/ArticlesByCategory'
import ArticleById from '../components/article/ArticleById'
import Auth from '../components/auth/Auth'

import { userKey } from '@/global'

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
        component: AdminPages,
        // meta: { admRequerido:true }// evitar navegacao sem permissao
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
    },
    {
        name: 'auth',
        path: '/auth',
        component: Auth
    }
]

const router = new VueRouter({
    mode: 'history',//ou hash(# na url)
    routes//array que eu fiz

})

// router.beforeEach((to, from, next) => {
//     const json = localStorage.getItem(userKey)
//     const user = JSON.parse(json)

//     if(to.matched.some(rota => {  rota.meta.admRequerido  })){//se tiver admRequido em alguma rota
//         user.adimn ? next() : next({ path: '/' })
//     } else {
//         next()
//     }
// })

export default router