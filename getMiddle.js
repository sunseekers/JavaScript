//根据传入的字符串，如果长度为偶数，返回中间两个字母，如果为奇数则返回中间的字符
//string.substr() 截取指定长度的字符串
function getMiddle(str) {
  let numStyle = 0
  let len =str.length
  let index = 0
  len % 2 === 0 ? numStyle = 0 : numStyle = 1
  if (numStyle === 0 ){
    index = len/2-1
    return str.substr(index,2)
  }else {
    index = parseInt(len/2)
    return str.substr(index,1)
  }
}
//简洁写法 Math.ceil() 函数返回大于或等于一个给定数字的最小整数(向上取整)
function getMiddle(str){
  return str.substr(Math.ceil(str.length/2 - 1),str.length % 2 ===0 ? 2 : 1)
} 