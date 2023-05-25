import 'font-awesome/css/font-awesome.css'
import Vue from 'vue'

import App from './App'

//configs
import store from './config/store'
import './config/bootstrap'
import router from './config/router'
import './config/msg'

// import './config/axios'//token
import './config/mq'
Vue.config.productionTip = false

//So para usar token enqunato nao esta pronto
//require('axios').defaults.headers.common['Authorization'] = 'bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MSwibmFtZSI6IlZpY3RvciBTcGljaGVua29mZiBTYW50YW5hIiwiZW1haWwiOiJ2c3NAZ21haWwuY29tIiwiYWRtaW4iOnRydWUsImlhdCI6MTY4NDI3MDQ3NSwiZXhwIjoxNjg2ODYyNDc1fQ._IYNUPkX0MBmU4Ecuk2uFz91Noxz1SwyLRIdTfSNS14'

new Vue({
  router,
  store: store,
  render: h => h(App)
}).$mount('#app')