import Vue from 'vue'
import Router from 'vue-router'
import Product from '../components/Main/Right/Product'
import Add from '../components/Main/Right/Add'
import Team from '../components/Main/Right/Team'
import About from '../components/Main/Right/About'
import Notebook from '../components/Main/Right/Notebook'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'main-page',
      redirect: '/main',
    },
    {
      path: '/main',
      name: 'main-page',
      component: require('@/components/Main/Main').default,
      redirect: '/main/product',
      children: [
        {
          // UserProfile will be rendered inside User's <router-view>
          // when /main/product is matched
          path: 'product',
          component: Product,
        },
        {
          path: 'add-product',
          component: Add,
        },
        {
          path: 'team',
          component: Team,
        },
        {
          path: 'about',
          component: About,
        },
        {
          path: 'notebook',
          component: Notebook,
        },
      ],
    },
    {
      path: '*',
      redirect: '/main',
    },
  ],
})
