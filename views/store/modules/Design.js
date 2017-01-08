'use strict';

module.exports = {
	state: {
		/*页面数目*/
		pageNum: 1,
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
