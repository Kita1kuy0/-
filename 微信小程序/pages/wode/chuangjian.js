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

  _Edit:function(e){
    wx.navigateTo({
      url: '../toupiao/edit?id='+e.target.dataset.for,
    })
  },

  _Res:function(e){
    wx.navigateTo({
      url: '../toupiao/res?id='+e.target.dataset.for,
    })
  },

  _Del:function(e){
    let that = this;
    app.tm('是否确认删除此问卷？',function(){
      s.se('id',e.target.dataset.for);
      s.sb('toupiao');
      s.g('c/common_delete',{
        s:function(data){
          if(data.code == 200){
            app.ts('删除成功');
            that._Getlist();
          }
        }
      })
    })
  },

  _Zanting:function(e){
    app.tm('是否确认暂停？',()=>{
      s.sb('toupiao');
      s.se('id',e.currentTarget.dataset.for);
      s.se('status',3);
      s.g('c/info_xiugai',{
        s:(d)=>{
          if(d.code == 200){
            app.ts('已暂停');
            this._Getlist();
          }
        }
      })
    })
  },

  _Jixv:function(e){
    app.tm('是否确认继续？',()=>{
      s.sb('toupiao');
      s.se('id',e.currentTarget.dataset.for);
      s.se('status',1);
      s.g('c/info_xiugai',{
        s:(d)=>{
          if(d.code == 200){
            app.ts('已继续');
            this._Getlist();
          }
        }
      })
    })
  },

  _Jieshu:function(e){
    app.tm('是否确认结束？',()=>{
      s.sb('toupiao');
      s.se('id',e.currentTarget.dataset.for);
      s.se('status',4);
      s.g('c/info_xiugai',{
        s:(d)=>{
          if(d.code == 200){
            app.ts('已结束');
            this._Getlist();
          }
        }
      })
    })
  },

  _Getlist:function(){
    let that = this;
    let day = app.Day().get();
    s.si('uid');
    s.g('p/mychuangjian',{
      s:function(data){
        if(data.code == 200){
          that.setData({
            list:data.data.map(function(obj){
              if(day>obj.end || day<obj.start || obj.status == 4){
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
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    uid = app.uid();
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
    this._Getlist();
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