// pages/historys/historys.js
const app =  getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    current: 'historys',
    courierInfor:null,
    visible:false,
    deleteId:null
  },
  handleChange ({ detail }) {
    if (detail.key === "historys"){
      this.onShow()
    }else if(detail.key === "index"){
      wx.switchTab({
        url:"../index/index"
      })
    }
},
handleOpen (e) {
  console.log(e)
  this.setData({
      visible: true,
      deleteId:e.target.id
  });
},

handleClose () {
  this.setData({
      visible: false
  });
},
handleDelete(e){

  console.log(e.target.id)
  var array = {}
  var newArray = {}
  array = app.getCache("userInvoiceInfo").data

  for(var index in array){
    if(index != e.target.id){
      newArray[index] = array[index]
    }
  }
  console.log(array)
console.log(newArray)
  app.setCache("userInvoiceInfo",{data:newArray})
  this.setData({
    visible: false
});
this.onShow()
},
handletap:function(e){
  console.log(e.currentTarget.id)
  let data = {
    number:e.currentTarget.id,
  }
  wx.navigateTo({
    url:"../content/content?date="+data.date+"&code="+data.code+"&number="+data.number+"&checkCode="+data.checkCode
  })
},
  onShow: function () {
    wx.hideTabBar()
    var cache = []
    cache = app.getCache("userInvoiceInfo")
    var that = this
    that.setData({
      courierInfor:cache.data
    })
  },
  onShareAppMessage: function () {

  }
})