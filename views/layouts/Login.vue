<template>
 	<div class="container">
 		<login-image></login-image>
 		<login-input></login-input>
 	</div>
</template>

<script>
import LoginImage from '../components/LoginImage.vue'
import LoginInput from '../components/LoginInput.vue'
	export default {
		components: {
		 	LoginImage,
		 	LoginInput
		}
	}
</script>

<style scoped>
	.container{
		
	}
</style>