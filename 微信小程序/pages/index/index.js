// index.js
// 获取应用实例
const app = getApp()
const s = new app.Shuju();
Page({
  data: {
    userInfo: {},//空对象，用于存储用户信息
    hasUserInfo: false,//布尔值，检查用户是否已经授权访问他们的开放数据
    //布尔值，用于检查当前微信版本是否支持使用<button>标签的open-type属性来获取用户信
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    canIUseGetUserProfile: false,//布尔值，用于检查当前微信版本是否支持使用wx.getUserProfile函数来获取用户信息
    //布尔值，用于检查当前微信版本是否支持使用<open-data>标签来获取用户头像和昵称的开放数据
    canIUseOpenData: wx.canIUse('open-data.type.userAvatarUrl') && wx.canIUse('open-data.type.userNickName') // 如需尝试获取用户信息可改为false
  },
  // 事件处理函数
  //用户点击视图时，跳转到logs页面
  bindViewTap() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad() {
    //获取openid
    this._openid(function (wxid) {
      console.log(wxid);
      wx.setStorageSync('wxid', wxid);//将用户的openid存储在本地缓存中
    });
  },

  _openid: function (call) {
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        var appid = 'wx5daaf9948210da42'; //填写微信小程序appid 
        var secret = 'fd48b591ed8693357a6efab5cab781aa'; //填写微信小程序secret 
        //调用request请求api转换登录凭证 
        //微信小程序的API，用于发送请求到后台服务器
        wx.request({
          //appid和secret是微信小程序的标识，grant_type是授权类型，js_code是用户的登录凭证code
          url: 'https://api.weixin.qq.com/sns/jscode2session?appid=' + appid + '&secret=' + secret + '&grant_type=authorization_code&js_code=' + res.code,
          //指定请求的数据类型为JSON
          header: {
            'content-type': 'application/json'
          },
          success: function (res) {
            const openid = res.data.openid;//存储从后台服务器返回的openid
            call(openid);//将openid传递给回调函数
            console.log(res)

          },
          fail: function (e) {
            console.log(e)
          }
        })
      }
    })
  },

  _Nextstep: function () {
    //这里做个检查，就是这个用户到底有没有登录过
    //如果请求成功，则将用户的id存储在本地缓存中并返回上一页；如果请求失败，则跳转到指定页面
    let wxid = wx.getStorageSync('wxid');//从本地缓存中获取用户的openid
    s.se('wxid', wxid);//将用户的openid存储在全局变量中
    s.sb('user');//检查用户是否已经登录
    s.se('tj', 'wxid');//将用户的openid存储在全局变量中
    s.g('c/common_detail', {//发送请求到后台服务器
      s: (d) => {
        if (d.code == 200) {
          wx.setStorageSync('id', d.data.id);//将用户的id存储在本地缓存中
          wx.navigateBack({//返回上一页
            delta: 0,
          })
        } else {
          wx.navigateTo({
            url: 'wxinfo',
          })
        }
      }
    })

  },



})