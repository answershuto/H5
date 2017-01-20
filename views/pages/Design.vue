<template>
 	<div>
 		<PageList></PageList>
 		<MobilePhone></MobilePhone>
 		<musicDialog></musicDialog>
 		<modifyDesign></modifyDesign>
 		<mu-popup position="top" :overlay="false" popupClass="popup-top" :open="topPopup">
			{{message}}
		</mu-popup>
 	</div>
</template>

<script>
	import PageList from '../layouts/PageList.vue'
	import MobilePhone from '../layouts/MobilePhone.vue'
	import musicDialog from '../layouts/musicDialog.vue'
	import modifyDesign from '../layouts/modifyDesign.vue'
	export default {
		components: {
			PageList,
			MobilePhone,
			musicDialog,
			modifyDesign,
		},
		data() {
			return {
				
			}
		},
		computed: {
			workName(){
				return this.$store.state.workName;
			},
			message(){
				return this.$store.state.Design.alertMessage;
			},
			topPopup(){
				if (this.$store.state.Design.isAlert) {
					setTimeout(() => {
						this.$store.commit('alertDesignMessage', {isAlert: false, message: ''});
					}, 2500);
				}

				return this.$store.state.Design.isAlert;
			},
		},
		watch: {
			
		}
	}
</script>

<style lang="css">
	.popup-top {
		width: 100%;
		opacity: .8;
		height: 48px;
		line-height: 48px;
		display: flex;
		align-items: center;
		justify-content: center;
		max-width: 375px;
	}
</style>