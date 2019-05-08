// miniprogram/pages/myorderpage/myorderpage.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    indexid: '',
    title: '',
    content: '',
    time: '',
    type: '',
    name: '',
    image: '',
    cast_openid: '',
    openid: getApp().globalData.openid,
    //显示按钮
    button: false,
    // imge高度
    imageHeight: 0,
    //title高度
    titleHeight: 0,
    //info高度
    infoHeight: 0,
    //content高度
    contentHeight: 0

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var indexid = options.index_id;
    this.setData({
      indexid: indexid
    })

    //设置content高度自适应
    var that = this;
    wx.getSystemInfo({
      success(res) {
        wx.createSelectorQuery().select('#image').boundingClientRect(function (rect) {
          var image_height = Number(rect.height) // 节点的宽度
          that.setData({
            imageHeight: image_height
          });
          wx.createSelectorQuery().select('#title').boundingClientRect(function (rect) {
            var title_height = Number(rect.height) // 节点的宽度
            that.setData({
              titleHeight: title_height,
              //scrollViewHeight: res.windowHeight - (that.data.wxSearchHeight + that.data.modesHeight)
            });
            wx.createSelectorQuery().select('#info').boundingClientRect(function (rect) {
              var info_height = Number(rect.height) // 节点的宽度
              that.setData({
                infoHeight: info_height,
                contentHeight: res.windowHeight - (that.data.imageHeight + that.data.titleHeight + that.data.infoHeight)
              });
            }).exec();
          }).exec();
        }).exec();
      }
    });
    wx.request({
      url: getApp().globalData.urlPath + '/getProById?id=' + options.index_id,
      success: function (res) {
        that.setData({
          indexid: res.data.pro.id,
          title: res.data.pro.title,
          content: res.data.pro.content,
          time: that.getNowFormatDate(res.data.pro.casttime),
          type: res.data.pro.type_name,
          name: res.data.user.nickName,
          cast_openid: res.data.pro.cast_openid
        });

        if (res.data.pro.type_name == '游戏代打') {
          that.setData({
            image: '../../images/_game.png'
          })
        } else if (res.data.pro.type_name == '跑腿') {
          that.setData({
            image: '../../images/_run.png'
          })
        } else if (res.data.pro.type_name == '代课') {
          that.setData({
            image: '../../images/_daike.png'
          })
        }
        if (that.data.cast_openid != getApp().globalData.openid) {
          that.setData({
            button: true
          })
        } else {
          that.setData({
            button: false
          })
        }

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

  },
  /**
   * 时间轴处理
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