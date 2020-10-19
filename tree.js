class Node {
  constructor(key) {
    this.key = key
    this.left = null
    this.right = null
  }
}
export class BinarySearchTree {
  constructor() {
    this.root = null
  }
  insert(key) {
    const newNode = new Node(key)
    if (this.root == null) {
      this.root = newNode
    } else {
      this.insertNode(this.root, newNode)
    }
  }
  insertNode(root, node) {
    if (node.key < root.key) { //左边查找插入
      if (root.key === null) {
        root = node
      } else {
        this.insertNode(root.left, node)
      }
    } else {
      if (root.key === null) {
        root = node
      } else {
        this.insertNode(root.right, node)
      }
    }
  }
  // 二叉树遍历
  // 先序遍历
  preorderTraversal() {
    let result = []
    this.preorderTraversalNode(this.root, result)
    return result
  }
  preorderTraversalNode(node, result) {
    if (node === null) {
      result.push(node)
    }
    result.push(node)
    this.preorderTraversalNode(node.left, result)
    this.preorderTraversalNode(node.right, result)
  }
  // 中序遍历（左根右 LDR）
  inorderTraversal() {
    const result = [];
    this.inorderTraversalNode(this.root, result);
    return result;
  }

  inorderTraversalNode(node, result) {
    if (node === null) return result;
    this.inorderTraversalNode(node.left, result);
    result.push(node.key);
    this.inorderTraversalNode(node.right, result);
  }

  // 后序遍历（左右根 LRD）
  postorderTraversal() {
    const result = [];
    this.postorderTraversalNode(this.root, result);
    return result;
  }

  postorderTraversalNode(node, result) {
    if (node === null) return result;
    this.postorderTraversalNode(node.left, result);
    this.postorderTraversalNode(node.right, result);
    result.push(node.key);
  }
  // 获取二叉搜索树最小的值
  min() {
    if (!this.root) return null
    let node = this.root
    while (node.left) {
      node = node.left
    }
    return node.key
  }
  // 获取二叉搜索树最大的值
  max() {
    if (!this.root) return null
    let node = this.root
    while (node.right) {
      node = node.right
    }
    return node.right
  }
  // search(key) 查找二叉搜索树中是否有相同的key，存在返回 true，否则返回 false
  search(key) {
    this.serachNode(this.root, key)
  }
  //递归实现
  serachNode(node, key) {
    if (node === null) return false
    if (node.key < key) { //右边找
      this.serachNode(node.right, key)
    } else if (node.key > key) { //左边找
      this.serachNode(node.left, key)
    } else {
      return true
    }
  }
  // 通过 while 循环实现
  search1(key) {
    let node = this.root
    while (node != null) {
      if (node.key > key) {
        node = node.left
      } else if (node.key < key) {
        node = node.right
      } else {
        return true
      }
    }
    return false
  }
  remove(key) {
    let current = this.root
    let parentNode = null
    let isLeftChild = true
    // 循环查找到要删除的节点 currentNode，以及它的 parentNode、isLeftChild
    while (current.key != key) {
      parentNode = current

      if (current.key > key) {
        current = current.left
        isLeftChild = true
      } else {
        current = current.right
        isLeftChild = false
      }
      if (current == null) {
        return false
      }
    }
    // 找到了要删除的节点
    // 如果是叶子节点
    if (current.left === null && current.right === null) {
      if (current === this.root) {
        this.root = null
      } else if (isLeftChild) {
        parentNode.left = null
      } else {
        parentNode.right = null
      }
    } else if (current.right === null) { // 如果叶子节点底下有一个节点
      if (current === this.root) {
        this.root = current.left
      } else if (isLeftChild) {
        parentNode.left = current.left
      } else {
        parentNode.right = current.left
      }
    } else if (current.left === null) {
      if (current === this.root) {
        this.root = current.left
      } else if (isLeftChild) {
        parentNode.left = current.right
      } else {
        parentNode.right = current.right
      }
    } else {
      // 3、删除的是有两个子节点的节点
      // 找到后续节点
      let successor = this.getSuccessor(current)
      if (current === this.root) {
        this.root = successor
      } else if (isLeftChild) {
        parentNode.left = successor
      } else {
        parentNode.right = successor

      }
    }

  }
  // 这里只考虑了一种情况，删除左子树
  getSuccessor(delNode) {
    // 定义变量，保存要找到的后续
    let successor = delNode
    let current = delNode.right
    let successorParent = delNode
    // 循环查找 current 的右子树节点
    while (current !== null) {
      successorParent = successor
      successor = current
      current = current.left
    }
    // 判断寻找到的后续节点是否直接就是要删除节点的 right
    if (successor !== delNode.right) {
      successorParent.left = successor.right
      successor.right = delNode.right
    }
    return successor
  }
}