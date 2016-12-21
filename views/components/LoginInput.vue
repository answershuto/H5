<template>
 	<div>
		<div class="container">
			<mu-paper class="login-background" :zDepth="5" >
				<mu-text-field class="login-input" label="用户名" v-model="userName" labelFloat/><br/>
				<mu-text-field class="login-input" label="密码" hintText="密码" type="password" labelFloat/><br/>
			<mu-paper>
		</div>
 	</div>
</template>

<script>

	export default {
		data () {
			return {
				userName: ""
			}
		},
		methods: {
		 	
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
		width: 350px;
		margin-top: 20px;
	}

	.container{
		margin: 0px auto;
		width: 500px;
	}
</style>