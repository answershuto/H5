<template>
 	<div class="container">
 		<div class="div-main">
 			<div class="div-mobile-phone">
 				<div id="myDesignRect" class="mobilePhone-design">
 					<div v-for="item in text" :id="item.id">
 						{{item.text}}
 					</div>
 				</div>
 				<div class="mobilePhone-background" :class="{'div-mobile-grid': grid}" ></div>
 				<div class="mobilePhone-home" :title="showTitle" @click="handleClickHome"></div>
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

	export default {
		components: {
			url: '',
		},
		data(){
			return {
				/*显示网格*/
				grid: true,
			}
		},
		methods: {
			handleClickHome(){
				this.grid = !this.grid;

				if (this.grid) {/*显示网格*/

				}
				else{/*隐藏网格*/

				}
			},
		},
		computed: {
			showTitle(){
				return this.grid ? "隐藏网格" : "显示网格";
			},
			text(){
				return this.$store.state.Design.DesignInfos.text;
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

	.mobilePhone-home{
		margin-left: 194px;
		margin-top: 11px;
		width: 50px;
		height: 50px;
		cursor: pointer;
	}

	.div-mobile-grid{
		background-image: url("/images/grid.png");
	}
</style>