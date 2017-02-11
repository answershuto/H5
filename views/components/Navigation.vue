<template>
	<div class="">
		<mu-paper>
			<mu-bottom-nav :value="bottomNav" @change="handleChange">
				<mu-bottom-nav-item value="Home" title="主页" icon="home"/>
				<mu-bottom-nav-item value="Work" title="我的作品" icon="grade"/>
				<mu-bottom-nav-item value="Setup" title="设置" icon="build"/>
				<mu-bottom-nav-item value="Power" title="退出" icon="clear"/>
			</mu-bottom-nav>
		</mu-paper>
		<mu-popup position="top" :overlay="false" popupClass="popup-top" :open="topPopup">
			{{message}}
		</mu-popup>
	</div>
</template>

<script>
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
					case 'Home':
						this.$store.commit('setPage','Home');
						break;
					case 'Work':
						this.$store.commit('setPage','Work');
						break;
					case 'Setup':
						this.$store.commit('setPage','Setup');
						break;
					case 'Power':
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
								d.content && this.$store.commit('Alert', {isAlert: true, message: d.content});
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