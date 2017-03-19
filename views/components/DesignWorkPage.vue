<template>
 	<div class="container">
 		<mu-icon v-show="hasCloseFunc" class="icon-clear" value="clear" @click.stop="closeFunc" />
		<mu-card-media :title="WorkName" :subTitle="getYear">
			<img :src="imageSrc" />
			<div class="image"></div>
		</mu-card-media>
 	</div>
</template>

<script>
	export default {
		data () {
			return {
				
			}
		},
		props: {
			/*作品名称*/
			WorkName:{
				type: String,
			},
			/*时间*/
			date:{
				type: String,
				default: "",
			},
			closeFunc: {
				type: Function,
			},
			imageSrc: {
				type: String,
				default: '/images/H5.png',
			}
		},
		methods: {
			
		},
		computed: {
			getYear(){
				return this.date.slice(0, this.date.indexOf("T")); 
			},
			hasCloseFunc(){
				return this.closeFunc;
			},
		}
	}
</script>

<style scoped>
	.container{
		cursor: pointer;
		position: relative;
	}

	.image{
		width: 100%;
		height: 90px;
	}

	.icon-clear{
		position: absolute;
		right: 0px;
		top: 0px;
		z-index: 10;
	}

</style>