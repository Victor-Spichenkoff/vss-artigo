import Vue from 'vue'
import Toasted from 'vue-toasted'

Vue.use(Toasted, {
    iconPack: 'fontawesome',
    duration: 3000
})

Vue.toasted.register(
    'defaultSuccess',
    payload => !payload.msg ? 'Operação realidada com sucesso!' : payload.msg,
    { type: 'success', icon: 'check' }
)

Vue.toasted.register(
    'defaultError',
    payload => !payload.msg ? 'Oops.. Erro inesperado.' : payload.msg,
    { type : 'error', icon : 'times' }
)

/*

import Vue from 'vue'
import Toasted from 'vue-toasted'

Vue.use(Toasted, {
    iconPack: 'fontawesome',
    duration: 3000
})


Vue.toasted.register(
    'defaultSucess',
    payload => !payload.msg ? 'Operação realizada com sucesso' : payload.msg,
    {type: 'success', icon: 'check'}//item do fontawesome
)

Vue.toasted.register(
    'defaultError',
    payload => !payload.msg ? 'Erro inesperado' : payload.msg,//qulauqer nome, recebe 
    {type: 'error', icon:'times'}
)
*/