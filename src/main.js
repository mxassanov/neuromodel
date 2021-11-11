import Vue from 'vue';
import router from './router';
import store from './store';
import components from './components';
import './assets/css/tailwind.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import App from './App.vue';

Vue.config.productionTip = false;

components.forEach((component) => {
  Vue.component(component.name, component);
});

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
