'use strict';

import Vue from 'vue'
import routes from './routes'
import MuseUI from 'muse-ui'
import 'muse-ui/dist/muse-ui.css'
import store from './store/store.js'

Vue.use(MuseUI)


const app = new Vue({
	el: '#app',
	store,
	data: {
		
	},
	computed: {
		ViewComponent () {
			const matchingView = routes[this.$store.state.Main.Route];
			return matchingView
				? require('./pages/' + matchingView + '.vue')
				: require('./pages/404.vue')
		}
	},
	render (h) {
		return h(this.ViewComponent)
	}
})