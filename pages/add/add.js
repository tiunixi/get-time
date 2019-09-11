//获取应用实例  
var util = require('../../utils/util.js');
var adds = {};//图片上传
var true_time;
var app = getApp()
wx.getStorageSync('openId')
var pics
var form_pic = true
Page({
  data: {
    images: [],
    img1:[],
    imageWidth: getApp().screenWidth / 4 - 10,
    picture1: 'pictureImg',
    //轮播
    imgUrls: [
      {
        // link: '../index/index',
        url: '../../images/5.png'
      }, {

        url: '../../images/6.png'
      }, {

        url: '../../images/7.png'
      }
    ],
    img_arr: [],
    formdata: '',

    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    userInfo: {},
    tempFilePaths: []
  },
  //时间选择器
  bindTimeChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      time: e.detail.value
    })
  },
  //日期
  bindDateChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
    })
  },
  upimg: function () {
    wx.showToast({
      title: '最多上传1张图片',
      icon: 'loading',
      duration: 1000,
    })
    var that = this;
    if (this.data.img_arr.length < 1) {
      wx.chooseImage({
        sizeType: ['original', 'compressed'],
        success: function (res) {

          that.setData({
            img_arr: that.data.img_arr.concat(res.tempFilePaths),
            img: res.tempFilePaths

          })
          console.log("a=" + res.tempFilePaths)
          console.log("aaa=" + that.data.img)


          that.upload();
        }
      })
    } else {
      wx.showToast({
        title: '最多上传1张图片',
        icon: 'loading',
        duration: 1000,

      });
    }
  },
  /**预览图片 */
  previewImage: function (e) {
    var that = this;
    //获取当前图片的下标
    var current = e.target.dataset.src;
    console.log(e)

    wx.previewImage({
      current: current, // 当前显示图片的http链接
      urls: this.data.img_arr,// 需要预览的图片http链接列表
      duration: 3000
    })
  },
  /**删除图片 */
  deleteImage: function (e) {
    var that = this; 
    var index = e.currentTarget.dataset.index;
    var img_arr = that.data.img_arr;
    console.log(img_arr)
    img_arr.splice(index, 1);
    console.log(img_arr)
    that.setData({
      images: img_arr,
      form_pic: true
    });
  },
  back: function (e) {
    var that = this;
    that.setData({
      form_pic: false
    });
  },
  // 上传
  upload: function () {
    var that = this
    var form_pic = true
    var qq =this.data.picture1
    this.back()
    console.log(qq)
    for (var i = 0; i < this.data.img_arr.length; i++) {
      wx.uploadFile({
        formData:adds,
        url: 'https://settime.kermi.xyz/do/active/img.php',
        filePath: that.data.img_arr[i],
        name: 'pictureImg',
        
        method:'post',
        header: {// 设置请求的 header  
          'content-type': 'application/x-www-form-urlencoded',
          // 'content-type': 'application/json',
          "Cookie": "sessionId=" + wx.getStorageSync("openId")
        },
        success: function (res) {
          console.log(res)
          pics=res.data
          if (res) {
            wx.showToast({
              title: '图片已获取',
              duration: 3000
            });
          }
        }
      })
    }
    this.setData({
      formdata: ''
    })
  },
  onLoad: function () {
    // 调用函数时，传入new Date()参数，返回值是日期和时间
  //   console.log(options)
    var time = util.formatTime(new Date());
    // 再通过setData更改Page()里面的data，动态更新页面的数据
    this.setData({
      true_time: time
    });
  },
  formSubmit: function (e) {
    var get = wx.getStorageSync('openId')
    // console.log(get)
    if (get!='')
    {
      var that = this;
      console.log(e)
      var adds = e.detail.value;
      var active_name = e.detail.value.active_name
      var active_place_main = e.detail.value.active_place_main;
      var time1 = e.detail.value.date_time;
      var time2 = e.detail.value.main_time;
      var comeout_time = time1 + '-' + time2;
      var main_info = e.detail.value.main_info;

      this.upload()

      if (active_name == '' || time1 == '' || time2 == '' || active_place_main == '') {
        wx.showToast({
          title: '请填写完内容',
          icon: 'loading',  //图标，支持"success"、"loading"  
          duration: 300
        });
      }
      else {
        var images1 = that.data.img
        console.log(images1)
        wx.request({
          url: 'https://settime.kermi.xyz/do/active/create.php',

          data: {
            adds,
            openid: wx.getStorageSync('openId'),
            active_name: active_name,
            active_place_main: active_place_main,
            start_time: comeout_time,
            create_time: comeout_time,
            main_info: main_info,
            pictureSrc: pics
          },

          method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT  
          header: {// 设置请求的 header  
            'content-type': 'application/x-www-form-urlencoded',
            // 'content-type': 'application/json',
            "Cookie": "sessionId=" + wx.getStorageSync("sessionId")
          },
          success: function (res) {
            // console.log(res)
            // console.log(res.data)
            // wx.setStorageSync('Id', res.data)
            // console.log(Id)
            wx.switchTab({
              url: '../first/first'
            }),

              console.log(res)
            if (res) {
              that.setData({
                form_info: '',
                form_pic: true,
                time: '',
                date: ''

              })
              wx.showToast({
                title: '已发布！',
                duration: 3000
              });

            }
          },
          fail: function (res) {
            console.log('cuowu' + ':' + res)
          }
        })
      }
    }else{
      wx.showToast({
        title: '请登录',
        icon: 'loading',
        duration: 10000
      });
    }
    
  },


  


  /**确定按钮 */
  onloadTap: function () {
    var that = this;
    var id = that.data.id;
    that.data.url = that.data.arr;
    wx.setStorageSync('url' + "-" + id, that.data.url)
    wx.navigateBack({
      delta: 1, // 回退前 delta(默认为1) 页面
    })
  },//分享
  onShareAppMessage: function () {
    return {
      title: '约个时间出去玩',
      desc: '我发现了一个超好玩的小程序',
      // path: '/page/user?id=123'
    }
  }



})  