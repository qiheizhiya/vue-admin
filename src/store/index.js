import Vue from "vue";
import Vuex from "vuex";

import login from "./modules/login.js"
import app from './modules/app.js';
import news from "./modules/news.js";
Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    login,
    app,
    news
  }
});
