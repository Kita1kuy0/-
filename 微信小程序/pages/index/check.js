// pages/index/check.js
const app = getApp();
const s = new app.Shuju();
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  //options是一个对象，用于获取页面的参数
  //获取到其他页面传递过来的参数，在页面加载时进行相应的操作
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
    //获取本地缓存中的id值，判断用户是否已经登录
    let id = wx.getStorageSync('id');
    if (!id || id == "") {//跳转到登录页面
      wx.navigateTo({//
        url: 'index',
      })
    } else {//跳转到首页
      wx.reLaunch({
        url: '../home/home',
      })
    }
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

  }
})