# BOM
BOM提供了很多对象，用于访问浏览器的功能，功能和任何网页内容没有关系；
BOM的核心对象是window；window双重身份，既是JavaScript访问浏览器窗口的一个接口，又是ECMAScript规定的Global对象；

## 全局作用域
在全局作用域中声明的变量，函数都会变成了window对象的属性和方法
## location对象
location是最有用的BOM对象之一，他提供了与当前窗口中加载的文档有关的信息；location对象既是window对象的属性也是document对象的属性；
属性
>* [location.hash](http://www.w3school.com.cn/jsref/prop_loc_hash.asp):返回URL中hash（#号后面零或多个字符），如果URL中不包含散列，则返回空字符串

>* [location.host](http://www.w3school.com.cn/jsref/prop_loc_host.asp):可设置或返回当前 URL 的主机名称和端口号。

>* [location.href](http://www.w3school.com.cn/jsref/prop_loc_href.asp):可设置或返回当前显示的文档的完整 URL。

>* [location.search](http://www.w3school.com.cn/jsref/prop_loc_search.asp):可设置或返回当前 URL 的查询部分（问号 ? 之后的部分）;

>* [location.path.name](http://www.w3school.com.cn/jsref/prop_loc_pathname.asp):可设置或返回当前 URL 的路径部分。

## [navigator](http://www.w3school.com.cn/jsref/dom_obj_navigator.asp) 对象
navigation对象：识别客户端浏览器的事实标准

## [screen](http://www.w3school.com.cn/jsref/dom_obj_screen.asp)对象：在编程中用处不大

## [history](http://www.w3school.com.cn/jsref/dom_obj_history.asp)对象:在编程中用处不大
