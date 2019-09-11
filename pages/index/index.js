
const app = getApp()
var bmap = require('../../libs/bmap-wx.min.js');
var wxMarkerData = [];
var util = require('../../utils/util.js')

Page({
  data: {
    display: ''  ,

    // feed: [
    //   { create_time: 6.9, active_place_main: '例子，发表后消失', active_name: '小程序提交作品，欢迎浏览', },

    // ],
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    // 移动表单
    navTab: ["历史活动",  "推荐活动地点"],
    currentNavtab: "0",
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    //地图
    markers: [],
    latitude: '',
    longitude: '',
    placeData: {},
    sugData: '',
    // 弹框
    showModal: false,
    decline:true

  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      // url: '../logs/logs'
      url: '../personal_infor/personal_infor'
    })
  },
  
  onLoad: function () {
    console.log('onLoad')
    var that = this
    //调用应用实例的方法获取全局数据
    this.refresh();
    //登录注册处

    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    }
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
//   upper: function () {
//     wx.showNavigationBarLoading()
//     this.refresh();
//     console.log("upper");
//     setTimeout(function () { wx.hideNavigationBarLoading(); wx.stopPullDownRefresh(); }, 2000);
//   },
//   lower: function (e) {
//     wx.showNavigationBarLoading();
//     var that = this;
//     setTimeout(function () { wx.hideNavigationBarLoading(); that.nextLoad(); }, 1000);
//     console.log("lower")
//   },
//   //网络请求数据, 实现首页刷新
//   refresh0: function () {
//     var index_api = '';
//     util.getData(index_api)
//       .then(function (data) {
//         //this.setData({
//         //
//         //});
//         console.log(data);
//       });
//   },

//   //使用本地 fake 数据实现刷新效果
//   refresh: function () {
//     var feed = util.getData2();
//     console.log("loaddata");
//     var feed_data = feed.data;
//     this.setData({
//       feed: feed_data,
//       feed_length: feed_data.length
//     });
//   },

