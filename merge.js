//合并两个有序数组
// A数组
// p左半边开始位置
// q左半边结束位置
// r右半边结束
function merge(A,p,q,r){
  let A1 = A.slice(p,q)//存放左半边的临时空间
  let A2 = A.slice(q,r)//存放右半边的临时空间，slice是一个开区间，刚好可以用
  //追加哨兵
  A1.push(Number.MAX_SAFE_INTEGER)
  A2.push(Number.MAX_SAFE_INTEGER)
  for(let k=p,i=0,j=0;k<r;k++){
    //循环不变式
    //k：下一个写入位置
    //i：A1中会写位置
    //j：A2中会写位置
    A[k] = A1[i] < A2[j] ? A1[i++] : A2[j++]
  }
  return A
}
// const A = [1,3,5,7,2,4,6]
// const B = [3,4,1,2]
// console.log(merge(A,0,4,7))
//一个数组，不断使用递归拆分排序
function merge_sort(A,p,r){
  if(r-p<2){return}//已经是排好序的最后一个元素了
  const q = Math.ceil((p+r)/2)//不断拆分，拆成两个数比较
  debugger
  merge_sort(A,p,q)//左边比较排序
  merge_sort(A,q,r)//右边比较排序
  merge(A,p,q,r)//左右和在一起排序
  console.log(A)
  return A
}

let A = [1,3,2,90,5,7,2,4,6]
merge_sort(A,0,A.length)
console.log(merge_sort(A,0,A.length))
