<template>
 	<div ref="design">
		<mu-drawer :open="isOpen" class="drawer">
			<div class="editColumn">
				<mu-icon-button tooltip="文字" tooltipPosition="top-center" touch icon="edit" @click="handleClickEdit('word')" />
				<mu-icon-button tooltip="图片" tooltipPosition="top-center" touch icon="image" @click="handleClickEdit('picture')" />
				<mu-icon-button tooltip="音乐" tooltipPosition="top-center" touch icon="audiotrack" @click="handleClickEdit('music')" />
			</div>
			<div class="title-pages">
				<div class="pages-font">页面列表</div>
				<mu-float-button icon="add" mini backgroundColor="#795548" class="add-btn" @click="handleClickAdd" />
			</div>
			<mu-list>
				<div v-for="(page, index) in pages" class="pages-div">
					<mu-chip class="pageicon" backgroundColor="#a1887f" color="#f3e5f5" @delete="handleClose(page.id)" @click="handleClick(page.id)" showDelete>
						<mu-avatar :size="32" src="/images/H5.png"/>
						<div class="pageNum">第&nbsp{{index}}页</div>
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
		mounted(){
			this.$refs.design.onclick = ()=>{
				this.$store.dispatch('cancelCurrentEle');
			}
		},
		beforeDestroy(){
			this.$refs.design.onclick = null;
		},
		methods: {
			handleClose(pageId){
				this.$store.dispatch('delPageNum', pageId);
			},
			handleClick(pageId){
				this.$store.commit('changePage', pageId);
			},
			handleClickAdd(){
				this.$store.dispatch('addPageNum');
			},
			handleClickEdit(type){
				switch(type){
					case 'word':
						this.$store.commit('addDesignText', '请输入文字');
						break;
					case 'picture':
						break;
					case 'music':
						this.$store.dispatch('musicDialog', true);
						break;
				}
			},
		},
		computed: {
			pages(){
				return this.$store.state.Design.DesignInfos.pages;
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

	.pageNum{
		margin-left: 30px;
		margin-right: 30px;
	}

	.editColumn{
		margin: 55px auto 0px;
		width: 205px;
	}
</style>