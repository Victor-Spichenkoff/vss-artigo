<template>
    <header class="header">
        <a href="#" class="toggle" v-if='!hideToggle' @click="toggleMenu">
            <i class="fa fa-lg" :class="icon"></i><!--icon=retorna se é aberto ou fechado-->
        </a>
        <h1 class="title">
            <router-link to="/">
                {{ title }}
            </router-link>
        </h1>
        <UserDropdown v-if="!hiddeUserDropdown" />
    </header>
</template>

<script>
import UserDropdown from './UserDropdown.vue'

export default {
    name: 'header',
    components: { UserDropdown },
    props: {
        title: String,
        hideToggle: Boolean,
        hiddeUserDropdown: Boolean
    },
    computed: {
        icon() {
            
            return this.$store.state.isMenuVisible ? 'fa-angle-left' : 'fa-angle-down'
        }
    },
    methods: {
        toggleMenu() {
            this.$store.commit('toggleMenu')
        }
    }
}
</script>

<style>
    .header {
        grid-area: header;
        background: linear-gradient(to right, #1e469a, #49a7c1);

        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .title {
        font-size: 1.2rem;
        color: #fff;
        font-weight: 100;
        flex-grow: 1;
        text-align: center;
    }

    .title a {
        color: #FFF;
        text-decoration: none;
    }

    .title a:hover {
        color: #FFF;
        text-decoration: none;
    }

    header.header > a.toggle {
        width: 60px;
        height: 100%;
        color: #fff;
        justify-self: flex-start;
        text-decoration: none;

        display: flex;
        justify-content: center;
        align-items: center;
    }

    header.header > a.toggle:hover {
        color: #fff;
        background-color: rgba(0, 0, 0, 0.2);
    }
</style>