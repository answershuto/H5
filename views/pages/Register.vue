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
			}
		},
		methods:{
			register(){

			},
			cancel(){

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