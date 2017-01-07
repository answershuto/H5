<template>
 	<div>
 		<PageList></PageList>
 	</div>
</template>

<script>
	import PageList from '../layouts/PageList.vue'
	export default {
		components: {
			PageList,
		},
		computed: {
			workName(){
				return this.$store.state.workName;
			}
		},
	}
</script>
