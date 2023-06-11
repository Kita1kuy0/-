const app = getApp();
const s = new app.Shuju();
var uid = app.uid();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[],
    img:''
  },

  _Tianxie:function(e){
    wx.navigateTo({
      url: '../toupiao/tianxie?id='+e.target.dataset.for,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  //在页面加载时向服务器发送请求，将服务器返回的数据渲染到页面中
  onLoad: function (options) {
    uid = app.uid();//获取用户的ID
    let that = this;//将当前页面的上下文存储到"that"变量
    let day = app.Day().get();//获取当前日期
    s.si('uid');//将用户的ID存储到本地缓存
    //获取用户参与的问卷列表
    s.g('p/mycanyu',{
      s:function(data){
        if(data.code == 200){
          //更新页面的数据
          that.setData({
            //使用"map"方法遍历"data"数组中的每个元素，并将其转换为一个包含"sta"属性的对象
            list:data.data.map(function(obj){
              if(day>obj.end || day<obj.start){
                obj.sta = false;
              }else{
                obj.sta = true;
              }
              return obj;
            })
          })
        }
      }
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