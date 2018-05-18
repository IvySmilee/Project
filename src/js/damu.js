(function(w){
	//创建damu对象
	var damu={
		//定义now为当前菜单列表中选中的li的索引值
		now:0,
		//选中菜单li的前一个li的索引值
		preindex :0
	};
	//获取内容区的主屏ul
	var ul =document.querySelector("#wrap .content > ul");
	//获取主屏中的每一屏
	var liNodes_C =document.querySelector("#wrap .content > ul > li");
	//获取头部菜单列表的每一个li
	var liNodes =document.querySelectorAll("#wrap .header .headMain .btns ul li");
	//获取头部菜单列表的每一个li的上面的黑色遮罩.up
	var upNodes =document.querySelectorAll("#wrap .header .headMain .btns ul li  .up");
	//获取头部的小三角
	var arrow = document.querySelector("#wrap .header .headMain .arrow ");
	//获取内容区的侧边栏的小圆点
	var dotNodes = document.querySelectorAll("#wrap .content > .dot > span");
	
	//头部的逻辑函数
	damu.header=function(){
		//第一个菜单的li的 .up 的宽设置为 100%，默认是显示的
		liNodes[0].querySelector(".up").style.width="100%";
		//小三角的位置默认在第一个 li 的下面
		arrow.style.left =liNodes[0].offsetLeft +  liNodes[0].offsetWidth/2 - arrow.offsetWidth/2 +"px";
		
		//循环头部菜单下的li,添加点击事件
		for(var i=0;i<liNodes.length;i++){
			//将变量i劫持给节点的属性
			liNodes[i].index  =i;
			//每一个li添加点击事件
			liNodes[i].onclick=function(){
				//调用执行菜单变换函数,传入当前点击li的索引值
				damu.move(this.index);
				//将点击的li的索引值,赋值给li上一个索引值
				damu.preindex = this.index;
			}
		}
	}
	
	//菜单变换时的所有切换:
	//	参数:  点击的li的索引值
	//	小三角位置,li遮罩,侧边栏小圆点及屏幕的切换
	damu.move=function(index){
		//now为现在菜单栏 li的索引值
		damu.now = index;
		
		//导航菜单li的切换
		//所有的li宽为0,隐藏
		for(var i=0;i<liNodes.length;i++){
			upNodes[i].style.width="";
		}
		//点击的li有宽度,显示
		upNodes[index].style.width="100%";
		
		//侧边栏小圆点的切换
		for(var i=0;i<dotNodes.length;i++){
			dotNodes[i].classList.remove("active");
		}
		//对应的小圆点为激活状态
		dotNodes[index].classList.add("active");
		
		//小箭头位置的同步:与菜单栏li对应
		arrow.style.left =liNodes[index].offsetLeft +  liNodes[index].offsetWidth/2 - arrow.offsetWidth/2 +"px";
	
		//屏幕的切换:与菜单栏li对饮
		ul.style.top = -index*liNodes_C.offsetHeight +"px";
		
		//出入场
		//点击的菜单栏li对应的内容屏的入场动画
		inout.inoutArr[index].inAn();
		//点击的上一个菜单栏li对应的内容屏出场动画
		inout.inoutArr[damu.preindex].outAn();
	}
	//把创建的damu对象赋给Window的damu属性,外部可以直接调用damu
	w.damu = damu;
})(window)
