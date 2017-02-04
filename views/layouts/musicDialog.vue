<template>
	<mu-dialog :open="isOpen" title="" >	
		<div class="music-left">
			<mu-list @change="handleChange">
				<mu-list-item title="我的音乐" value="myMusic" >
					<mu-icon slot="left" value="audiotrack"/>
				</mu-list-item>
				<mu-list-item title="网络乐库" value="networkMusic" >
					<mu-icon slot="left" value="audiotrack"/>
				</mu-list-item>
				<mu-list-item title="上传音乐" value="uploadMusic" >
					<mu-icon slot="left" value="audiotrack"/>
				</mu-list-item>
				<mu-list-item title="管理音乐" value="manageMusic" >
					<mu-icon slot="left" value="audiotrack"/>
				</mu-list-item>
			</mu-list>
			<form name="musicForm" class="uploadMusic" action="/H5/UploadMusic" method="post" encType="multipart/form-data" target="musicIframe">
				<input type="file" name="music" id="uploadMusic" @change="handleChangeUploadMusic()" accept="audio/mpeg" >
				<iframe name="musicIframe"></iframe>
			</form>
		</div>
		<div class="music-right">
			<div v-show="isMyMusic">
				<div>
					<span v-for="item in userMusics">
						<mu-flat-button :label="item.musicName" @click="handleClickMusic('userMusic', item)" class="" icon="audiotrack" primary/>
					</span>
				</div>
			</div>
			<div v-show="isNetMusic">
				<div>
					<span v-for="item in musicItems">
						<mu-flat-button :label="item.title" @click="handleClickMusic('netMusic', item)" class="" icon="audiotrack" primary/>
					</span>
				</div>
			</div>
			<div v-show="isManageMusic">
				<div>
					<mu-flat-button @click="chooseAllMusics" primary label="全选"/>
					<mu-flat-button @click="chooseNullMusics" primary label="清空"/>
					<mu-flat-button @click="deleteMusics" primary label="删除"/>
				</div>
				<span v-for="item in userMusics">
					<mu-checkbox :label="item.musicName" :nativeValue="item.id" v-model="manageMusicList" /> <br/>
				</span>
			</div>
		</div>
		<mu-flat-button slot="actions" @click="cancel" primary label="取消"/>
	</mu-dialog>
</template>

<script>
	require("babel-polyfill");
	export default {
		components: {

		},
		data(){
			return {
				currentPage: 'myMusic',
				musicSrc: "",
				musicItems: [
					{
						title: 'Above and Beyond',
						url: 'Audio Machine - Above and Beyond.mp3',
					},
					{
						title: 'Age of Dragons',
						url: 'Audio Machine - Age of Dragons.mp3',
					},
					{
						title: 'Impera',
						url: 'Audio Machine - Impera.mp3',
					},
					{
						title: 'Lachrimae',
						url: 'Audio Machine - Lachrimae.mp3',
					},
					{
						title: 'Piano Beat',
						url: 'BeaTsGOy - Piano Beat.mp3',
					},
					{
						title: 'Legacy',
						url: 'Brian Tyler - Legacy',
					},
					{
						title: '你再也读不出我任何欲望',
						url: 'Cicada - 你再也读不出我任何欲望.mp3',
					},
					{
						title: '最后 仍在一起',
						url: 'Cicada - 最后 仍在一起.mp3',
					},
					{
						title: 'Requiem For A Tower Mvt. III',
						url: 'Corner Stone Cues - Requiem For A Tower Mvt. III.mp3',
					},
					{
						title: 'Our Flame Shall Endure',
						url: 'Epic Score - Our Flame Shall Endure.mp3',
					},
					{
						title: 'Aphelion V2',
						url: 'Fired Earth Music - Aphelion V2.mp3',
					},
					{
						title: 'Passion of Victory',
						url: 'Future World Music - Passion of Victory.mp3',
					},
					{
						title: 'End Credits',
						url: 'Hans Zimmer - End Credits.mp3',
					},
				],
				manageMusicList: [],
			}
		},
		methods:{
			handleChange(val){
				if (val === 'uploadMusic') {
					(document.getElementById('uploadMusic')).click();
				}
				else{
					this.currentPage = val;
				}
			},
			handleClickMusic(type, info){
				if (type === 'userMusic') {
					this.$store.commit('updateMusic', info.id);
				}
				else{
					//info.url
				}

				this.$store.commit('musicDialog', false);

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
							method: 'getAllUserMusics',
							params: null,
						})
					}
				)
				.then(response => response.json())
				.then(d => {
					if (d.result) {
						this.$store.commit('updateUserMusics', d.params);
					}
				})
			},
			handleChangeUploadMusic(){
				fetch('/H5/UploadMusic',
					{
						method:'POST',
						credentials: 'same-origin',
						body: new FormData(document.forms.namedItem("musicForm" )),
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
			deleteMusics(){
				fetch('/H5/rpc',
					{
						method:'POST',
						headers:{ 
				 			'Accept': 'application/json', 
				 			'Content-Type': 'application/json'
						},
						credentials: 'same-origin',
						body: JSON.stringify({
							method: 'delUserMusics',
							params: {
								id: this.manageMusicList,
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
			chooseAllMusics(){
				this.$store.state.Design.userMusics.forEach((item, index) => {
					this.manageMusicList.push(item.id);
				})
			},
			chooseNullMusics(){
				this.manageMusicList = [];
			},
			cancel(){
				this.$store.commit('musicDialog', false);
			},
		},
		computed:{
			isOpen(){
				return this.$store.state.Design.musicDialog;
			},
			isMyMusic(){
				return (this.currentPage === 'myMusic')
			},
			isNetMusic(){
				return (this.currentPage === 'networkMusic')
			},
			isManageMusic(){
				return (this.currentPage === 'manageMusic')
			},
			userMusics(){
				return this.$store.state.Design.userMusics;
			},
		}
	}
</script>

<style scoped>
	.music-left{
		float: left;
		width: 160px;
	}

	.music-right{
		float: left;
		width: 530px;
	}

	.uploadMusic{
		display: none;
	}

</style>