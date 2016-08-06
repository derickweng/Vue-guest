<template >
    <header-view></header-view>
  <div class="container">
    <router-view></router-view>
  </div>
</template>
<script>
  import HeaderView from './components/header'
  export default{
    components :{
     HeaderView
    }
  }
</script>

