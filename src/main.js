/* eslint-disable import/order */
import Vue from 'vue';
import Vuelidate from 'vuelidate';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import App from './App.vue';
import messagePlugin from '@/utils/message.plugin';
import router from './router';
import store from './store';
import dateFilter from '@/filters/date.filter';
import 'materialize-css/dist/js/materialize.min';

Vue.config.productionTip = false;
Vue.use(Vuelidate);
Vue.use(messagePlugin);
Vue.filter('date', dateFilter);

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
