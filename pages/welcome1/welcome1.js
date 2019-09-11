const app = getApp();
Page({
  data: {
    remind: '加载中',
    angle: 0,
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
    
  },
//动态效果
  onReady() {
    setTimeout(() => {
      this.setData({
        remind: ''
      });
    }, 1000);
    wx.onAccelerometerChange((res) => {
      let angle = -(res.x * 30).toFixed(1);
      if (angle > 14) { angle = 14; }
      else if (angle < -14) { angle = -14; }
      if (this.data.angle !== angle) {
        this.setData({
          angle: angle
        });
      }
    });
  },
  //获取头像
  onConfirm(e) { // 点击允许
    let dialogComponent = this.selectComponent('.wxc-dialog');
    dialogComponent && dialogComponent.hide();
    let userInfo = JSON.parse(e.detail.detail.rawData)
    if (!userInfo) {
      return;
    }
    this.setData({
      userInfo: userInfo
    })
    wx.setStorageSync('userInfo', userInfo)
  },
  onCancel() { // 点击拒绝
    let dialogComponent = this.selectComponent('.wxc-dialog');
    dialogComponent && dialogComponent.hide(); 
    var login_one = false;
  },
  onLoad: function () {
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
  }, getUserInfo: function(e) {
    console.log(e),
      wx.switchTab({
        url: '../index/index'
      }),
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
    var nickName = e.detail.userInfo.nickName //用户名
    var avatarUrl = e.detail.userInfo.avatarUrl //头像链接
    var gender = e.detail.userInfo.gender //性别 0：未知、1：男、2：女
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    console.log(app.globalData.userInfo)
    wx.setStorageSync('UIF', app.globalData.userInfo)

    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    }),
      wx.login({
      
        success: function (res) {
          var code = res.code;
          console.log(res);
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
                console.log(avatarUrl);
                console.log(res.data);
                wx.setStorageSync('openId', res.data)
                // 登录成功
                if (res.statusCode === 200) {
                  wx.setStorageSync('myimages', avatarUrl)
                 
                  
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
 
  // getUserInfo: function (e) {
  //   console.log(e),
  //     wx.switchTab({
  //     url: '../index/index'
  //     }),
  //     app.globalData.userInfo = e.detail.userInfo
  //   this.setData({
  //     userInfo: e.detail.userInfo,
  //     hasUserInfo: true
  //   })
    
  // }
});