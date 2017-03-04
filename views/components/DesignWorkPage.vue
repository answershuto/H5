<template>
 	<div class="container">
 		<mu-icon class="icon-clear" value="clear" @click.stop="closeFunc" />
		<mu-card-media :title="WorkName" :subTitle="getYear">
			<img src="/images/H5.png" />
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
				required: true
			},
			/*时间*/
			date:{
				type: String,
				required: true
			},
			closeFunc: {
				type: Function,
				required: true
			},
		},
		methods: {
			
		},
		computed: {
			getYear(){
				return this.date.slice(0, this.date.indexOf("T")); 
			},
		}
	}
</script>

<style scoped>
	.container{
		cursor: pointer;
		position: relative;
	}

	.icon-clear{
		position: absolute;
		right: 0px;
		top: 0px;
		z-index: 10;
	}
</style>