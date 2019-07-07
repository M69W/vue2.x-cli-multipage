import Vue from 'vue'
import Router from 'vue-router'
import Page from './page1.vue'

Vue.use(Router)
export default new Router({
  // history; url不带#，打包后，不能在页面打开由路由配置的多页面，只能打开index.html
  // hash: url带#，打包后，可以直接在页面打开由路由配置的多页面，即index.html后可以打开多页面
  mode: 'hash',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'page',
      component: Page
    },
    {
      path: '/page2',
      name: 'page2',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './page2.vue')
    }
  ]
})
