const app = getApp();
const s = new app.Shuju();
var uid = app.uid();
var wid = 0;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    info:{},
    ti:[],
    dati:[]
  },

  //用户选择单选题选项时更新页面的数据
  //在用户选择单选题选项时更新页面的数据，并将用户选择的答案存储到相应题目的"huida"属性中
  _Danxuan:function(e){
    let idx = e.target.dataset.idx;
    let daan = e.target.dataset.for;
    let dati = this.data.dati;//获取页面的数据
    console.log(idx,daan)
    dati[idx].huida = daan;
    this.setData({//更新页面的数据
      dati:dati
    })
  },

  //在用户选择多选题选项时更新页面的数据，并将用户选择的答案存储到相应题目的"huida"属性中
  _Duoxuan:function(e){
    let idx = e.target.dataset.idx;
    let daan = e.target.dataset.for;
    let dati = this.data.dati;
    //将相应题目的"huida"属性值按照分号分隔为一个数组，并将其存储在"nowhd"变量
    let nowhd = dati[idx].huida.split(';');
    //获取相应题目的"choose"属性值，并将其存储在"choose"变量中
    let choose = dati[idx].choose;
    console.log(choose)
    if(nowhd[0]=='')nowhd = [];
    ////查看选项是否选择，选择则不可再选中
    if(nowhd.indexOf(daan)>=0){
      let n = nowhd.indexOf(daan);
      choose[daan] = false;
      nowhd.splice(n,1);
    }else{
      choose[daan] = true;
      nowhd.push(daan);
    }
    //将"nowhd"数组中的元素按照分号拼接为一个字符串，并将其存储到相应题目的"huida"属性中
    dati[idx].huida = nowhd.join(';');
    //将"choose"变量的值存储到相应题目的"choose"属性中
    dati[idx].choose = choose;
    console.log(dati[idx])
    //更新页面的数据
    this.setData({
      dati:dati
    })
  },


//在用户提交问卷时向服务器发送请求，将用户填写的答案存储到数据库
  _Tijiao:function(){
     let dati = this.data.dati;//获取页面的数据
     let value = [];//存储用户填写的答案
     for(let i=0;i<dati.length;i++){
       let obj = dati[i];
       if(obj.huida == ''){
         app.te('请填写所有问题');
         return;//结束函数
       }
       //题目提交的时候，是多组数据一起提交
       value.push(` ('${uid}','${obj.tid}','${obj.wid}','${obj.huida}') `);
     }
     s.si('uid');//将用户的ID存储到本地缓存
     s.se('wid',wid);//设置当前请求的数据表名
     s.se('value',value.join(' , '));
     s.g('p/tianxie',{
       s:function(data){
         if(data.code == 200){
           app.ts('填写成功',function(){
             wx.navigateBack({
               delta: 0,
             })
           });
         }else{
           app.te('填写失败');
         }
       }
     })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  //在页面加载时向服务器发送请求，将服务器返回的数据渲染到页面中
  onLoad: function (options) {
    uid = app.uid();//获取用户的ID
    wid = options.id || 1;//获取页面跳转时传递的参数"id"
    let that = this;//将当前页面的上下文存储到"that"变量
    s.se('wid',wid);//将"wid"变量的值存储到本地缓存中
    s.g('p/tpdetail',{
      s:function(data){
        if(data.code == 200){
          //"info"属性用于设置问卷的详细信息，"ti"属性用于设置题目列表，"dati"属性用于设置用户填写的答案
          that.setData({
            info:data.info,
            ti:data.ti,
            //使用"map"方法遍历"ti"数组中的每个元素，并将其转换为一个包含"huida"、"tid"、"wid"、"uid"和"choose"属性的对象
            dati:data.ti.map(function(obj,idx){
               let j = {
                 tid:obj.id,
                 wid:obj.wid,
                 huida:'',
                 uid:uid,
                 choose:{

                 }
               }
               return j;
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
    let that = this;
    //"return"语句返回一个对象，用于设置分享的相关信息
		return {
			title: '投票分享' + that.data.info.biaoti,//将问卷的标题拼接到分享标题
			path: '/pages/toupiao/tianxie?id=' + that.data.info.id,//将问卷的ID拼接到分享路径
			imageUrl: '../images/toupiao.png'//设置分享的图片

		}
  },
  

})