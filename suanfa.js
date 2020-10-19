//二分法查找
function bsearch(A,x){
  let l = 0 ,//查找范围的左边届
    r = A.length -1 ,//查找的右边界
    guess //猜想位置
  while(l<=r){
    guess = Math.floor((l+r)/2)
    if(A[guess] === x )return guess
    else if(A[guess]>x) r = guess -1
    else l = guess+1
    //循环不变式，1.新查找范围左，2.新查找范围右
  }
}
