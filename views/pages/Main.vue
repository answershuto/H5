<template>
 	<div class="container">
 		<Navigation></Navigation>
 		<Alert></Alert>
 	</div>
</template>

<script>
	import Navigation from '../components/Navigation.vue'
	import Alert from '../components/Alert.vue'
	export default {
		components: {
		 	Navigation,
		 	Alert,
		}
	}
</script>

<style scoped>
	.container{
		
	}
</style>