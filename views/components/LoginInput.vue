<template>
 	<div>
		<div>
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
	  background-color: #c8e6c9;
	  height: 250px;
	  width: 500px;
	  margin: 20px;
	  text-align: center;
	}

	.login-input{
		width: 350px;
		margin-top: 20px;
	}
</style>