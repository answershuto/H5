<template>
	<mu-dialog :open="isOpen" title="" >	
		<div class="music-left">
			<mu-list @change="handleChange">
				<mu-list-item title="我的图片" value="myMusic" >
					<mu-icon slot="left" value="audiotrack"/>
				</mu-list-item>
				<mu-list-item title="上传图片" value="uploadMusic" >
					<mu-icon slot="left" value="audiotrack"/>
				</mu-list-item>
				<mu-list-item title="管理图片" value="manageMusic" >
					<mu-icon slot="left" value="audiotrack"/>
				</mu-list-item>
			</mu-list>
		</div>
		<mu-flat-button slot="actions" @click="cancel" primary label="取消"/>
	</mu-dialog>
</template>

<script>
	export default {
		components: {

		},
		data(){
			return {

			};
		},
		methods:{
			handleChange(type){

			},
		},
		computed:{
			isOpen(){
				return true;
			},
		}
	}
</script>

<style scoped>


</style>