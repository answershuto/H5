<template>
 	<div>
 		<PageList></PageList>
 		<MobilePhone></MobilePhone>
 		<musicDialog></musicDialog>
 	</div>
</template>

<script>
	import PageList from '../layouts/PageList.vue'
	import MobilePhone from '../layouts/MobilePhone.vue'
	import musicDialog from '../layouts/musicDialog.vue'
	export default {
		components: {
			PageList,
			MobilePhone,
			musicDialog,
		},
		computed: {
			workName(){
				return this.$store.state.workName;
			}
		},
	}
</script>
