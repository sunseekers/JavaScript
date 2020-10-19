//实现一个bind函数
Function.prototype.myBind = function (context) {
  if (typeof context !== 'function') {
    throw new TypeError('Error')
  }
  var _this = this
  var argus = [...arguments].slice(1)
  //返回一个函数
  return function F() {
    //因为返回了一个函数，我们可以new F() 所以需要判断
    if (this instanceof F) {
      return new _this(...arfus, ...arguments, )
    }
    return _this.apply(context, args.concat(...arguments))
  }
}
Function.prototype.call2 = function (context) {
  debugger
  // 首先要获取调用call的函数，用this可以获取
  context.fn = this;
  context.fn();
  delete context.fn;
}

//实现一个call函数
Function.prototype.myCall = function (context) {
  debugger
  var context = context || window
  context.fn = this
  var args = Array.from(arguments).slice(1)
  var result = context.fn(...args)
  delete context.fn
  return result
}

//实现一个apply函数
Function.prototype.myApply = function (context) {
  debugger
  var context = context || window
  context.fn = this
  var result
  if (arguments[1]) {
    result = context.slice
  }
  return result
}

let handle = {
  get(target, name) {
    return name in target ? target[name] : 37
  }
}
let p = new Proxy({}, handler)
p.a = 9
p.b = undefined