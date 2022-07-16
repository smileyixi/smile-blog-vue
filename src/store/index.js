import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex)

const user = {
    namespaced: true,
    actions: {},
    mutations: {},
    state: {},
    getters: {}

}

export default new Vuex.Store({
    modules: {
        user,
    }
})