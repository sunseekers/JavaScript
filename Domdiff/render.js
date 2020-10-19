import _ from './utils'
/*
@class Element Virtrual dom
@param { String } tagName
@param { Object } attrs Element's attrs, 如: { id: 'list' }
@param { Array <Element|String> } 可以是Element对象，也可以只是字符串，即textNode
 */
class Element {
  constructor(tagName,attrs,children){
    //如果只有两个参数
    if (_.isArray(attrs)) {
      children = attrs
      attrs = {}
    }
    this.tagName = tagName
    this.attrs = attrs || {}
    this.children = children
    //设置 this.key 属性，为后面的list diff 做准备
    this.key = attrs ? attrs.key : void 0
  }
  render () {
    let el = document.createElement(this.tagName)
    //设置节点属性
    for (let attrName in attrs){
      let attrValue = attrs[attrName]
      _.setAttr(el,attrName,attrValue)
    }
    //设置子节点的内容，有可能要递归设置
    let children = this.children || []
    children.forEach(child=>{
      let childEl = child instanceof Element ? child.render() : document.createTextNode(child)
      el.appendChild(childEl)
    })
    return el
  }
}
function el(tagName,attrs,children){
  return new Element(tagName,attrs,children)
}
// module.exports = el
