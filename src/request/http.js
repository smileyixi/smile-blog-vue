/*
 * 封装axios请求
 */

import axios from 'axios'
import QS from 'qs'
import store from '@/store/index'
import router from '@/router'
import { Message } from 'element-ui';

axios.defaults.baseURL = 'http://127.0.0.1:8888'
axios.defaults.timeout = 6000
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';

// 请求拦截守卫
axios.interceptors.request.use(
    config => {
        // 每次发送请求之前判断vuex中是否存在token        
        // 如果存在，则统一在http请求的header都加上token
        // 对本地token和服务器返回的token对比是否过期 
        const token = store.state.token
        token && (config.headers.Authorization = token)
        return config
    },
    error => {
        return Promise.error(error)
    }
)

// 响应拦截守卫
axios.interceptors.response.use(
    response => {
        // 如果状态码200，则拿到数据,否则抛出异常
        if(response.status === 200) return Promise.resolve(response)
        return Promise.reject(response)
    },

    // 判断返回状态码，显示对应信息
    error => {
        if(error.response.status) {
            switch (error.response.status) {
                // 401: 未登录
                // 未登录则跳转登录页面，并携带当前页面的路径
                // 在登录成功后返回当前页面，这一步需要在登录页操作。      
                case 401:
                    router.replace({
                        path: '/login',
                        query: {
                            redirect: router.currentRoute.fullPath
                        }
                    })
                    break
                // 403 token过期
                // 登录过期对用户进行提示
                // 清除本地token和清空vuex中token对象
                // 跳转登录页面 
                case 403:
                    Message({
                        message: '您的登陆已过期',
                        type: 'warning'
                    })
                    // clean token
                    localStorage.removeItem('token')
                    store.commit('setToken', null)
                    // to login
                    setTimeout(() => {                        
                        router.replace({                            
                            path: '/login',                            
                            query: { 
                                redirect: router.currentRoute.fullPath 
                            }                        
                        });                    
                    }, 1000);
                    break
                case 404:
                    Message({
                        message: '你请求的页面不存在！',
                        type: 'error'
                    })
                    break
                // 其他错误抛出错误提示
                default:
                    Message({
                        message: error.response.data.message,
                        duration: 1400,
                        type: 'error'
                    })
            }
            return Promise.reject(error.response)
        }
    }
)

/**
 * get方法，对应get请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数:keyword]
 */
 export function get(url, params){    
    return new Promise((resolve, reject) =>{        
        axios.get(url, {            
            params: params        
        }).then(res => {
            resolve(res.data);
        }).catch(() =>{
            reject('request error')        
        })    
    });}

/** 
 * post方法，对应post请求 
 * @param {String} url [请求的url地址] 
 * @param {Object} params [请求时携带的参数] 
 */
 export function post(url, params) {
    return new Promise((resolve, reject) => {
         axios.post(url, QS.stringify(params))
        .then(res => {
            resolve(res.data);
        })
        .catch(() =>{
            reject('request err')
        })
    });
}