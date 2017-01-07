<template>
 	<div>
		<mu-drawer :open="isOpen" class="drawer">
			<mu-list>
				<div>
					<mu-chip class="pageicon" backgroundColor="#a1887f" color="#f3e5f5" @delete="handleClose" @click="handleClick" showDelete>
						<mu-avatar :size="32" src="/images/H5.png"/>
						&nbsp&nbsp&nbsp&nbsp&nbsp第&nbsp1页&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp
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
			handleClose(e){
				alert('close')
			},
			handleClick(e){
				alert('click')
			}
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
</style>