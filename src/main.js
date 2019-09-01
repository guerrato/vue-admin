import Vue from 'vue'
import 'vue-croppa/dist/vue-croppa.css'
import App from './App'
import router from './router'
import { store } from './store'

import './registerServiceWorker'

import Croppa from 'vue-croppa'
import Draggable from 'vuedraggable'
import Box from './components/Box'
import Alert from './components/Alert'
import Table from './components/Table'
import Crop from './components/Crop'
import Modal from './components/Modal'

Vue.config.productionTip = false

Vue.component('v-box', Box)
Vue.component('v-alert', Alert)
Vue.component('v-table', Table)
Vue.component('croppa', Croppa.component)
Vue.component('v-draggable', Draggable)
Vue.component('v-crop', Crop)
Vue.component('v-modal', Modal)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
