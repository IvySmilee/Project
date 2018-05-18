(function(w){
	w.qipao={
		biubiu:function(oc){
			//如果获取的oc有画笔,说明时画布,进入语句:
			if(oc.getContext){
				//获取画笔
				var ctx = oc.getContext("2d");
				//定义空数组,用来接收生成的圆的信息
				var arr=[];
				
				//设置循环定时器:将数组中的圆绘制到画布上
				w.qipao.timer1 = setInterval(function(){
					//首先清空画布
					ctx.clearRect(0,0,oc.width,oc.height);
					
					//注意:这里的x,y,startx,starty都是参照于画布左上角原点(0,0);
					//注意:这里是sin曲线运动的x,y分别赋给圆的位置y,x;
					//动画:圆的运动形式,sin曲线运动
					for(var i=0;i<arr.length;i++){
						//定义每隔圆的角度一次+5,
						arr[i].deg+=5;
						//圆的圆心位置x = 曲线运动的起始x + sin曲线的y值*曲线运动的幅度
						arr[i].x = arr[i].startX +  Math.sin( arr[i].deg*Math.PI/180 )*arr[i].step*2;
						//圆的圆心位置y = 曲线运动的起始y + sin曲线的x值*曲线运动的幅度
						arr[i].y = arr[i].startY - (arr[i].deg*Math.PI/180)*arr[i].step ;
						
						//判断:如果圆的位置y<=50,从数组中删除这个圆的信息
						if(arr[i].y <=50){
							arr.splice(i,1)
						}
					}
					
					
					//绘制:把圆绘制到画布上
					for(var i=0;i<arr.length;i++){
						
						ctx.save();
						//画笔填充颜色:随机颜色
						ctx.fillStyle="rgba("+arr[i].red+","+arr[i].green+","+arr[i].blue+","+arr[i].alp+")";
						//提笔
						ctx.beginPath();
						//画圆(圆心x,圆心y,半径r.角度2π);
						ctx.arc(arr[i].x,arr[i].y,arr[i].r,0,2*Math.PI);
						//填充颜色
						ctx.fill();
						ctx.restore();
					}
				},1000/60)
				
				//循环定时器往arr中注入随机圆的信息
				w.qipao.timer2 =setInterval(function(){
					//圆的随机半径 2-8
					var r =Math.random()*6+2;
					//随机位置:x在画布随机位置,y固定在底部
					var x = Math.random()*oc.width;
					var y = oc.height - r;
					//随机颜色Math.round四舍五入,
					//随机红色
					var red =   Math.round(Math.random()*255);
					//随机绿色
					var green = Math.round(Math.random()*255);
					//随机蓝色
					var blue =  Math.round(Math.random()*255);
					//透明度为1,不透明
					var alp = 1;
					
					//定义曲线运动的角度:初始为0度
					var deg =0;
					//曲线运动的起始点与圆的位置相同
					var startX = x;
					var startY = y;
					//曲线的运动的幅度大小
					var step =Math.random()*20+10;
					
					//把随机生成的与圆有关的信息添加到数组中
					arr.push({
						//圆的信息
						x:x,
						y:y,
						r:r,
						red:red,
						green:green,
						blue:blue,
						alp:alp,
						
						//sin曲线运动的信息
						deg:deg,
						//sin曲线开始的位置与圆的圆心位置重合
						startX:startX,
						startY:startY,
						//曲线运动的幅度
						step:step
					})
				},100)
			}
		}
	};
})(window)
