'use strict';

let Vue = require('Vue');
let Vuex = require('Vuex');

Vue.use(Vuex);

var state = {
	
}

var actions = require('./action/index.js');
var mutations = require('./mutation/index.js');

module.exports = new Vuex.Store({
    state,
    mutations,
    actions,
    strict: true
})
