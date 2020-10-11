/* eslint-disable space-before-function-paren */
/* eslint-disable func-names */
/* eslint-disable no-undef */
/* eslint-disable no-param-reassign */

export default {
  install(Vue) {
    Vue.prototype.$message = function(html) {
      M.toast({ html });
    };

    Vue.prototype.$error = function(html) {
      M.toast({ html: `[Error]: ${html}` });
    };
  },
};
