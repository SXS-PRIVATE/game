//获取浏览器工作区大小
var winHeight,winWidth;
if (window.innerWidth)
	winWidth = window.innerWidth;
else if ((document.body) && (document.body.clientWidth))
	winWidth = document.body.clientWidth;
// 获取窗口高度
if (window.innerHeight)
	winHeight = window.innerHeight;
else if ((document.body) && (document.body.clientHeight))
	winHeight = document.body.clientHeight;
// 通过深入 Document 内部对 body 进行检测，获取窗口大小
if (document.documentElement && document.documentElement.clientHeight && document.documentElement.clientWidth)
{
	winHeight = document.documentElement.clientHeight;
	winWidth = document.documentElement.clientWidth;
}
winWidth=winWidth-25;
winHeight=winHeight-25;
init(50,"mylegend",winWidth,winHeight,main);
LSystem.screen(LStage.FULL_SCREEN);
var backLayer,tileLayer,ctrlLayer,overLayer,gameoverLayer,selectLayer;
var tileText,overText,gameoverText;
var col,row;
var time = 0;
var checkpoints = [//30对
	["大","犬"],
	["小","水"],
	["见","贝"],
	["千","十"],
	["九","丸"],
	["天","大"],
	["刃","刀"],
	["匀","勺"],
	["王","玉"],
	["己","巳"],
	["午","牛"],
	["石","右"],
	["古","吉"],
	["王","主"],
	["又","叉"],
	["凤","风"],
	["早","旱"],
	["宇","字"],
	["乌","鸟"],
	["氏","芪"],
	["治","冶"],
	["月","用"],
	["刑","刊"],
	["鸣","呜"],
	["住","汪"],
	["炅","灵"],
	["亮","壳"],
	["束","柬"],
	["钱","饯"],
	["兔","免"]
];
var count=0;//记录正确数
var error=0;//记录错误数量
var checkpointNo = 0;
var i0;
var j0;
var i,j;
var myTimeBegin=new Array();//记录开始时间
var myTimeEnd=new Array();//记录结束时间
var partX,partY;
var overTextContent = ["你好,答对了：","进入下一关","重新开始"];
var gameoverTextContent = ["你好,答对了：","重新开始"];
var nowLine;
var setTimeLine;
function main(){
	i0 = Math.floor(Math.random()*5);//0到10随机数
	j0 = Math.floor(Math.random()*10);

	initLayer();
	initCtrl();
	initTile();
}
function initLayer(){
	backLayer = new LSprite();
	addChild(backLayer);
	
	tileLayer = new LSprite();
	backLayer.addChild(tileLayer);

	ctrlLayer = new LSprite();
	backLayer.addChild(ctrlLayer);
}
function initCtrl(){
	col = 10;
	row = 5;
	addEvent();
	addTimeLine();
}


