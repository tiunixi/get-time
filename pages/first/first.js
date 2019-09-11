var util = require('../../utils/util.js');
const app = getApp()
var get = wx.getStorageSync('openId')
var decline=true

Page({
  data: {
    num1:false,
    num2: false,
    decline:true,
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),

    get : wx.getStorageSync('openId'),
    

    navTab: ["我的活动", "推荐活动"],
    currentNavtab: "0",
//弹框
    showModal: false,
//block
    feed: [
      { create_time: 6.9, active_place_main: '互联网', active_name: '小程序提交作品，欢迎浏览', },

    ],
    feed1:[
      { pic: '../../images/2.png', time1: '2018年12月17日', title: '湖南益阳东街小吃街聚会', to:'/look/look2?title=look2'},
      { pic: '../../images/3.png', time1: '2019年1月1日', title: '海南三亚市 楼家旅店麻将'
        , to: '/look/look3?title=look3'},
      { pic: '../../images/5.png', time1: '2019年3月11日', title: '香港旺角，九龙城小吃街活动', to: '/look/look4?title=look4'},
      { pic: '../../images/6.png', time1: '2019年3月21日', title: '私人派对', to: '/look/look5?title=look5'},
    ]
   
  },
  go: function (e) {
    console.log(e)
    
    wx.setStorageSync('action_id', e.currentTarget.dataset.idx)
    var id =wx.getStorageSync('action_id')
    console.log(id)

    console.log(1)
    wx.navigateTo({
      url: '../own/own?id=' + id
    })
  },
  onShow:function()
  {
    var that = this
   
    var get = wx.getStorageSync('openId')
    if (get != ''){
      var num2 = true
      console.log(get)
       var decline1 = wx.getStorageSync('no')
      console.log(decline1)
      if (decline1) {
        this.setData({
          decline: decline1
        });
      }
      else{
        this.setData({
          num2: false,
          decline: true
        });
      }
      // wx.request({
      //   url: 'https://settime.kermi.xyz/do/user/show.create.php',

      //   data: {
      //     openid: wx.getStorageSync('openId'),
      //   },
      //   method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT  
      //   header: {// 设置请求的 header  
      //     'content-type': 'application/x-www-form-urlencoded',
      //     // 'content-type': 'application/json',
      //     "Cookie": "sessionId=" + wx.getStorageSync("sessionId")
      //   },
      //   success: function (res) {
      //     // wx.setStorageSync('length', res.data.length)
      //     console.log(res.data)
      //     var data=[];
       
      //     for (var i = 0; i < res.data.length;i++)
      //     {
      //       var choice = res.data[i].status;
      //       console.log(res.data[i].status)
      //       if (choice != '已结束'){
      //         data.push(res.data[i]);
      //           console.log(data)
              
      //       }
      //     }
      //     that.setData({
      //       feed:data
            
      //     })
          
      //   },
      //   fail: function (res) {
      //     console.log('cuowu' + ':' + res)
      //   }
      // })
    }
    else{
      this.setData({
        num1: true
      });
    }
    
  },
  upper: function () {
    wx.showNavigationBarLoading()
    this.refresh();
    console.log("upper");
    setTimeout(function () { wx.hideNavigationBarLoading(); wx.stopPullDownRefresh(); }, 2000);
  },
  lower: function (e) {
    wx.showNavigationBarLoading();
    var that = this;
    setTimeout(function () { wx.hideNavigationBarLoading(); that.nextLoad(); }, 1000);
    console.log("lower")
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  //口令建群按钮的显示与隐藏
  onChangeShowState: function () {
    var that = this;//page
    that.setData({
      showView: (!that.data.showView)//取反f变T
    })
  },
  onLoad: function (options) {
    console.log(options)
    // 调用函数时，传入new Date()参数，返回值是日期和时间
    var time = util.formatTime(new Date());
    // 再通过setData更改Page()里面的data，动态更新页面的数据
    console.log(time)
    this.setData({
      time: time
    });
  

    showView: (options.showView == "true" ? true : false) // 口令建群按钮的显示与隐藏
    
    
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
  gg:function(e){
    var that = this;
    var adds = e.detail.value;
    // console.log(adds)
    this.setData({
      heart: adds,
    })
  },
  onheart:function(e)
  {
    var that = this;
    this.setData({
      mun1: ''
    })
    var adds = e.detail.value;
    console.log(e)
    console.log(this.data.heart)
    wx.setStorageSync('heart', this.data.heart)
    var heart2 = wx.getStorageSync('heart')
    console.log(heart2)
    var heart1=this.data.heart
    wx.request({
      url: 'https://settime.kermi.xyz/do/command/show.php',

      data: {
       command:heart1
      },

      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT  
      header: {// 设置请求的 header  
        // 'content-type': 'application/x-www-form-urlencoded',
        'content-type': 'application/json',
        "Cookie": "sessionId=" + wx.getStorageSync("sessionId")
      },
      success: function (res) {
      //  console.log(res.data)
       wx.setStorageSync('alldata', res.data)
    // var alldata1 = wx.getStorageSync('alldata')
    // console.log(alldata1)
       
       var id =res.data.id

       console.log(res.data.id);
       console.log(res.data);
       
      if(res.data){

        wx.navigateTo({
          url: '../join/join?id=' + id
        })
      }
       if(!res.data){
        
         wx.showToast({
           title: '无此口令',
           icon: 'loading', 
           duration: 1000
         });
       }
       
      },
     
    })
  },
  getUserInfo: function (e) {
    console.log(e)//这里以后可以记录用户的唯一id值
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
  ,
  //我的活动和推荐活动的转换
  switchTab: function (e) {
    console.log(e)
    this.setData({
      currentNavtab: e.currentTarget.dataset.idx//记录idx的值

    });
  },

  //分享小程序
  onShareAppMessage:function(){
    return {
      title: '约个时间出去玩',
      desc: '我发现了一个超好玩的小程序',
      // path: '/page/user?id=123'
    }
  }
})
