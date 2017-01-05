'use strict';

let mutations = {
	/*设置当前页面的路由*/
	setRoute(state, route){
		state.Route = route;
	},

	/*是否显示加载中*/
	Loading(state, l){
		state.isLoading = l ? true : false;
	},

	/*是否弹出提示框*/
	Alert(state, msg){
		state.AlertMessage = msg.message;
		state.isAlert = msg.isAlert ? true : false;

	}
};

module.exports = mutations;