/*
 * 用户登陆api接口管理
 */

import { get , post} from './http'


export const login = (params) => {
    return post('/api/user/login', params)
}