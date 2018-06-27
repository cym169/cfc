// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './memberPoint'
import { WechatPlugin, AjaxPlugin } from 'vux'
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

/* eslint-disable no-new */
new Vue({
    el: '#app',
    store,
    template: '<App/>',
    components: { App }
})