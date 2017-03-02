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
						<div class="pageNum">第&nbsp{{index+1}}页</div>
					</mu-chip>
				</div>
			</mu-list>
			<div class="page-set">
				<div class="pages-font">页面设置</div>
				<div class="page-set-item">
					<div>
						<div class="modifyPrompt">背景颜色</div>
						<input type="color" name="" class="color" v-model="BackgroundColor" >
					</div>
				</div>
			</div>
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
				BackgroundColor: '#FFFFFF',
			}
		},
		mounted(){
			this.$refs.design.onclick = ()=>{
				this.$store.dispatch('cancelCurrentEle');
			}

			this.BackgroundColor = this.$store.state.Design.DesignInfos.currentBackgroundColor || '#FFFFFF';
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

				/*修改背景色*/
				this.BackgroundColor = this.$store.state.Design.DesignInfos.currentBackgroundColor || '#FFFFFF';
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
						this.$store.dispatch('imageDialog', true);
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
		},
		watch:{
			BackgroundColor(val){
				this.$store.state.Design.DesignInfos.pages.forEach((item, index) => {
					if (item.id === this.$store.state.Design.DesignInfos.currentPage) {
						this.$store.commit('setPageBackgroundColor', val);
					}
				})
			},
		},
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
		width: 158px;
	}

	.modifyPrompt{
		width: 60px;
		margin-left: 20px;
		float: left;
	}

	.color{
		width: 50px;
		margin-left: 30px;
		width: 120px;
	}

	.page-set{
		height: 200px;
		width: 100%;
		position: absolute;
		bottom: 0;
	}

	.page-set-item > div{
		margin: 10px auto;
	}
</style>