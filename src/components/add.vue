<template>
		<div class="panel panel-default" id="addPanel">
			<div class="panel-heading"><h4>{{ panHead }}</h4></div>
			<form class="panel-body">
				<div class="form-group">
					<label for="newTitle">标题</label>
					<input type="text" placeholder="请输入标题" id="newTitle" class="form-control" v-model="addTopList.newTitle"/>
				</div>
				<div  class="form-group">
					<label for="newContent">内容</label>
					<textarea class="form-control" rows="10" v-model="addTopList.newContent"></textarea>
				</div>
				<button class="btn btn-primary pull-right" @click="addTopic()">添加话题</button>
			</form>
		</div>
</template>
<style type="text/css">
	textarea {
		resize:none;
	}
</style>
<script type="text/javascript">
  import {toggleClass} from '.././libs/unit'
	export default {
		data(){
			return {
				addTopList:{},
				panHead: '添加话题'
			}
		},
		methods: {
			addTopic(){
				let self = this
				this.$http.post('addtopic',{
					title:self.addTopList.newTitle,
					content:self.addTopList.newContent
				}).then((res)=>{
					if(res.data.success){
							addPanel.classList.remove("panel-default")
							addPanel.classList.remove("panel-danger")
							addPanel.classList.add("panel-success")
							this.panHead=`${res.data.message},正在跳转...`
							clearInterval(timer)
							let timer = setInterval((res)=>{
								this.$route.router.go('/topicList')
								location.reload()
							},1000)
						}else {
							addPanel.classList.remove("panel-default")
							addPanel.classList.remove("panel-success")
							addPanel.classList.add("panel-danger")
							this.panHead=res.data.message
						}
				},(res)=>{
					addPanel.classList.remove("panel-default")
					addPanel.classList.remove("panel-success")
					addPanel.classList.add("panel-danger")
					this.panHead='通信错误！添加失败'
				})
			}
		}

	}
</script>
