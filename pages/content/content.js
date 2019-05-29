// pages/content/content.js
const app = getApp()
var WXP = require('../../lib/wxp.min.js').default
Page({

  /**
   * 页面的初始数据
   */
  data: {
    contentInfo:null
  },
  onLoad: function (options) {
    let id = options.number;
    let cache = app.getCache("userInvoiceInfo")
    if(cache.data[id]){
      this.setData({
        contentInfo:cache.data[id]
      })
    }else{
      let data = {
        "billingDate":options.date,
        "invoiceCode":options.code,
        "invoiceNumber":options.number,
        "checkCode":options.checkCode.substr(options.checkCode.length-6)
      } 
      this.getInvoiceInfo(data)
    }
  },
  onShow: function () {

  },
  onShareAppMessage: function () {

  },
  getInvoiceInfo(data){
    let id = data["invoiceNumber"]
    let appCode = "APPCODE c8ba01acfc514a85ba29efac1ce66377"
    WXP.request({
      url:"http://verinvoice.sinosecu.com.cn/verapi/verInvoice.do",
      data:data,
      header:{
        "Content-Type":"application/x-www-form-urlencoded;charset=UTF-8",
        "Authorization": appCode
      },
      method:"POST"
    }).then(result => {
      console.log('success信息:',result)
      this.setData({
        contentInfo:result.data.invoice
      })
      let userInvoiceInfo = app.getCache("userInvoiceInfo")
      if(userInvoiceInfo["msg"] == false){
        userInvoiceInfo = { "msg": true, "data": { "defaut": "默认" }}
        userInvoiceInfo["data"][id] = result.data.invoice
        app.setCache("userInvoiceInfo",userInvoiceInfo)
      }else{
        userInvoiceInfo["data"][id] = result.data.invoice
        app.setCache("userInvoiceInfo",userInvoiceInfo)
      }
    }).catch(error => {
      console.log('fail信息:',error)
    })
  }
})