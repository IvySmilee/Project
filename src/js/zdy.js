(function(w){
	//定义zdy对象
	var zdy ={};
	//定义定时器,初始值为0;
	var timer=0;
	
	//定义滚动条函数
	zdy.mouseS=function(){
		//获取内容区
		var content = document.querySelector("#wrap .content");
		//获取内容区里的每一屏的列表
		var liNodes_Cs =document.querySelectorAll("#wrap .content > ul > li");
		
		/*清除定时器的目的:
		 *	 在整个MouseScroll操作中，只让最后一个回调函数产生作用。
		 * 		 MouseScroll的队列
		 * 			鼠标滚轮事件触发过程当中，MouseScroll队列中一直在新增新的回调函数
		 * 		  定时器的队列
		 * 			当MouseScroll的队列中的回调函数一个个在被执行时，会告诉一个定时器分线程
		 * 	隔200ms之后将这个setTimeout回调函数放入异步队列中。杀死前一个setTimeout回调函数。
		 * 整个过程当中只有MouseScroll队列中最后一个回调函数所生成的setTimeout回调函数会起作用。
		 * 
		 * */
		
		//console.log(content.addEventListener);  // ƒ addEventListener() { [native code] }
		//判断元素是否存在dom2级方法
		if(content.addEventListener){
			//给内容区添加鼠标滚轮事件：火狐浏览器
			content.addEventListener("DOMMouseScroll",function(ev){
				//兼容IE6、7
				ev = ev||event;
				//清除延迟定时器
				clearTimeout(timer);
				//设置延迟定时器函数
				timer = setTimeout(function(){
					//执行滚轮事件函数
					fn(ev);
				},200)
			});
		}
		
		//给事件添加dom0方法：滚轮滚动事件函数
		content.onmousewheel=function(ev){
				ev = ev||event;
				//清除延迟定时器
				clearTimeout(timer);
				//设置延迟定时器函数
				timer =setTimeout(function(){
					//执行滚轮事件函数
					fn(ev);
				},200);
		}
		
		//定时器里面的滚轮事件函数
		function fn(ev){
			ev=ev||event;
			//定义滚轮的方向，初始为空字符串；
			var dir="";
			
			//如果存在e.wheelDeta，为谷歌内核浏览器，向上120，向下-120
			if(ev.wheelDelta){
				//三元表达式：判断e.wheelDeta的正负，确定滚轮的方向，up 或down
				dir = ev.wheelDelta>0?"up":"down";
			}
			
			//如果存在e.detail，为火狐浏览器，向上为-3，向下为3；
			if(ev.detail){
				//三元表达式：判断e.detail的正负，确定滚轮的方向，up 或down
				dir = ev.detail<0?"up":"down";
			}
			
			//switch判断滚轮的方向，作出相应变化
			switch (dir){
				//如果滚轮的方向是向上
				case "up":
				//damu.now 即头部菜单li的索引值
					//li 索引值大于0，--，
					if(damu.now>0){
						//把当前的值赋给li的上一个索引值
						damu.preindex=damu.now;
						//索引值减-
						damu.now--;
						//菜单变化到目前索引值位置
						damu.move(damu.now);
					}
					break;
				//如果滚轮方向是向下
				case "down":
				//li 索引值小于内容区的屏数-1，
					if(damu.now<liNodes_Cs.length-1){
						//把当前的值赋给li的上一个索引值
						damu.preindex=damu.now;
						//li的索引值++
						damu.now++;
						//菜单变化到目前索引值位置
						damu.move(damu.now);
					}
					break;
			}
			//判断是否存在dom2级方法：清除默认事件
			if(ev.preventDefault){
				ev.preventDefault();
			}
			//dom0 的清除默认事件
			return false;
		}
	}
	w.zdy = zdy;
})(window)
