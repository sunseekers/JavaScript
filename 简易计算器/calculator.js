window.onload=function () {
	function fun(){
		//定义数组  来接收用户按的数字和计算符号
		var arr=[],
		//获取屏幕元素
			 txt=document.getElementsByClassName('txt')[0];
		//事件监听兼容浏览器
			function addEvent(element,type,handle){
				if(element.addEventListener){
					element.addEventListener(type,handle,false);
				}else if(element.attachEvent){
					element.attachEvent("on"+type,handle);
				}else{
					element['on'+type]=handle;
				}
			}
		//AC和DEL的修改功能
			function change(){
					if(this.value=="AC"){
						arr=[];
						txt.value='';
					}else{
						/* slice() 截断字符串 1.从那个位置开始   2.截取多少长度*/
						txt.value=txt.value.slice(0,txt.value.length-1);
					}
				}
		//数组计算函数
			function calculator(){
					/*
					 * this指代的是当前事件的执行对象
					 * 按完键将值传给屏幕
					 * 判断是否为数字
					 */
					if(txt.value==''&&this.value=="."){
						txt.value="0.";
					}else{
						if(!isNaN(this.value)||this.value=="."){
							/*用户输入的是数字或者点的情况*/
		                    /*indexOf() 用来查找字符  如果有返回当前位置  如果没有返回-1*/
							if(txt.value.indexOf('.')!=-1){
								if(this.value!="."){
									txt.value+=this.value;
								}
							}else{
									txt.value+=this.value;
							}
						}else{
							/*是符号的情况*/
		                    //先存值  在清屏
		                    if(this.value!="="){
		                     /*是符号但不为等号的情况*/
		                        arr[arr.length] = txt.value;
		                        //存符号
		                        arr[arr.length] = this.value;
		                        //清屏
		                        txt.value = "";
		                    }else{
		                        arr[arr.length]=txt.value;
		                        txt.value=eval(arr.join(''));
		                        arr=[];
		                    }	
						}
					}
				}
		return {
			addEvent:addEvent,
			change:change,
			calculator:calculator
		}
	}
	var fun=fun(),
		btn_back=document.getElementsByClassName('btn_click'),
		btn_txt=document.getElementsByClassName('btn');
		
	//给AC，DEL添加点击事件
	for(var i=0;i<btn_back.length;i++){
		fun.addEvent(btn_back[i],"click",fun.change);	
	}
	//遍历循环给每一个给btn_txt数组对象添加事件
	for(var i=0;i<btn_txt.length;i++){
		fun.addEvent(btn_txt[i],"click",fun.calculator);
	}
}
