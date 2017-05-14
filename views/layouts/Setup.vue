<template>
 	<div class="container">
 		<div class="main">
            <div class="every-info">
                <div class="info-key">用户昵称</div>
                <mu-auto-complete v-model="modifyNikeName" class="text" >  
            </div>  
            <div class="every-info">
                <div class="info-key">性别</div>
                <mu-select-field v-model="Gender">
                    <mu-menu-item value="Man" title="男"/>
                    <mu-menu-item value="Woman" title="女"/>
                </mu-select-field>
            </div>   
            <div class="every-info">
                <div class="info-key">eMail</div>
                <mu-auto-complete v-model="eMail" class="text" >  
            </div>  
            <div class="every-info">
                <div class="info-key">年龄</div>
                <mu-auto-complete v-model="age" class="text" >  
            </div> 
            <div class="every-info">
                <div class="info-key">个性签名</div>
                <mu-auto-complete v-model="personalizedSignature" class="text" >  
            </div> 
            <div class="every-info">
                <div class="info-key">所在区域</div>
                <mu-auto-complete v-model="place" class="text" >  
            </div> 
            <div class="save-info">
                <mu-flat-button label="保存设置" @click="handleClickSave" class="" primary/>
            </div>
        </div>
 	</div>
</template>

<script>
	export default {
        mounted () {
            console.log(this.$store.state.User.userInfo)
        },
		components: {
            
		},
        data () {
            return {
                modifyNikeName: this.$store.state.User.userInfo.nikeName,
                Gender: this.$store.state.User.userInfo.Gender,
                eMail: this.$store.state.User.userInfo.eMail,
                age: this.$store.state.User.userInfo.age,
                personalizedSignature: this.$store.state.User.userInfo.personalizedSignature,
                place: this.$store.state.User.userInfo.place,
            }
        },
        methods: {
            handleClickSave () {
                let userInfo = Object.assign({}, this.$store.state.User.userInfo);
                userInfo.modifyNikeName = this.modifyNikeName;
                userInfo.Gender = this.Gender;
                userInfo.eMail = this.eMail;
                userInfo.age = this.age;
                userInfo.personalizedSignature = this.personalizedSignature;
                userInfo.place = this.place;
                this.$store.dispatch('saveUserInfo', userInfo);
            }
        },
        computed: {
            
        }
	}
</script>

<style lang="less" scoped>
	.container{
		display: flex;

        .main{
             margin: 0px auto;
        }

        .every-info{
            margin-top: 20px;

            .info-key{
                display: inline-block;
                width: 70px;
            }
        }

        .save-info{
            text-align: center;
            margin-top: 20px;
        }
	}
</style>