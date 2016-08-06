import Vue from 'vue'
import Home from './components/Home.vue'
import add from './components/add.vue'
import login from './components/login.vue'
import regsister from './components/regsister.vue'
import topicList from './components/topicList.vue'
import modify from './components/modify.vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import VueValidator from 'vue-validator'
import VueAnimatedList from 'vue-animated-list'
import App from './app.vue'
import header from './components/header.vue'


Vue.use(VueAnimatedList)
Vue.use(VueValidator)
Vue.use(VueResource)
Vue.use(VueRouter)

Vue.http.options.root ='http://192.168.131.45:3000'
Vue.http.options.credentials = true
Vue.http.options.emulateJSON = true
Vue.config.debug = true
const router = new VueRouter()

router.beforeEach(function(){
  window.scrollTo(0,0);
})
router.map({
  '/Home': {
    component: Home
  },
  '/add': {
    component: add
  },
  '/login':{
  	component: login
  },
  '/regsister':{
  	component: regsister
  },
  '/topicList': {
  	component: topicList
  },
  '/modify': {
  	component: modify
  }
})

router.redirect({
  '*': '/Home'
})
router.start(App, 'app');
