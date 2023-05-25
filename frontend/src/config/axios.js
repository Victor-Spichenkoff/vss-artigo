import axios from 'axios'

const sucess = res => res

const error = err => {
    if(err.response.status === 401) {
        window.location = '/'//redireciona com js
    } else {return Promise.reject(err)}
} 


axios.interceptors.response.use(sucess, error)