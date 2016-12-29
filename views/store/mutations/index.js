'use strict';

let mutations = {
	/*设置当前页面的路由*/
	setRoute(state, route){
		state.Route = route;
	},

	Loading(state, l){
		state.isLoading = l ? true : false;
	}
};

module.exports = mutations;