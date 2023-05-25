import Vue from 'vue'
import Vuex from 'vuex'

import axios from 'axios'

Vue.use(Vuex) 

export default new Vuex.Store({
    state: {
        isMenuVisible: false,//vai logar, nao precisa mostrar nada
        user: null /*{
            name: 'Usuário Mock',
            email: 'victorspich13@gmail.com'
        }*/
    },
    mutations: {
        toggleMenu(state, isVisible) {
            if(!state.user) {
                state.isMenuVisible = false
                return
            }

            if(isVisible===undefined) {
                state.isMenuVisible = !state.isMenuVisible//muda
            } else {//se ja passou, nao quer mudar com toggle
                state.isMenuVisible = isVisible
            }
        },
        setUser(state, user) {
            state.user = user
            if(user) {
                axios.defaults.headers.common['Authorization'] = `bearer ${user.token}`
                state.isMenuVisible = true
            } else {
                delete axios.defaults.headers.common['Authorization']
                state.isMenuVisible = false
            }
        }
    }
})