<template>
 	<div class="container" >
		<div class="div-login" >
			<mu-paper class="login-background" :zDepth="5" >
				<div class="div-h5-icon">
					<img src="/images/H5.png" width="128" height="128" />
				</div>
				<mu-text-field class="login-input" label="用户名" v-model="userName" labelFloat/><br/>
				<mu-text-field class="login-input" label="密码" v-model="passWord" hintText="密码" type="password" labelFloat/><br/>
				<div class="div-login-register">
					<mu-flat-button @click="login" label="登陆" class="demo-flat-button div-login-register-button" primary/>
					<mu-flat-button @click="register" label="注册" class="demo-flat-button div-login-register-button" secondary/>
				</div>
			<mu-paper>
			<mu-popup position="top" :overlay="false" popupClass="popup-top" :open="topPopup">
				{{message}}
			</mu-popup>
		</div>
 	</div>
</template>

<script>
	export default {
		data () {
			return {
				userName: "",
				passWord: "",
				topPopup: false,
				message: "",
			}
		},
		methods: {
			msgAlert(msg){
				this.message = msg;
				this.topPopup = true;
			},
		 	login(){
		 		fetch('/H5/Login',
					{
						method:'POST',
						headers:{ 
				 			'Accept': 'application/json', 
				 			'Content-Type': 'application/json'
						},
						redentials: 'include',
						body: JSON.stringify({
							method: 'login',
							params: {
								userName: this.userName,
								passWord: this.passWord,
							},
						})
					}
				)
				.then(response => response.json())
				.then(d => {
					if (d.result) {
						/*登陆成功*/
						this.$store.commit('setRoute','/Main');
					}
					else{
						this.msgAlert(d.content);
					}
				})
		 	},
		 	register(){
		 		this.$store.commit('setRoute','/Register');
		 	}
		},
		computed: {

		},
		watch: {
			topPopup(val){
				if (val) {
					setTimeout(() => {
						this.topPopup = false;
					}, 2500);
				}
			}
		}
	}
</script>

<style scoped>
	.mask{height:100%; width:100%; position:fixed; _position:absolute; top:0; z-index:1000; } 
	.opacity{ opacity:0.3; filter: alpha(opacity=30); background-color:#000; } 

	.login-background {
	  display: inline-block;
	  background-color: #ffd54f;
	  height: 250px;
	  width: 500px;
	  margin: 20px;
	  text-align: center;
	}

	.login-input{
		width: 300px;
		margin-top: 20px;
	}

	.div-login{
		position: absolute; 
		width: 300px; 
		top: 50%;
		margin-top: -150px;
		margin-left: -150px;
		height: 300px;
	}

	.container{
		width: 300px;
		margin: 0px auto;
	}

	.div-h5-icon{
		float: left;
		margin-top: 50px;
		margin-left: 20px;
	}

	.div-login-register{
		padding-left: 70px;
	}

	.div-login-register-button{
		margin-left: 20px;
	}
</style>