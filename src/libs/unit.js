
export let toggleClass = (obj,index)=>{
    for(var key in obj){
      obj[key]=false
    }
    obj[index]= true
}
