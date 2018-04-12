// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'

import 'vue-croppa/dist/vue-croppa.css'

import App from './App'
import router from './router'
import { store } from './store'
import Croppa from 'vue-croppa'
import Box from './components/Shared/Box'
import Alert from './components/Shared/Alert'
import Table from './components/Shared/Table'
import Crop from './components/Shared/Crop'

Vue.config.productionTip = false

Vue.component('v-box', Box)
Vue.component('v-alert', Alert)
Vue.component('v-table', Table)
Vue.component('croppa', Croppa.component)
Vue.component('v-crop', Crop)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
