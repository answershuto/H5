<template>
 	<div class="container">
 		<div class="div-main">
 			<div class="div-mobile-phone">
 				<canvas id="myCanvas" class="canvas"></canvas>
 			</div>
 		</div>
 	</div>
</template>

<script>

	export default {
		components: {

		}
	}
</script>

<style scoped>
	.div-mobile-phone{
		position: absolute; 
		width: 450px; 
		top: 50%;
		margin-top: -400px;
		height: 810px;
		background-image: url("/images/mobilePhone.png");
	}

	.container{
		width: 450px;
		margin: 0px auto;
	}

	.div-main{
		width: 450px;
		margin: 0px auto;
	}

	.canvas{
		width: 340px;
		height: 571px;
		margin-top: 122px;
		margin-left: 49px;
	}
</style>