/*!

 =========================================================
 * Vue Now UI Kit - v1.1.0
 =========================================================

 * Product Page: https://www.creative-tim.com/product/now-ui-kit
 * Copyright 2019 Creative Tim (http://www.creative-tim.com)

 * Designed by www.invisionapp.com Coded by www.creative-tim.com

 =========================================================

 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

 */
import Vue from 'vue';
import App from './App.vue';
// You can change this import to `import router from './starterRouter'` to quickly start development from a blank layout.
import router from './router.js';
import VueI18n from 'vue-i18n'
import NowUiKit from './plugins/now-ui-kit';
import en from './Localization/en-US.json'
import es from './Localization/es-ES.json'

Vue.config.productionTip = false;
Vue.use(VueI18n);
Vue.use(NowUiKit);

let i18n = new VueI18n({
  locale: 'en-US',
  messages: {
    'en-US': en,
    'es-ES': es,
  },
});

new Vue({
  router,
  i18n,
  render: h => h(App)
}).$mount('#app');
