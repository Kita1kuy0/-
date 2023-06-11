const app = getApp();
const s = new app.Shuju();
var uid = app.uid();
var wid = 0;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    modal:null,
    list:[],
    type:['单选题','多选题']
  },

  _Tz:function(e){
    this.setData({
      modal:null//将"modal"变量的值设置为null，关闭弹窗
    })
    wx.navigateTo({
      //"e.target.dataset.for"用于获取选项的名称，"wid"用于存储页面的ID
      url: e.target.dataset.for+'?wid='+wid,
    })
  },

  //处理添加题目按钮的点击事件
  _Show:function(){
    //将"modal"变量的值设置为"show"，以显示弹窗
    this.setData({
      modal:'show'
    })
  },

  //处理保存发布按钮的点击事件
  _Save:function(){
    app.ts('保存成功',function(){
      //delta"属性用于指定返回的页面数，这里设置为2，表示返回到上上一页
      wx.navigateBack({
        delta: 2,
      })
    })
  },

  //自动隐藏弹窗
  hideModal:function(){
    this.setData({
      modal:null
    })
  },

  _Yidong:function(e){
    let list = this.data.list;//储题目列表的数据
    let idx = e.currentTarget.dataset.for;//获取当前题目的索引值
    let aid = 0,bid = 0,asx = 0,bsx = 0;
    if(idx==0){
      //下移，下移就是把我和下一个做调换
      //只有第一个能下移
      let a = list[0];
      let b = list[1];
      let c = a;
      a = b;
      b = c;
      list[0] = a;
      list[1] = b;
      aid = list[0].id;
      asx = 1;//顺序
      bid = list[1].id;
      bsx = 2;
      console.log(a,b)
      this.setData({
        list:list
      })
    }else{
      // 上移
      let a = list[idx];
      let b = list[idx-1];
      console.log(a,b)
      let c = a;
      a = b;
      b = c;
      console.log(a,b)
      // 上移就是把当前的和之前一个调换顺序
      list[idx - 1] = b;
      list[idx] = a;
      //存储移动后的题目ID和位置信息
      aid = list[idx - 1].id;
      asx = idx;
      bid = list[idx].id;
      bsx = idx+1;
      this.setData({
        list:list
      })
    }
    console.log(aid,asx,bid,bsx);
    s.se('aid',aid);
    s.se('asx',asx);
    s.se('bid',bid);
    s.se('bsx',bsx);//移动后的题目ID和位置信息存储到本地缓存中
    s.g('p/paixv',{
      s:function(data){//向服务器发送请求，更新题目的位置信息
        if(data.code == 200){

        }
      }
    })
  },

  _Shanchu:function(e){
    // 删除的时候，获取的是这个题在题目里的下标
    let idx = e.currentTarget.dataset.for;//存储当前题目在题目列表中的索引值
    let list = this.data.list;//存储题目列表的数据
    let id = list[idx].id;  // 通过下标，获取这个题目的id
    let that = this;
    app.tm('是否确认删除？',function(){//显示一个消息提示框
      s.se('id',id);//将题目的ID和页面的ID存储到本地缓存中
      s.se('wid',wid);
      s.g('p/deltimu',{
        s:function(data){
          if(data.code == 200){
              that._Getlist();//重新获取题目列表的数据
          }
        }
      })
    })
  },

  //修改的时候就是找到题目的类型，然后跳转到对应的页面
  _Xiugai:function(e){
    let list = this.data.list;//存储题目列表的数据
    let idx = e.currentTarget.dataset.for;//获取当前题目的索引值
    let info = list[idx];
    let id = info.id,type = info.type;//获取当前题目的ID和类型信息
    // 修改单选题
    if(type == 0){
      wx.navigateTo({
        //传递页面的ID和题目的ID
        url: 'danxuan?wid='+wid+"&type=c&id="+id,
      })
    }

    // 修改多选题
    if(type == 1){
      wx.navigateTo({
        url: 'duoxuan?wid='+wid+"&type=c&id="+id,
      })
    }

  },

  //获取题目列表的数据
  _Getlist:function(){
    let that = this;//存储当前页面的上下文
    s.se('wid',wid);//将页面的ID存储到本地缓存中
    s.sb('timu');//设置当前请求的数据表名
    s.se('tj','wid');//设置请求参数，其中"wid"表示页面的ID，"tj"表示查询条件
    s.g('c/common_list',{//向服务器发送请求，获取题目列表的数据
      s:function(data){
        if(data.code == 200){
          // 根据shunxv这个字段进行升序排序
          let list = data.data.sort(function(a,b){
            return a.shunxv - b.shunxv;
          })
          //更新页面的数据
          that.setData({
            list:list
          })
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    uid = app.uid();//获取当前用户的ID
    wid = options.id || 1;//获取页面的ID参数
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