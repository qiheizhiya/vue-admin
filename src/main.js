import Vue from "vue";
import VueCompositionApi from '@vue/composition-api'; 
import App from "./App.vue";
import router from "./router";
import store from "./store";
import './assets/normalize.css';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './icons/index.js';
import "./router/guard.js";

Vue.use(ElementUI);
Vue.use(VueCompositionApi);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
