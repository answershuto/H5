'use strict';

import Vue from 'vue'
import Vuex from 'vue'

Vue.use(Vuex);

let state = {
	
}

let actions = require('./actions/index.js');
let mutations = require('./mutations/index.js');

module.exports = new Vuex.Store({
    state,
    mutations,
    actions,
    strict: true
})
