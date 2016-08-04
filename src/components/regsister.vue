<template>
	<div class="panel panel-default" id="regPanel">
		<div class="panel-heading text-center">{{msg}}</div>
		<div class="panel-body">
			<validator name="validation1">
			<form>

				<div  class="form-group ">
					<label for="user" class="control-label">用户名：</label>
					<input type="text" name="user" id="user" class="form-control" placeholder="长度不超过十个字符" v-model="userList.username" maxlength="10" v-validate:username="['username']"/>
					<p v-if="$validation1.username.username" class="pass-danger">无法新建账号，请正确账号</p>
				</div>
				<div class="form-group ">
					<label for="password">密码：</label>
					<input type="password" name="password" id="password" class="form-control" placeholder="以字母开头，长度在6~18之间，只能包含字母、数字和下划线" v-model="userList.password" maxlength="12" v-validate:password="['password']"/>
						<p v-if="$validation1.password.password" class="pass-danger">无法新建账号，请正确输入密码</p>
				</div>
			
				<div class="form-group ">
					<label for="password-same">再次输入密码：</label>
					<input type="password" name="password-same" id="password-same" class="form-control" placeholder="以字母开头，长度在6~18之间，只能包含字母、数字和下划线" v-model="userList.password_same" maxlength="12">
				</div>
			</form>


			<div class="form-group ">
					<button class="btn btn-primary pull-right" @click= "createUser">新建该账号</button>
			</div>
						</validator>
		</div>
	</div>
</template>
<style>
	.pass-danger{
	margin-left:5px;
	color:red;
}
</style>

<script type="text/javascript">
	export default {
		validators:{
			username:(val)=>{
				return /\w{1,11}/.test(val)
			},
			password:(val)=>{
				return /^[a-zA-Z]\w{5,17}$/.test(val)
			}
		},
		data() {
			return {
				userList: {},
				msg :'注册新用户'
				
			}
		},
		methods: {
			createUser () {
				if(this.userList.password === this.userList.password_same&&this.userList.username!=null){
					let self = this
					regPanel.classList.remove('panel-danger')
					regPanel.classList.remove('panel-success')
					regPanel.classList.add('panel-default')
					this.msg='注册新用户'
					this.$http.post('http://192.168.131.45:3000/signup',{
						user: self.userList.username,
						password: self.userList.password
					}).then((res)=>{
						if(res.data.success){
								regPanel.classList.remove('panel-danger')
								regPanel.classList.remove('panel-default')
								regPanel.classList.add('panel-success')
								this.msg='注册成功，准备到主页。。。'
								sessionStorage.lastname = this.userList.username
								this.$route.router.go("'/home'")
								location.reload()
							}else {
								regPanel.classList.remove('panel-default')
								regPanel.classList.remove('panel-success')
								regPanel.classList.add('panel-danger')
								this.msg=`注册失败,${res.data.message}`
							}
					},(res)=>{
						regPanel.classList.remove('panel-default')
							regPanel.classList.remove('panel-success')
							regPanel.classList.add('panel-danger')
							this.msg='注册失败,通信不成功'
					})
				}else {
					regPanel.classList.remove('panel-default')
					regPanel.classList.remove('panel-seccess')
					regPanel.classList.add('panel-danger')
					this.msg= '密码不一致或账户为空！'
				}
			}
		}
	}
</script>