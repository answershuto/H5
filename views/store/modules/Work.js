'use strict';

module.exports = {
	state: {
		createWorkDialog: false,
		/*当前作品的名字*/
		workName: "",
		/*所有历史作品*/
		DesignWorks: [],
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

		/*设置所有历史作品*/
		setDesignWorks(state, works = []){
			state.DesignWorks = works;
		},
	},
	actions: {
		/*刷新用户所有作品*/
		updateDesignWorks(context){
			fetch('/H5/rpc',
				{
					method:'POST',
					headers:{ 
			 			'Accept': 'application/json', 
			 			'Content-Type': 'application/json'
					},
					credentials: 'same-origin',
					body: JSON.stringify({
						method: 'getAllUserDesigns',
						params: null,
					})
				}
			)
			.then(response => response.json())
			.then(d => {
				if (d.result) {
					context.commit('setDesignWorks', d.params);
				}
				else{
					
				}
			})
		},
	},
	getters: {
		
	}
}
