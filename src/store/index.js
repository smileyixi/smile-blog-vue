import Vue from "vue"
import Vuex from "vuex"
import Cookie from 'js-cookie'

Vue.use(Vuex)
const actions = {}

const mutations = {
    // 页面加载token
    loadToken(state) {
        state.token = Cookie.get('token')
        if(!Cookie.get('token')) {
            state.token = ''
        }
        state.user = localStorage.getItem('_user')
        state.createTime = localStorage.getItem('_createTime')
    },

    // 登陆设置token和用户信息
    setUserInfo(state, data) {
        state.user = data.user
        state.token = data.token
        state.createTime = data.createTime

        Cookie.set('token', data.token)
        localStorage.setItem('_user', JSON.stringify(data.user))
        localStorage.setItem('_createTime', data.createTime)
    },

    // 登陆失效清除token
    cleanToken(state) {
        state.token = ''
        Cookie.remove('token')
        localStorage.removeItem('_user')
    }
}
const state = {
    // 用户数据
    user: {},
    token: '',
}

export default new Vuex.Store({
    actions, mutations, state
})