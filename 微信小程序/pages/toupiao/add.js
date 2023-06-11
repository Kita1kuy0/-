const app = getApp()
const s = new app.Shuju();
var uid = app.uid();
var fid = 0;
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
     //使用"e.target.dataset.name"获取事件处理函数中指定的参数名，使用"e.detail.value"获取用户输入的值，并将其存储到"info"变量中
     info[e.target.dataset.name] = e.detail.value;
     // 检查日期，就是开始日期不能大于等于结束日期
     let start = info.start;
     let end = info.end;
     if(start >= end){
       app.te('日期错误');
       return;
     }
     this.setData({
       info:info//在页面中展示最新的数据
     })
  },

  onLoad: function (options) {
    uid = app.uid();//获取当前用户的ID，并将其存储到"uid"变量中
    fid = options.fid || 1;//获取从其他页面传递过来的参数.如果"fid"参数存在，则将其存储到"fid"变量中，否则将"fid"变量的值设置为1
  },

  // 这里就是先创建一个问卷，这个时候是没有题目的
  _Queding:function(){
    let info = this.data.info;//存储表单中的数据
    if(app.check(info)){//检查表单中的数据是否合法
      s.sj(info);
      s.si('uid');
      s.sb('toupiao');
      s.se('fid',fid);
      s.g('c/info_charu',{
        s:(d)=>{
          if(d.code == 200){
            let id = d.data;
            app.ts('创建成功',()=>{
              //跳转到"step2"页面，并将创建的项目ID作为参数传递给"step2"页面
              wx.navigateTo({
                url: 'step2?id='+id,
              })
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