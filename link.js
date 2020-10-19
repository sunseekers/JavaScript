//单向列表
class LinkedList{
  constructor(){
    this.head = null
  }
  insert(node){//O(1)
    if(this.head!==null){
      node.next = this.head
    }
    this.head = node
  }
  find(node){//))O(n)
    let p = this.head
    while(p&&p!==node){
      p = p.next()
    }
    return p
  }
}
//队列
class Queue {
  enqueue(item){
    if(this.size===this.max){
      throw 'Queue Overflow'
    }
    this.data[this.p++] = item
    this.size++
    if(this.p == this.max){
      this.p = 0
    }
  }
  dequeue(){
    if(this.size==0){
      throw 'Queue Underflow'
    }
    const item = this.data[this.q++]
    this.size--
    if(this.q===this.max){
      this.q=0
    }
    return item
  }
}

//反转二叉树
function reverseBTress(node){
  if(!node){
    return
  }
  const tmp = node.left
  node.left = node.right
  node.right = tmp
  reverseBTress(node.right)
  reverseBTress(node.left)
}

//a.name=ramroll&a.dress&x=1&y=

function parse(str){
  return str.split('&').reduce((o,kv)=>{
    const [key,value] = kv.split('=')
    if(!value){
      return o
    }
    // o[key] = value
    deep_set(o,kv.split(/[\[\]]/g).filter(x=>x),value)
    return o
  },{})
}
function deep_set(o,path,value){
  debugger
  let i = 0;
  for(;i<path.length-1;i++){
    if(o[path[i]]===undefined){
      if(path[i+1].match(/^\d+$/)){
          o[path[i]]=[]
        }else{
        o[path[i]]={}
      }
    }
    o=o[path[i]]//第一次O.a和O指向了同一个地址，从此以后O怎么变，O.a也是一样的
  }
  o[path[i]] = decodeURIComponent(value)
}
console.log(parse('a[name]=fox&a[company]=teach&b=why'))
console.log(parse('a[0]=1&a[1]=2&b=why'))
console.log(parse('a&b&c'))
console.log(parse('color=deep%20Bule'))

//两个栈模仿队列
class Queue{
  constructor(){
    this.s1 = []
    this.s2 = []
  }
  //入队
  enqueue(item){
   this.s1.push(item)
  }
  //出队
  dequeue(){
    while(this.s1.length>0){
      this.s2.push(this.s1.pop())
    }
    if(this.s2.length>0){
      return this.s2.pop()
    }
  }
}

//
function f(w,h){
  const dp = []
  for(let y = 0;y<=h;y++){

  }
}

