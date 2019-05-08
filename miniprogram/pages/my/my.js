// miniprogram/pages/my/my.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    menuitems: [{
        text: '我的发布',
        url: '../myrelease/myrelease?openid=' + getApp().globalData.openid,
        icon: '../../images/info.png',
        tips: ''
      },
      {
        text: '我的代代',
        url: '../myorder/myorder?openid=' + getApp().globalData.openid,
        icon: '../../images/order.png',
        tips: ''
      },
      {
        text: '我的信息',
        url: '../myinfo/myinfo?openid=' + getApp().globalData.openid,
        icon: '../index/img/my.png',
        tips: ''
      }
    ],
    nickName:'',
    avatarUrl:'',

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that=this
    // 查看是否授权
    wx.getSetting({
      success: function (res) {
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: function (res) {
              console.log(res.userInfo.avatarUrl)
              that.setData({
                nickName: res.userInfo.nickName,
                avatarUrl:res.userInfo.avatarUrl
              })
            }
          });
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})