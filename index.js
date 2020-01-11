class PubSub {
  constructor() {
    this.handles = {}
  }

  // 订阅事件
  on (eventType, handle) {
    if (!this.handles.hasOwnProperty(eventType)) {
      this.handles[eventType] = []
    }

    if (typeof handle === 'function') {
      this.handles[eventType].push(handle)
    } else {
      throw new Error('缺少回调函数')
    }

    return this
  }

  emit(eventType, ...args) {
    if (this.handles.hasOwnProperty(eventType)) {
      this.handles[eventType].forEach((item) => {
        item.apply(null, args) // apply是数组
      })
    } else {
      throw new Error(eventType + '事件未注册')
    }
  }

  off (eventType, handle) {
    if (!this.handles.hasOwnProperty(eventType)) {
      throw new Error(eventType + '事件未注册')
    }

    if (typeof handle !== 'function') {
      throw new Error('缺少回调函数')
    }

    this.handles[eventType].forEach((item, key, arr) => {
      if (item === handle) {
        arr.splice(key, 1)
      }
    })

    return this
  }
} // this 是实现链式操作

// 主题
class Dep {
  constructor(callback) {
    this.subs = []
    this.callback = callback
  }

  addSub(sub) {
    this.subs.push(sub)
    return this
  }

  notify() {
    // 该主题下添加的所有订阅者更新内部数据
    this.subs.forEach(item => item.update(this.callback))
  }
}

// 订阅者 watcher
class Sub {
  constructor(val) {
    this.val = val
  }

  update(callback) {
    this.val = callback(this.val)
  }
}

// 发布者
class Pub {
  constructor() {
    this.deps = []
  }

  addDep(dep) {
    this.deps.push(dep)
  }

  removeDep(dep) {
    let index = this.deps.indexOf(dep)
    if (index !== -1) {
      this.deps.splice(index, 1)
      return true
    } else {
      return false
    }
  }

  publish(dep) {
    this.dep.forEach(item => item === dep && item.notify())
  }
}

let dep1 = new Dep(item => item * item)
dep1.addSub(new Sub(1)).addSub(new Sub(2)).addSub(new Sub(3))

let pub = new Pub()
pub.addDep(dep1)
pub.publish(dep1)

let dep2 = new Dep(item => item + item)
dep2.addSub(new Sub(1)).addSub(new Sub(2)).addSub(new Sub(3))

pub.addDep(dep2)
pub.publish(dep2)
