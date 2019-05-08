// miniprogram/pages/searchlist/searchlist.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //scroll-viewd的高度自适应
    scrollHeight: 0,
    listdatas: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    wx.getSystemInfo({
      success(res) {
        that.setData({
          scrollHeight: res.windowHeight
        });
      }
    });
    var list = JSON.parse(options.search);
    var lists=that.data.listdatas;
    for(var i=0;i<list.length;i++){
      list[i].casttime = that.getNowFormatDate(list[i].casttime)
      lists.push(list[i])
    }
    that.setData({
      listdatas: lists
    });
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
  detailspage: function (e) {
    wx.navigateTo({
      url: '../detailspages/detailspages?index_id=' + e.currentTarget.dataset['index']
    })
  },
  /**
   * 时间戳转换
   */
  getNowFormatDate: function (time) {
    var date = new Date(time);
    var seperator1 = "-";
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
      month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
      strDate = "0" + strDate;
    }
    var currentdate = year + seperator1 + month + seperator1 + strDate;
    return currentdate;
  }
})