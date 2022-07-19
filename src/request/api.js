/*
 * api接口管理
 */

import { get , post} from './http'


/**
 * 获取博客文章列表
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数：keyword]
 */
export const getBlogList = (params) => {
    return get('api/blog/list', params)
}

/**
 * 查询单个文章通过id
 * @param {Object} params 
 * @returns 
 */
export const getArticleById = (params) => {
    return get('api/blog/article', params)
}


