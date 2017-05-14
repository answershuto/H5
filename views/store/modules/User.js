'use strict';

module.exports = {
	state: {
		userInfo: {},
	},
	mutations: {
		updateUserInfo(state, l){
			state.userInfo = l;
		},
	},
	actions: {
		updateUserInfo(context){
			
		},
		saveUserInfo (context, userInfo) {
			fetch('/H5/rpc',
				{
					method:'POST',
					headers:{ 
			 			'Accept': 'application/json', 
			 			'Content-Type': 'application/json'
					},
					credentials: 'same-origin',
					body: JSON.stringify({
						method: 'saveUserInfo',
						params: userInfo,
					})
				}
			)
			.then(response => response.json())
			.then(d => {
				if (d.result) {
					console.log(d)
				}
				else{
					
				}
			})
		}
	},
	getters: {

	}
}