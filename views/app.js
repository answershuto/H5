'use strict';

import Vue from 'vue'
import routes from './routes'
import MuseUI from 'muse-ui'
import 'muse-ui/dist/muse-ui.css'

Vue.use(MuseUI)

const app = new Vue({
	el: '#app',
	data: {
		currentRoute: window.location.pathname
	},
	computed: {
	ViewComponent () {
		const matchingView = routes[this.currentRoute]
		return matchingView
			? require('./pages/' + matchingView + '.vue')
			: require('./pages/404.vue')
	}
	},
	render (h) {
		return h(this.ViewComponent)
	}
})

window.addEventListener('popstate', () => {
 	app.currentRoute = window.location.pathname
})