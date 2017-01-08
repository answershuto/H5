<template>
 	<div v-show="isLoading">
		<div class="mask opacity">
			<div class="div-ProgressBar">
				<div class="div-ProgressBar-conter">
					<mu-circular-progress :size="180" color="#795548" :strokeWidth="10"></mu-circular-progress>
					<div class="div-loading">Loading...</div>
				</div>
			</div>
		</div>
 	</div>
</template>

<script>

	export default {
		components: {

		},
		computed: {
			isLoading(){
				return this.$store.state.Main.isLoading;
			}
		}
	}
</script>

<style scoped>
	.div-loading{
		color: #795548;
		margin-top: -100px;
		margin-left: 50px;
		font-size: 130%;
	}

	.mask{
		height:100%; 
		width:100%; 
		position:fixed; 
		_position:absolute; 
		top:0; 
		z-index:1000; 
	} 

	.opacity{ 
		opacity:0.3; 
		filter: 
		alpha(opacity=30); 
		background-color:#000; 
	} 

	.div-ProgressBar{
		width: 200px;
		margin: 0px auto;
	}

	.div-ProgressBar-conter{
		position: absolute; 
		width: 200px; 
		top: 50%;
		margin-top: -150px;
		height: 300px;
	}
</style>