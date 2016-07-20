import Vue from 'vue'
import Head from './components/header.vue'
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

Vue.use(VueAnimatedList)
Vue.use(VueValidator)
Vue.use(VueResource)
Vue.use(VueRouter)
Vue.http.options.credentials = true
Vue.http.options.emulateJSON = true
const router = new VueRouter()
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
router.start(Head, '#app')
