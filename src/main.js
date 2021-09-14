import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import components from './components';
import './assets/css/tailwind.css';
import '@fortawesome/fontawesome-free/css/all.min.css'
import {DraggableDirective} from '@braks/revue-draggable';

Vue.config.productionTip = false
Vue.directive('draggable', DraggableDirective)

components.forEach(component => {
  Vue.component(component.name, component);
})

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');

