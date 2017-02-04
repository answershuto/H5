<template>
	<mu-dialog :open="isOpen" title="" >	
		<div class="image-left">
			<mu-list @change="handleChange">
				<mu-list-item title="我的图片" value="myImage" >
					<mu-icon slot="left" value="image"/>
				</mu-list-item>
				<mu-list-item title="上传图片" value="uploadImage" >
					<mu-icon slot="left" value="image"/>
				</mu-list-item>
				<mu-list-item title="管理图片" value="managerImage" >
					<mu-icon slot="left" value="image"/>
				</mu-list-item>
			</mu-list>
		</div>
		<form name="ImageForm" class="uploadImage" action="/H5/UploadImage" method="post" encType="multipart/form-data" target="imageIframe">
			<input type="file" accept="image/*" name="image" id="uploadImage" @change="handleChangeUploadImage()" ></input>
			<iframe name="imageIframe"></iframe>
		</form>
		<div class="image-right">
			<div v-show="isMyImage">
				<div>
					<span class="image-span" v-for="item in userImages">
						<img :src="'/H5/image?id='+item.id" @click="handleClickImage(item)" />
					</span>
				</div>
			</div>
			<div v-show="isManagerImage">
				<div>
					<mu-flat-button @click="chooseAllImages" primary label="全选"/>
					<mu-flat-button @click="chooseNullImages" primary label="清空"/>
					<mu-flat-button @click="deleteImages" primary label="删除"/>
				</div>
				<span class="image-span" v-for="item in userImages">
					<mu-checkbox :nativeValue="item.id" v-model="managerImageList" /> 
					<img :src="'/H5/image?id='+item.id" />
				</span>
			</div>
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
				currentType: 'myImage',
				managerImageList: [],
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
				this.$store.commit('imageDialog', false);
			},
			refreshList(){
				fetch('/H5/rpc',
					{
						method:'POST',
						headers:{ 
				 			'Accept': 'application/json', 
				 			'Content-Type': 'application/json'
						},
						credentials: 'same-origin',
						body: JSON.stringify({
							method: 'getAllUserImages',
							params: null,
						})
					}
				)
				.then(response => response.json())
				.then(d => {
					if (d.result) {
						this.$store.commit('updateUserImages', d.params);
					}
				})
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
			chooseAllImages(){
				this.$store.state.Design.userImages.forEach((item, index) => {
					this.managerImageList.push(item.id);
				})
			},
			chooseNullImages(){
				this.managerImageList = [];
			},
			deleteImages(){
				fetch('/H5/rpc',
					{
						method:'POST',
						headers:{ 
				 			'Accept': 'application/json', 
				 			'Content-Type': 'application/json'
						},
						credentials: 'same-origin',
						body: JSON.stringify({
							method: 'delUserImages',
							params: {
								id: this.managerImageList,
							},
						})
					}
				)
				.then(response => response.json())
				.then(d => {
					if (d.result) {
						this.refreshList();
						this.$store.commit('alertDesignMessage', {isAlert: true, message: '删除成功'});
					}
					else{
						this.$store.commit('alertDesignMessage', {isAlert: true, message: '删除失败'});
					}
				})
			},
			handleClickImage(info){
				this.$store.commit('addDesignImage', info.id);
				this.$store.commit('imageDialog', false);
			},
		},
		computed:{
			isOpen(){
				return this.$store.state.Design.imageDialog;
			},
			userImages(){
				return this.$store.state.Design.userImages;
			},
			isMyImage(){
				return (this.currentType === 'myImage');
			},
			isManagerImage(){
				return (this.currentType === 'managerImage');
			},
		}
	}
</script>

<style scoped>
	.uploadImage{
		display: none;
	}

	.image-left{
		float: left;
		width: 160px;
	}

	.image-right{
		float: left;
		width: 530px;
	}

	.image-span{
		margin-left: 20px;
		cursor: pointer;
	}

	.image-span > img{
		width: 50px;
		height: 50px;
	}

</style>