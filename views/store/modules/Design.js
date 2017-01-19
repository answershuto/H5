'use strict';

module.exports = {
	state: {
		/*页面数目*/
		pageNum: 1,
		/*是否显示提示框*/
		isAlert: false,
		/*提示框信息*/
		alertMessage: "",
		/*是否弹出音乐提示框*/
		musicDialog: false,
		/*用户上传音乐列表数据*/
		userMusics: [],
		/*设计界面各个已添加数据*/
		DesignInfos: {
			/*id号*/
			id: 1,
			/*音乐*/
			music: '',
			/*当前选中的元素*/
			currentElement: '',
			/*
				文本
				例: {
					id: design_1,
					word: 'test',
					style:{
						left: 20%,
						top:10%,
					}
				}
			*/
			text: [],
		},
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
		/*弹出音乐提示框*/
		musicDialog(state, l){
			state.musicDialog = l ? true : false;
		},
		/*刷新用户上传音乐列表*/
		updateUserMusics(state, szMusics){
			state.userMusics = szMusics;
		},
		/*修改选择的背景音乐*/
		updateMusic(state, music){
			let audio = document.getElementById('myAudio');
			audio.pause();
			audio.src = '/H5/PlayMusic?id='+music;
			audio.play();
			state.DesignInfos.music = music;
		},
		/*增加文本*/
		addDesignText(state, text){
			state.DesignInfos.text.push({
				id: 'design_'+state.DesignInfos.id,
				text,
				style:{
					left: '0%',
					top: '20%',
				}
			})
		},
		/*根据id修改位置*/
		modifyTextPositionById(state, info){
			state.DesignInfos.text.forEach(item => {
				if (item.id === info.id) {
					item.style.left = info.left;
					item.style.top = info.top;
				}
			})
		},
		/*修改当前选中的元素*/
		modifyCurrentElement(state, ele){
			state.DesignInfos.currentElement = ele || '';
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
		/*弹出音乐提示框*/
		musicDialog(context, l){
			fetch('/H5/rpc',
				{
					method:'POST',
					headers:{ 
			 			'Accept': 'application/json', 
			 			'Content-Type': 'application/json'
					},
					credentials: 'same-origin',
					body: JSON.stringify({
						method: 'getAllUserMusics',
						params: null,
					})
				}
			)
			.then(response => response.json())
			.then(d => {
				if (d.result) {
					context.commit('updateUserMusics', d.params);
					context.commit('musicDialog', l ? true : false);
				}
				else{
					this.$store.commit('alertDesignMessage', {isAlert: true, message: '数据获取异常，请重试'});
				}
			})
		}
	},
	getters: {
		
	}
}
