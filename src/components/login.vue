<template>
	<div class="text-center">
		<i class="glyphicon glyphicon-user"></i>
		<div class="form-group">
			<label for="userName"></label>
			<input type="text" class="form-control" id="userName"  placeholder="账号" maxlength="10" v-model="userList.userName" name="userName" value="weng"/>
		</div>
		<div class="form-group">
			<label for="userPass"></label>
			<input type="password" class="form-control" id="userPass" placeholder="密码" v-model="userList.userPass" name="userPass" value="weng"/>
		</div>
		<div class="form-group loginMsg">
			{{ loginMsg }}
		</div>
		<div class="form-group">
			<button class="btn btn-primary pull-right" @click="toLogin">登录</button>
		</div>

	</div>
</template>
<script type="text/javascript">
	export default {
		data(){
			return {
				userList:{},
				loginMsg:''
			}
		},
		methods: {
			toLogin(){
				let self = this
				this.$http.post("login",{
					user: self.userList.userName,
					password:self.userList.userPass
				}).then((res)=>{

					if(res.data.success){
							this.loginMsg = `${res.data.message},正在跳转....`
							sessionStorage.lastname=self.userList.userName
              this.$route.router.go('/home')
						}else {
							this.loginMsg = res.data.message

						}
				},(res)=>{
					this.loginMsg = '连接错误，登陆失败!'
				})
			}
		}
	}
</script>
<style type="text/css">
	.loginMsg{
		color:red;
	}
</style>
