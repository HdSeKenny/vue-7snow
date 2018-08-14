import Vue from 'vue';
import Router from 'vue-router';
import Login from '../components/Login';
import Product from '../components/Main/Right/Product';
import Add from '../components/Main/Right/Add';


Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'landing-page',
      component: Login,
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
      ],
    },
    {
      path: '/product',
      name: 'product-page',
      component: require('@/components/Main/Right/Product').default,
    },
    {
      path: '*',
      redirect: '/',
    },
  ],
});
