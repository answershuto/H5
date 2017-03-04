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
 				<DesignWorkPage :WorkName="item.workName" :date="item.date" @click.native="clickDesignWorkPage(item.workName, item.designInfos)" class="DesignWorkPage" :closeFunc="handleClickClose(item.workName)"></DesignWorkPage>
 			</div>
 		</div>
 		<createWorkDialog></createWorkDialog>
 	</div>
</template>

<script>
	import createWorkDialog from '../components/createWorkDialog.vue'
	import DesignWorkPage from '../components/DesignWorkPage.vue'
	export default {
		components: {
			createWorkDialog,
			DesignWorkPage,
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
				return function(){
					console.log('pp')
					this.$store.dispatch('delUserWork', workName);
				}
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

	.DesignWorkPage{
		width: 300px;
		margin: 30px 30px;
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