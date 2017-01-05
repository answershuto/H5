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
		},
		methods: {
			/*用下面三个方法配合v-show显示每个界面*/
			isHome(){
				return (this.$store.state.Page === 'Home')
			},
			isWork(){
				return (this.$store.state.Page === 'Work')
			},
			isSetup(){
				return (this.$store.state.Page === 'Setup')
			},
		},
	}
</script>

<style scoped>
	.container{
		
	}
</style>