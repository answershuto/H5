<template>
 	<div>
		<mu-drawer :open="isOpen" class="drawer">
			<div class="title-pages">
				<div class="pages-font">页面列表</div>
				<mu-float-button icon="add" mini backgroundColor="#795548" class="add-btn" @click="handleClickAdd" />
			</div>
			<mu-list>
				<div v-for="num in pageNum" class="pages-div">
					<mu-chip class="pageicon" backgroundColor="#a1887f" color="#f3e5f5" @delete="handleClose(num)" @click="handleClick" showDelete>
						<mu-avatar :size="32" src="/images/H5.png"/>
						&nbsp&nbsp&nbsp&nbsp&nbsp第&nbsp{{num}}页&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp
					</mu-chip>
				</div>
			</mu-list>
		</mu-drawer>
 	</div>
</template>

<script>

	export default {
		components: {
			
		},
		data () {
			return {
				isOpen: true,
			}
		},
		methods: {
			handleClose(num){
				this.$store.dispatch('delPageNum', num);
			},
			handleClick(){
				alert('click')
			},
			handleClickAdd(){
				this.$store.dispatch('addPageNum');
			},
		},//return this.$store.state.Main.isAlert;
		computed: {
			pageNum(){
				return this.$store.state.Design.pageNum;
			},
		}
	}
</script>


<style scoped>
	.pageicon{
		margin-left: 35px;
	}

	.drawer{
		background-color: #d7ccc8;
	}

	.title-pages{
		width: 100%;
		height: 70px;
	}

	.add-btn{
		float: right;
		margin-right: 20px;
		margin-top: 20px;
	}

	.title-pages div{
		float: left;
	}

	.pages-font{
		font-size: 170%;
		margin-top: 20px;
		margin-left: 70px;
		color: #795548;
	}

	.pages-div{
		margin-top: 10px;
	}
</style>