//   //使用本地 fake 数据实现继续加载效果
//   nextLoad: function () {
//     var next = util.getNext()
//     console.log("continueload")
//     var next_data = next.data
//     // this.setData({
//     //   feed: this.data.feed.concat(next_data),
//     //   feed_length: this.data.feed_length + next_data.length
//     // });
//   }
// ,
  getUserInfo: function(e) {
    console.log(e)
    var nickName = e.detail.userInfo.nickName //用户名
    var avatarUrl = e.detail.userInfo.avatarUrl //头像链接
    var gender = e.detail.userInfo.gender //性别 0：未知、1：男、2：女
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    }),
      wx.login({
      
        success: function (res) {
          var code = res.code;
          console.log(code);
          if (res.code) {
            wx.request({
              url: 'https://settime.kermi.xyz/do/user/loginIn.php',
              method: 'GET',
              data: {
                name: nickName, // 用户输入的账号
                head_img: avatarUrl,
                code:code
                
              },
              success: function (res) {
                console.log(res);
                console.log(res.data);
                wx.setStorageSync('openId', res.data)
                // 登录成功
                if (res.statusCode === 200) {
                 
                 
                  
                } else {
                  console.log('服务器没有反应!');
                }
              },

            })

          } else {
            console.log('获取用户登录态失败！' + res.errMsg)
          }
        }

      })
  },
  /*自己写的跳转页面 */
  start: function () {
    
    wx.navigateTo({
      url: '../personal_infor/personal_infor',
      success: function(res){
        // success
      },
      fail: function() {
        // fail
      },
      complete: function() {
        // complete
      }
    })
    
  },
  switchTab: function (e) {
    this.setData({
      currentNavtab: e.currentTarget.dataset.idx,
     
    });
  },


  onShow: function () {

    var that = this
    var Uif = wx.getStorageSync('UIF')
    console.log(Uif.nickName)
    if (Uif.nickName){
      that.setData({

        userInfo: Uif,
        // hasUserInfo:false,
        // canIUse:false,
        avatarUrl: Uif.avatarUrl
      })
    }

    var get = wx.getStorageSync('openId')

    var that=this
    
    
     
      wx.request({
        url: 'https://settime.kermi.xyz/do/user/show_all.php',

        data: {
          openid: wx.getStorageSync('openId'),
        },
        method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT  
        header: {// 设置请求的 header  
          'content-type': 'application/x-www-form-urlencoded',
          // 'content-type': 'application/json',
          "Cookie": "sessionId=" + wx.getStorageSync("sessionId")
        },
        success: function (res) {
          console.log(res)
          // wx.setStorageSync('length', res.data.length)
          // console.log(res.data.length)
          console.log(res.data)
          that.setData({
            feed: res.data,
            
          })
          console.log(that.data.feed)
          // }
        },
        fail: function (res) {
          console.log('cuowu' + ':' + res)
        }
      })
    

  },

  // 百度地图
  makertap: function (e) {
    var that = this;
    var id = e.markerId;
    that.showSearchInfo(wxMarkerData, id);
    that.changeMarkerColor(wxMarkerData, id);
  },
  onLoad: function () {
    var that = this;
    var BMap = new bmap.BMapWX({
      ak: 'DCYPXlrtnUbDA3KRL7QVH6y3z7X1rwo1'
    });
    var fail = function (data) {
      console.log(data)
    };
    var success = function (data) {
      wxMarkerData = data.wxMarkerData;
      that.setData({
        markers: wxMarkerData
      });
      that.setData({
        latitude: wxMarkerData[0].latitude
      });
      that.setData({
        longitude: wxMarkerData[0].longitude
      });
    }
    BMap.search({
      "query": '美食',
      fail: fail,
      success: success,
      iconPath: '../../images/marker_red.png',
      iconTapPath: '../../images/marker_red.png'
    });
  },
  showSearchInfo: function (data, i) {
    var that = this;
    that.setData({
      placeData: {
        title: '推荐餐馆' + data[i].title + '\n',
        address: '地址：' + data[i].address + '\n',
        telephone: '电话：' + data[i].telephone + '\n',
        // latitude: '经度:' + data[i].latitude + '\n', 
        // longitude: '纬度：' + data[i].longitude + '\n',
       
      }
    });
  },
  changeMarkerColor: function (data, id) {
    var that = this;
    var markersTemp = [];
    for (var i = 0; i < data.length; i++) {
      if (i === id) {
        data[i].iconPath = "../../images/marker_yellow.png";
      } else {
        data[i].iconPath = "../../images/marker_red.png";
      }
      markersTemp[i] = data[i];
    }
    that.setData({
      markers: markersTemp
    });
  }, bindKeyInput: function (e) {
    var that = this;
    if (e.detail.value === '') {
      that.setData({
        sugData: ''
      });
      return;
    }
    var BMap = new bmap.BMapWX({
      ak: 'DCYPXlrtnUbDA3KRL7QVH6y3z7X1rwo1'
    });
    var fail = function (data) {
      console.log(data)
    };
    var success = function (data) {
      var sugData = '';
      for (var i = 0; i < data.result.length; i++) {
        sugData = sugData + data.result[i].name + '\n';
      }
      that.setData({
        sugData: sugData
      });
    }
    BMap.suggestion({
      query: e.detail.value,
      region: '北京',
      city_limit: true,
      fail: fail,
      success: function (res) {
        console.log(res)
      },
    });
  },
  
  /**
   * 弹出框蒙层截断touchmove事件
   */
  showDialogBtn: function () {
    this.setData({
      showModal: true
    })
  },
  preventTouchMove: function () {
  },
  /**
   * 隐藏模态对话框
   */
  hideModal: function () {
    this.setData({
      showModal: false,
    });
  },
  /**
   * 对话框取消按钮点击事件
   */
  onCancel: function () {
    this.hideModal();
    this.setData({
      display: "none"
    }) 
  },
  /**
   * 对话框确认按钮点击事件
   */
  onConfirm: function () {
    this.hideModal();
    this.setData({
      showModal: false,
    
      display: "block",
    }) 
  },
  
  //分享
  onShareAppMessage: function () {
    return {
      title: '约个时间出去玩',
      desc: '我发现了一个超好玩的小程序',
      // path: '/page/user?id=123'
    }
  }
  
})
