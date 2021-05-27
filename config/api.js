import http from './http'

/**
 * 该文件用于是后台的api
 * 
 */
var wxLogin ='/wxApp/';
var transaction ='/api/transaction';
var four ='/api/four';
var like = '/api/like';
var comment = '/api/comment'



export const server = {
  getWxUnionIdByCode: function (params) {
    return http.get(wxLogin + '/getWxUnionIdByCode', params);
  },
  getTransactionInfo: function (params) {
    return http.post(transaction + '/getTransactionInfo', params);
  },
  getFourDiscussionInfo: function (params) {
    return http.post(four + '/getFourDiscussionInfo', params);
  },
  decodeUserInfoAndLogin: function (params) {
    return http.get(wxLogin + '/decodeUserInfoAndLogin', params);
  },
  userRegisterOrLogin: function (params) {
    return http.get(wxLogin + '/userRegisterOrLogin', params);
  },
  toZwgkLike: function (params) {
    return http.post(like + '/toZwgkLike', params);
  },
  toSylgkLike: function (params) {
    return http.post(like + '/toSylgkLike', params);
  },
  getLikeInfo: function (params) {
    return http.post(like + '/getLikeInfo', params);
  },
  toCommentGongkai: function (params) {
    return http.post(comment + '/toCommentGongkai', params);
  },
  toReplyComment: function (params) {
    return http.post(comment + '/toReplyComment', params);
  },
  getCommentsTree: function (params) {
    return http.get(comment + '/getCommentsTree', params);
  },
  toDeleteComment: function (params) {
    return http.get(comment + '/toDeleteComment', params);
  },
  toDeleteRootComment: function (params) {
    return http.get(comment + '/toDeleteRootComment', params);
  },
  getCommentsCount: function (params) {
    return http.get(comment + '/getCommentsCount', params);
  },
}
