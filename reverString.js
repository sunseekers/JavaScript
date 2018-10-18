//如果字符串的长度大于5，则翻转长度5以后的字符串
function reverseString(str) {
  let len = str.length
  if (len < 5){
    return 
  } else {
    let strArr = str.slice(5).split('').reverse().join("").trim()
    return str.substr(0,5).concat([' '],strArr)
  }
}
reverseString('hello world wewew')