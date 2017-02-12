<template>
 	<div>
		<mu-card-media :title="WorkName" :subTitle="getYeat">
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
		},
		methods: {
			
		},
		computed: {
			getYeat(){
				return this.date.slice(0, this.date.indexOf("T")); 
			},
		}
	}
</script>

<style scoped>
	
</style>