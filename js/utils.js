/**
 * 事件监听
 * @param {*} el 
 * @param {*} type 
 * @param {*} fn 
 */
function addEvent(el, type, fn) {
  if (el.addEventListener) {
    el.addEventListener(type, fn, false)
  } else if (el.attachEvent) {
    el.attachEvent('on' + type, function() {
      handle.call(el)
    })
  } else {
    el['on' + type] = fn
  }
}

/**
 * 获取滚动条距离
 * @returns 
 */
function getScrollOffset() {
  if (window.pageXOffset) {
    return {
      left: window.pageXOffset,
      top: window.pageYOffset
    }
  } else {
    /**
     * 为啥下面要加起来？
     * 因为下面的两个数值，仅存在一方有值，如：
     * document.body.scrollLeft 或者 document.documentElement.scrollLeft
     */
    return {
      left: document.body.scrollLeft + document.documentElement.scrollLeft,
      top: document.body.scrollTop + document.documentElement.scrollTop
    }
  }
}

/**
 * 获取视口宽高
 * @returns 
 */
function getViewportSize() {
  // W3C规范
  if(window.innerWidth) {
    return {
      width: window.innerWidth,
      height: window.innerHeight
    }
  } else {
    // 浏览器-怪异模式
    if (document.compatMode === "BackCompat") {
      return {
        width: document.body.clientWidth,
        height: document.body.clientHeight
      }
    } else {
      // 浏览器-标准模式
      return {
        width: document.documentElement.clientWidth,
        height: document.documentElement.clientHeight
      }
    }
  } 
}

/**
 * 获取文档宽高
 * @returns 
 */
function getScrollSize() {
  // W3C规范
  if (document.body.scrollHeight) {
    return {
      width: document.body.scrollWidth,
      height: document.body.scrollHeight
    }
  } else {
    return {
      width: document.documentElement.scrollWidth,
      height: document.documentElement.scrollHeight
    }
  }
}
/**
 * 找子元素
 * @param {*} node 
 * @returns 
 */
function elemChildren(node) {
  if(!node) return
  var temp = {
    "length": 0,
    "splice": Array.prototype.splice
  }
  len = node?.childNodes.length

  for (let i = 0; i < len; i++) {
    const childItem = node.childNodes[i];
    
    if (childItem.nodeType === 1) {
      temp[temp.length] = childItem
      temp['length']++
    }
  }
  return temp
}
/**
 * 找父元素
 * @param {*} node 
 * @param {*} n 第几个父级元素
 * @returns 
 */
function elemParent(node, n) {
  var type = typeof(n)

  if (type === "undefined") {
    return node.parentNode
  } else if (n <= 0 || type !== "number") {
    return undefined
  }

  while(n) {
    node = node.parentNode
    n--;
  }
  return node;
}