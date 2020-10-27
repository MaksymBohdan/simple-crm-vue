/* eslint-disable space-before-function-paren */
/* eslint-disable func-names */
/* eslint-disable no-undef */
/* eslint-disable no-param-reassign */

import localizeFilter from '@/filters/localize.filter';

export default {
  install(Vue) {
    Vue.prototype.$title = function(titleKey) {
      const appName = process.env.VUE_APP_TITLE;

      return `${localizeFilter(titleKey)} | ${appName}`;
    };
  },
};
