<template>
 	<div>
		<mu-drawer right :open="isOpen" @close="close()" class="drawer" >
			
		</mu-drawer>
 	</div>
</template>

<script>

	export default {
		components: {

		},
		data(){
			return {
				
			}
		},
		computed: {
			isOpen(){
				return this.$store.state.Design.isModifyEle;
			},
		},
		methods: {
			close(){

			},
		}
	}
</script>

<style scoped>
	.drawer{
		background-color: #d7ccc8;
	}
</style>