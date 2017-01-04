<template>
	<div class="">
		<mu-paper>
			<mu-bottom-nav :value="bottomNav" @change="handleChange">
				<mu-bottom-nav-item value="home" title="主页" icon="home"/>
				<mu-bottom-nav-item value="grade" title="我的作品" icon="grade"/>
				<mu-bottom-nav-item value="build" title="设置" icon="build"/>
				<mu-bottom-nav-item value="power" title="退出" icon="clear"/>
			</mu-bottom-nav>
		</mu-paper>
		<mu-popup position="top" :overlay="false" popupClass="popup-top" :open="topPopup">
			{{message}}
		</mu-popup>
	</div>
</template>

<script>
	let Cookies = require('js-cookie');
	export default {
		components: {
		 	
		},
		data(){
			return {
				bottomNav: 'home',
				topPopup: false,
				message: "",
		    }
		},
		methods: {
			msgAlert(msg){
				this.message = msg;
				this.topPopup = true;
			},
			handleChange (val) {
				this.bottomNav = val

				switch(val){
					case 'home':
						break;
					case 'grade':
						break;
					case 'build':
						break;
					case 'power':
						/*退出*/

						fetch('/H5/rpc',
							{
								method:'POST',
								headers:{ 
						 			'Accept': 'application/json', 
						 			'Content-Type': 'application/json'
								},
								credentials: 'same-origin',
								body: JSON.stringify({
									method: 'logout',
									params: null,
								})
							}
						)
						.then(response => response.json())
						.then(d => {
							if (d.result) {
								this.$store.commit('setRoute','/');
							}
							else{
								d.content && this.msgAlert(d.content);
							}
						})

						
						break;
					default:
						alert('无此标签')
				}
			},
		},
		watch: {
			topPopup(val){
				if (val) {
					setTimeout(() => {
						this.topPopup = false;
					}, 2500);
				}
			}
		},
	}
</script>

<style scoped>
	.container{
		width: 100%;
		height: 80px;
		background-color: #eeff41;
	}
</style>