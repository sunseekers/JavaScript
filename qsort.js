function swap(A,i,j){
   [A[i],A[j]]=[A[j],A[i]]
}
function partition(A,lo,hi){
  const pivot = A[hi-1]
  let i = 0,j = hi -1
  //小于中心点的位置[lo,i)
  //大于中心点的位置[j,hi-1)
  //未确定的位置[i,j)
  while(i!==j){
    if(A[i]>pivot){
      swap(A,i,--j)
    }else{
      i++
    }
  }
  swap(A,j,hi-1)
  return j
}
function qsort(A,lo=0,hi=A.length){
  if(hi-lo<=1)return
  const p = partition(A,lo,hi)
  qsort(A,lo,p)
  qsort(A,p,hi)
}
const A = [1,56,2,8,23,60]
qsort(A)
