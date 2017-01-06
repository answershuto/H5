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
		state.AlertMessage = msg.message || "";
		state.isAlert = msg.isAlert ? true : false;

	},

	/*用以导航栏切换Mian.vue页面*/
	setPage(state, page){
		if (['Home', 'Work', 'Setup'].indexOf(page) >= 0) {
			state.Page = page;
		}
		else{
			state.Page = 'Home';
		}
	},

	/*创建新作品弹出框*/
	createWorkDialog(state, l){
		state.createWorkDialog = l ? true : false;
	},

	/*作品的名字*/
	setWorkName(state, name){
		state.workName = name || "";
	},
};

module.exports = mutations;