// app.js
//生命周期函数，在小程序初始化完成时被调用
App({
  onLaunch() {
    //展示本地存储能力
    //获取本地存储日志信息
    const logs = wx.getStorageSync('logs') || []
    //将时间戳插入到日志数组最前
    logs.unshift(Date.now())
    //将更新后的日志信息保存回本地存储
    wx.setStorageSync('logs', logs)

    // 登录；获取用户登陆凭证
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              //可以将 res 发送给后台解码出 unionId
              //将用户信息保存在全局变量globalData.userInfo中，以便其他页面使用
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回（获取用户信息的过程异步）
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },


  globalData: {
    ColorList: [{
        title: '嫣红',
        name: 'red',
        color: '#e54d42'
      },
      {
        title: '桔橙',
        name: 'orange',
        color: '#f37b1d'
      },
      {
        title: '明黄',
        name: 'yellow',
        color: '#fbbd08'
      },
      {
        title: '橄榄',
        name: 'olive',
        color: '#8dc63f'
      },
      {
        title: '森绿',
        name: 'green',
        color: '#39b54a'
      },
      {
        title: '天青',
        name: 'cyan',
        color: '#1cbbb4'
      },
      {
        title: '海蓝',
        name: 'blue',
        color: '#0081ff'
      },
      {
        title: '姹紫',
        name: 'purple',
        color: '#6739b6'
      },
      {
        title: '木槿',
        name: 'mauve',
        color: '#9c26b0'
      },
      {
        title: '桃粉',
        name: 'pink',
        color: '#e03997'
      },
      {
        title: '棕褐',
        name: 'brown',
        color: '#a5673f'
      },
      {
        title: '玄灰',
        name: 'grey',
        color: '#8799a3'
      },
      {
        title: '草灰',
        name: 'gray',
        color: '#aaaaaa'
      },
      {
        title: '墨黑',
        name: 'black',
        color: '#333333'
      },
      {
        title: '雅白',
        name: 'white',
        color: '#ffffff'
      },
    ]
  },
  baseimg:'http://121.37.247.95/bs2023/2915/files/',
  upfilephp:'http://121.37.247.95/bs2023/2915/php/c.php',

  //起ajax请求，并在请求成功或失败时执行相应的回调函数
  Shuju: function () {
    //定义了一个名为that的变量，用于保存当前对象的引用
    let that = this;
    //定义了一个名为shuju的空对象，保存请求数据相关信息
    let shuju = {};
    //定义了一个名为get_ajax的函数，用于发送一个GET请求，并处理请求的回调函数。
    //该函数接受两个参数：api表示请求的URL地址，callback表示请求的回调函数。
    const get_ajax = function (api, callback) {
      //定义了一个succ变量，用于保存请求成功时的回调函数
      let succ = callback['success'] || callback['s'];
      //定义了一个err变量，用于保存请求失败时的回调函数
      let err = callback['error'] || callback['e'];
      //将请求的URL地址按照/进行分割，并将分割后的第二个元素赋值给shuju.method属性
      shuju.method = api.split('/')[1];
      //输出shuju对象和请求的URL地址，用于调试和测试
      console.log(shuju, api);
    
//封装了微信小程序的请求方法的模块
      wx.request({
        //请求的URL地址，由一个基础URL和一个动态的接口名组成
        url: "http://121.37.247.95/bs2023/2915/php/" + api.split('/')[0] + '.php',
        //请求的方法
        method: 'POST',
        //请求头，这里设置为’content-type’: 'application/json’，表示请求数据的格式为JSON
        header: {
          'content-type': 'application/json'
        },
        //对象参数，表示请求的数据内容
        data: shuju,
        //请求成功后的回调函数,data参数表示返回的数据
        //将shuju对象清空，并将返回的数据传递给succ()函数进行处理
        success: function (data) {
          shuju = {};
          succ(data.data);
        },
        //请求失败后的回调函数,e参数表示错误信息
        //将shuju对象清空，将错误信息打印到控制台，并将错误信息传递给err()函数进行处理
        fail: function (e) {
          shuju = {};
          console.log(e);
          err(e)
        }
      })
    };
//该模块的返回值/一个包含多个方法的对象
    return {
      //该方法是一个别名，等同于get_ajax()方法
      getshuju: get_ajax,
      //用于设置请求数据中的单个参数的值。name参数表示参数名，value参数表示参数值
      set: function (name, value) {
        shuju[name] = value;
      },
      //用于设置请求数据中的多个参数的值。json参数是一个对象，表示多个参数名和参数值的键值对
      setjson: function (json) {
        shuju = {...shuju,...json};
      },
      //该方法是一个别名，等同于get_ajax()方法
      g: get_ajax,
      //用于设置请求数据中的单个参数的值。name参数表示参数名，value参数表示参数值
      se: function (name, value) {
        shuju[name] = value;
      },
      //用于设置请求数据中的多个参数的值。json参数是一个对象，表示多个参数名和参数值的键值对
      sj: function (json) {
        shuju = {...shuju,...json};
      },
      //设置请求数据中的表名。其中，biao参数表示表名
      sb: function (biao) {
        shuju['biao'] = biao
      },
      //设置请求数据中的id参数。t参数表示id参数名，默认为’id’，如果不传递t参数，则从本地缓存中获取id参数的值
      si: function (t) {
        shuju[t || 'id'] = wx.getStorageSync('id')
      }
    }

  },

  //封装了微信小程序的提示框方法的模块
  //text表示提示框中显示的文本内容；call表示提示框消失后要执行的回调函数；time表示提示框显示的时间，单位为毫秒
  ts: function (text, call, time) {
    //显示一个提示框，title参数表示提示框中显示的文本内容，duration参数表示提示框显示的时间
    wx.showToast({
      title: text,
      duration: 2000
    })
    //通过setTimeout()方法在time时间后执行call()函数，否则默认在1500毫秒后执行call()函数
    if (call) {
      setTimeout(() => {
        call();
      }, time || 1500);
    }
  },

  //封装了微信小程序的提示框方法的模块。该方法的提示框不会显示图标，而是只显示文本内容
  te: function (text, call, time) {
    wx.showToast({
      title: text,
      duration: 2000,
      icon: 'none'//icon参数表示提示框中不显示图标
    })
    if (call) {
      setTimeout(() => {
        call();
      }, time || 1500);
    }
  },

  //封装了微信小程序的模态框方法的模块
  tm: function (text, call) {
    wx.showModal({
      title: '提示',
      content: text,
      //res参数表示用户的操作结果。当用户点击确定按钮时，会执行success回调函数，call()函数。最终将更新后的shuju对象返回
      success(res) {
        if (res.confirm) {
          call();
        }
      }
    })
  },

//处理日期和时间相关的操作
  Day: function () {
    //要获取的日期与当前日期的天数差；是否需要格式化日期
    var getday = function (to, fs) {
      var cha;
      if (arguments.length >= 1) {//确定是否传入了to参数
        cha = ~~to;//to参数转换为整数并赋值给变量cha
      } else {
        cha = 0;
      }
//确定是否传入了fs参数。如果没有传入fs参数，则将fs赋值为true
      if (arguments.length != 2) {
        fs = true;
      }

      var day1 = new Date();
      day1.setTime(day1.getTime() + 24 * 60 * 60 * 1000 * cha);//day1设置为要获取的日期=当前时间的时间戳+要获取的天数差的毫秒数
      var s1 = day1.getFullYear() + "-" + (day1.getMonth() + 1) + "-" + day1.getDate();//获取年、月、日，并将它们拼接成一个字符串s1

      //将s1按照"年-月-日"的格式进行格式化
      if (fs == true) {
        //将s1按照"-“分割成一个数组dd1
        var dd1 = s1.split('-');
        for (var i = 0; i < dd1.length; i++) {
          var obj = dd1[i];
          if (obj.length == 1) {
            obj = "0" + obj;
          }
          dd1[i] = obj;
        }
        s1 = dd1.join('-');//dd1.join('-')将dd1中的元素按照”-"拼接成一个字符串
      }
      return s1;

    };

    //计算两个日期之间相差的天数
    var chaday = function (sDate1, sDate2) {//只传入一个参数sDate1，则默认sDate2为当前日期
      var dateSpan,//日期差距
        tempDate,//临时日期
        iDays;//相差天数
      if (arguments.length == 1) {
        sDate2 = getday();
      }
      //将sDate1和sDate2转换为Date对象
      sDate1 = Date.parse(sDate1);
      sDate2 = Date.parse(sDate2);
      dateSpan = sDate2 - sDate1;
      dateSpan = Math.abs(dateSpan);
      iDays = Math.floor(dateSpan / (24 * 3600 * 1000));
      return iDays
    };

    //计算从指定日期开始经过指定天数后的日期
    var whichday = function (date, days) {
      var nd = new Date(date);
      nd = nd.valueOf();//将nd转换为毫秒数
      nd = nd + days * 24 * 60 * 60 * 1000;
      nd = new Date(nd);
      //获取nd的年、月、日，并存储在变量y、m、d中
      var y = nd.getFullYear();
      var m = nd.getMonth() + 1;
      var d = nd.getDate();
      //输出的日期格式正确
      if (m <= 9) m = "0" + m;
      if (d <= 9) d = "0" + d;
      //将y、m、d拼接成字符串，格式为"yyyy-mm-dd"
      var cdate = y + "-" + m + "-" + d;
      return cdate;
    };

    //计算指定日期所在周的起始日期和结束日期
    var benzhou = function (date) {
      var startday = whichday(date, (1 - inweek(date)));//计算指定日期所在周的第一天日期
      var endday = whichday(date, (7 - inweek(date)));//计算指定日期所在周的最后一天日期
      return {
        "start": startday,
        "end": endday
      }
    };

    //获取当前时间的小时和分钟
    var gettime = function () {
      var date = new Date();
      var h = date.getHours(); //获取小时
      var m = date.getMinutes(); //获取分钟
      return h + ':' + m
    };

    //计算指定日期是星期几
    var inweek = function (date) {
      //将传入的日期字符串date中的"-"替换为"/"，并将其转换为Date对象，存储在变量day中
      var day = new Date(Date.parse(date.replace(/-/g, '/'))); //将日期值格式化
      var today = new Array("7", "1", "2", "3", "4", "5", "6");
      return today[day.getDay()]; //day.getDay();根据Date返一个星期中的某一天，其中0为星期日
    };

    return {
      get: getday,//get属性：值为getday函数，用于获取当前日期。
      cha: chaday,//cha属性：值为chaday函数，用于计算两个日期之间相差的天数。
      which: whichday,//which属性：值为whichday函数，用于计算指定日期所在周的起始日期和结束日期
      week: inweek,//week属性：值为inweek函数，用于计算指定日期是星期几
      benzhou: benzhou,//benzhou属性：值为benzhou函数，用于计算指定日期所在周的起始日期和结束日期
      gettime: gettime//gettime属性：值为gettime函数，用于获取当前时间的小时和分钟
    }
  },

  //成一个指定范围内的随机整数
  Suiji: function (min, max) {
    return ~~(Math.random() * (max - min + 1) + min);//双取反运算符(~~)将上一步得到的随机数转换为整数
  },

  //获取小程序中存储的用户ID
  uid: function () {
    return wx.getStorageSync('id');//获取存储在本地缓存中的ID数据
  },

  //检查表单中的数据是否为空
  check: function (form) {
    //循环遍历form对象中的所有属性
    for (let key in form) {
      console.log(key, form[key])//输出当前属性的名称和值
      if (form[key] === "" || form[key] == undefined || form[key] == null) {
        return false;
      }
    }
    return true;
  }
})