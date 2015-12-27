import Vue from 'vue'
import Router from 'vue-router'
import { domain, fromNow } from './filters'
import App from './pages/App.vue'
import Test from './pages/Test.vue'
import NewsView from './pages/NewsView.vue'
import ItemView from './pages/ItemView.vue'
import UserView from './pages/UserView.vue'

// install router
Vue.use(Router)

// register filters globally
Vue.filter('fromNow', fromNow)
Vue.filter('domain', domain)

// routing
var router = new Router()

router.map({
  '/': {
    component: Test
  },
  '/news/:page': {
    component: NewsView
  },
  '/user/:id': {
    component: UserView
  },
  '/item/:id': {
    component: ItemView
  }
})

router.beforeEach(function () {
  window.scrollTo(0, 0)
})

router.redirect({
  // '*': '/'
  '*': '/news/1'
})
router.start(App, '#app')
