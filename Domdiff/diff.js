const REPLACE = 0
const ATTRS = 1
const TEXT = 2
const REORDER = 3
//diff 入口，比较新旧两棵树的差异
function diff (oldTree,newTree){
  let index = 0
  let patches = {}//用来记录每一个节点差异的补丁对象
  walk(oldTree,newTree,index,patches)
  return patches
}
/**
 * walk 遍历查找节点差异
 * @param  { Object } oldNode
 * @param  { Object } newNode
 * @param  { Number } index   - currentNodeIndex
 * @param  { Object } patches - 记录节点差异的对象
 */
function walk(oldNode,newNode,index,patches){
  let currenPatch = []
  if (newNode === null || newNode === undefined) {
    // 先不做操作, 具体交给 list diff 处理
  }else if (_.isString(oldNode)&&_.isString(newNode)){
    // 比较文本之间的不同
    if (newNode !== oldNode) currenPatch.push({type:TEXT,content:newNode})
  }else if (oldNode.tagName === newNode.tagName && oldNode.key === newNode.key){
    // 比较attrs的不同
    let attrsPatches = diffAttrs(oldNode,newNode)
    if(attrsPatches){
      currentPatch.push({ type: ATTRS, attrs: attrsPatches })
    }
    // 递归进行子节点的diff比较
    diffChildren(oldNode.children, newNode.children, index, patches)
  }else {
    currentPatch.push({ type: REPLACE, node: newNode})
  }
  if(currenPatch.length){
    patches[index] = currenPatch
  }
}
 function diffAttrs(oldNode,newNode){
  let count = 0
   let oldAttrs = oldNode.attrs
   let newAttrs = newNode.attrs
   let key,value
   let attrsPatches = {}
   // 如果存在不同的 attrs
   for( key in oldAttrs){
     value = oldAttrs[key]
     // 如果 oldAttrs 移除掉一些 attrs, newAttrs[key] === undefined
     if(newAttrs[key]!==value){
       count++
       attrsPatches[key] = newAttrs[key]
     }
   }
   // 如果存在新的 attr
   for (key in newAttrs) {
     value = newAttrs[key]
     if (!oldAttrs.hasOwnProperty(key)) {
       count++
       attrsPatches[key] = value
     }
   }
   if (count === 0) {
     return null
   }
   return attrsPatches
 }
// 设置节点唯一标识
let key_id = 0
function diffChildren(oldChildren, newChildren, index, patches) {
// 存放当前node的标识，初始化值为 0
  let currentNodeIndex = index
  oldChildren.forEach((child,i)=>{
    key_id++
    let newChild = newChildren[i]
    currentNodeIndex = key_id
    // 递归继续比较
    walk(child, newChild, currentNodeIndex, patches)
  })
}

/**
 * Diff two list in O(N).
 * @param {Array} oldList - 原始列表
 * @param {Array} newList - 经过一些操作的得出的新列表
 * @return {Object} - {moves: <Array>}
 *                  - moves list操作记录的集合
 */
function diff(oldList,newList,key){
  let oldMap = getKeyIndexAndFree(oldList,key)
  let newMap = getKeyIndexAndFree(newList,key)
  let newFree = newMap.free
  let oldKeyIndex = oldMap.keyIndex
  let newKeyIndex = newMap.keyIndex
  //记录所有的move操作
  let moves = []
  // a simulate list
  let children = []
  let i = 0
  let item
  let itemKey
  let freeIndex = 0
  // newList 向 oldList 的形式靠近进行操作
  while (i < oldList.length){
    item = oldList[i]
    itemKey = getItemKey(item.key)
    if (itemKey) {
      if (!newKeyIndex.hasOwnProperty(itemKey)) {
        children.push(null)
      } else {
        let newItemIndex = newKeyIndex[itemKey]
        children.push(newList[newItemIndex])
      }
    }
    i++
  }
  let simulateList = children.slice(0)
  //移除列表中一些不存在的元素
   i = 0
  while (i<simulateList.length){
    if (simulateList[i] === null){
      remove(i)
      removeSimulate(i)
    }else{
      i++
    }
  }
  // i  => new list
  // j  => simulateList
  let j = i = 0
  while (i<newList.length){
    item = newList[i]
    itemKey = getItemKey(item,key)
    if(simulateItem){

    }
  }
}

/**
 * 将list 转变成 key-item keyIndex 对象的形式进行展示
 * @param {Arrya} list
 * @param {String|Function} key
 * **/
function getKeyIndexAndFree(list,key){
  let keyIndex = {}
  let free = []
  for (let i = 0,len = list.length; i < len; i++) {
    let item = list[i]
    let itemKey = getItemKey(item, key)
    if (itemKey) {
      keyIndex[itemKey] = i
    } else {
      free.push(item)
    }
  }
  return {
    keyIndex: keyIndex,
    free: free
  }
}
function getItemKey(item,key){
  if (!item||!key) return void 0
  return typeof key === 'string'
  ? item[key] : key(item)
}
// 记录remove操作
function remove(index) {
  let move = {index:index,type:0}
  moves.push(move)
}
//记录instert操作
function insert(index,item){
  let move = {index:index,item:item,type:1}
  moves.push(move)
}
// 移除simulateList中对应实际list中remove掉节点的元素
function removeSimulate(index){
  simulateList.splice(index, 1)
}
