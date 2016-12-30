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
					<div class="checkbox-login-register">
						<mu-checkbox :vuew="isRememberPassword" v-model="isRememberPassword" label="记住密码" /> <br/>
					</div>
					<div class="button-login-register">
						<mu-flat-button @click="login" label="登陆" class="div-login-register-button" primary/>
						<mu-flat-button @click="register" label="注册" class="div-login-register-button" secondary/>
					</div>
				</div>
			<mu-paper>
			<mu-popup position="top" :overlay="false" popupClass="popup-top" :open="topPopup">
				{{message}}
			</mu-popup>
		</div>
 	</div>
</template>

<script>
	let Cookies = require('js-cookie');

	export default {
		data () {
			return {
				userName: Cookies.get('H5-UserName') || "",
				passWord: Cookies.get('H5-PassWord') || "",
				topPopup: false,
				message: "",
				isRememberPassword: Cookies.get('H5-isRememberPassword') === 'true' ? true:false,
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
						this.$store.commit('Loading', true);
						setTimeout(() => {
							/*登陆加载效果，再次之前可以之后额外获取登陆前需要初始化的数据*/
							this.$store.commit('Loading', false);
							this.$store.commit('setRoute','/Main');
						}, 1000)

						Cookies.set('H5-isRememberPassword', this.isRememberPassword);
						if (this.isRememberPassword) {
							/*记住密码*/
							Cookies.set('H5-UserName', this.userName);
							Cookies.set('H5-PassWord', this.passWord);
						}
						else{
							Cookies.set('H5-UserName', "");
							Cookies.set('H5-PassWord', "");
						}
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

	.checkbox-login-register{
		padding-top: 5px;
		margin-left: 100px;
		width: 100px;
		float: left;
	}

	.button-login-register{
		float: left;
		margin-left: 20px;
	}

	.login-background {
	  display: inline-block;
	  background-color: #ffd54f;
	  height: 270px;
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
		margin-left: 0px;
	}
</style>