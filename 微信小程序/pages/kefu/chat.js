// pages/wode/kefu.js
const app = getApp();
const s = new app.Shuju();
var finalid = 0; //最新一条数据的id
var timer = null;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nr: '',
    list: [],
    uid: ~~app.uid(),
    baseimg: app.baseimg,
    top: 0
  },

  //输入框事件处理函数，用于将输入框中的内容绑定到页面的数据
  _Form: function (e) {
    this.setData({
      nr: e.detail.value//将输入框中的内容绑定到页面的nr变量中
    })
  },

  //发送文字
  _Fasong: function () {
    let nr = this.data.nr;
    if (nr != '') {
      s.se('who', 0);
      s.si('uid');
      s.se('img', null);
      s.se('neirong', nr);
      s.sb('kefu');
      s.g('c/info_charu', {
        s: (d) => {
          if (d.code == 200) {
            //发送成功
            ////当前页面的数据中的“nr”设置为空
            this.setData({
              nr: ''
            })
            if (this.data.list.length == 0) {
              this._Getall();
            } else {
              this._Getnew().then(() => {
                this.setData({
                  top: this.data.list.length * 500
                })
              })
            }
          }
        }
      })
    }
  },

  //获取所有的聊天记录
  _Getall: function () {
    return new Promise((succ, err) => {
      s.si("uid");
      s.g('c/kefu_getlist', {
        s: (d) => {
          if (d.code == 200) {
            //如果"info"数组的长度大于0，将"finalid"变量设置为"info"数组中最后一个元素的"id"属性。然后调用"setData"方法，将"list"属性设置为"info"数组，将"top"属性设置为"info"数组长度乘以500
            let info = d.chat;
            if (info.length > 0) {
              finalid = info[info.length - 1].id;
            }
            this.setData({
              list: info,
              top: info.length * 500
            })
          }
          succ();
        }
      })
    })
  },

  //获取最新的聊天记录
  _Getnew: function () {
    return new Promise((succ, err) => {
      s.si('uid');
      s.se('skip', finalid);
      s.g('c/kefu_skip', {
        s: (d) => {
          if (d.code == 200) {
            let info = d.data;
            if (info.length > 0) {
              finalid = info[info.length - 1].id;
            }
            let nowlist = this.data.list;
            let newlist = nowlist.concat(info);//"concat"方法是JavaScript中的一个数组方法，它可以将多个数组合并为一个新的数组
            this.setData({
              list: newlist
            })
            succ();
          }
        }
      })
    })
  },

//上传图片，并将上传成功后的图片信息发送给服务器
  _Tupian: function () {
    let that = this;
    wx.chooseMedia({
      count: 1,
      mediaType: ['image'],
      sizeType: ['compressed'], // 压缩过的
    }).then(function (r) {
      console.log(r);
      //显示一个加载提示框
      wx.showLoading({
        title: '上传中',
      })
      let file = r.tempFiles[0].tempFilePath;//获取图片的临时文件路径，并将其赋值给"file"变量
      console.log(file)
      //将图片上传到服务器
      wx.uploadFile({
        url: app.upfilephp,
        filePath: file,
        name: 'file',
        formData: {
          'method': 'upfile'
        },
        success(res) {
          let data = JSON.parse(res.data);
          let img = data.data;
          s.se('who', 0);
          s.si('uid');
          s.se('img', img);
          s.se('neirong', null);
          s.sb('kefu');
          s.g('c/info_charu', {
            s: (d) => {
              if (d.code == 200) {
                //发送成功
                that.setData({
                  nr: ''
                })
                if (that.data.list.length == 0) {
                  that._Getall();
                } else {
                  that._Getnew().then(() => {
                    that.setData({
                      top: that.data.list.length * 500
                    })
                  })
                }
              }
            }
          })
        },
        //隐藏加载提示框
        complete: function () {
          wx.hideLoading({
            success: (res) => {},
          })
        }
      })
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      uid: ~~app.uid()
    })
    this._Getall().then(() => {
      timer = setInterval(() => {
        this._Getnew();
      }, 2000);
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
  onHide: function () {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    clearInterval(timer);
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