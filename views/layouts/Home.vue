<template>
 	<div class="container">
		<div>
			<mu-grid-list>
				<mu-grid-tile v-for="tile in list" class="model">
					<img :src="tile.image"/>
					<span slot="title">{{tile.title}}</span>
					<mu-icon-button icon="star_border" slot="action"/>
				</mu-grid-tile>
			</mu-grid-list>
		</div>
 	</div>
</template>

<script>
	export default {
		data () {
		return {
			list: [{
					image: '../images/H5.png',
					title: 'H5',
				}, 
				{
					image: '../images/background.png',
					title: 'H5',
				}, 
				{
					image: '../images/defaultHeadPortrait.png',
					title: 'H5',
				}, 
			]
			}
		}
	}
</script>

<style scoped>
	.container{
		
	}

	.model{

	}
</style>