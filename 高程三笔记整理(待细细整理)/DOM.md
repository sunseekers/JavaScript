# DOM
DOM（文档对象模型）是针对HTML和XML文档的一个API（应用程序编程接口）；DOM描绘了一个层次化节点树，允许开发人员添加，移除和修改页面的某一部分

## 1.节点层次（用的不多）
>* Node类型

>* Document类型

>* Element类型

>* Text类型

>* Comment类型

>* CDATASetion类型

>* DocumentFragment类型 

每个节点都有一个childNodes属性，其中保存着一个NodeList对象；
NodeList：是一种类数组对象，用于保存一组有序的节点，可以通过位置来访问这些节点；


> <b>NodeList对象：</b>是基于DOM结构动态执行查询的结果，因此DOM结构的变化能够自动反映在NodeList对象中，NodeList是有生命的有呼吸的对象，而不是在我们第一次访问她们的某个瞬间拍摄下来的一张快照；

> <b>HTMLCollection：</b>接口表示一个包含了元素（元素顺序为文档流中的顺序）的通用集合（generic collection），还提供了用来从该集合中选择元素的方法和属性

> getElementById()获取页面中的ID值属性的元素；如果页面中多个元素的ID值相同，getElementById()只返回文档中第一次出现的元素；ID值在页面中唯一；

> getElementsByClassName()接受一个参数，既包含一个或多个类名的字符串返回带有指定类的所有元素的<b>NodeList</b>；

> getElementsByTagName()的标签名是不需要区分大小写的；

> getElementsByName(),取得单选按钮；

> document.forms:包含文档中所有的< form >元素，与document.getElementsByTagName('form')得到相同的结果；

> document.images:同上；

> document.createTextNode():创建文本节点

> document.createElement():创建元素节点

> document.createDocumentFragment():创建文档片段

加载外部样式文件的过程是异步的，也就是加载样式与执行JavaScript代码的过程没有固定的次序；

一般来说，应该尽量的减少访问NodeList的次数，每次访问NodeList，都会运行一次基于文档的查询。开销巨大；

## 选择符API
querySelector()方法接受一个CSS选择符，返回与该模式匹配的第一个元素，如果找不到返回null；

querySelectorAll()方法接受一个CSS选择符，返回是一个<b>NodeList的实例,</b>如果没有找到匹配的元素，NodeList就是空的；
```phtyon
//querySelector()
var div=document.querySelector('.div');
//querySelectorAll()
var div=document.querySelectorAll(".div);
```
## 元素遍历
> childElementCount:返回子元素的个数（不包括文本节点和注释）;
> firstElementChild: 指向第一个元素；
> lastElementChild:指向最后一个元素；
> previousElemetSibling: 指向前一个同辈元素；
> nextElementSibling: 指向后一个同辈元素；

## classList属性
> 添加一个value类: div.classList.add(value);

> 删除一个value类: div.classList.remove(value);

> 切换一个value类: div.classList.toggle(value);

> 判断元素是否含有既定的类名: div.classList.contains(value);

## 焦点管理
> 获取焦点： document.getElementById("#div").focus();

>判断文档是否获取得了焦点: document.getElementById("#div").hasFocus();

## 插入标记
document.getElementById("#div").<b>innerHTML="Hello world";</b>
在使用innerHTML之前，最好先手动删除要被替换元素的所有事件处理程序和JavaScript对象的属性；性能问题，不要频繁去操作

## 访问元素的样式

style对象是CSSStyleDeclaration的实例，包含着通过HTML的style特性指定的所有样式信息，但不包含与外部样式表或嵌入样式表经层叠而来的样式；

在JavaScript中访问或修改样式时，必须将其进行转换成驼峰大小写的形式；但float是个特例，因为float是保留字，所有应该写成<b>cssFloat</b>;在实践中最好始终保持指定度量单位；

> 其他的计算操作样式表的样式，不做讲解，有需要可自行百度；

## 元素的大小

>* offsetHeight: 元素在垂直方向上占用的空间大小，以像素计。
>* offsetWidth: 元素在水平方向上占用的空间大小，以像素计。
>* offsetLeft: 元素的左外边框至包含元素的左内边框之间的像素距离。
>* offsetTop: 元素的上外边框至包含元素的上内边框之间的像素距离。
>* clientWidth: 元素的内容区域宽度加左右内边距的宽度；
>* clientHeight: 元素的内容区域高度加上下内边距的宽度；

<img src="img/offset.png"/>
如果要知道某个元素在页面上的偏移量，则需要将这个offsetLeft和offsetTop与其offsetParenr的相同属性相加，循环到根元素，就可以得到一个基本准确的值

### 鼠标事件在浏览器视口的特定位置
> event.clientX/event.clientY:表示事件发生时鼠标指针在视口中水平和垂直坐标

> event.pageX/event.pageY:表示事件发生时鼠标指针在页面中水平和垂直坐标
<img src="img/clientX.png"/>
