<template>
 	<div class="container" ref="design">
 		<div class="div-main">
 			<div class="div-mobile-phone">
 				<div id="myDesignRect" class="mobilePhone-design" :style="backgroundColor">
 					<div v-show="hasMusic" class="music-icon" :class="{'rotate': isPlay}" @click="handleMusicClick"></div>
 					<div v-for="item in text" :id="item.id" class="design-text" :class="[(currentEle==item.id) ? 'design-select':'']" :style="showAnimation ? Object.assign(item.animationStyle, item.style): item.style" @click.stop="handleClickEle">
 						{{item.text}}
 					</div>
 					<img :src="'/H5/image?id='+item.imageID" v-for="item in image" :id="item.id" class="design-image" :class="[(currentEle==item.id) ? 'design-select':'']" :style="showAnimation ? Object.assign(item.animationStyle, item.style): item.style" @click.stop="handleClickEle">
 					</img>
 				</div>
 				<div class="mobilePhone-background" ></div>
 				<div class="mobilePhone-home" @click="handleClickHome"></div>
 			</div>
 		</div>
		<div>
			<audio id="myAudio" controls="controls" style="display:none;" >
				<source  type="audio/mp3" />
			</audio>
		</div> 
 	</div>
</template>

<script>
	import '../static/animation.css'
	export default {
		components: {
			
		},
		data(){
			return {
				/*是否显示动画效果*/
				showAnimation: false,
				/*是否播放音乐*/
				isPlay: true,
			}
		},
		mounted(){
			this.$refs.design.onclick = ()=>{
				this.$store.dispatch('cancelCurrentEle');
			}
		},
		beforeDestroy(){
			this.$refs.design.onclick = null;
		},
		methods: {
			handleClickHome(){
				if (this.showAnimation) {
					/*动画正在执行中，停止动画并关闭定时器*/
					this.showAnimation = false;
					clearTimeout(this.animationTimer)
					return;
				}

				/*获取最大动画时间*/
				let maxTime = 1;

				let text = [];
				this.$store.state.Design.DesignInfos.pages.forEach(item => {
					if (item.id === this.$store.state.Design.DesignInfos.currentPage) {
						text = item.text || [];
					}
				})
				
				text.forEach(item => {
					let durationTime = parseInt(item.animationStyle['animation-duration']);
					maxTime = (durationTime > maxTime) ? durationTime : maxTime;
				})

				let image = [];
				this.$store.state.Design.DesignInfos.pages.forEach(item => {
					if (item.id === this.$store.state.Design.DesignInfos.currentPage) {
						image = item.image || [];
					}
				})

				image.forEach(item => {
					let durationTime = parseInt(item.animationStyle['animation-duration']);
					maxTime = (durationTime > maxTime) ? durationTime : maxTime;
				})

				/*浏览动画并开启定时器，执行完所有动画以后将该标志位改为false*/
				this.showAnimation = true;
				this.animationTimer = setTimeout(() => {
					this.showAnimation = false;
				}, maxTime * 1000)
			},
			handleClickEle(e){
				this.$store.commit('modifyCurrentElement', e.target.id);
				this.$store.commit('isModifyEle', true);
			},
			handleMusicClick(){
				this.isPlay = !this.isPlay;
				let audio = document.getElementById('myAudio');
				if (this.isPlay) {
					audio.play();
				}
				else{
					audio.pause();
				}
			},
		},
		computed: {
			text(){
				let text = [];
				this.$store.state.Design.DesignInfos.pages.forEach(item => {
					if (item.id === this.$store.state.Design.DesignInfos.currentPage) {
						text = item.text || [];
					}
				})
				return text;
			},
			image(){
				let image = [];
				this.$store.state.Design.DesignInfos.pages.forEach(item => {
					if (item.id === this.$store.state.Design.DesignInfos.currentPage) {
						image = item.image || [];
					}
				})
				return image;
			},
			currentEle(){
				return this.$store.state.Design.DesignInfos.currentElement;
			},
			hasMusic(){
				return (this.$store.state.Design.DesignInfos.music !== '')
			},
			backgroundColor(){
				return {'background-color': this.$store.state.Design.DesignInfos.currentBackgroundColor || '#FFFFFF'};
			},
		},
		watch: {
			
		}
	}
</script>

<style scoped>
	.div-mobile-phone{
		position: absolute; 
		width: 450px; 
		top: 50%;
		margin-top: -400px;
		height: 810px;
		background-image: url("/images/mobilePhone.png");
	}

	.container{
		width: 450px;
		margin: 0px auto;
	}

	.div-main{
		width: 450px;
		margin: 0px auto;
	}

	.mobilePhone-background{
		width: 340px;
		height: 571px;
		margin-top: 122px;
		margin-left: 49px;
	}

	.mobilePhone-design{
		position: absolute;
		width: 340px;
		height: 571px;
		top: 15%;
		left: 11%;
	}

	.design-text, .design-image{
		position: absolute;
		cursor: pointer;
	}

	.design-title{
		text-align: center;
		height: 50px;
		background-color: black;
		color: white;
		line-height: 50px;
		font-size: 150%;
	}

	.mobilePhone-home{
		margin-left: 194px;
		margin-top: 11px;
		width: 50px;
		height: 50px;
		cursor: pointer;
	}

	.design-select{
		border:1px solid black;
	}

	.div-mobile-grid{
		background-image: url("/images/grid.png");
	}

	.music-icon{
		position: absolute;
		top: 5%;
		right: 5%;
		background-image: url('/images/music.png');
		background-repeat: no-repeat;
		width: 22px;
		height: 22px;
		cursor: pointer;
	}

	.rotate{
		animation: rotate 5s infinite linear;
		-moz-animation: rotate 5s infinite linear;	/* Firefox */
		-webkit-animation: rotate 5s infinite linear;	/* Safari 和 Chrome */
		-o-animation: rotate 5s infinite linear;	/* Opera */
	}

	@keyframes rotate
	{
		from {transform:rotate(10deg);}
		to {transform:rotate(360deg);}
	}

	@-moz-keyframes rotate /* Firefox */
	{
		from {transform:rotate(10deg);}
		to {transform:rotate(360deg);}
	}

	@-webkit-keyframes rotate /* Safari 和 Chrome */
	{
		from {transform:rotate(0deg);}
		to {transform:rotate(360deg);}
	}

	@-o-keyframes rotate /* Opera */
	{
		from {transform:rotate(10deg);}
		to {transform:rotate(360deg);}
	}
</style>