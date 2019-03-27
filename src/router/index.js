import Vue from 'vue'
import Router from 'vue-router'
const _import = require ('./_import_'+process.env.NODE_ENV);

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect:'/list',
    },
      {
        path:"/list",
        component: _import('list/index')
      }
      ,
      {
          path:"/detail/:id(\\d+)",
          component: _import('detail/index')
      }
  ]
})
