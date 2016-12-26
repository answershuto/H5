<template>
 	<div class="container">
 		<mu-text-field class="" label="用户名" v-model="userName" fullWidth labelFloat/><br/>
 		<mu-text-field class="" label="密码" v-model="password" fullWidth labelFloat/><br/>
 		<mu-text-field class="" label="确认密码" v-model="SurePassword" fullWidth labelFloat/><br/>
 		<mu-text-field class="" label="电子邮箱" v-model="eMail" fullWidth labelFloat/><br/>
 		<div class="div-register-sure">
			<mu-flat-button @click="register" label="确认注册" class="div-register-botton" primary/>
			<mu-flat-button @click="cancel" label="取消" class="div-register-botton" secondary/>
		</div>
		<mu-popup position="top" :overlay="false" popupClass="popup-top" :open="topPopup">
			{{message}}
		</mu-popup>
 	</div>
</template>

<script>
	export default {
		data(){
			return {
				userName: "",
				password: "",
				SurePassword: "",
				eMail: "",
				topPopup: false,
				message: "",
			}
		},
		methods:{
			msgAlert(msg){
				this.message = msg;
				this.topPopup = true;
			},
			register(){
				if (this.userName === "") {
					this.msgAlert('用户名不能为空');
					return;
				}

				if (this.password === "" || this.SurePassword === "") {
					this.msgAlert('密码不能为空');
					return;
				}

				if (this.eMail === "") {
					this.msgAlert('邮箱不能为空');
					return;
				}

				/*验证邮箱格式*/
				var filter  = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
				if (!filter.test(this.eMail)) {
					this.msgAlert('邮箱格式有误，请确认');
					return;
				}

				if (this.password !== this.SurePassword) {
					this.msgAlert('密码不一致，请重新输入');
					return;
				}

				fetch('/H5/Register',
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
			cancel(){
				this.$store.commit('setRoute','/');
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
		}
	}
</script>

<style scoped>
	.container{
		margin: 0px auto;
		width: 500px;
	}

	.div-register-sure{
		width: 300px;
		margin: 0px auto;
	}

	.div-register-botton{
		margin-left: 30px;
	}

</style>

<style lang="css">
	.popup-top {
		width: 100%;
		opacity: .8;
		height: 48px;
		line-height: 48px;
		display: flex;
		align-items: center;
		justify-content: center;
		max-width: 375px;
	}
</style>