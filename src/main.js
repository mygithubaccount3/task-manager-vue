import Vue from 'vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faPlusCircle, faTimes, faPen, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import UUID from 'vue-uuid'
import App from './App.vue'
import router from './router'

Vue.use(UUID)

library.add(faPlusCircle, faTimes, faPen, faTrash)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
