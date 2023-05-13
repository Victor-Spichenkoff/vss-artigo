<template>
	<div id="app" :class="{ 'hide-menu': !isMenuVisible }">
		<Header title="VSS Artigos" 
			:hideToggle=false 
			:hiddeUserDropdown=false />
		<Menu />
		<Content />
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

export default {
	name: "Appp",
	components: { Header, Footer, Content, Menu },
	computed: mapState(['isMenuVisible'])
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