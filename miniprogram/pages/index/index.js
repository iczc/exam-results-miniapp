//index.js
Page({
  data: {
    student: {
      name: '',
      number: null,
    },
    result: {
      name: '',
      chinese: null,
      geography: null,
      biology: null,
      history: null,
      math: null,
      english: null,
      politics: null,
      toatl: null,
      rank: null
    },
    haveGetRecord: false,
    nameRules: [{
      required: true
    },
    {
      min: 2,
      max: 4,
      message: '姓名长度需要在2-4个字符之间'
    }
    ],
    numRules: {
      type: 'number',
      required: true
    }
  },
  submit(event) {
    const {
      detail
    } = event;
    detail.values.number = parseInt(detail.values.number, 10)
    this.setData({
      student: detail.values
    })
    this.selectRecord()
  },
  reset(event) {
    this.setData({
      haveGetRecord: false,
    })
  },
  selectRecord() {
    wx.showLoading({
      title: '查询中',
    })
    wx.cloud.callFunction({
      name: 'quickstartFunctions',
      config: {
        env: this.data.envId
      },
      data: this.data.student
    }).then((resp) => {
      wx.hideLoading()
      if (resp.result.data.length === 0) {
        wx.lin.showMessage({
          type: 'error',
          content: '数据不存在'
        })
        this.setData({
          haveGetRecord: false,
        })
        return
      }
      wx.lin.showMessage({
        type: 'success',
        content: '查询成功'
      })
      this.setData({
        haveGetRecord: true,
        result: resp.result.data[0]
      })
    }).catch((e) => {
      console.log(e)
      wx.hideLoading()
    })
  },
  onLoad: function () {
    wx.lin.initValidateForm(this)
  },
})