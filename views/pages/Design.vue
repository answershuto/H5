<template>
 	<div>
 		<PageList></PageList>
 		<MobilePhone></MobilePhone>
 	</div>
</template>

<script>
	import PageList from '../layouts/PageList.vue'
	import MobilePhone from '../layouts/MobilePhone.vue'
	export default {
		components: {
			PageList,
			MobilePhone,
		},
		computed: {
			workName(){
				return this.$store.state.workName;
			}
		},
	}
</script>
