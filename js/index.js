;(function (node) {
  // 构造函数-最上面
  var TodoList = function () {
    var _self = this
    this.node = node
    this.inputShow = false
    this.isEdit = false
    this.curIdx = null

    this.dConfig = {
      plusBtn: '',
      inputArea: '',
      addBtn: '',
      list: '',
      itemClass: ''
    }
    this.config = this.getConfig()
    this.itemClass = this.config.itemClass

    // 判断 dConfig 的内容，是否存在于 config 中
    for (var key in this.dConfig) {
      if (!this.config.hasOwnProperty(key)) {
        console.log(errorInfo(key))
        return
      }
    }

    this.setConfig()
    // 添加+
    addEvent(this.plusBtn, 'click', function () {
      // 保证this指向TodoList
      _self.showInput(_self, 'open')
    })
    // 输入内容后点击添加项目
    addEvent(this.addBtn, 'click', function () {
      // 保证this指向TodoList
      _self.addBtnClick.call(_self)
    })
    addEvent(this.oList, 'click', function (e) {
      var e = e || window.event,
        tar = e.target || e.srcElement
      _self.listClick.call(_self, tar)
    })
  }
  // 原型方法放中间
  TodoList.prototype = {
    getConfig: function () {
      // 获取data-属性
      // [兼容性问题] elementNode.dataset.属性
      return JSON.parse(this.node.getAttribute('data-config'))
      // var config = this.node.dataset.config
    },
    setConfig: function () {
      var config = this.config,
        node = this.node

      this.inputArea = node.getElementsByClassName(config.inputArea)[0]
      this.addBtn = this.inputArea.getElementsByClassName(config.addBtn)[0]
      this.plusBtn = node.getElementsByClassName(config.plusBtn)[0]
      this.oList = node.getElementsByClassName(config.list)[0]
      this.content = this.inputArea.getElementsByClassName('content')[0]
      console.log(this)
    },
    showInput: function () {
      // 保证this指向TodoList
      var _self = this

      if (this.inputShow) {
        setInputShow.call(_self, 'close')
      } else {
        setInputShow.call(_self, 'open')
      }
    },
    addBtnClick: function () {
      var _self = this,
        content = this.content.value,
        contentLen = content.length,
        oItems = this.oList.getElementsByClassName('item'),
        itemLen = oItems.length,
        text

      if (contentLen <= 0) return

      if (itemLen > 0) {
        for (let i = 0; i < itemLen; i++) {
          text = elemChildren(oItems[i])[0].innerText

          if (text === content) {
            alert('已存在该项')
            return
          }
        }
      }

      if (this.isEdit) {
        elemChildren(oItems[this.curIdx])[0].innerText = content
        setInputStatus.apply(_self, [oItems, null, 'add'])
      } else {
        var oLi = document.createElement('li')
        oLi.className = this.itemClass
        oLi.innerHTML = itemTpl(content)
        this.oList.appendChild(oLi)
      }
      setInputShow.call(_self, 'close')
    },
    listClick: function (tar) {
      var _self = this,
        className = tar.className,
        oParent = elemParent(tar, 2),
        oItems = this.oList.getElementsByClassName('item'),
        itemLen = oItems.length,
        item

      if (className === 'edit-btn fa fa-edit') {
        console.log('编辑')
        for (let i = 0; i < itemLen; i++) {
          item = oItems[i]
          item.className = 'item'
        }
        oParent.className += ' active'
        setInputShow.call(_self, 'open')
        setInputStatus.apply(_self, [oItems, oParent, 'edit'])
      } else if (className === 'remove-btn fa fa-times') {
        console.log('删除')
        oParent.remove()
      }
    }
  }

  // 工具函数写在最下面
  function setInputShow(action) {
    var oItems = this.oList.getElementsByClassName('item')

    if (action === 'open') {
      this.inputArea.style.display = 'block'
      this.inputShow = true
    } else if (action === 'close') {
      this.inputArea.style.display = 'none'
      this.inputShow = false
      this.content.value = ''
      setInputStatus.apply(this, [oItems, null, 'add'])
    }
  }

  function errorInfo(key) {
    return new Error(
      '您没有配置参数' +
        key +
        '\n' +
        '必须配置的参数列表如下: \n' +
        '打开输入框按钮元素类名: plusBtn\n' +
        '输入框区域元素类名: inputArea\n' +
        '增加项目按钮元素类名: addBtn\n' +
        '列表承载元素类名: list\n' +
        '列表项承载元素类名: itemClass'
    )
  }

  function itemTpl(text) {
    return `<p class="item-content">${text}</p>
        <div class="btn-group">
          <a href="javascript:;" class="edit-btn fa fa-edit"></a>
          <a href="javascript:;" class="remove-btn fa fa-times"></a>
        </div>
        `
  }

  function setInputStatus(oItems, target, status) {
    if (status === 'edit') {
      var idx = Array.prototype.indexOf.call(oItems, target),
        text = elemChildren(target)[0].innerText

      this.addBtn.innerText = `编辑第${idx + 1}项`
      this.isEdit = true
      this.curIdx = idx
      this.content.value = text
    } else if (status === 'add') {
      var itemLen = oItems.length,
        item

      for (let i = 0; i < itemLen; i++) {
        item = oItems[i]
        item.className = 'item'
      }
      this.addBtn.innerText = '增加项目'
      this.isEdit = false
    }
  }
  new TodoList()
})(document.getElementsByClassName('wrap')[0])
