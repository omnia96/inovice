//app.js
App({
  onLaunch: function () {
    
  },
  globalData: {
  },
  getCurrentTime: function () {
    //获取当前系统时间
    var date = new Date()
    let year = date.getFullYear()
    let month = date.getMonth() + 1
    let day = date.getDate()
    let hour = date.getHours()
    let minute = date.getMinutes()
    if (month < 10) {
      month = '0' + month
    } else {
      month = month
    }
    if (day < 10) {
      day = '0' + day
    } else {
      day = day
    }
    if (hour < 10) {
      hour = '0' + hour
    } else {
      hour = hour
    }
    if (minute < 10) {
      minute = '0' + minute
    } else {
      minute = minute
    }
    let new_date = year + '-' + month + '-' + day + ' ' + hour + ':' + minute
    return new_date
  },
  removeCache:function(key){
    //删除缓存
    try {
      wx.removeStorageSync(key)
      console.log("删除缓存"+key+"成功")
    } catch (e) {
      // Do something when catch error
    }
  },
  clearCache: function () {
    //清除缓存
    try {
      wx.clearStorageSync()
      console.log("缓存清理完毕")
    } catch (e) {}
  },
  setCache: function (key, value) {
    //设置缓存
    try {
      wx.setStorageSync(key, value)
      console.log("创建缓存:" + key + "成功")
      console.log(value)

    } catch (e) {
      console.log(e + "创建缓存失败")
    }
  },
  getCache: function (cache) {
  //获取缓存
    try {
      const value = wx.getStorageSync(cache)
      if (value) {
        console.log("读取到缓存" + cache)
        return value
      } else {
        console.log("没有读取到缓存")
        return false

      }
    } catch (e) {
      console.log(e + "读取缓存失败")
    }

  }
})