// pages/toupiao/res.js
//结果查看
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    url:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    let id = options.id || 2;//获取页面的ID参数
    this.setData({
      url:app.baseimg + "h5/baobiao.html?id=" + id + "&s=" + app.Suiji(1000,9999)//"app.baseimg"获取小程序的基础图片地址，并使用"app.Suiji"方法生成一个随机数。然后，使用"setData"方法更新页面的数据。
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