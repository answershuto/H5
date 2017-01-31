<template>
 	<div>
		<mu-dialog :open="dialog" title="创建新作品" scrollable>
			<img src="/images/H5.png" width="128" height="128" />
			<mu-text-field label="作品名称" v-model="name" class="workNameInput" labelFloat/><br/>
			<mu-flat-button primary label="确定" @click="sure" slot="actions"/>
			<mu-flat-button primary label="取消" @click="cancel" slot="actions"/>
		</mu-dialog>
 	</div>
</template>

<script>
	/*use this.$store.commit('Alert', {isAlert: true, message: 'test'});*/
	export default {
		data () {
			return {
				name: "",
			}
		},
		methods: {
			cancel () {
		     	this.$store.commit('createWorkDialog', false);
		    },
		    sure () {
		    	if (this.name === "") {
		    		this.$store.commit('Alert', {isAlert: true, message: "作品名称不能为空"});
		    		return;
		    	}
		    	this.$store.commit('createWorkDialog', false);
		    	this.$store.commit('setWorkName', this.name);
		    	this.$store.commit('setRoute','/Design');
		    },
		},
		computed: {
			dialog(){
				return this.$store.state.Work.createWorkDialog;
			}
		}
	}
</script>

<style scoped>
	.workNameInput{
		margin-left: 30px;
		margin-bottom: 35px;
	}
</style>