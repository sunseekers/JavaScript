# Ajax与Comet
Ajax：能够向服务器请求额外的数据而无须卸载页面，给用户带来更好的用户体验；

<b>Ajax技术的核心是XMLHttpRequest对象</b>（简称XHR）；Ajax通信与数据 格式无关；这种技术就是无须刷新页面即可从服务器取得数据，但不一定是XML数据；

创建XMLHttpRequest对象
```python
var xhr=new XMLHttpRequest();
xhr.open('get',"example.php",false);//启动一个请求以备发送
xhr.send(null);//发送请求

```
适应XHR对象时，要调用的第一个方法是open(),接受三个参数，要发送请求的类型(get,post),请求的URL和表示是否异步发送请求的布尔值；