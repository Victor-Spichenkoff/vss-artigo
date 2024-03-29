import Vue from 'vue'

// export const baseApiUrl = 'https://vss-artigos-backend.onrender.com'
export const baseApiUrl = 'http://localhost:2006'

//tratar os erros recebidos do backend

export function showError(e) {
    if(e && e.response && e.response.data) {//dentro de response
        Vue.toasted.global.defaultError({ msg: e.response.data })
    } else if( typeof e === 'string') {//ja veio direto
        Vue.toasted.global.defaultError({ msg: e })
    } else {
        Vue.toasted.global.defaultError()//pega a mensagem padrao(eu criei)
    }
}


export const userKey = '__chave_usuario'


export default { baseApiUrl, showError, userKey }
