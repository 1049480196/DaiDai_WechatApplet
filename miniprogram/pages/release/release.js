// miniprogram/pages/release/release.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    max:250,          //最大字数
    currentWordNumber:0, //当前字数
    titlemax:12,
    titleWordNumber: 0, 
    form_info:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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

  },
  /**
   * 标题字数监听
   */
  titleinput:function(e){
    // 获取输入框的内容
    var value = e.detail.value;
    // 获取输入框内容的长度
    var len = parseInt(value.length);
    this.setData({
      titleWordNumber: len
    })
  },
  /**
   * 详细信息键盘输入事件
   */
  inputs:function(e){
    // 获取输入框的内容
    var value = e.detail.value;
    // 获取输入框内容的长度
    var len = parseInt(value.length);
    this.setData({
      currentWordNumber: len
    })
  },
  /**
   * 表单提交
   */
  submit:function(e){
    var that=this;
    if(e.detail.value.title==''){
      wx.showToast({
        title: '标题不能为空',
        icon: 'none',
        duration: 1000
      })
    }else if (e.detail.value.content==''){
      wx.showToast({
        title: '请输入详细信息',
        icon: 'none',
        duration: 1000
      })
    }else{
    wx.request({
      url: getApp().globalData.urlPath + '/release',
      data:{
        cast_openid: getApp().globalData.openid,
        title: e.detail.value.title,
        type_name:e.detail.value.type,
        content: e.detail.value.content
      },
      success(res) {
        console.log(res.data)
        that.setData({
          form_info:'',
        })
        wx.showToast({
          title: '发布成功',
          icon: 'success',
          duration: 2000
        })
      }
    })
    }
  }
})