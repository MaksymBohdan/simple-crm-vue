/* eslint-disable import/order */
import Vue from 'vue';
import Vuelidate from 'vuelidate';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import App from './App.vue';
import Loader from './components/Loader.vue';
import messagePlugin from '@/utils/message.plugin';
import tooltipDirective from '@/directives/tooltip.directive';
import router from './router';
import store from './store';
import dateFilter from '@/filters/date.filter';
import currencyFilter from '@/filters/currency.filter';
import Paginate from 'vuejs-paginate';

import 'materialize-css/dist/js/materialize.min';

Vue.config.productionTip = false;
Vue.use(Vuelidate);
Vue.use(messagePlugin);
Vue.component('Loader', Loader);
Vue.component('paginate', Paginate);
Vue.directive('tooltip', tooltipDirective);
Vue.filter('date', dateFilter);
Vue.filter('currency', currencyFilter);

Vue.component('paginate', Paginate);

firebase.initializeApp({
  apiKey: 'AIzaSyBQbJZVEX1T-xSK1uSP4Gqoq9ATuFf1Y84',
  authDomain: 'simple-crm2.firebaseapp.com',
  databaseURL: 'https://simple-crm2.firebaseio.com',
  projectId: 'simple-crm2',
  storageBucket: 'simple-crm2.appspot.com',
  messagingSenderId: '949225933128',
  appId: '1:949225933128:web:fc2ba4e41b27f23ebb0b7d',
  measurementId: 'G-9QW4ZYWC9W',
});

let app = null;

firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      store,
      render: (h) => h(App),
    }).$mount('#app');
  }
});
