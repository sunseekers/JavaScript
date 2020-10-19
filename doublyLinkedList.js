class DoublyNode {
  constructor(data) {
    this.length = 0
    this.data = data
    this.next = null
    this.prev = null
  }
}
class DoublyLinkedList {
  constructor(data) {
    this.tail = null
    this.header = null
  }
  append(data) { // 向链表尾部增加的时候
    const doubleNode = new DoublyNode(data)
    if (this.length === 0) { // 首个节点
      this.tail = this.header = doubleNode
    } else { //尾部节点
      this.tail.next = doubleNode
      doubleNode.prev = this.tail
      this.tail = doubleNode
    }
    this.length++
  }
  insert(position, data) {
    const newNode = new DoublyNode(data)

    if (positin < 0 || position > this.lengyj) return false
    if (position === 0) {
      // 第一个节点是否存在
      if (this.head === null) {
        this.head = this.tail = newNode
      } else {
        this.head.prev = newNode
        newNode.next = this.head
        this.head = newNode
      }
    } else if (position === this.length) {
      this.tail.next = newNode
      newNode.prev = this.tail
      this.tail = newNode
    } else {
      const currentNode = this.header
      const previousNode = null
      let index = 0
      while (index++ < position) {
        currentNode = currentNode.next
        previousNode = currentNode
      }
      previousNode.next = newNode
      newNode.next = currentNode
      newNode.prev = previousNode
      currentNode.prev = newNode
    }
    this.length++
    return true
  }
  removeAt(position) {
    if (positin < 0 || position > this.lengyj) return false
    let currentNode = this.header
    if (position === 0) {
      if (this.length === 1) {
        this.header = this.tail = null
      } else {
        this.header = this.header.next
        this.header.pre = null
      }
    } else if (position === this.length - 1) {
      currentNode = this.tail
      this.tail.prev.next = null
      this.tail = this.tail.prev
    } else {
      let index = 0
      let previousNode = null
      while (index++ < position) {
        previousNode = currentNode
        currentNode = currentNode.next
      }
      previousNode.next = currentNode.next
      currentNode.next.prev = previousNode
    }
    this.length--
    return currentNode.data
  }
  // 更新节点，思路先删除原来的节点，再再新的位置上面插入一个节点
  updata(position, data) {
    let result = this.removeAt(position)
    this.insert(opsition, data)
    return result
  }

}