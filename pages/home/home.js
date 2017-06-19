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
    steps: 0,
    animationData: {},
    animationData1: {},

    //选中控件
    sel_width: 0,
    sel_height: 0,
    sel_x: 0,
    sel_y: 0,

    timer: 0,
    contentType: 2,       // 1：横刀立马 2：井中之蛙
    contentTypes: [1, 2],
    content: '执子之手,与子偕老',
    contents: ['执子之手,与子偕老', '爱上一个人,恋上一个城']

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.getStorage({
      key: 'defType',
      success: function(res) {
        console.log("成功")
        console.log(res)
        var index = res.data
        that.setData({
          contentType: that.data['contentTypes'][index],
          content: that.data['contents'][parseInt(res.data)]
        })
        that.bindResetBtn()
      },
      fail: function(res) {
        console.log("失败")
        var content = that.data['contents'][0]
        var ty = that.data['contentTypes'][0]
        that.setData({
          contentType: ty,
          content: content
        })
        that.bindResetBtn()
      }
    })
    
    
  },

  animationAction: function(e) {
    var that = this
    var timer = setInterval(function () {
      var animation = wx.createAnimation({
        duration: 4000,
        timingFunction: 'ease',
      })
      var animation1 = wx.createAnimation({
        duration: 4000,
        timingFunction: 'ease',
      })

      animation.translateX(66).step()
      animation.translateX(0).step()
      animation1.translateX(-66).step()
      animation1.translateX(0).step()
      that.setData({
        animationData: animation.export(),
        animationData1: animation1.export()
      })
    }, 4000)
    this.setData({
      timer: timer
    })
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
      sel_width: 0,
      sel_height: 0,
      sel_x: 0,
      sel_y: 0
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
        // 横刀立马
        if (this.data['contentType'] == 1) {
          if (i == 2 && (j == 2 || j == 1)) {
            spaces.push(true)
          } else {
            spaces.push(false)
          }
        } else if (this.data['contentType'] == 2) {
          // 井中之蛙
          if (i == 4 && (j == 0 || j == 3)) {
            spaces.push(true)
          } else {
            spaces.push(false)
          }
        }
        
      }
    }
    var datas = {}
    if (this.data['contentType'] == 1) {
      // 1单一 13 14 16 19 : 106 107 109 110
      datas['106'] = { 'x': points[17][1], 'y': points[17][0], 'type': 1, 'src': '../../images/11_1_1.png', 's_src': '../../images/11_1_0.png', 'd_src': '../../images/11_1_1.png' }
      datas['107'] = { 'x': points[18][1], 'y': points[18][0], 'type': 1, 'src': '../../images/11_2_1.png', 's_src': '../../images/11_2_0.png', 'd_src': '../../images/11_2_1.png' }
      datas['109'] = { 'x': points[16][1], 'y': points[16][0], 'type': 1, 'src': '../../images/11_3_1.png', 's_src': '../../images/11_3_0.png', 'd_src': '../../images/11_3_1.png' }
      datas['110'] = { 'x': points[19][1], 'y': points[19][0], 'type': 1, 'src': '../../images/11_4_1.png', 's_src': '../../images/11_4_0.png', 'd_src': '../../images/11_4_1.png' }
      // 2竖二 0 3 8 11   101 103 104 108
      datas['101'] = { 'x': points[0][1], 'y': points[0][0], 'type': 2, 'src': '../../images/12_1_1.png', 's_src': '../../images/12_1_0.png', 'd_src': '../../images/12_1_1.png' }
      datas['103'] = { 'x': points[3][1], 'y': points[3][0], 'type': 2, 'src': '../../images/12_2_1.png', 's_src': '../../images/12_2_0.png', 'd_src': '../../images/12_2_1.png' }
      datas['104'] = { 'x': points[8][1], 'y': points[8][0], 'type': 2, 'src': '../../images/12_3_1.png', 's_src': '../../images/12_3_0.png', 'd_src': '../../images/12_3_1.png' }
      datas['108'] = { 'x': points[11][1], 'y': points[11][0], 'type': 2, 'src': '../../images/12_4_1.png', 's_src': '../../images/12_4_0.png', 'd_src': '../../images/12_4_1.png' }
      // 3横二 9  105
      datas['105'] = { 'x': points[13][1], 'y': points[13][0], 'type': 3, 'src': '../../images/21_1_1.png', 's_src': '../../images/21_1_0.png', 'd_src': '../../images/21_1_1.png' }
      // 4方四 1
      datas['102'] = { 'x': points[1][1], 'y': points[1][0], 'type': 4, 'src': '../../images/22_1_1.png', 's_src': '../../images/22_1_0.png', 'd_src': '../../images/22_1_1.png' }
    } else if (this.data['contentType'] == 2) {
      // 1单一 0 3 12 15 : 101 103 107 109
      datas['201'] = { 'x': points[0][1], 'y': points[0][0], 'type': 1, 'src': '../../images/2_11_1_1.png', 's_src': '../../images/2_11_1_0.png', 'd_src': '../../images/2_11_1_1.png' }
      datas['203'] = { 'x': points[3][1], 'y': points[3][0], 'type': 1, 'src': '../../images/2_11_2_1.png', 's_src': '../../images/2_11_2_0.png', 'd_src': '../../images/2_11_2_1.png' }
      datas['207'] = { 'x': points[12][1], 'y': points[12][0], 'type': 1, 'src': '../../images/2_11_3_1.png', 's_src': '../../images/2_11_3_0.png', 'd_src': '../../images/2_11_3_1.png' }
      datas['209'] = { 'x': points[15][1], 'y': points[15][0], 'type': 1, 'src': '../../images/2_11_4_1.png', 's_src': '../../images/2_11_4_0.png', 'd_src': '../../images/2_11_4_1.png' }
      // 2竖二 4 7   104 106
      datas['204'] = { 'x': points[4][1], 'y': points[4][0], 'type': 2, 'src': '../../images/2_12_1_1.png', 's_src': '../../images/2_12_1_0.png', 'd_src': '../../images/2_12_1_1.png' }
      datas['206'] = { 'x': points[7][1], 'y': points[7][0], 'type': 2, 'src': '../../images/2_12_2_1.png', 's_src': '../../images/2_12_2_0.png', 'd_src': '../../images/2_12_2_1.png' }
      // 3横二 1 13 17 102 108 110
      datas['202'] = { 'x': points[1][1], 'y': points[1][0], 'type': 3, 'src': '../../images/2_21_2_1.png', 's_src': '../../images/2_21_2_0.png', 'd_src': '../../images/2_21_2_1.png' }
      datas['208'] = { 'x': points[13][1], 'y': points[13][0], 'type': 3, 'src': '../../images/2_21_3_1.png', 's_src': '../../images/2_21_3_0.png', 'd_src': '../../images/2_21_3_1.png' }
      datas['210'] = { 'x': points[17][1], 'y': points[17][0], 'type': 3, 'src': '../../images/2_21_1_1.png', 's_src': '../../images/2_21_1_0.png', 'd_src': '../../images/2_21_1_1.png' }
      // 4方四 5 105
      datas['205'] = { 'x': points[5][1], 'y': points[5][0], 'type': 4, 'src': '../../images/22_2_1.png', 's_src': '../../images/22_2_0.png', 'd_src': '../../images/22_2_1.png' }
    }
    
    

    this.setData({
      point_tops: tops,
      point_lefts: lefts,
      points: points,
      spaces: spaces,
      views_data: datas,
      steps: 0,
      blockId: ''
    })
    console.log("-----------")
    console.log(datas)
    console.log(points)
    console.log(spaces)
    console.log("--------+++++++++++---")

  },
  // 更换类型
  bindChangeContentType: function(res) {
    var content = this.data['contentType'] + 1
    var dd = this.data['contentTypes'].indexOf(content)
    var cc = 0
    if (dd == -1) {
      cc = 0
    } else {
      cc = dd
    }
    this.setData({
      contentType: this.data['contentTypes'][cc],
      content: this.data['contents'][cc]
    })
    var that = this
    wx.setStorage({
      key: 'defType',
      data: cc,
    })
    this.bindResetBtn()

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
    var data
    if (this.data['contentType'] == 1) {
      data = this.data['views_data']['102']
    } else if (this.data['contentType'] == 2) {
      data = this.data['views_data']['205']
    }
    
    if (data['x'] == 86 && data['y'] == 218) {
      console.log('成功')
      var that = this
      wx.showModal({
        title: '恭喜',
        content: that.data['content'],
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
    console.log(id)
    console.log(this.data['views_data'][this.data['blockId']])
    if (this.data['blockId'] != '') {  
      this.data['views_data'][this.data['blockId']]['src'] = this.data['views_data'][this.data['blockId']]['d_src']
    }
    this.data['views_data'][id.toString()]['src'] = this.data['views_data'][id.toString()]['s_src']
  
    var data = this.data['views_data'][id.toString()]
    var size = this.blockSize(data['type'])
    this.setData({
      view_offset_top: data['y'],
      view_offset_left: data['x'],
      blockType: data['type'],
      blockId: id.toString(),
      isPenetrate: false,
      views_data: this.data['views_data'],
      sel_width: size[0],
      sel_height: size[1],
      sel_x: data['x'],
      sel_y: data['y']
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
        steps: this.data['steps'] + 1,
        sel_y: this.data['view_offset_top'],
        sel_x: this.data['view_offset_left']
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
        steps: this.data['steps'] + 1,
        sel_y: this.data['view_offset_top'],
        sel_x: this.data['view_offset_left']
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
        steps: this.data['steps'] + 1,
        sel_y: this.data['view_offset_top'],
        sel_x: this.data['view_offset_left']
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
        steps: this.data['steps'] + 1,
        sel_y: this.data['view_offset_top'],
        sel_x: this.data['view_offset_left']
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
    this.animationAction()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    clearInterval(this.data['timer'])
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