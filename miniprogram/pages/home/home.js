var WxSearch = require('../../wxSearch/wxSearch.js');
var app = getApp();
Page({
  data: {
    wxSearchData: {
      view: {
        isShow: true
      }
    },
    listdatas: [],
    // 页面总高度将会放在这里
    windowHeight: 0,
    // tabbar的高度
    tabbarHeight: 0,
    // wxSearch的高度
    wxSearchHeight: 0,
    // modes的高度
    modesHeight: 0,
    // scroll-view的高度
    scrollViewHeight: 0,
    //页码
    page:1,
    //总页数
    pages:0
  },
  onLoad: function() {
    var that = this;
    //初始化的时候渲染wxSearchdata
    WxSearch.init(that, 43, ['英语代读', '代课', '代开假条'], true, false);
    WxSearch.initMindKeys(['英语代读', '代课', '代开假条']);
    //设置scroll-view高度自适应
    wx.getSystemInfo({
      success(res) {
        wx.createSelectorQuery().select('#wxSearch').boundingClientRect(function(rect) {
          var wxSearch_height = Number(rect.height) // 节点的宽度
          that.setData({
            wxSearchHeight: wxSearch_height
          });
          wx.createSelectorQuery().select('#modes').boundingClientRect(function(rect) {
            var modes_height = Number(rect.height) // 节点的宽度
            that.setData({
              modesHeight: modes_height,
              scrollViewHeight: res.windowHeight - (that.data.wxSearchHeight + that.data.modesHeight)
            });
          }).exec();
        }).exec();
      }
    });
    
    //查看是否授权
    wx.getSetting({
      success: function(res) {
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: function(res) {
              //从数据库获取用户信息
              //用户已经授权过
              wx.switchTab({
                url: '../home/home'
              })
            }
          });
        }else{
          wx.redirectTo({
            url: '../login/login',
            success: function () { } //成功后的回调；
          })
        }
      }
    });
    //获取listdatas数据
    wx.request({
      url: getApp().globalData.urlPath + '/getAllPro?page='+that.data.page,
      success: function (res) {
        var list = that.data.listdatas;
        for (var i = 0; i < res.data.values[0].list.length;i++){
          res.data.values[0].list[i].casttime = that.getNowFormatDate(res.data.values[0].list[i].casttime)
          list.push(res.data.values[0].list[i]);
        }
        that.setData({
          listdatas: list,
          page: res.data.values[0].pageNum+1,
          pages: res.data.values[0].pages
        });
      }
    })
  },
  wxSearchFn: function(e) {
    var that = this
    WxSearch.wxSearchAddHisKey(that);
  },
  wxSearchInput: function(e) {
    var that = this
    WxSearch.wxSearchInput(e, that);
  },
  wxSerchFocus: function(e) {
    var that = this
    WxSearch.wxSearchFocus(e, that);
  },
  wxSearchBlur: function(e) {
    var that = this
    WxSearch.wxSearchBlur(e, that);
  },
  wxSearchKeyTap: function(e) {
    var that = this
    WxSearch.wxSearchKeyTap(e, that);
  },
  wxSearchDeleteKey: function(e) {
    var that = this
    WxSearch.wxSearchDeleteKey(e, that);
  },
  wxSearchDeleteAll: function(e) {
    var that = this;
    WxSearch.wxSearchDeleteAll(that);
  },
  wxSearchTap: function(e) {
    var that = this
    WxSearch.wxSearchHiddenPancel(that);
  },
  wxSerchconfirm:function(e){
    var that = this
    wx.request({
      url: getApp().globalData.urlPath + '/search?title=' + e.detail.value,
      success:function(res){
        wx.navigateTo({
          url: '../searchlist/searchlist?search=' + JSON.stringify(res.data)
        }) 
      }
    })
  },
  // 上拉加载回调接口
  moredata: function(e) {
    // 我们用total和count来控制分页，total代表已请求数据的总数，count代表每次请求的个数。
    // 上拉时需把total在原来的基础上加上count，代表从count条后的数据开始请求。
    // 网络请求
    //console.log(e);
    var that=this;
    if(that.data.page<=that.data.pages){
    wx.request({
      url: getApp().globalData.urlPath + '/getAllPro?page=' + that.data.page,
      success: function (res) {
        var list = that.data.listdatas;
        for (var i = 0; i < res.data.values[0].list.length; i++) {
          res.data.values[0].list[i].casttime = that.getNowFormatDate(res.data.values[0].list[i].casttime)
          list.push(res.data.values[0].list[i]);
        }
        that.setData({
          listdatas: list,
          page: res.data.values[0].pageNum+ 1
        });
      }
    });
    }
  },
  detailspage: function(e) {
    wx.navigateTo({
      url: '../detailspages/detailspages?index_id=' + e.currentTarget.dataset['index']
    })
  },
  /**
   * 进入类型分类页面
   */
  intolist:function(e){
   wx.navigateTo({
     url: '../typelist/typelist?type=' + e.currentTarget.dataset.type
   }) 
  },
  /**
   * 时间戳转换
   */
  getNowFormatDate:function(time){
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
  },
  /**
   * 下拉刷新
   */
  updata:function(e){
    var that = this;
    //数据初始化
    that.setData({
      listdatas: [],
      page: 1,
      pages: 0
    })
    //获取listdatas数据
    wx.request({
      url: getApp().globalData.urlPath + '/getAllPro?page=' + that.data.page,
      success: function (res) {
        var list = that.data.listdatas;
        for (var i = 0; i < res.data.values[0].list.length; i++) {
          res.data.values[0].list[i].casttime = that.getNowFormatDate(res.data.values[0].list[i].casttime)
          list.push(res.data.values[0].list[i]);
        }
        that.setData({
          listdatas: list,
          page: res.data.values[0].pageNum + 1,
          pages: res.data.values[0].pages
        });
      }
    })
  }
})