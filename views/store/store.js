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

/*modoles*/
let Work = require('./modules/Work.js');
let Design = require('./modules/Design.js');
let User = require('./modules/User.js');

export default new Vuex.Store({
	strict: true,
    modules: {
    	Main,
    	Work,
    	Design,
    	User,
    }
})
