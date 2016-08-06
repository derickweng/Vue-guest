<template>
	 <div class="panel panel-default" id="topList">
            <div class="panel-heading">
                <h4>{{userTopic}}</h4></div>
            <table class="table table-hover">
                <thead>
                    <tr>
                        <th width="60%">标题</th>
                        <th>作者</th>
                        <th>修改时间</th>
                        <th>操作</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in topicList" transition="item">
                        <td>{{item.essayTitle}}</td>
                        <td>{{item.essayAuthor}}</td>
                        <td>{{item.essayDate}}</td>
                        <td><a href="javascript:;" @click="_idSave" class="{{$index}}">修改</a> <a href="javascript:;" @click="deleteTop" class="{{$index}}">删除</a></td>
                    </tr>
                </tbody>
            </table>
        </div>
</template>
<style>
	.item-move{
		width:200px;
		transition:width 5s ease-in-out;

	}
</style>
<script>
	export default {
		ready(){
			this.$http.post('gettopics',{author:sessionStorage.lastname}).then((res)=>{
				if(res.data.success&&res.data.data.list.length>0){
						for(let i =0;i<res.data.data.list.length;i++){
							this.topicList.push({
								essayTitle:res.data.data.list[i].title,
								essayAuthor:res.data.data.list[i].author,
								essayDate: new Date(res.data.data.list[i].date).toLocaleDateString(),
								essayId: res.data.data.list[i]._id
							})
						}
					}else if(res.data.data.list.length ==0){
						alert("您的列表为空！")
					}else {
						alert("通信错误！")
					}
			}, (res)=>{
				topList.classList.remove("panel-default")
			   topList.classList.add("panel-danger")
			  this.userTopic="通信错误，无法加载列表"
			})
		},
		data(){
			return {
				userTopic:"编辑留言",
				topicList:[]
			}
		},
		methods:{
			deleteTop(e){
				if(window.confirm("确定要删除该留言吗？")){
					this.$http.post('deletetopic',{
						_id:this.topicList[e.target.classList].essayId
					}).then((res)=>{
						topList.classList.remove("panel-default")
							topList.classList.add("panel-success")
							this.userTopic="删除成功"
              this.$route.router.go("/Home")
					},(res)=>{
						alert("删除失败！")
					})
				}

			},
			_idSave(e){
				sessionStorage.lastId = this.topicList[e.target.classList].essayId
				this.$route.router.go("/modify")
			}
		}
	}
</script>
