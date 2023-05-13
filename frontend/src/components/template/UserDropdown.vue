<template>
  <div class="user-dropdown">
    <div class="user-button"><!--Abrir a nova tela-->
        <span class="d-none d-sm-block">{{ user.name }}</span>
        <div class="user-dropdown-img">
            <img src="https://th.bing.com/th/id/OIP.XAAV7U7zqq4yw2kcsPW1EgHaI4?w=162&h=194&c=7&r=0&o=5&pid=1.7" alt="">
            <!-- <Gravatar :email="user.email" /> -->
        </div>
        <i class="fa fa-angle-down"></i>
    </div>
    <div class="user-dropdown-content"><!--Conteudo que aparece e some-->
        <a href=""><i class='fa fa-cogs'> Administração</i></a>
        <a href=""><i class='fa fa-sign-out'> Sair</i></a>
    </div>
  </div>
</template>

<script>
/*"vue-gravatar": "1.2.1", */
import { mapState } from 'vuex'
import Gravatar from 'vue-gravatar'

// Vue.component('v-gravatar', Gravatar)
export default {
    name: 'UserDrodown', 
    componets: { Gravatar },
    computed: mapState(['user'])
}
</script>

<style>
    .user-dropdown {
        position: relative;
        height: 100%;
    }

    .user-button {
        display: flex;
        align-items: center;
        color: #fff;
        font-weight: 100;
        height: 100%;
        padding: 0px 20px;
    }

    .user-dropdown:hover {
        background-color: rgba(0, 0, 0, 0.2);
    }

    .user-dropdown-img {
        margin: 0px 10px;
    }

    .user-dropdown-img > img {
        max-height: 37px;
        border-radius: 5px;
    }


    .user-dropdown-content {
        position: absolute;
        right: 0px;
        background-color: #f9f9f9;
        min-width: 170px;
        box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
        padding: 10px;
        z-index: 1;

        display: flex;
        flex-direction: column;
        flex-wrap: wrap;

        visibility: hidden;
        opacity: 0;
        transition: visibility 0s, opacity 0.5s linear;
    }

    .user-dropdown:hover .user-dropdown-content {
        visibility: visible;
        opacity: 1;
    }

    .user-dropdown-content a {
        text-decoration: none;
        color: #000;
        padding: 10px;
    }

    .user-dropdown-content a:hover {
        text-decoration: none;
        color: #000;
        background-color: #EDEDED;
    }
</style>