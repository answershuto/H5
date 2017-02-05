<template>
 	<div class="container">
 		<div v-show="!hasWorks" class="prompt">
 			您还没有作品，赶紧创建一个吧.
 			<mu-flat-button label="创建作品" class="create-button" @click="createWork" primary/>
 		</div>
 		<div v-show="hasWorks">
 			<div v-for="item in DesignWorks">
 				<DesignWorkPage :WorkName="item.workName"></DesignWorkPage>
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
</style>