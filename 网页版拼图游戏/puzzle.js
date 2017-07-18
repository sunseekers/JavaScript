function $(id){
		return document.getElementById(id);
	}

	function puzzle(){
		var time=0,
			pause=true,
			set_timer=null,
			//保存大div当前装的小div的编号
			d_direct=[
				[0],//为了逻辑更简单，第一个元素我们不用，我们从下标1开始使用
		        [2,4],//大DIV编号为1的DIV可以去的位置，比如第一块可以去2,4号位置
		        [1,3,5],
		        [2,6],
		        [1,5,7],
		        [2,4,6,8],
		        [3,5,9],
		        [4,8],
		        [5,7,9],
		        [6,8]
			],
			//保存DIV编号的可移动位置编号
			d_posXY=[
				[0],//同样，我们不使用第一个元素
		        [0,0],//第一个表示left,第二个表示top，比如第一块的位置为let:0px,top:0px
		        [150,0],
		        [300,0],
		        [0,150],
		        [150,150],
		        [300,150],
		        [0,300],
		        [150,300],
		        [300,300]
			],
			//默认按照顺序排好，大DIV第九块没有，所以为0，我们用0表示空白块
			d=[0,1,2,3,4,5,6,7,8,0];
		function move(id){
		var i=1;
		//保存小DIV可以去的编号，0表示不能移动
		var	target_d=0;
		//这个for循环是找出小DIV在大DIV中的位置
		for(i=1;i<10;++i){
			if(d[i]==id)break;
		}
		//用来找出小DIV可以去的位置，如果返回0，表示不能移动，如果可以移动，则返回可以去的位置编号
		target_d=puzzle.whereCanTo(i);
		if(target_d!=0){
			 //把当前的大DIV编号设置为0，因为当前小DIV已经移走了，所以当前大DIV就没有装小DIV了
			d[i]=0;
			d[target_d]=id;
			$('d'+id).style.left=d_posXY[target_d][0]+"px";
			$('d'+id).style.top=d_posXY[target_d][1]+"px";
			//最后设置被点击的小DIV的位置，把它移到目标大DIV的位置
		}
		//如果target_d不为0，则表示可以移动，且target_d就是小DIV要去的大DIV的位置编号
		var finish_flag=true;
		//设置游戏是否完成标志，true表示完成
		for (var k=1;k<9;++k){
			if(d[k]!=k){
				finish_flag=false;
				break;
				//如果大DIV保存的编号和它本身的编号不同，则表示还不是全部按照顺序排的，那么设置为false，跳出循环，后面不用再判断了，因为只要一个不符，就没完成游戏
			}
		}
		//从1开始，把每个大DIV保存的编号遍历一下，判断是否完成
		if(finish_flag==true){
			if(!pause){
				puzzle.start();
				alert('congratulation');
				//如果为true，则表示游戏完成，如果当前没有暂停，则调用暂停韩式，并且弹出提示框，完成游戏。
    //start()这个函数是开始，暂停一起的函数，如果暂停，调用后会开始，如果开始，则调用后会暂停
			}
		}
	}
	  //判断是否可移动函数，参数是大DIV的编号，不是小DIV的编号，因为小DIV编号跟可以去哪没关系，小DIV是会动的
	function whereCanTo(cur_div){
		var j=0,
			move_flag=false;
			for(j=0;j<d_direct[cur_div].length;++j){
				//把所有可能去的位置循坏遍历一下
				if(d[d_direct[cur_div][j]]==0){
					move_flag=true;
					break;
					//如果目标的值为0，说明目标位置没有装小DIV，则可以移动，跳出循环
				}
			}
			if(move_flag == true){
		        return d_direct[cur_div][j];
		    }else{
		        return 0;
		    }
    //可以移动，则返回目标位置的编号，否则返回0，表示不可移动
			
	}
	//定时器函数，每一秒执行一次
	function timer(){
		time+=1;
		var min = parseInt(time/60),
			sec = time%60;//取余就是秒
			$('timer').innerHTML = min +"分"+sec+"秒";//然后把时间更新显示出来	
	}
	//开始暂停函数
	function start() {
		if(pause) {
			$('start').value='暂停';
			pause = false;
			set_timer = setInterval(timer,1000);//启动定时器
		}else{
			$('start').value='开始';
			pause = true;
			clearInterval(set_timer);
		}
	}
	//重置函数
	function reset(){
		time=0;
		puzzle.random_d();//把方块随机打乱函数
		if(pause)//如果暂停，则开始计时
		puzzle.start();
	}
		
		/*随机打乱方块函数，我们的思路是从第九快开始，随机产生一个数
	 * 然后他们两块对调一下
	 */
	function random_d(){
		for(var i=9;i>1;--i){
			var to=parseInt(Math.random()*(i-1)+1);//产生随机数，范围为1到i
			if(d[i]!=0){
				$('d'+d[i]).style.left=d_posXY[to][0]+'px';
				$('d'+d[i]).style.top=d_posXY[to][1]+'px';
			}
			//把随机产生的div位置设置为当前的div的位置
			if(d[to]!=0){
			$("d"+d[to]).style.left=d_posXY[i][0]+"px";
			$("d"+d[to]).style.top=d_posXY[i][1]+"px";
		}
			//然后把她们的div保存的编号对调一下
			d[i]+=d[to];
			d[to]=d[i]-d[to];
			d[i]-=d[to];
			
		}
	}
	return {
		move:move,
		whereCanTo:whereCanTo,
		timer:timer,
		start:start,
		reset:reset,
		random_d:random_d
	};
	}
	var puzzle=puzzle();
//初始化函数，页面加载的时候调用重置函数，重新开始
window.onload=function(){	
	
	puzzle.reset();
}
