const app = getApp();
const s = new app.Shuju();
var wid = 0;
var id = 0;
var type = 'p/addtimuduo';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    info:{
      biaoti:'',
      A:'',
      B:'',
      C:'',
      D:'',
      E:'',
      F:'',
      G:''
    }
  },

  _Form:function(e){
    let info = this.data.info;
    info[e.target.dataset.name] = e.detail.value;
    this.setData({
      info:info
    })
 },

 _Baocun:function(){
   let info = this.data.info;
   if(app.check(info)){
     s.sj(info);
     s.se('wid',wid);
     s.se('id',id);
     s.sb('timu');
     s.g(type,{
       s:function(data){
         if(data.code == 200){
           app.ts('保存成功',function(){
             wx.navigateBack({
               delta: 0,
             })
           });
         }else{
           app.te('保存失败');
         }
       }
     })
   }
 },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wid = options.wid || 1;
    let that = this;
    if(options.type && options.type =='c'){
      id = options.id;
      type = 'c/info_xiugai';
      s.se('id',id);
      s.sb('timu');
      s.g('c/common_detail',{
        s:function(data){
          if(data.code == 200){
            let info = data.data;
            that.setData({
              info:{
                biaoti:info.biaoti,
                A:info.A,
                B:info.B,
                C:info.C,
                D:info.D,
                E:info.E,
                F:info.F,
                G:info.G
              }
            })
          }
        }
      })
    }
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