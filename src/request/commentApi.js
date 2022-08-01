/*
 * 评论api接口管理
 */

import { get , post} from './http'


/**
 * 插入评论
 * @param {String} url [请求的url地址]
 * @param {Object} params
 */
export const insertComment = (data) => {
    return post('api/comment/new', data)
}

/**
 * 获取评论列表
 * @param {String} url [请求的url地址]
 * @param {Object} params
 */
 export const getCommentListByaid = (params) => {
    return get('api/comment/list', params)
}

/**
 * 获取评论列表
 * @param {String} url [请求的url地址]
 * @param {Object} params
 */
 export const getCommnetCount = (params) => {
    return get('api/comment/count', params)
}




