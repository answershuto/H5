<template>
 	<div>
		<mu-drawer right :open="open" @close="close()" class="drawer" >
			
		
		</mu-drawer>
 	</div>
</template>

<script>

	export default {
		components: {

		},
		data(){
			return {
				open: false,
			}
		},
		computed: {
			
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