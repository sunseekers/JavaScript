function bubble_sort(A){
  for(let i=A.length-1;i>=1;i--){
    for(let j =0 ;j<=i;j++){
      A[j-1]>A[j]&&swap(A,j-1,j)//如果前面的数大就交换位置
    }
  }
}
function swap(A,i,j){
  const t = A[i]
  A[i]=A[j]
  A[j]=t
}
// 执行时间大概是：（N^2-N)/2
