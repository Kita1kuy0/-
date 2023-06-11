// pages/home/sousuo.js
const app = getApp();
const s   = new app.Shuju();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[],
    key:''
  },

  _Tz: function (e) {
    wx.navigateTo({
      url: e.currentTarget.dataset.for,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    let key = options.key || '1';
    //将key属性的值设置为变量key的值
    this.setData({
      key
    })
    //使用s.se方法将key参数保存到本地存储中
    s.se('key',key);
    //使用s.g方法发起ajax请求，请求的接口地址为"p/getsousuo"，并传递了一个回调函数作为参数
    s.g('p/getsousuo',{
      s:(d)=>{
        if(d.code == 200){
          this.setData({
            //将页面数据对象的list属性设置为API返回的数据
            list:d.data
          })
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})