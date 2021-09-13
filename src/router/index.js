import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/page/Home';
import PieChart from '@/page/pie/PieChart';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      redirect: '/pie',
      component: Home,
    },
    {
      path: '/pie',
      name: 'pie',
      component: PieChart,
    },
  ],
});
