/*
 * 分类api接口管理
 */

import { get , post} from './http'

/**
 * 获取分类列表
 * @param {Object} params {limit:指定获取数量}
 * @returns 
 */
export const getCategoryList = (params) => {
    return get('api/category/list', params)
}

/**
 * 获取分类聚合数目
 * @param {*} params 
 * @returns 
 */
export const getCategoryCount = (params) => {
    return get('api/category/count', params)
}

