<template>
 	<div class="container">
 		<div class="createWork">
 			<div v-show="!hasWorks" class="prompt">
	 			您还没有作品，赶紧创建一个吧.
	 			<mu-flat-button label="创建作品" class="create-button" @click="createWork" primary/>
	 		</div>
 		</div>
 		<div v-show="hasWorks" class="works">
 			<div v-for="item in DesignWorks">
				<DesignWorkPage :imageSrc="'/H5/QRcode?userName='+userName()+'&workName='+item.workName" :WorkName="item.workName" :date="item.date" @click.native="clickDesignWorkPage(item.workName, item.designInfos)" class="DesignWorkPage" :closeFunc="handleClickClose(item.workName)"></DesignWorkPage>
 			</div>
 			<div class="DesignWorkPage add">
 				<mu-icon class="iconAdd" @click.native="createWork" size="200" value="add"/>
 			</div>
 		</div>
 		<createWorkDialog></createWorkDialog>
		<mu-dialog :open="confirm" title="H5">
			确认删除作品{{delWorkName}}吗？
			<mu-flat-button slot="actions" @click="handleConfirmBtn(true)" primary label="确定"/>
			<mu-flat-button slot="actions" primary @click="handleConfirmBtn(false)" label="取消"/>
		</mu-dialog>
 	</div>
</template>

<script>
	import createWorkDialog from '../components/createWorkDialog.vue'
	import DesignWorkPage from '../components/DesignWorkPage.vue'

	let localStorage = window.localStorage || {}; 

	export default {
		components: {
			createWorkDialog,
			DesignWorkPage,
		},
		data(){
			return {
				confirm: false,
				delWorkName: '',
			};
		},
		methods: {
			createWork(){
				this.$store.commit('createWorkDialog', true);
			},
			clickDesignWorkPage(workName, designInfos){
				this.$store.commit('setDesign', designInfos);
				this.$store.commit('setWorkName', workName);
		    	this.$store.commit('setRoute','/Design');
			},
			handleClickClose(workName){
				return () => {
					this.delWorkName = workName;
					this.confirm = true;
				}
			},
			handleConfirmBtn(l){
				if (l) {
					this.$store.dispatch('delUserWork', this.delWorkName);
				}

				this.confirm = false;
			},
			userName(){
				return localStorage['H5-UserName'] || '';
			},
		},
		computed: {
			/*是否有作品*/
			hasWorks(){
				return (0 !== this.$store.state.Work.DesignWorks.length);
			},
			/*所有作品列表*/
			DesignWorks(){
				return this.$store.state.Work.DesignWorks;
			},
		},
	}
</script>

<style scoped>
	.container{
		
	}

	.add{
		cursor: pointer;
		text-align: center;
	}

	.iconAdd{
		line-height: 350px;
	}

	.DesignWorkPage{
		width: 300px;
		margin: 30px 30px;
		border: 3px solid #6D6B6A;
	}

	.createWork{
		width: 300px;
		margin: 0px auto;
	}

	.prompt{
		position: absolute; 
		width: 300px; 
		top: 50%;
		height: 300px;
		font-size: 150%;
		text-align: center;
	}

	.create-button{
		margin-top: 30px;
	}

	.works{
		display: flex;
		display: -webkit-flex;
		flex-flow: row;
		flex-wrap: wrap;
		width: 80%;
		margin: 0px auto;
	}
</style>