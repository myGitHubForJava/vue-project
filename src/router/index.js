import Vue from 'vue'
import VueRouter from 'vue-router'
import sign from './sign'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    {
      path: '/',
      name: 'homepage',
      component: resolve => { require(['../components/template'], resolve) }
    },
    {
      path: '/',
      component: resolve => { require(['../components/sign'], resolve) },
      children: sign
    },
    {
      path: '/template',
      name: 'template',
      component: resolve => { require(['../components/template'], resolve) }
    },
    {
      path: '/create',
      name: 'create',
      component: resolve => { require(['../components/template/create'], resolve) }
    },
    {
      path: '/edit',
      name: 'edit',
      component: resolve => { require(['../components/template/edit'], resolve) }
    }
  ]
})

export default router
