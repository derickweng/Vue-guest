<template>
		  <div class="panel panel-default panelIn" v-for="item in essayArr">
            <div class="panel-heading">
                <h4>{{item.essayTitle}}</h4>
            </div>
            <div class="panel-body">
            <div class="panel">
                   {{item.essayContent}}
                </div>
                 <div class="pull-right">
                    <span>作者：<a href="#">{{item.essayAuthor}}</a></span>
                    <span>修改时间:{{item.essayDate}}</span>
                </div>
         </div>
        </div>
        <div class="nav-pag center-block">
        	<ul class="pagination">
        		<li @click="pageSwitch(true,false)" id="pagePre" class="disabled"><a href="javascript:;">&laquo;</a></li>
        	</ul>
        	<ul class="pagination" id="pageUl" @click="tab" onclick="this.tab">
        		<li  v-for="item in getTopics" class="{{$index}}"><a href="javascript:;" @click="getpage($index)">{{ item.pagNum }}</a></li>
        </ul>
        <ul class="pagination">
        	<li @click="pageSwitch(false,true)" id="pageNext"><a href="javascript:;">&raquo;</a></li>
        </ul>
       </div>
</template>
<style type="text/css">
	.nav-pag {
		width:450px;
	}
	.panelIn{
		animation:animate 0.5s ease-in-out;
	}
	@keyframes animate{
		0%{

			opacity:0;
		}
		100%{

			opacity: 1;	
		}
	}
</style>
<script>
export default {
	ready(){

		this.$http.post('http://192.168.131.45:3000/gettopics',{
			author:'',
			offset:'',
			count:'30'
		}).then((res)=>{
			if(res.data.success){
						let IDrray = []
						for(let i =0;i<res.data.data.list.length;i++){
							IDrray.push(res.data.data.list[i]._id)
						}
						let strID = JSON.stringify(IDrray)
						sessionStorage.IDrray = strID
						sessionStorage.IDLength = res.data.data.list.length
						for(let i=0; i<sessionStorage.IDLength/3;i++){
										this.getTopics.push({
										pagNum:i+1
									})
						}
						for(let i =0;i<3;i++){
								this.gettopic(i)
						}
						clearTimeout(tabTimer)
						let tabTimer = setTimeout(()=>{
							let tabInit = pageUl.querySelectorAll("li")
							tabInit[0].classList.add('active')
						},1)
					}else{
						console.log(res.data.data)
					}
		},(res)=>{
			topList.classList.remove("panel-default")
					topList.classList.add("panel-danger")
					this.userTopic="通信错误，无法加载列表"
					console.log(res);
		})
	},
	data(){
		return {
				essayTitle:'',
				essayContent:'',
				essayAuthor: '',
				essayDate: '',
				getTopics:[],
				essayArr:[]
			}
	},
	methods: {
			gettopic(num){
				let IDarr = JSON.parse(sessionStorage.IDrray)
				if(IDarr[num]){
				this.$http.post('http://192.168.131.45:3000/gettopic',{
						_id:IDarr[num]
					}).then((res)=>{
						if(res.data.success){
							this.essayArr.push({
								essayTitle : res.data.data.title,
								essayContent :res.data.data.content,
								essayAuthor : res.data.data.author,
								essayDate : new Date(res.data.data.date).toLocaleDateString()
							})
								}else{
									console.log(`通信成功,但${res.data.message}`)
								}
					},(res)=>{
						console.log("通信失败")
					})
				}
		},
		pageSwitch(pre,next){
			let tabs = pageUl.querySelectorAll('li')
			let activeTab = pageUl.querySelector('.active')
			let num = activeTab.classList[0]
			if(pre){
				pageNext.classList.remove('disabled')
				if(tabs[0].classList[1] =='active'){
				pagePre.classList.add('disabled')
				}else{
					pagePre.classList.remove('disabled')
					tabs[num].classList.remove('active')
					
					num--
					tabs[num].classList.add('active')
					this.essayArr.length=0;
					for(let i =num*3;i<(num+1)*3;i++){
						this.gettopic(i)
					}
					if(num==0){
						pagePre.classList.add('disabled')
					}
				}
			}else if(next){
				pagePre.classList.remove('disabled')
				
				let MaxNum=Math.floor(sessionStorage.IDLength/3)
				if(tabs[MaxNum-1].classList[1] =='active'){
				pageNext.classList.add('disabled')
				}else{
					pageNext.classList.remove('disabled')
					tabs[num].classList.remove('active')
					
					num++
					tabs[num].classList.add('active')
					this.essayArr.length=0;
					for(let i =num*3;i<(num+1)*3;i++){
						this.gettopic(i)
					}
					if(num==MaxNum){
						pageNext.classList.add('disabled')
					}
				}
			}
		},
		getpage(num){
			this.essayArr.length=0;//清空面板留言
			for(let i =num*3;i<(num+1)*3;i++){
						this.gettopic(i)
					}
		},
		tab(e){
			let tabs = pageUl.querySelectorAll('li')
			let MaxNum=Math.floor(sessionStorage.IDLength/3)
				for(let  i=0; i < tabs.length;i++){
					tabs[i].classList.remove('active')
				}
				e.target.parentNode.classList.add('active')
				if(e.target.parentNode.classList[0]==0){
					pagePre.classList.add('disabled')
				}else{
					pagePre.classList.remove('disabled')
				}
				if(e.target.parentNode.classList[0]==MaxNum){
					pageNext.classList.add('disabled')
				}else{
					pageNext.classList.remove('disabled')
				}
		}
	}
}
</script>