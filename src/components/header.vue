<template>
  <div id="wrapper">
    <nav class="navbar navbar-default">
      <div class="container">
      	 <a class="navbar-brand" href="javascript:;" v-link="'/login'" v-if="!islogin">
          <i class="glyphicon glyphicon-user"></i>
			请先登录
        </a>
        <a class="navbar-brand" href="javascript:;" v-link="'/topicList'" v-else>
			{{username}}
        </a>
        <!--<div v-if="islogin&&$route.path =='/Home'" class="userMsg" id="usersMsg">-->
        	<!--登录成功！请点击这里管理留言 <a href="javascript:;" @click="stopMsg">X</a>-->
        <!--</div>-->
        <ul class="nav nav-pills pull-left">
          <li role="presentation" :class="{'active':isA}" @click="tab(true)"><a v-link="'/home'" href="javascript:;"  v-if="islogin">主页</a></li>
          <li role="presentation" :class="{'active':!isA}" @click="tab(false)"><a v-link="'/add'" href="javascript:;" v-if="islogin">添加话题</a></li>
        </ul>
        <ul>
        <ul class="nav nav-pills pull-right">
        	<li role="presentation" ><button class="btn btn-default" v-link="'/login'" :class="{'btn-primary':isA}" @click="tab(true)" v-if="!islogin">登录</button></li>
        	<li role="presentation" ><button class="btn btn-default" v-link="'/regsister'" :class="{'btn-primary':!isA}" @click="tab(false)" v-if="!islogin">注册</button></li>
        	<li role="presentation"><button class="btn btn-default"  v-if="islogin" @click="logout()" >注销</button></li>
        </ul>
        </ul>
      </div>
    </nav>

  </div>
</template>
<script>
import {toggleClass} from '.././libs/unit'
	export default {
    props:['userName'],
		ready(){
			this.$http.get('testlogin').then((res) =>{
				if(res.data.data.isLogin){
							this.islogin= this.userName
					}else{
						this.islogin = false
					}
				}, (res) =>{
							sessionStorage.removeItem("lastname")
							alert("无法检测到您登陆！")
					})
		},
		data(){
			return {
				username: sessionStorage.lastname,
				islogin:"",
        isA:true
			}
		},
		methods: {
      testlogin(){

      },
      tab(isB){
        this.isA = isB?true:false;
      },
			stopMsg(){
				usersMsg.style.display='none'
			},
			logout() {
				this.$http.get("logout").then((res)=>{
					sessionStorage.removeItem("lastname")
					this.$route.router.go("/home")
				}, (res)=>{
					alert("通信错误，无法注销！")
				})
			}

		}
	}
</script>
<style>
	.nav {
		padding-top:5px;
	}
	.userMsg {
		width:230px;
		height:50px;
		position:absolute;
		top:80px;
		line-height:50px;
		text-align: center;
		background:#fbf4e1;
		animation: showIn 2s;
		border-radius:10px;
	}
	.userMsg:before{
		content:"";
		width:0;
		height:0;
		border-bottom:20px solid #fbf4e1;
		border-left:20px solid transparent;
		border-right:20px solid transparent;
		border-top:20px solid transparent;
		position:absolute;
		top:-40px;
	}
	@keyframes showIn{
		0%{
			transform:scale(0,0);
		}
		50%{
			transform:scale(1.1,1.1);
		}
		80%{
			transform:scale(1,1);
		}
	}
</style>