////////////////////////////////////////////////////绘图
function initTile(){
	for(i=0;i<row;i++){//0*0  0*1 0*2
		for(j=0;j<col;j++){//10*10,一个坐标50,10个就500
			tile();//绘图
		}
	}
	var myDate1 = new Date();
	//myTimeBegin[checkpointNo]=myDate.toLocaleString();
}
function tile(){//第一个坐标0,0  第二 0,50 ,第三 0,100  j为横坐标,i为纵坐标
	tileLayer.graphics.drawRect(3,"dimgray",[j*winWidth/10,i*winHeight/5,(winWidth)/10,winHeight/5],true,"lightgray");//绘制1个50*50正方形图形
	//var bitmapData = new LBitmapData(null, j*winWidth/10,i*winHeight/5,(winWidth)/10,winHeight/5, LBitmapData.DATA_CANVAS);
					//bitmapData.draw(tileLayer);
					//alert("text");

	var w = checkpoints[checkpointNo][(i==i0 && j==j0) ? 0 : 1];//数组  checkpointNo=0  如果随机数和当前坐标一致，那么就绘制不同字
	tileText = new LTextField();//文字类
	tileText.weight = "bold";//
	tileText.text = w;//
	tileText.size = winWidth/10/2;
  	tileText.color = "lightgray";
	tileText.font = "黑体";
	tileText.x = j*winWidth/10+14;//加7居中
	tileText.y = i*winHeight/5+14;
	tileLayer.addChild(tileText);
	
	var shadow = new LDropShadowFilter(1,15,"#000000");//显示阴影
	tileLayer.filters = [shadow];
}
function addEvent(event){
	overLayer = new LSprite();
	backLayer.addChild(overLayer);

	selectLayer = new LSprite();
	backLayer.addChild(selectLayer);

	gameoverLayer = new LSprite();
	backLayer.addChild(gameoverLayer);

	tileLayer.addEventListener(LMouseEvent.MOUSE_DOWN,onDown);//鼠标按下执行函数onDown   绘图
	selectLayer.addEventListener(LMouseEvent.MOUSE_UP,gameReStart);// 点击进入下一关按钮 进入下一关
	gameoverLayer.addEventListener(LMouseEvent.MOUSE_UP,reTry);//点击重新开始  重新开始
}
////////////////////////////////////////////////////////////  绘图
function daysBetween(DateOne,DateTwo)  
{   
    var OneMonth = DateOne.substring(5,DateOne.lastIndexOf ('-'));  
    var OneDay = DateOne.substring(DateOne.length,DateOne.lastIndexOf ('-')+1);  
    var OneYear = DateOne.substring(0,DateOne.indexOf ('-'));  
  
    var TwoMonth = DateTwo.substring(5,DateTwo.lastIndexOf ('-'));  
    var TwoDay = DateTwo.substring(DateTwo.length,DateTwo.lastIndexOf ('-')+1);  
    var TwoYear = DateTwo.substring(0,DateTwo.indexOf ('-'));  
  
    var cha=((Date.parse(OneMonth+'/'+OneDay+'/'+OneYear)- Date.parse(TwoMonth+'/'+TwoDay+'/'+TwoYear))/86400000);   
    return Math.abs(cha);  
}  
function gameReStart(){

	var myDate2 = new Date();
	myTimeEnd[checkpointNo]=myDate2.toLocaleString();
	//alert("1");
	i0 = Math.floor(Math.random()*5);
	j0 = Math.floor(Math.random()*10);

	time = 0;

	tileLayer.removeAllChild();
	overLayer.removeAllChild();
	selectLayer.removeAllChild();
	backLayer.removeChild(selectLayer);
	backLayer.removeChild(overLayer);
	if(checkpointNo != checkpoints.length-1){
		checkpointNo++;
	}
	else
		self.location='index.html';
	initTile();
	addEvent();
	addTimeLine();
}
function reTry(){
	var myDate2 = new Date();
	myTimeEnd[checkpointNo]=myDate2.toLocaleString();
	i0 = Math.floor(Math.random()*5);
	j0 = Math.floor(Math.random()*10);

	time = 0;

	tileLayer.removeAllChild();
	overLayer.removeAllChild();
	gameoverLayer.removeAllChild();
	selectLayer.removeAllChild();
	backLayer.removeChild(selectLayer);
	backLayer.removeChild(overLayer);
	backLayer.removeChild(gameoverLayer);
	if(checkpointNo != checkpoints.length-1){
		checkpointNo++;
	}
	else
	
		self.location='index.html';
	initTile();
	addEvent();
	addTimeLine();
}
function addTimeLine(){
	overLayer.graphics.drawRect(5,"dimgray",[winWidth-25,0,25,winHeight],true,"lightgray");
	overLayer.graphics.drawLine(30,"lightgray",[winWidth-10,3,winWidth-10,winHeight-3]);
	overLayer.graphics.drawLine(30,"blue",[winWidth-10,3,winWidth-10,winHeight-3]);
	setTimeLine = setInterval(function(){drawTimeLine();},1200);//1200=1分钟
}
function drawTimeLine(){
	nowLine = 3+((time/5)*495)/10;
	overLayer.graphics.drawLine(30,"lightgray",[winWidth-10,3,winWidth-10,winHeight-3]);
	overLayer.graphics.drawLine(30,"blue",[winWidth-10,nowLine,winWidth-10,winHeight-3]);
	time++;
	if(time>50){
		clearInterval(setTimeLine);
		gameOver();
	}
}
function gameOver(){//游戏结束
    error++;//错误数量加1
	if(checkpointNo == checkpoints.length-1)//判断最后一个项目
	{
		
		overLayer.graphics.drawRect(5,"dimgray",[(LGlobal.width - 420)*0.5,80,420,250],true,"lightgray");
		gameoverLayer.graphics.drawRect(5,"dimgray",[(LGlobal.width - 250)*0.5,230,250,50],true,"darkgray");
		for(var i=0;i<gameoverTextContent.length;i++){
			gameoverText = new LTextField();
			gameoverText.weight = "bold";
			gameoverText.color = "dimgray";
			gameoverText.font = "黑体";
			if(i==0){
				gameoverText.text = gameoverTextContent[i]+count+"题。";//对不起，答对了",
				gameoverText.size = 35;
				gameoverText.x = (LGlobal.width - gameoverText.getWidth())*0.5;
				gameoverText.y = 120;
				gameoverLayer.addChild(gameoverText);
				
				//alert("888");
			}else if(i==1){
				
				gameoverText.text = gameoverTextContent[i];//"重开关卡了
				gameoverText.size = 20;
				gameoverText.x = (LGlobal.width - gameoverText.getWidth())*0.5;
				gameoverText.y = 240;
				gameoverLayer.addChild(gameoverText);
				//checkpointNo = -1;
				//self.location='../index.html';
				count=0;
				error=0;
				//alert("888");
			}
		}
	}
	else
		gameReStart();
	tileLayer.removeEventListener(LMouseEvent.MOUSE_DOWN,onDown);
}
function onDown(event){//获取鼠标点下时的坐标   
	var mouseX,mouseY;
	mouseX = event.offsetX;
	mouseY = event.offsetY;

	partX = Math.floor((mouseX)/(winWidth/10));
	partY = Math.floor((mouseY)/(winHeight/5));
	isTure(partX,partY);
}
function isTure(x,y){//判断是否正确
	if(x==j0 && y==i0){
	count++;//正确数量加1
	clearInterval(setTimeLine);
		
		
		overLayer.graphics.drawRect(5,"dimgray",[(LGlobal.width - 420)*0.5,80,420,250],true,"lightgray");
		selectLayer.graphics.drawRect(5,"dimgray",[(LGlobal.width - 250)*0.5,230,250,50],true,"darkgray");

		for(var i=0;i<overTextContent.length;i++){
			overText = new LTextField();
			overText.weight = "bold";
			overText.color = "dimgray";
			overText.font = "黑体";
			if(i==0)
			{
				//if(checkpointNo == checkpoints.length-1){
				overText.text = overTextContent[i]+count+"题。";//"恭喜您，您过关了,答对了"
				overText.size = 35;
				overText.x = (LGlobal.width - overText.getWidth())*0.5;
				overText.y = 120;
				overLayer.addChild(overText);
				//gameReStart();
				//gameReStart();//正确后直接开始下一关
			//}
			}else 
				if(i==1)
				{
					if(checkpointNo == checkpoints.length-1)//判断最后一个项目
					{
						
						overText.text = overTextContent[2];//重新开始 完成所有项目后的提示
						overText.size = 20;
						overText.x = (LGlobal.width - overText.getWidth())*0.5;
						overText.y = 240; 
						selectLayer.addChild(overText);
						//checkpointNo = -1;
						//alert(count);//输出正确数量
						count=0;
						error=0;
						//return reTry();
					}
					else
						gameReStart();
					/*else{
						overText.text = overTextContent[i];//进入下一关
						overText.size = 20;
						overText.x = (LGlobal.width - overText.getWidth())*0.5;
						overText.y = 240;
						selectLayer.addChild(overText);
						gameReStart();
					}*/
				
			    }
			}
		}
		
		tileLayer.removeEventListener(LMouseEvent.MOUSE_DOWN,onDown);
	
		
	


}