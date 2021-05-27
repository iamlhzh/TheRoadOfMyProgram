// app.js
let api = require('/config/api.js')
App({
  onLaunch() {
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        var params={
          code:res.code
        }
        api.server.getWxUnionIdByCode(params).then(data => {
          console.log(data)
          if (data.success){
            try{
              wx.setStorageSync('OPENID', data.result.openid)
              wx.setStorageSync('SESSIONKEY',data.result.session_key)
              wx.setStorageSync('UNIONID',data.result.unionid)
            }catch(e){
              console.log('存储openid和sessionkey失败')
              console.log(e)
            }
          }
        }).catch(error => {

        });
      }
    })
  },
  globalData: {
    userInfo: null
  }
})
