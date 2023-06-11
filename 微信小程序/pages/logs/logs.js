// logs.js
const util = require('../../utils/util.js')

//展示一个日志列表
Page({
  data: {
    logs: []
  },
  onLoad() {
    //处理后的"logs"数组设置为"data"对象中的"logs"属性，以便在页面中展示日志列表
    this.setData({
      //获取本地存储中的"logs"数据
      logs: (wx.getStorageSync('logs') || []).map(log => {
        return {
          date: util.formatTime(new Date(log)),//将时间戳转换为格式化的日期字符串
          timeStamp: log//日志的时间戳
        }
      })
    })
  }
})
