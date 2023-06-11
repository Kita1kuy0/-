const app = getApp();
const s = new app.Shuju();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[
      {
        icon: 'friendaddfill',
        color: 'blue',
        badge: 0,
        name: '我创建的',
        url:'../wode/chuangjian'
      },
      {
        icon: 'profilefill',
        color: 'blue',
        badge: 0,
        name: '我参与的',
        url:'../wode/canyu'
      },
    ],
  },

  _Tz:function(e){
    wx.navigateTo({
      url: e.currentTarget.dataset.for,
    })
  },

  _Kefu:function(){
    wx.navigateTo({
      url: '../kefu/chat',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  //获取和显示用户信息
  onLoad: function (options) {
    s.si();
    s.g('c/user_detail',{
      s:(d)=>{
        if(d.code ==200){
          let info = d.data;
          this.setData({
            wxname:info.wxname,
            wxhead:info.wxhead
          })
        }
      }
    })
  },

  _Shuoming:function(){
    wx.navigateTo({
      url: '../shuoming/shuoming',
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

  }
})