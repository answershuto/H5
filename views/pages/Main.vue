<template>
 	<div class="container">
 		<Navigation></Navigation>
 		<Alert></Alert>
 		<Home v-show="isHome"></Home>
 		<Work v-show="isWork"></Work>
 		<Setup v-show="isSetup"></Setup>
 	</div>
</template>

<script>
	import Navigation from '../components/Navigation.vue'
	import Alert from '../components/Alert.vue'
	import Home from '../layouts/Home.vue'
	import Work from '../layouts/Work.vue'
	import Setup from '../layouts/Setup.vue'
	export default {
		components: {
		 	Navigation,
		 	Alert,
		 	Home,
		 	Work,
		 	Setup,
		},
		computed: {
			/*用下面三个方法配合v-show显示每个界面*/
			isHome(){
				return (this.$store.state.Main.Page === 'Home')
			},
			isWork(){
				return (this.$store.state.Main.Page === 'Work')
			},
			isSetup(){
				return (this.$store.state.Main.Page === 'Setup')
			},
		},
	}
</script>

<style scoped>
	.container{
		
	}
</style>