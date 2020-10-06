import '@mdi/font/css/materialdesignicons.css'
import Vue from 'vue'
import Vuetify from 'vuetify/lib'

import 'material-design-icons-iconfont/dist/material-design-icons.css'

Vue.use(Vuetify)

const MY_ICONS = {
    navbar: "../assets/Group 6@2x.png"
}

export default new Vuetify({
    icons: {
        iconfont: 'mdi',
        values: MY_ICONS,
    }
})