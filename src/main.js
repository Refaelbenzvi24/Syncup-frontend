const firebase = require('firebase/app')
const firebaseConfig = require('./Configs/firebase-config.json')

import 'firebase/auth'
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import store from './store'
import User from "./modules/user"

firebase.initializeApp(firebaseConfig)
Vue.config.productionTip = false

new User({
    saveUserToStore: true,
    saveUserBool: true,
})

new Vue({
    router,
    vuetify,
    store,
    render: h => h(App)
}).$mount('#app')