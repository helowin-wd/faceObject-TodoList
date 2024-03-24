;(function (node) {
  var TodoList = function () {
    var _self = this;
    this.node = node;
    this.inputShow = false;

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
    for(var key in this.dConfig) {
      if(!this.config.hasOwnProperty(key)) {
        return
      }
    }

    this.setConfig()

    addEvent(this.plusBtn, 'click', function() {
      // 保证this指向TodoList
      _self.showInput(_self, "open")
    })

  }

  TodoList.prototype = {
    getConfig: function () {
      // 获取data-属性
      // [兼容性问题] elementNode.dataset.属性
      return JSON.parse(this.node.getAttribute('data-config'))
      // var config = this.node.dataset.config
    },
    setConfig: function() {
      var config = this.config,
      node = this.node;

      this.inputArea = node.getElementsByClassName(config.inputArea)[0]
      this.addBtn = this.inputArea.getElementsByClassName(config.addBtn)[0]
      this.plusBtn = node.getElementsByClassName(config.plusBtn)[0]
      this.oList = node.getElementsByClassName(config.list)[0]
      this.content = this.inputArea.getElementsByClassName('content')[0]
    },
    showInput: function() {
      // 保证this指向TodoList
      var _self = this;

      if (this.inputShow) {
        setInputShow.call(_self, "close")
      } else {
        setInputShow.call(_self, "open")
      }
    }
  }

  function setInputShow(action) {
    if (action === "open") {
      this.inputArea.style.display = 'block' 
      this.inputShow = true
    } else if (action === 'close') {
      this.inputArea.style.display = 'none' 
      this.inputShow = false
    } 
  }

  function errorInfo(key) {
    return new Error(
      '您没有配置参数' + key + '\n' + 
      '必须配置的参数列表如下: \n' + 
      '打开输入框按钮元素类名: plusBtn\n' + 
      '输入框区域元素类名: inputArea\n' + 
      '增加项目按钮元素类名: addBtn\n' + 
      '列表承载元素类名: list\n' + 
      '列表项承载元素类名: itemClass'
    )
  }
  new TodoList()
})(document.getElementsByClassName('wrap')[0])
