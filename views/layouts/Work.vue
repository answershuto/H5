<template>
 	<div class="container">
 		<div class="prompt">
 			您还没有作品，赶紧创建一个吧.
 			<mu-flat-button label="创建作品" class="create-button" @click="createWork" primary/>
 		</div>
 	</div>
</template>

<script>

	export default {
		components: {
			
		},
		methods: {
			createWork(){
				
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