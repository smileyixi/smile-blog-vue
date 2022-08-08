/*
 * 分类api接口管理
 */

import { get, post } from './http'

/**
 * 创建页面
 * @param {String} url [请求的url地址]
 * @param {Object} params
 */
 export const createPage = (data) => {
    return post('api/pages/new', data)
}


/**
 * 获取页面
 * @param {String} url [请求的url地址]
 * @param {Object} params {page: page} 没写page则获取全部
 */
 export const getPage = (params) => {
    return get('api/pages', params)
}