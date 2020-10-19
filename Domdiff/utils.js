const _ = exports
_.setAttr  = function setAttr (node,key,value){
  switch(key){
    case 'style':
      node.style.cssText = value// 通过js去设置样式，可以是多个属性集合的字符串，会覆盖之前的样式
      break;
    case 'value':
      let tagName = node.tagName||''
      tagName = tagName.toLowerCase()
      if(tagName === 'input'||tagName === 'textarea'){
        node.value = value
      } else {
        // 如果节点不是 input 或者 textarea, 则使用 `setAttribute` 去设置属性
        node.setAttribute(key,value)//设置指定元素上的某个属性值。如果属性已经存在，则更新该值；否则，使用指定的名称和值添加一个新的属性。
      }
      break;
    default:
      node.setAttribute(key,value)
      break;
  }
}
_.slice = function slice(arrayLick,index){
  return Array.prototype.slice.call(arrayLick,index)
}
_.type = function type(obj){
  return Object.prototype.toString.call(obj).replace(/\[object\s\]/g,'')
}
_.isArray = function isArray(list){
  return _.type(list) === 'Array'
}
_.toArray = function toArray(listLike){
  if(!listLike) return []
  let list = []
  for(let i = 0 , l = listLike,length;i<l;i++){
    list.push(list[i])
  }
  return list
  //return Array.from(listLike)
}
_.isString = function isString(list){
  return _.type(list) === 'String'
}
_isElementNode = function (node){
  return node.nodeType === 1
}
