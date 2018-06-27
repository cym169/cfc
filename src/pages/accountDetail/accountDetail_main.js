// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './accountDetail'
import {WechatPlugin, AjaxPlugin} from 'vux'
import Vuex from 'vuex'
import * as actions from '../../store/actions.js'
import state from '../../store/state.js'
import mutations from '../../store/mutations.js'

Vue.use(AjaxPlugin)
Vue.use(WechatPlugin)
Vue.use(Vuex)

Vue.config.productionTip = false
let store = new Vuex.Store({
    state,
    mutations,
    actions
})

Vue.filter('dateFormat', function (value) {
    let time = new Date(value)
    let y = time.getFullYear()
    let m = time.getMonth() + 1
    let d = time.getDate()
    let h = time.getHours()
    let mm = time.getMinutes()
    let s = time.getSeconds()
    return y + '-' + (m > 9 ? m : '0' + m) + '-' + (d > 9 ? d : '0' + d) + ' ' + (h > 9 ? h : '0' + h) + ':' + (mm > 9 ? mm : '0' + mm) + ':' + (s > 9 ? s : '0' + s)
    if (!value) return ''
    value = value.toString()
    return value.charAt(0).toUpperCase() + value.slice(1)
})

/* eslint-disable no-new */
new Vue({
    el: '#app',
    store,
    template: '<App/>',
    components: {App}
})
