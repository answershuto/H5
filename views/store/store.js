'use strict';

import Vue from 'vue'
import Vuex from 'Vuex'

Vue.use(Vuex);

let state = require('./state.js');
let actions = require('./actions.js');
let mutations = require('./mutations.js');

let Main = {
	state,
	actions,
	mutations,
}

let Work = require('./modules/Work.js');

export default new Vuex.Store({
    modules: {
    	Main: Main,
    	Work: Work,
    }
})
