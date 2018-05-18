(function(w){
	var xfz={};
	//内容区和屏li的高度计算函数
	xfz.content=function(){
		//获取内容区
		var content = document.querySelector("#wrap .content");
		//获取内容区下面的所有屏列表
		var liNodes = document.querySelectorAll("#wrap .content > ul > li");
		//获取头部
		var head = document.querySelector("#wrap .header");
		//计算内容区的高度 = 屏幕高 - 头部高
		content.style.height = document.documentElement.clientHeight - head.offsetHeight+"px";
		//循环给所有的屏添加高度
		for(var i=0;i<liNodes.length;i++){
			//每一屏高 = 屏幕高 - 头部高
			liNodes[i].style.height = document.documentElement.clientHeight - head.offsetHeight+"px";
		}
	}
	
	//第一屏的3d切换效果
	xfz.home3D=function(){
		//定义初始的oldindex为0；
		var oldIndex =0;
		//定义自动切换的初始值为0；
		var autoIndex =0;
		//定义循环播放定时器为0；
		var timer =0;
		//获取内容区下列表里的的home屏
		var home = document.querySelector("#wrap .content .home");  
		//获取home屏下的切换屏home1下面的li列表
		var home1lis = document.querySelectorAll("#wrap .content .home .home1 > ul >li");  
		//获取home屏下所有的小圆点列表
		var home2lis = document.querySelectorAll("#wrap .content .home .home2 > ul >li");  
		
		//循环所有的小圆点添加点击事件
		for(var i=0;i<home2lis.length;i++){
			//把每一个小圆点的索引值赋给自己的index属性
			home2lis[i].index=i;
			//添加点击事件
			home2lis[i].onclick=function(){
				//清除定时器
				clearInterval(timer);
				
				//for循环删除所有li的 active类样式
				for(var i=0;i<home2lis.length;i++){
					home2lis[i].classList.remove("active");
				}
				//给当前点击的li添加激活后的样式
				this.classList.add("active");
				
				//判断点击的是哪边的
				//点击的是左边,
				if(this.index < oldIndex){
					//点击的小圆点对应的li从左边显示
					//删除其他显示隐藏逻辑
					home1lis[this.index].classList.remove("leftHide");
					home1lis[this.index].classList.remove("rightHide");
					home1lis[this.index].classList.remove("rightShow");
					//从左边显示
					home1lis[this.index].classList.add("leftShow");
					
					//上一个小圆点对应的li从右边隐藏
					home1lis[oldIndex].classList.remove("leftHide");
					home1lis[oldIndex].classList.remove("leftShow");
					home1lis[oldIndex].classList.remove("rightShow");
					home1lis[oldIndex].classList.add("rightHide");
					
				}
				//点击的是右边,
				if(this.index > oldIndex){
					//点击的小圆点对应的li从左边显示
					//删除其他显示隐藏逻辑
					home1lis[this.index].classList.remove("leftHide");
					home1lis[this.index].classList.remove("rightHide");
					home1lis[this.index].classList.remove("leftShow");
					//从右边显示
					home1lis[this.index].classList.add("rightShow");
					
					//上一个小圆点对应的li从左边隐藏
					home1lis[oldIndex].classList.remove("rightHide");
					home1lis[oldIndex].classList.remove("leftShow");
					home1lis[oldIndex].classList.remove("rightShow");
					home1lis[oldIndex].classList.add("leftHide");
					
				}
				
				//把当前点击的小圆点的值给 oldindex
				oldIndex = this.index;
				//把当前点击的小圆点的做音质给自动切换的索引值
				autoIndex = this.index;
			}
		}
		
		
		
		//执行循环定时器函数
		move();
		function move(){
			//避免循环定时器你的逻辑被多次调用
			clearInterval(timer);
			//设置循环定时器函数
			timer = setInterval(function(){
				//自动轮播，只向右轮播：自动轮播的索引值一直++；
				autoIndex++;
				//判断target范围：自动轮播到头，返回第一张
				if(autoIndex === home2lis.length){
					autoIndex=0;
				}
				
				//小圆点的位置变化
				//for循环删除所有li的 active类样式
				for(var i=0;i<home2lis.length;i++){
					home2lis[i].classList.remove("active");
				}
				//给当前点击的li添加激活后的样式
				home2lis[autoIndex].classList.add("active");
				
				//autoIndex显示：删除其他显示隐藏逻辑
				home1lis[autoIndex].classList.remove("leftHide");
				home1lis[autoIndex].classList.remove("rightHide");
				home1lis[autoIndex].classList.remove("leftShow");
				//从右边显示
				home1lis[autoIndex].classList.add("rightShow");
				
				//oldIndex：上一个小圆点对应的li从左边隐藏
				home1lis[oldIndex].classList.remove("rightHide");
				home1lis[oldIndex].classList.remove("leftShow");
				home1lis[oldIndex].classList.remove("rightShow");
				home1lis[oldIndex].classList.add("leftHide");
				
				//把自动轮播的值给上一个索引值
				oldIndex = autoIndex;
			},2000)
		}
		
		//鼠标滑上home区域，清除定时器，自动轮播停止
		home.addEventListener("mouseenter",function(){
			clearInterval(timer);
		})
		//鼠标离开home区域，执行定时器函数，开启自动轮播
		home.addEventListener("mouseleave",function(){
			move();
		})
	}
	
	//第四屏的图片炸裂效果
	xfz.picBoom = function(){
		//获取第四屏下的图片遮罩层ul列表
		var ulNodes = document.querySelectorAll("#wrap .content > ul > li > div.about .about3 .item > ul");
		//循环ul列表执行 change函数
		for(var i=0;i<ulNodes.length;i++){
			change(ulNodes[i]);
		}
		
		//ul下的li炸裂变化函数：参数：传入图片对应的父元素ul
		function change(ul){
			//循环创建 2*2 li
			for(var i=0;i<4;i++){
				//创建li节点
				var liNode = document.createElement("li");
				//创建img节点
				var img = document.createElement("img");
				
				//计算li宽高位ul的一半
				var w =  ul.offsetWidth/2;
				var h =  ul.offsetHeight/2; 
				liNode.style.width =  w+"px";
				liNode.style.height = h +"px";
				
				//图片地址为ul的自定义属性src的属性值
				img.src = ul.dataset.src;
				
				//给图片添加加载事件
				img.onload=function(){
					//获取li下所有的img；
					//注意获取的是ul下对应的img，不是所有的img；
					var imgNodes = ul.querySelectorAll("li >img");
					//调用执行boom函数，传入所有的img
					boom(imgNodes);
				}
				/*
				 * 列表里四个图片的初始位置
	             * 		0 : left:0 	top:0
	             * 		1 : left:-w	top:0
	             * 		2 : left:0	top:-h
	             * 		3 : left:-w	top:-h
	             * */
				//设置img的初始位置
	            img.style.left = -(i%2) *w+"px"
	            img.style.top =  -Math.floor(i/2)*h+"px"
				
				//把创建的img节点添加到li里面
				liNode.appendChild(img);
				//把创建的li节点添加到ul里面
				ul.appendChild(liNode);
			}
			
			
			/*
			 * 列表里四个图片的炸裂后的位置
			 * 	0: left 0   	top h
			 * 	1: left -2w  	top 0
			 * 	2: left w  		top -h
			 * 	3: left -w   	top -2h
			 * 
			 * */
			
			//图片炸裂效果函数：参数：需要炸裂的图片	
			function boom(imgNodes){
				//img的初始位置left数组
				var arrLeft =[0,-2,1,-1];
				//img的初始位置top数组
				var arrTop =[1,0,-1,-2];
				
				//给ul添加鼠标进入事件，mouseenter无冒泡
				ul.addEventListener("mouseenter",function(){
					//循环ul下所有的img，添加鼠标进入后img的最终位置
					for(var i=0;i<imgNodes.length;i++){
						imgNodes[i].style.left = arrLeft[i]*w+"px";
						imgNodes[i].style.top = arrTop[i]*h+"px";
					}
				})
				
				//给ul添加鼠标离开事件。mouseleave无冒泡
				ul.addEventListener("mouseleave",function(){
					//循环ul下所有的img，设置鼠标离开后的位置：即回到初始位置
					for(var i=0;i<imgNodes.length;i++){
						imgNodes[i].style.left = -(i%2) *w+"px"
	            		imgNodes[i].style.top =  -Math.floor(i/2)*h+"px"
					}
				})
			}
			
		}
	
		
	}
	
	//第五屏的canvas气泡效果
	xfz.canvasAn =function(){
		//定义初始oc为null；
		var oc = null;
		//获取第五屏里的人物区team3
		var team3 = document.querySelector("#wrap .content > ul > li > div.team .team3");
		//人物区team3下的所有li
		var liNodes = document.querySelectorAll("#wrap .content > ul > li > div.team .team3 ul li");
		
		//循环所有的li
		for(var i=0;i<liNodes.length;i++){
			//给每一个li添加鼠标进入事件
			liNodes[i].addEventListener("mouseenter",function(){
				//循环所有的li，透明度变为0.2
				for(var i=0;i<liNodes.length;i++){
					liNodes[i].style.opacity=.2;
				}
				//该li透明度为1；
				this.style.opacity=1;
				
				//调用执行canvas函数，在该li位置创建canvas画布
				addCanvas();
				//画布的位置与该li位置相同
				oc.style.left = this.offsetLeft+"px";
				
			})
			
			
			team3.addEventListener("mouseleave",function(){
				
				
				oc.remove();
				oc =null;
				
				clearInterval(qipao.timer1);
				clearInterval(qipao.timer2);
			})
			
		}
		
		
		//创建canvas函数
		function addCanvas(){
			//如果画布不存在：进入，创建画布
			if(!oc){
				//创建canvas节点
				oc = document.createElement("canvas");
				//给画布设置宽高
				oc.width = liNodes[0].offsetWidth;
				oc.height = liNodes[0].offsetHeight/2;
				
				//把画布添加到人物列表中
				team3.appendChild(oc);
				//调用执行产生气泡的函数：参数：传入画布
				qipao.biubiu(oc);
			}
		}
	}
	
	//侧边栏函数
	xfz.sidebar=function(){
		//获取侧边栏所有的小圆点
		var dotNodes = document.querySelectorAll("#wrap .content > .dot > span");
		//循环所有的小圆点添加点击事件
		for(var i=0;i<dotNodes.length;i++){
			//劫持小圆点的索引值赋给小圆点的属性index
			dotNodes[i].index=i;
			//添加点击事件
			dotNodes[i].onclick=function(){
				//执行头部下菜单li对应的屏切换函数：传入点击的索引值
				damu.move(this.index);
				//把点击的索引值赋给是哪个一个索引值
				damu.preindex = this.index;
			}
		}
	}
	
	//开机动画进度条函数
	xfz.progress = function(){
		//定义加载进度，初始为0
		var flag = 0;
		//定义数组：存放网页所有的图片地址
		var arr = ['bg1.jpg','bg2.jpg','bg3.jpg','bg4.jpg','bg5.jpg','about1.jpg','about2.jpg','about3.jpg','about4.jpg','worksimg1.jpg','worksimg2.jpg','worksimg3.jpg','worksimg4.jpg','team.png','greenLine.png'];
		//获取开机时遮罩层里面的进度条
		var line = document.querySelector("#wrap .mask .line");
		//获取开机动画的遮罩层
		var mask = document.querySelector("#wrap .mask");
		//获取遮罩层的上部分
		var up = document.querySelector("#wrap .mask .up");
		//获取遮罩层的下部分
		var down = document.querySelector("#wrap .mask .down");
		//获取头部的audio标签
		var audio = document.querySelector("audio");
		
		//循环图片数组
		for(var i=0;i<arr.length;i++){
			//创建img标签
			var img = new Image();
			//把数组中对应的图片地址赋给img
			img.src="img/"+arr[i];
			//给img添加加载事件
			img.onload=function(){
				//每加载成功一次，执行下面语句
				//加载进度+1；
				flag++;
				//进度条宽度 = 加载进度/数组长度*100%；
				line.style.width = (flag/arr.length)*100+"%";
			}
		}
		
		//给进度条添加监测过渡结束事件：进度条过渡结束后执行：
		line.addEventListener("transitionend",function(){
			//如果加载进度 = 图片数组进度
			if(flag === arr.length){
				//遮罩层上部分高度为0
				up.style.height = 0;
				//遮罩层下部分高度为0
				down.style.height = 0;
				//移除进度条
				this.remove();
			}
		});
		
		//给遮罩层上部分添加过渡结束事件：上部分过渡结束后执行：
		up.addEventListener("transitionend",function(){
			//移除遮罩层
			mask.remove();
			//播放音乐
			audio.play();
			//执行第一屏的入场效果函数
			inout.inoutArr[0].inAn();
			//调用执行第一屏的3d自动切换函数
			xfz.home3D();
		});
		
	}
	
	//头部音乐图标显示函数
	xfz.music=function(){
		//获取头部的音乐图标
		var music = document.querySelector(".music");
		//获取头部的audio元素
		var audio = document.querySelector("audio");
		
		//给音乐图标添加点击事件
		music.onclick=function(){
			//如果是暂停状态：
			if(audio.paused){
				//播放
				audio.play();
				//背景图片换成音乐打开gif图
				music.style.background="url(img/musicon.gif)";
			}else{
				//如果是播放状态：
				//暂停
				audio.pause();
				//背景图片换成音乐关闭gif图
				music.style.background="url(img/musicoff.gif)";
			}
		}
	}
	
	
	w.xfz=xfz;
})(window)
