class Node {
  constructor(data) {
    this.data = data
    this.next = null
  }
}
class linkedList {
  constructor() {
    this.length = 0
    this.head = null
  }
  append(data) {
    const newNode = new Node(data)

    if (this.length === 0) {
      this.head = newNode.data
    } else {
      // 当 currentNode.next 不为空时，
      // 循序依次找最后一个节点，即节点的 next 为 null 时
      let currentNode = this.head
      while (currentNode.next !== null) {
        currentNode = currentNode.next
      }
      currentNode.next = newNode
      this.next = newNode
    }
    this.length++
  }
  insert(position, data) {
    if (position < 0 || position > this.length) return false
    const newNode = new Node(data);
    if (position === 0) {
      newNode.next = this.head
      this.head = newNode
    } else {
      let currentNode = this.head
      let previousNode = null //head 的 上一节点为 null
      let index = 0
      while (index++ < position) {
        previousNode = currentNode
        currentNode = currentNode.next
      }
      // 在当前节点和当前节点的上一节点之间插入新节点，即它们的改变指向
      newNode.next = currentNode
      previousNode.next = newNode
    }
    this.length++
  }
  getData(position) {
    if (position < 0 || position > this.length) return false
    let currentNode = this.head
    let index = 0
    while (index++ < position) {
      currentNode = currentNode.next
    }
    return currentNode.data
  }
  indexOf(data) {
    let currentNode = this.head
    let index = 0
    while (currentNode) {
      if (currentNode.data === data) {
        return index
      }
      currentNode = currentNode.next
      index++
    }
  }
  update(position, data) {
    if (position < 0 || position > this.length) return false
    let currentNode = this.head
    let index = 0
    while (index++ < position) {
      currentNode = currentNode.next
    }
    currentNode.data = data
    return currentNode
  }
  removeAt(position) {
    if (position < 0 || position > this.length) return null
    let currentNode = this.head
    if (position === 0) {
      this.head = currentNode.next
    } else {
      let previousNode = null
      let index = 0
      while (index++ < position) {
        previousNode = currentNode
        currentNode = currentNode.next
      }
      // 巧妙之处，让上一节点的 next 指向到当前的节点的 next，相当于删除了当前节点
      previousNode.next = currentNode.next
    }
    this.length--
    return currentNode
  }
  // remove(data) 删除指定 data 的节点，并返回删除的那个节点
  remove(data) {
    return this.removeAt(this.indexOf(data));
  }
  size() {
    return this.length
  }
  isEmpty() {
    return this.length === 0
  }
  toString() {
    let currentNode = this.head
    let result = ''
    while (currentNode) {
      result += currentNode.data
      currentNode = currentNode.next
    }
    return result
  }
}