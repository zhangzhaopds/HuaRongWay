// pages/home/home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    view_x: 0,
    view_y: 0,
    view_offset_top: 0,
    view_offset_left: 0,
    page_x: 0,
    page_y: 0,
    box_height: 0,
    box_width: 0, 
    view_width: 0,
    isPenetrate: true,
    points: [],
    spaces: [],
    // 选择的模块
    isSelected: false,  // 当前模块
    blockType: 1,       // 1: 单一，2：竖二， 3： 横二， 4: 方四
    blockId: '',
    views_data: {},
    steps: 0

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.bindResetBtn()
  },

  // 重置
  bindResetBtn: function(e) {
    console.log("重置")
    var width = 304
    var offset = 20
    var content = (width - 40) / 8 + offset
    this.setData({
      box_height: 370,
      box_width: 304,
      view_width: 66,
      view_x: content,
      view_y: content,
      view_offset_top: offset,
      view_offset_left: offset,
    });
    console.log(this.data)
    var offset_top = 20
    var offset_left = 20
    var points = []
    var spaces = []
    var tops = []
    var lefts = []
    for (var i = 0; i < 5; i++) {
      for (var j = 0; j < 4; j++) {
        offset_top = 66 * i + 20
        offset_left = 66 * j + 20
        tops.push(offset_top)
        lefts.push(offset_left)
        points.push([offset_top, offset_left])
        if (i == 4 && (j == 2 || j == 1)) {
          spaces.push(true)
        } else {
          spaces.push(false)
        }
      }
    }
    var datas = {}
    // 1单一 13 14 16 19 : 106 107 109 110
    datas['106'] = { 'x': points[13][1], 'y': points[13][0], 'type': 1, 'src': '../../images/66.png', 's_src': '../../images/66s.png', 'd_src': '../../images/66.png' }
    datas['107'] = { 'x': points[14][1], 'y': points[14][0], 'type': 1, 'src': '../../images/66.png', 's_src': '../../images/66s.png', 'd_src': '../../images/66.png' }
    datas['109'] = { 'x': points[16][1], 'y': points[16][0], 'type': 1, 'src': '../../images/66.png', 's_src': '../../images/66s.png', 'd_src': '../../images/66.png' }
    datas['110'] = { 'x': points[19][1], 'y': points[19][0], 'type': 1, 'src': '../../images/66.png', 's_src': '../../images/66s.png', 'd_src': '../../images/66.png' }
    // 2竖二 0 3 8 11   101 103 104 108
    datas['101'] = { 'x': points[0][1], 'y': points[0][0], 'type': 2, 'src': '../../images/66.png', 's_src': '../../images/66s.png', 'd_src': '../../images/66.png' }
    datas['103'] = { 'x': points[3][1], 'y': points[3][0], 'type': 2, 'src': '../../images/66.png', 's_src': '../../images/66s.png', 'd_src': '../../images/66.png' }
    datas['104'] = { 'x': points[8][1], 'y': points[8][0], 'type': 2, 'src': '../../images/66.png', 's_src': '../../images/66s.png', 'd_src': '../../images/66.png' }
    datas['108'] = { 'x': points[11][1], 'y': points[11][0], 'type': 2, 'src': '../../images/66.png', 's_src': '../../images/66s.png', 'd_src': '../../images/66.png' }
    // 3横二 9  105
    datas['105'] = { 'x': points[9][1], 'y': points[9][0], 'type': 3, 'src': '../../images/66.png', 's_src': '../../images/66s.png', 'd_src': '../../images/66.png' }
    // 4方四 1
    datas['102'] = { 'x': points[1][1], 'y': points[1][0], 'type': 4, 'src': '../../images/66.png', 's_src': '../../images/66s.png', 'd_src': '../../images/66.png' }

    this.setData({
      point_tops: tops,
      point_lefts: lefts,
      points: points,
      spaces: spaces,
      views_data: datas,
      steps: 0
    })

    console.log(datas)
    console.log(points)
    console.log(spaces)

  },

  // 移动控件
  boxtouchbegin: function(e) {
    console.log('移动控件')
    if (!this.data['isPenetrate']) {
      this.setData({
        isPenetrate: true
      })
      return
    }
    console.log(e)
    var touchs = e.touches[0];
    var pageX = touchs.pageX;
    var pageY = touchs.pageY;
    var targetX = e.target['offsetLeft']
    var targetY = e.target['offsetTop']
    console.log('pageX: ' + (pageX - targetX))
    console.log('pageY: ' + (pageY - targetY))
    
    // 修正视图坐标，左上（0, 0）
    var touch_x = pageX - targetX
    var touch_y = pageY - targetY

    var size = this.blockSize(this.data['blockType'])
    // 滑块四角
    var up_left_x = this.data['view_offset_left']
    var up_left_y = this.data['view_offset_top']

    var up_right_x = this.data['view_offset_left'] + size[0]
    var up_right_y = this.data['view_offset_top']

    var down_left_x = this.data['view_offset_left']
    var down_left_y = this.data['view_offset_top'] + size[1]

    var down_right_x = this.data['view_offset_left'] + size[0]
    var down_right_y = this.data['view_offset_top'] + size[1]
    
    if (touch_x >= up_left_x && touch_x <= up_right_x && touch_y < up_left_y) {
      console.log("上")
      this.moveToUp()
    }
    if (touch_y >= up_left_y && touch_y <= down_left_y && touch_x < up_left_x) {
      console.log("左")
      this.moveToLeft()
    }
    if (touch_x >= down_left_x && touch_x <= down_right_x && touch_y > down_left_y) {
      console.log('下')
      this.moveToDown()
    }
    if (touch_y >= up_right_y && touch_y <= down_right_y && touch_x > up_right_x) {
      console.log("右")
      this.moveToRight()
    }
    // 成功
    // 102  x:86 y:218
    var data = this.data['views_data']['102']
    if (data['x'] == 86 && data['y'] == 86) {
      console.log('成功')
      wx.showModal({
        title: '恭喜',
        content: '你已出师了',
        showCancel: false,
        success: function(res) {
          if (res.confirm) {
            // this.setData({
            //   steps: 0
            // })
          }
        }
      })
    }
  },


  // 选择控件
  bindtouchbegin: function(e) {
    var id = parseInt(e['target']['id'])
    // blockType: 1,       // 1: 单一，2：竖二， 3： 横二， 4: 方四
    if (this.data['blockId'] != '') {  
      this.data['views_data'][this.data['blockId']]['src'] = this.data['views_data'][this.data['blockId']]['d_src']
    }
    this.data['views_data'][id.toString()]['src'] = this.data['views_data'][id.toString()]['s_src']
  
    var data = this.data['views_data'][id.toString()]
    this.setData({
      view_offset_top: data['y'],
      view_offset_left: data['x'],
      blockType: data['type'],
      blockId: id.toString(),
      isPenetrate: false,
      views_data: this.data['views_data']
    })
    console.log("选择控件", this.data['view_offset_left'], this.data['view_offset_top'], this.data['blockType'], this.data['blockId'])
    console.log(this.data['views_data'][this.data['blockId']])
  
  },
  // 根据类型，返回宽高
  blockSize: function(e) {
    var width = 0
    var height = 0
    switch (e) {
      case 1: // 单一
        width = this.data['view_width']
        height = this.data['view_width']
        break
      case 2: // 竖二
        width = this.data['view_width']
        height = this.data['view_width'] * 2
        break
      case 3: // 横二
        width = this.data['view_width'] * 2
        height = this.data['view_width']
        break
      case 4: // 方四
        width = this.data['view_width'] * 2
        height = this.data['view_width'] * 2
        break
    }
    return [width, height]
  },
  // 右
  moveToRight: function(e) {
    console.log("右移")
    var size = this.blockSize(this.data['blockType'])
    var viewx = this.data['view_x'] + size[0]
    // 方向点
    var tar = false
    var target = this.data['view_offset_left'] + size[0]
    var target_top = this.data['view_offset_top']  
    for (var i in this.data['points']) {
      if ([target_top, target].toString() == this.data['points'][i].toString()) {
        tar = this.data['spaces'][i]
        break
      }
    }
    // 方向点
    var dir  = false
    var direction = this.data['view_offset_left'] + size[0]
    var direction_top = this.data['view_offset_top'] + size[1] - this.data['view_width']
    for (var i in this.data['points']) {
      if ([direction_top, direction].toString() == this.data['points'][i].toString()) {
        dir = this.data['spaces'][i]
        break
      }
    }
    console.log(tar, dir)
    if (tar && dir) {
      console.log('移动成功')
      var origin_left = this.data['view_offset_left']
      var origin_top = this.data['view_offset_top']
      var origin_dir_left = this.data['view_offset_left']
      var origin_dir_top = this.data['view_offset_top'] + size[1] - this.data['view_width']
      // 左上角
      for (var i in this.data['points']) {
        if ([origin_top, origin_left].toString() == this.data['points'][i].toString()) {
          var arr = this.data['spaces']
          arr.splice(i, 1, true)
          this.setData({
            spaces: arr
          })
          break
        }
      }
      // 左下角
      for (var i in this.data['points']) {
        if ([origin_dir_top, origin_dir_left].toString() == this.data['points'][i].toString()) {
          var arr = this.data['spaces']
          arr.splice(i, 1, true)
          this.setData({
            spaces: arr
          })
          break
        }
      }
      // 右上角
      for (var i in this.data['points']) {
        if ([target_top, target].toString() == this.data['points'][i].toString()) {
          var arr = this.data['spaces']
          arr.splice(i, 1, false)
          this.setData({
            spaces: arr
          })
          break
        }
      }
      // 右下
      for (var i in this.data['points']) {
        if ([direction_top, direction].toString() == this.data['points'][i].toString()) {
          var arr = this.data['spaces']
          arr.splice(i, 1, false)
          this.setData({
            spaces: arr
          })
          break
        }
      }
      console.log(this.data['spaces'])
      this.setData({
        view_offset_left: origin_left + this.data['view_width'],
        view_x: viewx
      })
      this.data['views_data'][this.data['blockId']]['x'] = this.data['view_offset_left']
      this.setData({
        views_data: this.data['views_data'],
        steps: this.data['steps'] + 1
      })
    } else {
      console.log("右=越界")
    }
  },
  // 左
  moveToLeft: function(e) {
    console.log("左移")
    var size = this.blockSize(this.data['blockType'])
    var viewx = this.data['view_x'] - this.data['view_width']
    // 左
    var origin_up_left = this.data['view_offset_left'] - this.data['view_width']
    var origin_up_top = this.data['view_offset_top']
    var origin_down_left = this.data['view_offset_left'] - this.data['view_width']
    var origin_down_top = this.data['view_offset_top'] + size[1] - this.data['view_width']
    var up = false
    var down = false
    for (var i in this.data['points']) {
      if ([origin_up_top, origin_up_left].toString() == this.data['points'][i].toString()) {
        up = this.data['spaces'][i]
        break
      }
    }
    for (var i in this.data['points']) {
      if ([origin_down_top, origin_down_left].toString() == this.data['points'][i].toString()) {
        down = this.data['spaces'][i]
        break
      }
    }
    console.log(up, down)
    if (up && down) {
      console.log("左移动成功")
      // 右侧
      var right_up_left = this.data['view_offset_left'] + size[0] - this.data['view_width']
      var right_up_top = this.data['view_offset_top']
      var right_down_left = this.data['view_offset_left'] + size[0] - this.data['view_width']
      var right_down_top = this.data['view_offset_top'] + size[1] - this.data['view_width']
      // 左侧非空白
      for (var i in this.data['points']) {
        if ([origin_up_top, origin_up_left].toString() == this.data['points'][i].toString()) {
          var arr = this.data['spaces']
          arr.splice(i, 1, false)
          this.setData({
            spaces: arr
          })
          break
        }
      }
      for (var i in this.data['points']) {
        if ([origin_down_top, origin_down_left].toString() == this.data['points'][i].toString()) {
          var arr = this.data['spaces']
          arr.splice(i, 1, false)
          this.setData({
            spaces: arr
          })
          break
        }
      }
      // 右侧空白
      for (var i in this.data['points']) {
        if ([right_up_top, right_up_left].toString() == this.data['points'][i].toString()) {
          var arr = this.data['spaces']
          arr.splice(i, 1, true)
          this.setData({
            spaces: arr
          })
          break
        }
      }
      for (var i in this.data['points']) {
        if ([right_down_top, right_down_left].toString() == this.data['points'][i].toString()) {
          var arr = this.data['spaces']
          arr.splice(i, 1, true)
          this.setData({
            spaces: arr
          })
          break
        }
      }
      console.log(this.data['spaces'])
      this.setData({
        view_offset_left: origin_up_left,
        view_x: viewx
      })
      this.data['views_data'][this.data['blockId']]['x'] = this.data['view_offset_left']
      this.setData({
        views_data: this.data['views_data'],
        steps: this.data['steps'] + 1
      })
    } else {
      console.log("左=越界")
    }
  },
  // 上
  moveToUp: function(e) {
    console.log('上移')
    var size = this.blockSize(this.data['blockType'])
    var viewy = this.data['view_y'] - this.data['view_width']
    // 上部
    var target_left_top = this.data['view_offset_top'] - this.data['view_width']
    var target_left_left = this.data['view_offset_left']
    var target_right_top = this.data['view_offset_top'] - this.data['view_width']
    var target_right_left = this.data['view_offset_left'] + size[0] - this.data['view_width']
    var left = false
    var right = false
    for (var i in this.data['points']) {
      if ([target_left_top, target_left_left].toString() == this.data['points'][i].toString()) {
        left = this.data['spaces'][i]
        break
      }
    }
    for (var i in this.data['points']) {
      if ([target_right_top, target_right_left].toString() == this.data['points'][i].toString()) {
        right = this.data['spaces'][i]
        break
      }
    }
    console.log(left, right)
    if (left && right) {
      // 下部
      var down_left_top = this.data['view_offset_top']  + size[1] - this.data['view_width']
      var down_left_left = this.data['view_offset_left']
      var down_right_top = this.data['view_offset_top'] + size[1] - this.data['view_width']
      var down_right_left = this.data['view_offset_left'] + size[0] - this.data['view_width']
      // 上部非空白
      for (var i in this.data['points']) {
        if ([target_left_top, target_left_left].toString() == this.data['points'][i].toString()) {
          var arr = this.data['spaces']
          arr.splice(i, 1, false)
          this.setData({
            spaces: arr
          })
          break
        }
      }
      for (var i in this.data['points']) {
        if ([target_right_top, target_right_left].toString() == this.data['points'][i].toString()) {
          var arr = this.data['spaces']
          arr.splice(i, 1, false)
          this.setData({
            spaces: arr
          })
          break
        }
      }
      // 下部空白
      for (var i in this.data['points']) {
        if ([down_left_top, down_left_left].toString() == this.data['points'][i].toString()) {
          var arr = this.data['spaces']
          arr.splice(i, 1, true)
          this.setData({
            spaces: arr
          })
          break
        }
      }
      for (var i in this.data['points']) {
        if ([down_right_top, down_right_left].toString() == this.data['points'][i].toString()) {
          var arr = this.data['spaces']
          arr.splice(i, 1, true)
          this.setData({
            spaces: arr
          })
          break
        }
      }
      console.log(this.data['spaces'])
      this.setData({
        view_offset_top: target_left_top,
        view_y: viewy
      })
      this.data['views_data'][this.data['blockId']]['y'] = this.data['view_offset_top']
      this.setData({
        views_data: this.data['views_data'],
        steps: this.data['steps'] + 1
      })
    } else {
      console.log("上移动=越界")
    }
  },
  // 下
  moveToDown: function(e) {
    console.log('下移')
    var size = this.blockSize(this.data['blockType'])
    var viewy = this.data['view_y'] + size[1]
    // 上部分
    var target_left_top = this.data['view_offset_top'] + size[1]
    var target_left_left = this.data['view_offset_left']
    var target_right_top = this.data['view_offset_top'] + size[1]
    var target_right_left = this.data['view_offset_left'] + size[0] - this.data['view_width']
    var left = false
    var right = false
    for (var i in this.data['points']) {
      if ([target_left_top, target_left_left].toString() == this.data['points'][i].toString()) {
        left = this.data['spaces'][i]
        break
      }
    }
    for (var i in this.data['points']) {
      if ([target_right_top, target_right_left].toString() == this.data['points'][i].toString()) {
        right = this.data['spaces'][i]
        break
      }
    }
    console.log(left, right)
    if (left && right) {
      console.log("下移成功")
      var up_left_top = this.data['view_offset_top']
      var up_left_left = this.data['view_offset_left']
      var up_right_top = this.data['view_offset_top']
      var up_right_left = this.data['view_offset_left'] + size[0] - this.data['view_width']
      // 下部非空白
      for (var i in this.data['points']) {
        if ([target_left_top, target_left_left].toString() == this.data['points'][i].toString()) {
          var arr = this.data['spaces']
          arr.splice(i, 1, false)
          this.setData({
            spaces: arr
          })
          break
        }
      }
      for (var i in this.data['points']) {
        if ([target_right_top, target_right_left].toString() == this.data['points'][i].toString()) {
          var arr = this.data['spaces']
          arr.splice(i, 1, false)
          this.setData({
            spaces: arr
          })
          break
        }
      }
      // 上部空白
      for (var i in this.data['points']) {
        if ([up_left_top, up_left_left].toString() == this.data['points'][i].toString()) {
          var arr = this.data['spaces']
          arr.splice(i, 1, true)
          this.setData({
            spaces: arr
          })
          break
        }
      }
      for (var i in this.data['points']) {
        if ([up_right_top, up_right_left].toString() == this.data['points'][i].toString()) {
          var arr = this.data['spaces']
          arr.splice(i, 1, true)
          this.setData({
            spaces: arr
          })
          break
        }
      }
      console.log(this.data['spaces'])
      this.setData({
        view_offset_top: up_left_top + this.data['view_width'],
        view_y: viewy
      })
      this.data['views_data'][this.data['blockId']]['y'] = this.data['view_offset_top']
      this.setData({
        views_data: this.data['views_data'],
        steps: this.data['steps'] + 1
      })
    } else {
      console.log("下=越界")
    }
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
  
  }
})