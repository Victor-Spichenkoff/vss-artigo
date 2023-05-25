<!-- Coloca toda a parte de login, registrar e entrar -->
<template>
  <div class="auth-content">
    <div class="auth-modal">
        <img src="@/assets/logo.png" width="200" alt="Logo">
        <hr>
        <div class="auth-title">{{ showSignup ? 'Cadastro' : 'Login' }}</div>

        <input type="text" v-if="showSignup" v-model="user.name" placeholder="Nome">
        <input type="email" v-model="user.email" placeholder="E-mail">
        <input type="password" v-model="user.password" placeholder="Senha">
        <input v-if="showSignup" type="password" v-model="user.confirmPassword" placeholder="Confirmar Senha">

        <button v-if="showSignup" @click="signup">Registrar</button>
        <button v-else @click="signin">Entar</button>
        <a hre @click.prevent="showSignup = !showSignup">
            <span v-if="showSignup">Já é cadastrado? Faça o Login!</span>
            <span v-else>Não tem cadastro? Registre-se aqui!</span>
        </a>
    </div>
  </div>
</template>

<script>
import { baseApiUrl, showError, userKey } from '@/global'
import axios from 'axios'

export default {
    name: 'Auth',
    data: function() {
        return {
            showSignup: false,
            user: {}
        }
    },
    methods: {
        signin() {
            axios.post(`${baseApiUrl}/signin`, this.user)
                .then(res => {
                this.$store.commit('setUser', res.data)//funcao e parametro 2(o primeiro é autopmatico(state))
                localStorage.setItem(userKey, JSON.stringify(res.data))
                    this.$router.push({ path: '/' })
                })
            .catch(showError)
        },
        signup() {
            axios.post(`${baseApiUrl}/signup`, this.user)
                .then(() => {
                    this.$toasted.global.defaultSucess()
                    this.user = {}
                    this.showSignup = false
                })
                .catch(showError)
        }
    }
}
</script>

<style>
    .auth-content {
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .auth-modal {
        background-color: #FFF;
        width: 350px;
        padding: 35px;
        box-shadow: 0 1px 5px rgba(0, 0, 0, 0.15);

        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .auth-title {
        font-size: 1.2rem;
        font-weight: 100;
        margin-top: 10px;
        margin-bottom: 15px;
    }

    .auth-modal input {
        border: 1px solid #BBB;
        width: 100%;
        margin-bottom: 15px;
        padding: 3px 8px;
        outline: none;
    }

    .auth-modal button {
        align-self: flex-end;
        background-color: #2460ae;
        color: #FFF;
        padding: 5px 15px;
    }

    .auth-modal a {
        margin-top: 35px;
    }

    .auth-modal hr {
        border: 0;
        width: 100%;
        height: 1px;
        background-image: linear-gradient(to right,
            rgba(120, 120, 120, 0),
            rgba(120, 120, 120, 0.75),
            rgba(120, 120, 120, 0));
    }
</style>