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
    blockId: 0
    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var width = 304
    var offset = 20
    var content = (width - 40) / 8 + offset
    this.setData({
      box_height: 304,
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
    for (var i = 0; i < 4; i++) {
      for (var j = 0; j < 4; j++) {
        offset_top = 66 * i + 20
        offset_left = 66 * j + 20
        tops.push(offset_top)
        lefts.push(offset_left)
        points.push([offset_top, offset_left])
        if (j == 0 && (i == 0 || i == 1)) {
          spaces.push(false)
        } else {
          spaces.push(true)
        }
        
      }
    }
    this.setData({
      point_tops: tops,
      point_lefts: lefts,
      points: points,
      spaces: spaces
    })
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
    // console.log('pageX: ' + pageX)
    // console.log('pageY: ' + pageY)
    this.setData({
      page_x: pageX,
      page_y: pageY,
    })
    
    var v = Math.abs(this.data['page_y'] - this.data['view_y'])
    var h = Math.abs(this.data['page_x'] - this.data['view_x'])
    if (v >= h) {
      if (this.data['page_y'] > this.data['view_y']) {
        console.log("下")
        this.moveToDown()
      } else if (this.data['page_y'] < this.data['view_y']) {
        console.log('上')
        this.moveToUp()
      } else {
        console.log("===")
      }
    } else {
      if (this.data['page_x'] > this.data['view_x']) {
        console.log('右')
        this.moveToRight()
      } else if (this.data['page_x'] < this.data['view_x']) {
        console.log('左')
        this.moveToLeft()
      } else {
        console.log("====")
      }
    }
  },
  // 选择控件
  bindtouchbegin: function(e) {
    console.log("选择控件")
    var id = parseInt(e['target']['id'])
    if (id > 4000) {
      // 单-
    } else if (id > 3000) {
      // 竖二
    } else if (id > 2000) {
      // 横二
    } else if (id > 1000) {
      // 方四
    }
    if (this.data['isSelected']) {
      console.log("已选择")
      return
    } else {
      var touchs = e.touches[0];
      var pageX = touchs.pageX;
      var pageY = touchs.pageY;
      
      var target_left = e.target['offsetLeft']
      var target_top = e.target['offsetTop']
      this.setData({
        isSelected: true
      })
    }
    this.setData({
      isPenetrate: false
    })
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
    var size = this.blockSize(2)
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
        view_offset_left: target,
        view_x: viewx
      })
    } else {
      console.log("右=越界")
    }
  },
  // 左
  moveToLeft: function(e) {
    console.log("左移")
    var size = this.blockSize(2)
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
    } else {
      console.log("左=越界")
    }
  },
  // 上
  moveToUp: function(e) {
    console.log('上移')
    var size = this.blockSize(2)
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
          break
        }
      }
      console.log(this.data['spaces'])
      this.setData({
        view_offset_top: target_left_top,
        view_y: viewy
      })
    } else {
      console.log("上移动=越界")
    }
  },
  // 下
  moveToDown: function(e) {
    console.log('下移')
    var size = this.blockSize(2)
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
    } else {
      console.log("下=越界")
    }
  },
  bindtouchend: function(e) {
    console.log("结束")
    console.log(e)
    
    var target_left = e.target['offsetLeft']
    var target_top = e.target['offsetTop']
    console.log('target_left: ' + target_left)
    console.log('target_top: ' + target_top)

    // var touchs = e.touches[0];
    // var pageX = touchs.pageX;
    // var pageY = touchs.pageY;
    // console.log('pageX: ' + pageX)
    // console.log('pageY: ' + pageY)
    // var h = Math.abs(target_left - pageX)
    // var v = Math.abs(target_top - pageY)
    // console.log(h)
    // console.log(v)
    return
    if (h > v) {
      if (target_left > pageX) {
        console.log('左' + h)
      } else if (target_left < pageX) {
        console.log('右' + h)
      }
      this.setData({
        ballLeft: pageX
      });
    } else if (h == v) {
      console.log('相等')
    } else {
      if (target_top > pageY) {
        console.log('上' + v)
      } else if (target_top < pageY) {
        console.log('下' + v)
      }
      this.setData({
        ballTop: pageY,
      });
    }
  },

  // bindtouchmove: function(e) {
  //   console.log(e)
  //   console.log('我被拖动了....')
    
    
    
    

  //   //防止坐标越界,view宽高的一般 
  //   // if (pageX < 30) return;
  //   // if (pageX > this.data.screenWidth - 30) return;
  //   // if (this.data.screenHeight - pageY <= 30) return;
  //   // if (pageY <= 30) return;
  //   //这里用right和bottom.所以需要将pageX pageY转换 
  //   // var x = 300 - pageX - 30;
  //   // var y = 300 - pageY - 30;
  //   // console.log('x: ' + x)
  //   // console.log('y: ' + y)
     
  // },

  

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