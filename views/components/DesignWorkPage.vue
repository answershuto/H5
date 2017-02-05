<template>
 	<div>
		{{WorkName}}
 	</div>
</template>

<script>
	export default {
		data () {
			return {
				
			}
		},
		props: {
			/*作品名称*/
			WorkName:{
				type: String,
				required: true
			},
		},
		methods: {
			
		},
		computed: {
			
		}
	}
</script>

<style scoped>
	
</style>