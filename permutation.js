function fib(n){
  let a =1,b=1;
  for(let i =2;i<=n;i++){
    [b,a]=[a+b,b]
  }
  return b
}
function steps(n){
  const s = [1,1]
  for(let i = 2;i<=n;i++){
    s[i] = s.reduce((a,b)=>a+b)
  }
  return s.pop()
}
