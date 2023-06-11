// miniprogram/pages/wenjuan/danxuan.js
const app = getApp();
const s = new app.Shuju();
var wid = 0;
var type = 'p/addtimudan';
var id = 0;
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
      D:''
    }
  },

  //处理表单输入事件
  _Form:function(e){
    let info = this.data.info;//存储页面的数据
    //"e.target.dataset.name"获取当前输入框的名称，并将其作为属性名，从"info"对象中获取相应的属性值
    //"e.detail.value"获取当前输入框的值，并将其赋值给相应的属性
    info[e.target.dataset.name] = e.detail.value;
    this.setData({//更新页面的数据
      info:info
    })
 },

 //保存题目的数据
 _Baocun:function(){
   let info = this.data.info;//存储页面的数据
   if(app.check(info)){//检查页面的数据是否合法
     s.sj(info);//将数据存储到服务器中
     s.se('wid',wid);//将页面的ID和题目的ID存储到本地缓存中
     s.se('id',id);
     s.sb('timu');//设置当前请求的数据表名
     s.g(type,{//向服务器发送请求，保存题目的数据
       s:function(data){
         if(data.code == 200){
           app.ts('保存成功',function(){
             wx.navigateBack({
               delta: 0,//确定后返回上一页
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
    wid = options.wid || 1;//获取页面的ID参数
    console.log(wid)
    let that = this;//当前页面的上下文
    if(options.type && options.type =='c'){//页面的参数中包含"type"属性，并且属性值为"c"，修改题目的页面
      type = 'c/info_xiugai';//存储请求的URL地址
      id = options.id;//存储题目的ID
      s.se('id',id);//将题目的ID存储到本地缓存中
      s.sb('timu');//设置当前请求的数据表名
      s.g('c/common_detail',{//向服务器发送请求，获取题目的数据
        s:function(data){
          if(data.code == 200){
            //从服务器返回的数据对象中获取相应的属性值，并将其赋值给"info"对象的相应属性
            let info = data.data;//存储页面的数据
            that.setData({//更新页面的数据
              info:{
                //"info"属性用于设置页面的数据，"biaoti"、"A"、"B"、"C"和"D"属性用于设置相应的属性值
                biaoti:info.biaoti,
                A:info.A,
                B:info.B,
                C:info.C,
                D:info.D
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