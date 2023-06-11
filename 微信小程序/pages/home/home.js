// miniprogram/pages/home/home.js
const app = getApp();
const s = new app.Shuju();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    TabCur: 0,
    scrollLeft: 0,
    choose: [],
    list: [],
    img: '',
    key: ""
  },

  //事件处理函数，用于处理搜索栏输入框的输入事件。该函数会在用户输入内容时被触发，然后将输入框中的内容更新到小程序的数据中心中，以便后续使用。
  //使用了setData方法更新小程序的数据中心，将输入框中内容更新到key变量中。setData方法是小程序框架提供的，用于更新小程序的数据中心，触发小程序的重新渲染。
  //e是一个事件对象，包含了输入框的相关信息，我们使用了e.detail.value来获取输入框的值，然后将其更新到key变量中。e.detail.value是一个字符串类型的变量。
  _Form: function (e) {
    this.setData({
      key: e.detail.value
    })
  },

  //程序的事件处理函数，处理搜索栏的搜索事件。该函数会在用户点击搜索按钮时触发，获取输入框中的内容，并将其作为参数传递给另一个页面，以便进行搜索
  _Sousuo: function () {
    //使用let关键字定义一个key变量，存储输入框中的内容
    let key = this.data.key;
    if (key != "") {
      //使用wx.navigateTo方法跳转到sousuo页面，并将输入框中的内容作为参数传递。使用了url参数来指定跳转的页面路径，使用key参数传递输入框中的内容
      wx.navigateTo({
        url: 'sousuo?key=' + key,
      })
      //使用setData方法将输入框中清空，以便下一次使用
      this.setData({
        key: ''
      })
    }
  },

  tabSelect(e) {
    this.setData({
      //获取当前点击列表项的data-id属性值，即该列表项的索引值
      //实现选中状态
      TabCur: e.currentTarget.dataset.id,
      //将scrollLeft设置为当前点击的列表项的索引值乘以60，来实现滚动视图的滚动效果
      scrollLeft: (e.currentTarget.dataset.id - 1) * 60
    })
    //下方定义，获取列表数据，并更新到界面
    this._Gettplist();
  },


  _Tz: function (e) {
    //调用微信小程序的navigateTo函数，跳转到新页面
    wx.navigateTo({
      //指定了跳转页面的URL地址
      //e.currentTarget属性，表示当前触发事件的组件。
      //dataset属性，表示组件上的自定义数据集合。
      //for属性，表示自定义数据集合中的一个属性，用于存储跳转页面的URL地址
      url: e.currentTarget.dataset.for,
    })
  },

  //获取分类列表数据
  _Getfenlei: function () {
    //返回一个Promise对象，用于异步处理分类列表数据。
    //succ和err分别表示异步操作成功和失败时的回调函数
    return new Promise((succ, err) => {
      //调用了s.sb函数，向服务器发送请求，获取分类列表数据。fenlei表示请求的接口名称。
      s.sb('fenlei');
      //调用了s.g函数，用于向服务器发送GET请求，获取分类列表数据。c/common_list_status表示请求URL地址
      s.g('c/common_list_status', {
        //指定了请求成功的回调函数，该函数接受参数d，表示服务器返回的数据
        s: (d) => {
          if (d.code == 200) {
            //更新页面数据,choose表示页面中的分类列表数据，d.data表示服务器返回的分类列表数据
            this.setData({
              choose: d.data
            })
            //表示异步操作成功，Promise对象状态变为fulfilled
            succ();
          }
        }
      })
    })
  },

  //获取模板列表数据，并将数据更新到页面中
  _Gettplist: function () {
    //创建一个Promise对象的语法，用于处理异步操作
    //使用s.se方法，将选中列表项的id属性值存储到本地存储
    return new Promise((succ, err) => {
      s.se('fid', this.data.choose[this.data.TabCur].id);
      //使用s.g方法，发送GET请求，用于获取模板列表数据
      //'p/tplist'表示请求的接口地址，{...}表示请求的参数和回调函数
      //d是在发送GET请求后，服务器返回的数据对象
      s.g('p/tplist', {
        s: (d) => {
          //判断返回数据是否成功，如果成功，则将返回的数据中的data属性值设置为list变量的值，更新模板列表数据
          if (d.code == 200) {
            //将获取的模板列表数据更新到页面中
            this.setData({
              list: d.data
            })
            //处理Promise对象，表示异步操作成功
            succ();
          }
        }
      })
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  //页面加载时，先获取分类数据，再根据分类数据获取项目列表
  onLoad: function (options) {
    this._Getfenlei().then(() => {
      return this._Gettplist();
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
  //获取了当前选中的分类数量，如果数量大于0，则调用_Gettplist()函数来获取项目列表
  onShow: function () {
    let len = this.data.choose.length;
    if (len > 0) {
      this._Gettplist();
    }
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