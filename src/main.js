// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import BootstrapVue from 'bootstrap-vue';
import App from './App';
import router from './router';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import 'flag-icon-css/css/flag-icon.min.css';
import 'vue-awesome/icons/beer';
import 'vue-awesome/icons/wine-glass';
import 'vue-awesome/icons/globe';
import 'vue-awesome/icons/code';

export const serverBus = new Vue();

Vue.config.productionTip = false;
Vue.use(BootstrapVue);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {
    App
  },
  template: '<App/>'
});
