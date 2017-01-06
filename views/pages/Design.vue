<template>
 	<div>
 		Design {{workName}}
 	</div>
</template>

<script>

	export default {
		components: {
			
		},
		computed: {
			workName(){
				return this.$store.state.workName;
			}
		},
	}
</script>
