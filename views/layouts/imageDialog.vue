<template>
	<mu-dialog :open="isOpen" title="" >	
		<div class="music-left">
			<mu-list @change="handleChange">
				<mu-list-item title="我的图片" value="myImage" >
					<mu-icon slot="left" value="audiotrack"/>
				</mu-list-item>
				<mu-list-item title="上传图片" value="uploadImage" >
					<mu-icon slot="left" value="audiotrack"/>
				</mu-list-item>
				<mu-list-item title="管理图片" value="manageImage" >
					<mu-icon slot="left" value="audiotrack"/>
				</mu-list-item>
			</mu-list>
		</div>
		<form name="ImageForm" class="uploadImage" action="/H5/UploadImage" method="post" encType="multipart/form-data" target="imageIframe">
			<input type="file" accept="image/*" name="image" id="uploadImage" @change="handleChangeUploadImage()" ></input>
			<iframe name="imageIframe"></iframe>
		</form>
		<mu-flat-button slot="actions" @click="cancel" primary label="取消"/>
	</mu-dialog>
</template>

<script>
	export default {
		components: {

		},
		data(){
			return {
				currentType: 'myImage',
			};
		},
		methods:{
			handleChange(type){
				if (type === 'uploadImage') {
					(document.getElementById('uploadImage')).click();
				}
				else {
					this.currentType = type;
				}
			},
			cancel(){

			},
			refreshList(){

			},
			handleChangeUploadImage(){
				fetch('/H5/UploadImage',
					{
						method:'POST',
						credentials: 'same-origin',
						body: new FormData(document.forms.namedItem("ImageForm" )),
					}
				)
				.then(response => response.json())
				.then(d => {
					if (d.result) {
						this.refreshList();
						this.$store.commit('alertDesignMessage', {isAlert: true, message: '上传成功'});
					}
					else{
						this.$store.commit('alertDesignMessage', {isAlert: true, message: '上传失败'});
					}
				})
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
	.uploadImage{
		display: none;
	}

</style>