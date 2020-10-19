export function hashFn(string, limit = 7) {
  const PRIME = 31
  let hashCode = 0
  for (let item of string) {
    hashCode = PRIME * hashCode + item.charCodeAt()
  }
  return hashCode % limit
}
export function isPrime(number) {
  if (number <= 1) return false
  let temp = Math.ceil(Math.sqrt(number))
  for (let i = 2; i < temp; i++) {
    if (number % i === 0) {
      return false
    }
  }
  return true
}

export class HashTable {
  constructor() {
    this.storage = []
    this.count = 0 //存储当前存放元素的个数
    this.limit = 7 // 哈希表的长度
    // 填充因子（已有个数/总个数
    this.loadFactor = 0.75
    this.minLoadFactor = 0.25
  }
  //根据number获取最临近的质数
  getPrime(number) {
    while (!isPrime(number)) {
      number++
    }
    return number
  }
  // 往hash 里面添加数据(假设是一个三位数组)
  // 首先找到应该添加到的一维的下表，然后找到二位数组的地方，最后在添加
  put(key, value) {
    let index = this.storage[this.hashFn(key)] //1、根据 key 获取要映射到 storage 里面的 index（通过哈希函数获取）
    let bucket = this.storage[index] // 2、根据 index 取出对应的 bucket
    if (bucket === undefined) { //3、判断是否存在 bucket
      bucket = []
      this.storage[index] = bucket
    }
    // 4、判断是插入数据操作还是修改数据操作
    for (let i = 0; i < bucket.length; i++) {
      let tuple = bucket[i]
      if (tuple[0] === key) { // 如果 key 相等，则修改数据
        tuple[1] === value // 修改完 tuple 里数据，return 终止，不再往下执行。
        return
      }
    }
    // 5、bucket 新增数据
    this.bucket.push([key, value])
    this.count++
    // 判断哈希表是否要扩容，若装填因子 > 0.75，则扩容
    if (this.count / this.limit > this.loadFactor) {
      this.resize(this.getPrime(this.limit * 2))
    }
  }

  // 根据 get(key) 获取 value
  get(key) {
    let index = this.storage[this.hashFn(key)] //1、根据 key 获取要映射到 storage 里面的 index（通过哈希函数获取）
    let bucket = this.storage[index] // 2、根据 index 取出对应的 bucket
    if (bucket === undefined) { //3、判断是否存在 bucket
      return null
    }
    // 4、判断是插入数据操作还是修改数据操作
    for (let i = 0; i < bucket.length; i++) {
      let tuple = bucket[i]
      if (tuple[0] === key) { // 如果 key 相等，则修改数据
        return tuple[1]
      }
    }
    return null
  }

  // remove(key) 删除指定 key 的数据
  remove(key) {
    let index = this.storage[this.hashFn(key)] //1、根据 key 获取要映射到 storage 里面的 index（通过哈希函数获取）
    let bucket = this.storage[index] // 2、根据 index 取出对应的 bucket
    if (bucket === undefined) { //3、判断是否存在 bucket
      return null
    }
    // 4、判断是插入数据操作还是修改数据操作
    for (let i = 0; i < bucket.length; i++) {
      let tuple = bucket[i]
      if (tuple[0] === key) { // 如果 key 相等，则修改数据
        bucket.splice(i, 1)
        this.count--;
        // 根据装填因子的大小，判断是否要进行哈希表压缩
        if (this.limit > 7 && this.count / this.limit < this.minLoadFactor) {
          this.resize(this.getPrime(Math.floor(this.limit / 2)));
        }
        return tuple
      }
    }
    return null
  }
  isEmpty() {
    return this.count === 0
  }
  size() {
    return this.count
  }
  // 重新调整哈希表大小，扩容或压缩
  resize(newLimit) {
    const oldStorage = this.storage
    this.storage = []
    this.count = 0
    this.limit = newLimit
    // 3、遍历 oldStorage，取出所有数据，重新 put 到 this.storage
    for (let bucket of oldStorage) {
      if (bucket) {
        for (const b of bucket) {
          this.put(b[0], b[1])
        }
      }
    }
  }
}