<template>
		<div class="panel panel-default" id="addPanel">
			<div class="panel-heading"><h4>{{ panHead }}</h4></div>
			<form class="panel-body">
				<div class="form-group">
					<label for="newTitle">标题</label>
					<input type="text" placeholder="请输入标题" id="modiTitle" class="form-control" v-model="modiValue.modiTitle"/>
				</div>
				<div  class="form-group">
					<label for="newContent">内容</label>
					<textarea class="form-control" rows="10" id="modiContent"></textarea>
				</div>
				<button class="btn btn-primary pull-right" @click="addTopic()">修改话题</button>
			</form>
		</div>
</template>
<style type="text/css">
	textarea {
		resize:none;
	}

</style>
<script type="text/javascript">

	export default {
		ready(){
			this.$http.post('gettopic',{
				_id:sessionStorage.lastId
			}).then((res)=>{
				document.querySelector("#modiTitle").value=res.data.data.title
				document.querySelector("#modiContent").value=res.data.data.content
			},(res)=>{
				addPanel.classList.remove("panel-default")
				addPanel.classList.remove("panel-success")
				addPanel.classList.add("panel-danger")
				this.panHead='通信错误！添加失败'
			})
		},
		data(){
			return {
				addTopList:{},
				panHead: '修改话题',
        modiValue:{}
			}
		},
		methods: {
			addTopic(){
				this.$http.post('http://192.168.131.45:3000/modifytopic',{
					_id:sessionStorage.lastId,
					title:document.querySelector("#modiTitle").value,
					content:document.querySelector("#modiContent").value
				}).then((res)=>{
					if(res.data.success){

							addPanel.classList.remove("panel-default")
							addPanel.classList.remove("panel-danger")
							addPanel.classList.add("panel-success")

							clearInterval(timer)
							var timer = setInterval(()=>{
								this.panHead=`${res.data.message}跳转中...`
								this.$route.router.go("/home")
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
