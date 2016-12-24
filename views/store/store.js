'use strict';

import Vue from 'vue'
import Vuex from 'Vuex'

Vue.use(Vuex);

let state = {
	Route:'/'
}

let actions = require('./actions/index.js');
let mutations = require('./mutations/index.js');

module.exports = new Vuex.Store({
    state,
    mutations,
    actions,
    strict: true
})
