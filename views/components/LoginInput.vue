<template>
 	<div>
		<div class="container" >
			<mu-paper class="login-background" :zDepth="5" v-bind:style="paper_div_style" >
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
		</div>
 	</div>
</template>

<script>
	export default {
		data () {
			return {
				paper_div_style:{
					"margin-top": '300px'
				},
				userName: "",
				passWord: "",
			}
		},
		methods: {
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
							method: 'futureWeather',
							params: {
								userName: this.userName,
								password: this.password,
							},
						})
					}
				)
				.then(response => response.json())
				.then(d => {
					console.log(d)
				})
		 	},
		 	register(){
		 		this.$store.commit('setRoute','register');
		 	}
		},
		computed: {
			
		}
	}
</script>

<style scoped>
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

	.container{
		margin: 0px auto;
		width: 500px;
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