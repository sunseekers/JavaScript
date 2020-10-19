//基数排序，先排个位数，再排十位数，依次类推
//buckets[digit].push(number)表示digit是几，就在第几项加入数字
function radix_sort(A){
  const max = Math.max(...A)
  const buckets = Array.from({length:10},()=>[])
  let m = 1
  while(m<max){
    A.forEach(number=>{
      const digit = ~~ (number % (m*10)/m) //个位数排序,十位百位
      buckets[digit].push(number)
    })
    let j = 0
    buckets.forEach(bucket=>{
      while(bucket.length>0){
        A[j++]=bucket.shift()//个位排序，十位排序
      }
    })
    m*=10
  }
}
const A = [12,3,67,90,1,3433,222222]
radix_sort(A)
console.log(A)


//桶排序
function insertion_sort(A){
  for(let i=1;i<A.length;i++){
    let p = i-1
    const x = A[p+1]
    while(p>=0&&A[p]>x){
      A[p+1] = A[p]
      p--
    }
    A[p+1] = x
  }
}
function bucket_sort(A,k,s){
  const buckets = Array.from({length:10},()=>[])
  //放入桶中
  for(let i = 0;i<A.length;i++){
    const index = ~~(A[i]/s)
    buckets[index].push(A[i])
  }
  //排序每只桶
  for(let i = 0;i<buckets.length;i++){
    insertion_sort(buckets[i])
  }
  //取出数据
  return [].concat(...buckets)

}
