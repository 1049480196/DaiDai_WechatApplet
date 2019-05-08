// miniprogram/pages/myinfo/myinfo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    avatarUrl:'',
    city:'',
    province:'',
    nickName:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    wx.request({
      url: getApp().globalData.urlPath + '/getUserByOpenid?openid=' + getApp().globalData.openid,
      success:function(res){
        console.log(res.data)
        that.setData({
          avatarUrl: res.data.avatarUrl,
          city: res.data.city,
          province: res.data.province,
          nickName: res.data.nickName
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})