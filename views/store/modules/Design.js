'use strict';

module.exports = {
	state: {
		/*页面数目*/
		pageNum: 1,
		/*是否显示提示框*/
		isAlert: false,
		/*提示框信息*/
		alertMessage: "",
	},
	mutations: {
		/*页面数目加1*/
		addPageNum(state){
			state.pageNum++;
		},
		/*页面数目减1*/
		delPageNum(state){
			state.pageNum--;
		},
		/*弹出提示*/
		alertDesignMessage(state, {isAlert, message}){
			state.isAlert = isAlert ? true : false;
			state.alertMessage = message || "";
		},
	},
	actions: {
		/*增加一个页面*/
		addPageNum(context){
			context.commit('addPageNum');
		},
		/*删除一个页面*/
		delPageNum(context, num){
			context.commit('delPageNum');
		},
	},
	getters: {
		
	}
}
