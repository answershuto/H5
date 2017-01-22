<template>
 	<div>
		<mu-drawer right :open="isOpen" class="drawer" >
			<mu-tabs :value="activeTab" @change="handleTabChange" class="tab">
				<mu-tab value="style" icon="star" title="样式"/>
				<mu-tab value="cartoon" icon="star" title="动画"/>
			</mu-tabs>
			<div v-show="isStyle" class="showStyle">
				<div>
					<div>横向位置</div>
					<mu-slider v-model="modifyLeft" class="slider"/>
				</div>
				<div>
					<div>纵向位置</div>
					<mu-slider v-model="modifyTop" class="slider"/>
				</div>
				<div>
					<div>文字颜色</div>
					<input type="color" name="" class="color" v-model="modifyColor" >
				</div>
				<div>
					<div>字体大小</div>
					<mu-slider v-model="modifyFontSize" class="slider" max='300' />
				</div>
			</div>
			<div v-show="isCartoon">
				isCartoon
			</div>
		</mu-drawer>
 	</div>
</template>

<script>

	export default {
		components: {

		},
		data(){
			return {
				activeTab: 'style',
				modifyLeft: 0,
				modifyTop: 0,
				modifyColor: 'black',
				modifyFontSize: 0,
			}
		},
		beforeUpdate(){
			this.$store.state.Design.DesignInfos.pages.forEach((item, index) => {
				if (item.id === this.$store.state.Design.DesignInfos.currentPage) {
					item.text.forEach(t => {
						if (t.id === this.$store.state.Design.DesignInfos.currentElement) {
							this.modifyLeft = parseInt(t.style.left);
							this.modifyTop = parseInt(t.style.top);
							this.modifyColor = t.style.color;
							this.modifyFontSize = parseInt(t.style['font-size']);
						}
					})
				}
			})
		},
		computed: {
			isOpen(){
				return this.$store.state.Design.isModifyEle;
			},
			isStyle(){
				return this.activeTab === 'style';
			},
			isCartoon(){
				return this.activeTab === 'cartoon';
			},
		},
		methods: {
			handleTabChange (val) {
				this.activeTab = val
			},
		},
		watch: {
			modifyLeft(val){
				this.$store.state.Design.DesignInfos.pages.forEach((item, index) => {
					if (item.id === this.$store.state.Design.DesignInfos.currentPage) {
						item.text.forEach(t => {
							if (t.id === this.$store.state.Design.DesignInfos.currentElement) {
								this.$store.commit('modifyTextStyleById', {
									left: val + '%',
									id: t.id
								});
							}
						})
					}
				})
			},
			modifyTop(val){
				this.$store.state.Design.DesignInfos.pages.forEach((item, index) => {
					if (item.id === this.$store.state.Design.DesignInfos.currentPage) {
						item.text.forEach(t => {
							if (t.id === this.$store.state.Design.DesignInfos.currentElement) {
								this.$store.commit('modifyTextStyleById', {
									top: val + '%',
									id: t.id
								});
							}
						})
					}
				})
			},
			modifyColor(val){
				this.$store.state.Design.DesignInfos.pages.forEach((item, index) => {
					if (item.id === this.$store.state.Design.DesignInfos.currentPage) {
						item.text.forEach(t => {
							if (t.id === this.$store.state.Design.DesignInfos.currentElement) {
								this.$store.commit('modifyTextStyleById', {
									color: val,
									id: t.id
								});
							}
						})
					}
				})
			},
			modifyFontSize(val){
				this.$store.state.Design.DesignInfos.pages.forEach((item, index) => {
					if (item.id === this.$store.state.Design.DesignInfos.currentPage) {
						item.text.forEach(t => {
							if (t.id === this.$store.state.Design.DesignInfos.currentElement) {
								this.$store.commit('modifyTextStyleById', {
									'font-size': val + '%',
									id: t.id
								});
							}
						})
					}
				})
			},
		},
	}
</script>

<style scoped>
	.drawer{
		background-color: #d7ccc8;
		width: 400px;
	}

	.tab{
		background-color: #795548;
	}

	.slider{
		width: 250px;
		margin-left: 20px;
	}

	.color{
		width: 200px;
		margin-left: 20px;
	}

	.showStyle > div{
		margin-left: 30px;
		margin-top: 20px;
	}

	.showStyle > div > div{
		float: left;
	}
</style>