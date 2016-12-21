<template>
 	<div class="container">
 		<Login></Login>
 	</div>
</template>

<script>
	import Login from '../layouts/Login.vue'
	export default {
		components: {
		 	Login
		}
	}
</script>

<style scoped>
	.container{
		margin: 0px auto;
		width: 500px;
	}
</style>