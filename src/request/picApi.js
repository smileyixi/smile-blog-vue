/**
 * sm 图床 api
 */

import axios from 'axios'
import { Message } from 'element-ui'
import { imgurl_user } from '@/config/account'

axios.defaults.baseURL = "/pic"
// axios.defaults.timeout = 6000

// add token to Header
// axios.interceptors.request.use(
//     config => {
//         const token = localStorage.getItem('sm_token')
//         token && (config.headers.Authorization = token)
//         return config
//     }
// )

/**
 * 上传图片
 * @param {FormData} file 图片数据
 */
export const upload = (data) => {
    return new Promise((resolve, reject)=>{
        axios.post('/upload', {
            file: data, 
            token : imgurl_user.token, 
            uid: imgurl_user.uid
        }, {
            headers: {
                "Content-Type": "multipart/form-data",
            }
        }).then(result=>{
            console.log(resolve)
            resolve(result)
        }).catch(err=>{
            reject(err)
            Message.error(err)
        })
    })
}