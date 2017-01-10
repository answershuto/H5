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
			
		</div>
	</mu-dialog>
</template>

<script>

	export default {
		components: {

		},
		methods:{
			handleChange(val){
				switch(val){
					case 'myMusic':
						break;
					case 'networkMusic':
						break;
				}
			}
		},
		computed:{
			isOpen(){
				return true;
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
	}
</style>