<template>
 	<div>
 		<PageList></PageList>
 		<MobilePhone></MobilePhone>
 		<musicDialog></musicDialog>
 		<imageDialog></imageDialog>
 		<modifyDesign></modifyDesign>
 		<mu-popup position="top" :overlay="false" popupClass="popup-top" :open="topPopup">
			{{message}}
		</mu-popup>
		<div class="system-btn">
			<mu-raised-button label="预览" @click="handleClickPreview" backgroundColor="#A1887F" />
			<mu-raised-button label="保存" @click="handleClickSave" primary/>
			<mu-raised-button label="退出" @click="handleClickExit" secondary/>
		</div>
 	</div>
</template>

<script>
	import PageList from '../layouts/PageList.vue'
	import MobilePhone from '../layouts/MobilePhone.vue'
	import musicDialog from '../layouts/musicDialog.vue'
	import imageDialog from '../layouts/imageDialog.vue'
	import modifyDesign from '../layouts/modifyDesign.vue'

	let localStorage = window.localStorage || {}; 

	export default {
		components: {
			PageList,
			MobilePhone,
			musicDialog,
			modifyDesign,
			imageDialog,
		},
		data() {
			return {
				
			}
		},
		methods: {
			handleClickSave(){
				fetch('/H5/rpc',
					{
						method:'POST',
						headers:{ 
				 			'Accept': 'application/json', 
				 			'Content-Type': 'application/json'
						},
						credentials: 'same-origin',
						body: JSON.stringify({
							method: 'saveDesign',
							params: {
								name: this.$store.state.Work.workName,
								designInfos: this.$store.state.Design.DesignInfos,
							},
						})
					}
				)
				.then(response => response.json())
				.then(d => {
					if (d.result) {
						this.$store.commit('alertDesignMessage', {isAlert: true, message: '保存成功'});
					}
					else{
						this.$store.commit('alertDesignMessage', {isAlert: true, message: '保存失败'});
					}
				})
			},
			handleClickExit(){
				this.$store.dispatch('updateDesignWorks');
				this.$store.commit('setRoute','/Main');
				this.$store.commit('setDesign');
			},
			handleClickPreview(){
				window.open('/H5/Show?userName='+localStorage['H5-UserName']+'&workName='+this.$store.state.Work.workName, '_blank');
			},
		},
		computed: {
			workName(){
				return this.$store.state.workName;
			},
			message(){
				return this.$store.state.Design.alertMessage;
			},
			topPopup(){
				if (this.$store.state.Design.isAlert) {
					setTimeout(() => {
						this.$store.commit('alertDesignMessage', {isAlert: false, message: ''});
					}, 2500);
				}

				return this.$store.state.Design.isAlert;
			},
		},
		watch: {
			
		}
	}
</script>

<style lang="css">
	.popup-top {
		width: 100%;
		opacity: .8;
		height: 48px;
		line-height: 48px;
		display: flex;
		align-items: center;
		justify-content: center;
		max-width: 375px;
	}

	.system-btn{
		float: right;
	}

	.system-btn > button {
		width: 105px;
		margin: 10px 5px 10px;
	}
</style>