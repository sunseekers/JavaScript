/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2017-10-30 11:13:20
 * @version $Id$
 */
$(function(){
	const	color = ["#626262","#787878","rgba(0,0,0,0.5)","#DCC722","white","#FF4350"],
			info = ["谢谢参与","  1000","   10","  500","  100"," 4999","    1","   20"],
			info1 = ['再接再厉','      元','     元','  淘金币','     元','  淘金币','     元','  淘金币'];
	let		clickNum=5,//可抽奖次数
			rotateNum=0,//旋转次数
	        angles,//旋转角度
			notice;//中奖公告
			$('#btn').on('click',function(){
				if(clickNum>=1){
					clickNum--;
					runCup();
					//转盘旋转过程“开始抽奖”按钮无法点击
					$("#btn").attr('disabled',true);
					rotateNum++;
					//“开始抽奖”按钮无法点击恢复点击
					setTimeout(function(){
						alert(notice);
						$('#btn').removeAttr("disabled", true);
					},6000);
				}else{
					alert("亲，抽奖次数已用光！");

				}
			});
			//转盘旋转
			function runCup(){
				probability();
				const degValue = 'rotate('+angles+'deg'+')';
				$("#canvas").css('transform',degValue);
			}
			//各奖项对应的旋转角度及中奖公告内容
			function probability(){
				//获取随机数
				let num=parseInt(Math.random()*7);
				switch (num) {
					case 0: angles=2160*rotateNum+ 1800;notice = info[0] + info1[0];
					break;
					case 1: angles=2160*rotateNum+ 1845;notice = info[7] + info1[7];
					break;
					case 2: angles=2160*rotateNum+ 1890;notice = info[6] + info1[6];
					break;
					case 3: angles=2160*rotateNum+ 1935;notice = info[5] + info1[5];
					break;
					case 4: angles=2160*rotateNum+ 1980;notice = info[4] + info1[4];
					break;
					case 5: angles=2160*rotateNum+ 2025;notice = info[3] + info1[3];
					break;
					case 6: angle=2160*rotateNum+ 2070;notice = info[2] + info1[2];
					break;
					case 7: angles=2160*rotateNum+ 2115;notice = info[1] + info1[1];
					break;
				}
			}
	circle();
	function circle(){
		const ctx=$("#canvas")[0].getContext('2d'),
			  ctx1=$("#canvas1")[0].getContext('2d'),
			  ctx2=$("#canvas2")[0].getContext('2d'),
			  ctx3=$("#canvas3")[0].getContext('2d');
			console.log($("#canvas"));//$("#canvas")获取到的是所有id为canvas的元素，是一个集合
		createCricle();
		createCirText();
		initPoint();
		//绘制外面的圆
		function createCricle(){
			let startAngle=0;//扇形开始的角度
			let endAngle=0;//扇形结束的角度
			for(let i=0;i<8;i++){
				startAngle=Math.PI*(i/4-1/8);
				endAngle=startAngle+Math.PI*(1/4);
				ctx.save();
				ctx.beginPath();
				ctx.arc(150,150,100,startAngle,endAngle,false);
				ctx.lineWidth=120;
				i%2==0?(ctx.strokeStyle=color[0]):(ctx.strokeStyle=color[1]);
				ctx.stroke();
				ctx.restore();
				}
		}
		function createCirText(){
			ctx.textAlign='start';
			ctx.textBaseline='middle';
			ctx.fillStyle=color[3];
			const step=Math.PI/4;
			for(let i=0;i<8;i++){
				ctx.save();
				ctx.beginPath();
				ctx.translate(150,150);
				ctx.rotate(i*step);
				ctx.font = " 20px Microsoft YaHei";
		        ctx.fillStyle = color[3];
		        ctx.fillText(info[i],-30,-115,60);
		        ctx.font = " 14px Microsoft YaHei";
		        ctx.fillText(info1[i],-30,-95,60);
		        ctx.closePath();
		        ctx.restore();
			}
		}
		//转盘的指针
		function initPoint(){ 
	        //箭头指针
	        ctx1.beginPath();
	        ctx1.moveTo(100,24);
	        ctx1.lineTo(90,62);
	        ctx1.lineTo(110,62);
	        ctx1.lineTo(100,24);
	        ctx1.fillStyle = color[5];
	        ctx1.fill();
	        ctx1.closePath();
	        //中间小圆
	        ctx3.beginPath();
	        ctx3.arc(100,100,40,0,Math.PI*2,false);
	        ctx3.fillStyle = color[5];
	        ctx3.fill();
	        ctx3.closePath();
	        //小圆文字
	        ctx3.font = "Bold 20px Microsoft YaHei"; 
		    ctx3.textAlign='start';
		    ctx3.textBaseline='middle';
		    ctx3.fillStyle = color[4];
	        ctx3.beginPath();
	        ctx3.fillText('开始',80,90,40);
	        ctx3.fillText('抽奖',80,110,40);
	        ctx3.fill();
	        ctx3.closePath();
	        //中间圆圈
	        ctx2.beginPath();
	        ctx2.arc(75,75,75,0,Math.PI*2,false);
	        ctx2.fillStyle = color[2];
	        ctx2.fill();
	        ctx2.closePath();
		}
	}

})
