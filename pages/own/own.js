//获取应用实例
const app = getApp()

var wxMarkerData = [];
Page({
  data: {
    // 弹框
    showModal: false,
    showModal2: false,
    showModal2_value: '正在生成,长按复制',
    showModal2_true:'确定',
    feed1: [
      { create_time: 6.9, active_name: '湖南益阳东街小吃街聚会', active_place_main: '9点半，东门集合', picture: '../../images/2.png', main_info: '吃猪蹄' },

    ],
    // feed1: [
    //   { pic: '../../images/2.png', time1: '2018年12月17日', title: '湖南益阳东街小吃街聚会', to: '/look/look2?title=look2' }],

  },/**
   * 弹出框蒙层截断touchmove事件
   */
  showDialogBtn: function () {
    this.setData({
      showModal: true
    })
  },
  showDialogBtn_show: function () {
    this.setData({
      showModal2: true
    })
  },
  preventTouchMove: function () {
  },
  preventTouchMove2: function () {
  },
  /**
   * 隐藏模态对话框
   */
  hideModal: function () {
    this.setData({
      showModal: false
    });
  },
  hideModal2: function () {
    this.setData({
      showModal2: false
    });
  },
  /**
   * 对话框取消按钮点击事件
   */
  onCancel: function () {
    this.hideModal();

  },
  onCancel_show: function () {
    this.hideModal2();

  },
  /**
   * 对话框确认按钮点击事件
   */
  onConfirm: function () {
    this.hideModal();
    wx.switchTab({
      url: '../first/first'
    })
    // wx.request({
    //   url: 'https://settime.kermi.xyz/do/active/end.php',

    //   data: {
    //     openid: wx.getStorageSync('openId'),
    //      id: wx.getStorageSync('action_id')
    
    //   },

    //   method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT  
    //   header: {// 设置请求的 header  
    //     'content-type': 'application/x-www-form-urlencoded',
    //     // 'content-type': 'application/json',
    //     "Cookie": "sessionId=" + wx.getStorageSync("sessionId")
    //   },
    //   success: function (res) {
    //     console.log(res.data)

    //     // wx.setStorageSync('no', res.data)
    //     // var nono=false
    //     // wx.setStorageSync('nono', nono)
    //     // // wx.getStorageSync('nono'),
    //     // console.log(wx.getStorageSync('aaa'+'nono'),)

    //   },
    //   fail: function (res) {
    //     console.log('cuowu' + ':' + res)
    //   }
    // })
  },

  onConfirm_show: function () {
    var that=this
    this.hideModal();
    
    var id = wx.getStorageSync('action_id')
    console.log(id)
    wx.request({
      url: 'https://settime.kermi.xyz/do/command/change.php',

      data: {
        id: wx.getStorageSync('action_id')
      },

      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT  
      header: {// 设置请求的 header  
        'content-type': 'application/x-www-form-urlencoded',
        // 'content-type': 'application/json',
        "Cookie": "sessionId=" + wx.getStorageSync("sessionId")
      },
      success: function (res) {
        console.log('aa:'+res.data)
        that.setData({
          showModal2_value: '分享id为:'+ res.data,
          showModal2_true:'换一个id',
        })
        // this.hideModal2()
      },
      fail: function (res) {
        console.log('cuowu' + ':' + res)
      }
    })
  },
  onLoad: function (option) {
    wx.setStorageSync('userId', option.id)
    // console.log(option.id)
    // wx.getStorageSync('userId')
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
 
  //
  onShow: function () {
    var heart2 = wx.getStorageSync('heart')
    console.log(heart2)
    // if (heart2==''){}
    var that = this;
    // console.log()
    // wx.request({
    //   url: 'https://settime.kermi.xyz/do/user/show_all.php',

    //   data: {
    //     openid: wx.getStorageSync('openId'),
    //     id: wx.getStorageSync('userId')

    //   },

    //   method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT  
    //   header: {// 设置请求的 header  
    //     'content-type': 'application/x-www-form-urlencoded',
    //     // 'content-type': 'application/json',
    //     "Cookie": "sessionId=" + wx.getStorageSync("sessionId")
    //   },
    //   success: function (res) {
    //     console.log(res)
    //     console.log(res.data)
    //     for(var i=0;i<res.data.length;i++){
    //       var myid=res.data[i].id
          
    //       if (myid == wx.getStorageSync('userId'))
    //       {
    //         console.log(res.data[i].picture)
    //         if (res.data[i].picture == 'undefined'){
    //           that.setData({
    //             feed1: [{
    //               create_time: res.data[i].create_time,
    //               picture: '../../images/list图片.png',
    //               active_name: res.data[i].active_name,
    //               active_place_main: res.data[i].active_place_main,
    //               main_info: res.data[i].main_info
    //             }]
    //           })
    //         }
    //         else{
    //           console.log('1')
    //           that.setData({
    //             feed1: [{
    //               create_time: res.data[i].create_time,
    //               picture: res.data[i].picture ,
    //               active_name: res.data[i].active_name,
    //               active_place_main: res.data[i].active_place_main,
    //               main_info: res.data[i].main_info
    //             }]
    //           })
    //         }
            
    //       }
    //     }


    //   },
    //   fail: function (res) {
    //     console.log('cuowu' + ':' + res)
    //   }
    // })
  },
  go: function () {
    console.log(1)
    wx.switchTab({
      url: '../first/first'
    })
  }

})