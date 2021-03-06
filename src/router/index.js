import Vue from 'vue';
import Router from 'vue-router';

import DatasetsList from '../components/DatasetsList.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      alias: '/datasets',
      name: 'datasets',
      component: DatasetsList,
    },
    {
      path: '/networks',
      name: 'networks',
      component: () => import('../components/NetworksPage.vue'),
    },
  ],
});
