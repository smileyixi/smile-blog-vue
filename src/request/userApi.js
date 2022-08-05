/*
 * 用户api接口管理
 */

import { get , post} from './http'

/**
 * 用户登陆
 * @param {*} params 
 * @returns 
 */
export const login = (params) => {
    return post('/api/user/login', params)
}

/**
 * 鉴权接口
 * @returns 
 */
export const tokenVerify = () => {
    return post('/api/verify')
}

