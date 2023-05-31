<template>
	<div id="app" :class="{ 'hide-menu': !isMenuVisible || !user}">
		<Header title="VSS Artigos" 
			:hideToggle= !user
			:hiddeUserDropdown='!user' />
		<Menu v-if="user"/>

		<Content v-if="!validatingToken" />
		<loading v-else /> <!-- mostra o gif enquanto carrega -->
		<Footer />
	</div>
</template>

<script>
import { mapState } from 'vuex'

import Content from './components/template/Content.vue'
import Header from './components/template/Header.vue'
import Menu from './components/template/Menu.vue'
import Footer from '@/components/template/Footer.vue'
//'@/components/...' --> usa o raiz (src)
//token
import axios from 'axios'
import { baseApiUrl, userKey } from '@/global'
import Loading from './components/template/Loading.vue'

export default {
	name: "Appp",
	components: { Header, Footer, Content, Menu, Loading },
	computed: mapState(['isMenuVisible', 'user']),
	data: function() {
		return {
			validatingToken: false//momento em que ele vÊ se esta tudo certo
		}
	},
	methods: {
		async validateToken() {
			this.validatingToken = true

			const json = localStorage.getItem(userKey)
			const userData = JSON.parse(json)
			this.$store.commit('setState', null)//antes de validar ele vai ficar nulo (se estiver certo ele coloca de novo)

			if(!userData) {
				this.validatingToken = false
				this.$router.push({ path: '/auth' })//redireciona
				return
			}

			const res = await axios.post(`${baseApiUrl}/validateToken`, userData)

			if (res.data) {
				this.$store.commit('setUser', userData)//coloca de novo

			if(this.$mq === 'xs' || this.$mq === 'sm') {//responsividade
                this.$store.commit(('toggleMenu', false))
            }

			} else {
				localStorage.removeItem(userKey)
				console.log('Token ruim ')
				this.$router.push({ path: '/auth' })
			}

			this.validatingToken = false
		}
	},
	created() {
		this.validateToken()
	}
}
</script>

<style>
* {
		font-family: "Lato", sans-serif;
	}

	body {
		margin: 0;
	}

	#app {
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;

		height: 100vh;
		display: grid;
		grid-template-rows: 60px 1fr 40px;
		grid-template-columns: 300px 1fr;
		grid-template-areas:
			"header header"
			"menu content"
			"menu footer";
	}

	#app.hide-menu {
		grid-template-areas:
			"header header"
			"content content"
			"footer footer";
	}
</style>