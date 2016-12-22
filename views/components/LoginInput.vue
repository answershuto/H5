<template>
 	<div>
		<div class="container" >
			<mu-paper class="login-background" :zDepth="5" v-bind:style="paper_div_style" >
				<div class="div-h5-icon">
					<img src="/images/H5.png" width="128" height="128" />
				</div>
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
				paper_div_style:{
					"margin-top": '300px'
				},
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
</style>