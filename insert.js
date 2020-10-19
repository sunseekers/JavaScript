//在一段有序数组中插入一个数字
const array = [1,2,4,8,9]
const b = 3
const index = array.find(a=>a>b)
if(index===undefined){
  array.push(b)
}else{
  array.splice(index,0,b)
}
//简化版
const index1 = array.indexOf(b)
array.splice(index1===-1?array.length:index1,0,b)
//原始实现方式
function inster(A,x){
  //p指向下一个要比较的元素
  //p+1指向空位
  let p = A.length-1
  while(p>=0&&A[p]>x){
    A[p+1] = A[p]
    p--
  }
  A[p+1]=x
}
//整个插入排序的过程
//1.数组的第一个元素和后面一个元素比较
function insertion_sort(A){
  for(let i = 1;i<A.length;i++){//主循环执行N-1次
    insetr(A,i,A[i])
  }
}
function insetr(A,i,x){
  let p = i-1
  while(p>=0&&A[p]>x){//执行时间不定，最好不走循环提，最坏数组是倒叙
    A[p+1]=A[p]
    p--
  }
  A[p+1]=x
}
// 执行时间大概是：（N^2-N)/2
