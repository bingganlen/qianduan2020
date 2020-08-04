//18.06.12 by zgy
//需要调用js的效果有：选项卡、无限级下拉菜单

$(document).ready(function(){
	//选项卡tab
	$(".yyui_tab_title , .yyui_tab_title_this ").click(function(){
		$(this).siblings('li').attr('class','yyui_tab_title');
		$(this).attr('class','yyui_tab_title_this');
		//alert($(this).index()); 选项卡序号编号从0开始
		$(this).parent().siblings('div').attr('class','yyui_tab_content');
		$(this).parent().siblings('div').eq($(this).index()).attr('class','yyui_tab_content_this');
	});
	//////////////////////////


	//到底了///////////////////////
}); 

//用法：
//第一步、运行函数；
//yyui_menu('.yyui_menu1');
//第二步、写css样式；
//<style type="text/css">
//.yyui_menu1 { height:35px; line-height:35px; font-size:15px; background-color:#f2f2f2; }
//.yyui_menu1 li { float:left; position:relative;} /*这一级是导航*/
//.yyui_menu1 li a { display:block; line-height:35px; text-decoration:none; padding:0px 20px; color:#333333;   }
//.yyui_menu1 li a:hover {  background:#EFEFEF; }
//.yyui_menu1 li a.more:after{content:" »";}
//.yyui_menu1 li ul { position:absolute; float:left; width:150px; border:1px solid #D2D2D2; display:none; background-color:#FFFfff; z-index:9999;} /*这是第二级菜单*/
//.yyui_menu1 li ul a { width:110px;text-decoration:none; color:#333333;}
//.yyui_menu1 li ul a:hover { background:#f2f2f2;}
// 
//.yyui_menu1 li ul ul{ top:0;left:150px;} /*从第三级菜单开始,所有的子级菜单都相对偏移*/
//</style>
function yyui_menu(ulclass){
	$(document).ready(function(){
		$(ulclass+' li').hover(function(){
			$(this).children("ul").show(); //mouseover
		},function(){
			$(this).children("ul").hide(); //mouseout
		});
	});
}
