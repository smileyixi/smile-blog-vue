import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex)
const mutations= {
    // load token from localStorage
    loadToken(state) {
        state.user.token = localStorage.getItem('token')
    },

    // set token，clean token
    setToken(state, token) {
        state.user.token = token
    }
}
const state= {
    // 模拟用户数据
    user: {
        id: 1,
        name: 'smilesl',
        token: 'testTokenString'
    }
}

export default new Vuex.Store({
    mutations, state
})