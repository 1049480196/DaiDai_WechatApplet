//app.js
App({
  onLaunch: function () {
    
    var that = this;
    // if (!wx.cloud) {
    //   console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    // } else {
    //   wx.cloud.init({
    //     traceUser: true,
    //   })
    // }
    // 查看是否授权
    wx.getSetting({
      success: function (res) {
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: function (res) {
              //用户已经授权过
              wx.switchTab({
                url: '../home/home'
              })
            }
          });
        }
      }
    })

    wx.login({
      success: res => {
        wx.request({
          url: getApp().globalData.urlPath + '/authorize?js_code=' + res.code,
          success: res => {
            that.globalData.openid = JSON.parse(res.data.openid).openid;
          }
        })
      }
    });
  },
  /**
   * 设置全局变量
   */
  globalData: {
    openid: 0,
    urlPath: 'https://daidaidazuoye.xyz:8443/shixun2',
    wx_url_1: 'https://api.weixin.qq.com/sns/jscode2session?appid=wx04d0c32f8ae0c8ac&secret=a8a232608b906499d30c0f0dece94ec2&js_code=',
    wx_url_2: '&grant_type=authorization_code'
  }
})
