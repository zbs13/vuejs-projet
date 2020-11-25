import Vue from 'vue'
import App from './App.vue'
import router from "./routes";
import store from './store/app';
import SuiVue from 'semantic-ui-vue';

Vue.config.productionTip = false;
Vue.use(SuiVue);

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
