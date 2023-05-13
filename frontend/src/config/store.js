import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex) 

export default new Vuex.Store({
    state: {
        isMenuVisible: true,
        user: {
            name: 'Usuário Mock',
            email: 'victorspich13@gmail.com'
        }
    },
    mutations: {
        toggleMenu(state, isVisible) {
            if(isVisible===undefined) {
                state.isMenuVisible = !state.isMenuVisible//muda
            } else {//se ja passou, nao quer mudar com toggle
                state.isMenuVisible = isVisible
            }
        }
    }
})