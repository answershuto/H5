<template>
 	<div>
		 <mu-dialog :open="isAlert" title="H5 Alert">
		    {{getMessage}}
		    <mu-flat-button label="确定" slot="actions" primary @click="close"/>
		  </mu-dialog>
 	</div>
</template>
 
<script>
	/*use this.$store.commit('Alert', {isAlert: true, message: 'test'});*/
	export default {
		data () {
			return {
		
			}
		},
		methods: {
			close () {
		     	this.$store.commit('Alert', false);
		    }
		},
		computed: {
			isAlert(){
				return this.$store.state.Main.isAlert;
			},
			getMessage(){
				return this.$store.state.Main.AlertMessage;
			}
		}
	}
</script>

<style scoped>
	
</style>