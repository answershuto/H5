'use strict';

import Vue from 'vue'
import Vuex from 'Vuex'

Vue.use(Vuex);

let state = {
	Route:'/',
	isLoading: false,
	isAlert: false,
	AlertMessage: "",
	Page: "Home",
	createWorkDialog: false,
	workName: "",
}

let actions = require('./actions/index.js');
let mutations = require('./mutations/index.js');

export default new Vuex.Store({
    state,
    mutations,
    actions,
    strict: true
})
