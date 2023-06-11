//修改用
const app = getApp()
const s = new app.Shuju();
var uid = app.uid();
var id = 0;

Page({
  data: {
    info:{
      start:app.Day().get(),
      end:app.Day().get(1),
      biaoti:'',
      shuoming:''
    },
    start:app.Day().get(),  // 初始化日期开始日期
    end:app.Day().get(30),   // 初始化日期，结束日期
  },

  _Form:function(e){
     let info = this.data.info;
     info[e.target.dataset.name] = e.detail.value;
     // 检查日期，就是开始日期不能大于等于结束日期
     let start = info.start;
     let end = info.end;
     if(start >= end){
       app.te('日期错误');
       return;
     }
     this.setData({
       info:info
     })
  },

  onLoad: function (options) {
    uid = app.uid();//获取当前用户的ID
    id = options.id;//获取页面的ID参数
    let that = this;//存储当前页面的上下文
    s.se('id',id);//将页面的ID存储到本地缓存中
    s.sb('toupiao');//置当前请求的数据表名
    s.g('c/common_detail',{
      s:function(data){
        if(data.code == 200){
          //从服务器返回的数据对象中获取相应的属性值，并将其赋值给"info"对象的相应属性
          let info = data.data;//存储页面的数据
          that.setData({//更新页面的数据
            info:{
              start:info.start,
              end:info.end,
              biaoti:info.biaoti,
              shuoming:info.shuoming
            }
          })
        }
      }
    })
  },

  //用户点击确定按钮时向服务器发送请求修改数据
  _Queding:function(){
    let info = this.data.info;//获取页面的数据
    if(app.check(info)){
      s.sj(info);//将数据序列化为JSON字符串
      s.se('id',id);//将页面的ID存储到本地缓存中
      s.sb('toupiao');//设置当前请求的数据表名
      s.g('c/info_xiugai',{
        s:function(data){
          if(data.code == 200){
            wx.navigateTo({
              url: 'step2?id='+id,
            })
          }
        }
      })
    }
  },

  backhome(e) {
    wx.navigateBack({
      delta: 0,
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