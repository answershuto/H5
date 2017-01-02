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
 	</div>
</template>

<script>
	let Cookies = require('js-cookie');
	export default {
		components: {
		 	
		},
		data(){
			return {
				bottomNav: 'home'
		    }
		},
		methods: {
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
						console.log(Cookies.get('H5-isRememberPassword'))
						fetch('/H5/rpc',
							{
								method:'POST',
								headers:{ 
						 			'Accept': 'application/json', 
						 			'Content-Type': 'application/json'
								},
								credentials: 'include',
								body: JSON.stringify({
									method: 'logout',
									params: {
										
									},
								})
							}
						)
						.then(response => response.json())
						.then(d => {console.log(d)})
						break;
					default:
						alert('无此标签')
				}
			},
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