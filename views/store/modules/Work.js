'use strict';

module.exports = {
	state: {
		createWorkDialog: false,
		workName: "",
	},
	mutations: {
		/*创建新作品弹出框*/
		createWorkDialog(state, l){
			state.createWorkDialog = l ? true : false;
		},

		/*作品的名字*/
		setWorkName(state, name){
			state.workName = name || "";
		},
	},
	actions: {

	},
	getters: {
		
	}
}
