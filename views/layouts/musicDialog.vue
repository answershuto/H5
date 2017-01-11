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
			</mu-list>
		</div>
		<div class="music-right">
			<div v-show="isMyMusic">
				
			</div>
			<div v-show="isNetMusic">
				<div>
					<audio id="myAudio" controls="controls" >
						<source  type="audio/mp3" />
					</audio>
				</div>
				<div>
					<span v-for="item in musicItems">
						<mu-flat-button :label="item.title" @click="handleClickMusic(item.url)" class="" icon="audiotrack" primary/>
					</span>
				</div>
			</div>
		</div>
	</mu-dialog>
</template>

<script>

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
				]
			}
		},
		methods:{
			handleChange(val){
				this.currentPage = val;
			},
			handleClickMusic(url){
				let audio = document.getElementById('myAudio');
				audio.pause();
				audio.src = '/music/'+url;
				audio.play();
			},
		},
		computed:{
			isOpen(){
				return true;
			},
			isMyMusic(){
				return (this.currentPage === 'myMusic')
			},
			isNetMusic(){
				return (this.currentPage === 'networkMusic')
			}
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
		width: 550px;
	}
</style>