//存储默认头像的URL
const defaultAvatarUrl = 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0';
const app = getApp();
const s = new app.Shuju();

Page({
  data: {
    avatarUrl: defaultAvatarUrl,
  },
  //在用户选择头像后更新页面的数据
  onChooseAvatar(e) {
    const {
      avatarUrl//用户选择的头像的URL
    } = e.detail;  //选择头像的详细信息
    //更新页面的数据
    this.setData({
      avatarUrl
    })
  },

  //上传文件
  _UpPic: function (file) {
    console.log(file)//打印文件信息
    return new Promise((succ, err) => {
      //上传文件到服务器
      wx.uploadFile({
        url: app.upfilephp,//上传文件的URL
        filePath: file,//上传的文件路径
        name: 'file',//上传文件的名称
        //上传文件的附加数据
        formData: {
          'method': 'upfile'
        },
        //将上传文件的URL存储在data中，并将其传递给回调函数
        success(res) {
          const data = JSON.parse(res.data);
          succ(app.baseimg + data.data);
        },
        //上传文件完成后隐藏加载提示框
        complete: function () {
          wx.hideLoading({
            success: (res) => {},
          })
        }
      })
    })
  },

  //提交表单并进行用户登录操作
  _Queding: function (e) {
    console.log(e);//打印表单提交的详细信息
    let wxname = e.detail.value.wxname;//获取用户填写的昵称
    let wxhead = this.data.avatarUrl;//获取用户选择的头像的URL
    //判断用户是否填写了昵称和选择了头像
    if (wxname == '' || wxhead == defaultAvatarUrl) {
      app.te('请上传头像和昵称');
    } else {
      //将用户的昵称和头像的URL存储在本地缓存中
      wx.setStorageSync('wxname', wxname);
      wx.setStorageSync('wxhead', wxhead);
      //上传头像并在上传成功后执行下一步操作
      this._UpPic(wxhead).then((d) => {
        //将用户的头像、昵称和openid存储在全局变量中
        s.se('wxhead', d);
        s.se('wxname', wxname);
        s.se('wxid', wx.getStorageSync('wxid'));
        //发送请求到后台服务器进行用户登录操作
        s.g('c/user_wxlogin', {
          s: function (data) {
            if (data.code == 200) {
              //在用户登录成功后弹出提示框并返回上一页
              //app.ts表示调用全局函数ts
              app.ts('登录成功', function () {
                //将用户的id存储在本地缓存中
                //id'表示数据的名称，data.data.id表示数据的值
                wx.setStorageSync('id', data.data.id);
                wx.navigateBack({
                  delta: 2,
                })
              })
            } else {//在用户登录失败时弹出提示框
              app.te('登录失败');
            }
          }
        })
      })
    }
  }
})