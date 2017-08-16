import Vue from 'vue'
import Router from 'vue-router'
import BookList from '@/views/BookList'
import Admin from '@/views/admin'
import Login from '@/views/login'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    name: 'booklist',
    component: BookList
  }, {
    path: '/admin',
    name: 'admin',
    component: Admin
  }, {
    path: '/login',
    name: 'login',
    component: Login
  }]
})
