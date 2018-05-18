(function(w){
	w.inout={};
	inout.inoutAn=function(){
		inout.inoutArr =[
			//第一屏的出入场动画
			{
				//出场动画
				outAn:function(){
					var home1 = document.querySelector(".home1");
					var home2 = document.querySelector(".home2");
					
					home1.style.transform="translateY(-500px)";
					home1.style.opacity = 0;
					home2.style.transform="translateY(200px)";
					home2.style.opacity = 0;
				},
				//入场动画
				inAn:function(){
					var home1 = document.querySelector(".home1");
					var home2 = document.querySelector(".home2");
					
					home1.style.transform="translateY(0px)";
					home1.style.opacity = 1;
					home2.style.transform="translateY(0px)";
					home2.style.opacity = 1;
				}
			},
			//第二屏的出入场动画
			{
				//出场动画
				outAn:function(){
					var plane1 = document.querySelector(".plane1");
					var plane2 = document.querySelector(".plane2");
					var plane3 = document.querySelector(".plane3");
					
					plane1.style.transform="translate(-200px,-200px)";
					plane2.style.transform="translate(-200px, 200px)";
					plane3.style.transform="translate(200px ,-200px)";
				},
				//入场动画
				inAn:function(){
					var plane1 = document.querySelector(".plane1");
					var plane2 = document.querySelector(".plane2");
					var plane3 = document.querySelector(".plane3");
					
					plane1.style.transform="translate(0px ,0px)";
					plane2.style.transform="translate(0px ,0px)";
					plane3.style.transform="translate(0px, 0px)";
				}
			},
			//第三屏的出入场动画
			{
				//出场动画
				outAn:function(){
					var pencel1 = document.querySelector(".pencel1");
					var pencel2 = document.querySelector(".pencel2");
					var pencel3 = document.querySelector(".pencel3");
					
					pencel1.style.transform="translateY(-200px)";
					pencel2.style.transform="translateY(200px)";
					pencel3.style.transform="translateY(200px)";
				},
				//入场动画
				inAn:function(){
					var pencel1 = document.querySelector(".pencel1");
					var pencel2 = document.querySelector(".pencel2");
					var pencel3 = document.querySelector(".pencel3");
					
					pencel1.style.transform="translateY(0px)";
					pencel2.style.transform="translateY(0px)";
					pencel3.style.transform="translateY(0px)";
				}
			},
			//第四屏的出入场动画
			{
				//出场动画
				outAn:function(){
					var item1 = document.querySelector(".about3 .item:nth-child(1)");
					var item2 = document.querySelector(".about3 .item:nth-child(2)");
					
					item1.style.transform="rotate(45deg)";
					item2.style.transform="rotate(-45deg)";
				},
				//入场动画
				inAn:function(){
					var item1 = document.querySelector(".about3 .item:nth-child(1)");
					var item2 = document.querySelector(".about3 .item:nth-child(2)");
					
					item1.style.transform="rotate(0deg)";
					item2.style.transform="rotate(0deg)";
				}
			},
			//第五屏的出入场动画
			{
				//出场动画
				outAn:function(){
					var team1 = document.querySelector(".team .team1");
					var team2 = document.querySelector(".team .team2");
					
					team1.style.transform="translateX(-200px)";
					team2.style.transform="translateX(200px)";
				},
				//入场动画
				inAn:function(){
					var team1 = document.querySelector(".team .team1");
					var team2 = document.querySelector(".team .team2");
					
					team1.style.transform="translateX(0px)";
					team2.style.transform="translateX(0px)";
				}
			}
		]
		//默认都在外面:执行每一屏的出场
		for(var i=0;i<inout.inoutArr.length;i++){
			inout.inoutArr[i].outAn();
		}
	}
})(window)
