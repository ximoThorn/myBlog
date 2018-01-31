import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/index'
import article from '@/components/article'
import focus from '@/components/focus'
import articleDetail from '@/components/articleDetail'

Vue.use(Router)

const route = new Router({
  'linkActiveClass': 'typeActive',
  routes: [
    {
      path: '/',
      name: 'index',
      component: index,
      redirect: 'article/all',
      children: [
        {
          path: 'article/:ty',
          component: article,
          name: 'article'
        },
        {
          path: 'focus',
          component: focus
        },
        {
          path: 'articleDetail/:id',
          name: 'articleDetail',
          component: articleDetail
        }
      ]
    }
  ]
})

/**
 * 设置全局路由守卫
 */
route.beforeEach((to, from, next) => {
  next()
})

export default route
