$(function() {
	//$.ajax({
	//	type: "get",
	//	url: 'json/data.json',
	//	dataType: "json",
	//	success: function(result) {
	//		var res = eval(result.data);
	//		showSideMenu(res);
	//	}
	//});

	// data里面的 menuCode毫无作用 当作父目录所在的标识吗  menuId保留  当成数据库的id
	var result = {
	"data": [
		{
			"menuId": "01",
			"menuName": "基础信息管理",
			"menuCode": "RR1234",
			"menuAction": "#",
			"children": [
				{
					"menuId": "001",
					"menuName": "岗位管理",
					"menuCode": "RR1234",
					"menuAction": "https://www.baidu.com/"
				}, {
					"menuId": "001",
					"menuName": "证书类型",
					"menuCode": "RR1234",
					"menuAction": "https://fanyi.baidu.com/?aldtype=16047#auto/zh"
				}, {
					"menuId": "001",
					"menuName": "岗位证书",
					"menuCode": "RR1234",
					"menuAction": "https://www.baidu.com/"
				}, {
					"menuId": "001",
					"menuName": "考勤类型",
					"menuCode": "Yggdcd",
					"menuAction": "https://fanyi.baidu.com/?aldtype=16047#auto/zh"
				}, {
					"menuId": "001",
					"menuName": "技能等级",
					"menuCode": "RR1234",
					"menuAction": "https://www.baidu.com/"
				}
			]
		}, {
			"menuId": "01",
			"menuName": "考勤管理",
			"menuCode": "RR1234",
			"menuAction": "#",
			"children": [
				{
					"menuId": "001",
					"menuName": "考勤录入",
					"menuCode": "RR1234",
					"menuAction": "https://www.baidu.com/"
				}, {
					"menuId": "001",
					"menuName": "考勤审批",
					"menuCode": "RR1234",
					"menuAction": "https://www.baidu.com/"
				}, {
					"menuId": "001",
					"menuName": "考勤查看",
					"menuCode": "RR1234",
					"menuAction": "https://www.baidu.com/"
				}
			]
		}, {
			"menuId": "01",
			"menuName": "证书管理",
			"menuCode": "RR1234",
			"menuAction": "#",
			"children": [
				{
					"menuId": "001",
					"menuName": "人员证书",
					"menuCode": "RR1234",
					"menuAction": "https://www.baidu.com/"
				}, {
					"menuId": "001",
					"menuName": "到期证书",
					"menuCode": "RR1234",
					"menuAction": "https://www.baidu.com/"
				}, {
					"menuId": "001",
					"menuName": "缺失证书",
					"menuCode": "RR1234",
					"menuAction": "https://www.baidu.com/"
				}, {
					"menuId": "001",
					"menuName": "证书统计",
					"menuCode": "RR1234",
					"menuAction": "https://www.baidu.com/"
				}
			]
		}, {
			"menuId": "01",
			"menuName": "证书统计",
			"menuCode": "RR1234",
			"menuAction": "#",
			"children": [
				{
					"menuId": "001",
					"menuName": "员工证书统计",
					"menuCode": "RR1234",
					"menuAction": "https://www.baidu.com/"
				}, {
					"menuId": "001",
					"menuName": "单位各证书情况",
					"menuCode": "RR1234",
					"menuAction": "https://www.baidu.com/"
				}
			]
		},  {
			"menuId": "01",
			"menuName": "系统管理",
			"menuCode": "RR1234",
			"menuAction": "#",
			"children": [
				{
					"menuId": "001",
					"menuName": "机构管理",
					"menuCode": "RR1234",
					"menuAction": "https://www.baidu.com/"
				}, {
					"menuId": "001",
					"menuName": "菜单管理",
					"menuCode": "RR1234",
					"menuAction": "https://www.baidu.com/"
				}, {
					"menuId": "001",
					"menuName": "角色管理",
					"menuCode": "RR1234",
					"menuAction": "https://www.baidu.com/"
				}, {
					"menuId": "001",
					"menuName": "用户管理",
					"menuCode": "RR1234",
					"menuAction": "https://www.baidu.com/"
				}, {
					"menuId": "001",
					"menuName": "角色菜单",
					"menuCode": "RR1234",
					"menuAction": "https://www.baidu.com/"
				}, {
					"menuId": "001",
					"menuName": "角色人员",
					"menuCode": "RR1234",
					"menuAction": "https://www.baidu.com/"
				}, {
					"menuId": "001",
					"menuName": "人员管理",
					"menuCode": "RR1234",
					"menuAction": "https://www.baidu.com/"
				}
			]
		},{
			"menuId": "01",
			"menuName": "人员动态管理",
			"menuCode": "RR1234",
			"menuAction": "#",
			"children": [
				{
					"menuId": "001",
					"menuName": "人员异动汇总",
					"menuCode": "RR1234",
					"menuAction": "https://www.baidu.com/"
				}, {
					"menuId": "001",
					"menuName": "人员调整(发起)",
					"menuCode": "RR1234",
					"menuAction": "https://www.baidu.com/"
				}, {
					"menuId": "001",
					"menuName": "人员调整(审批)",
					"menuCode": "RR1234",
					"menuAction": "https://www.baidu.com/"
				}, {
					"menuId": "001",
					"menuName": "人员技能",
					"menuCode": "RR1234",
					"menuAction": "#",
					"children": [
						{
							"menuId": "001",
							"menuName": "岗位信息",
							"menuCode": "RR1234",
							"menuAction": "https://www.baidu.com/"
						},{
							"menuId": "001",
							"menuName": "学历信息",
							"menuCode": "RR1234",
							"menuAction": "https://www.baidu.com/"
						},{
							"menuId": "001",
							"menuName": "身份信息",
							"menuCode": "RR1234",
							"menuAction": "https://www.baidu.com/"
						},{
							"menuId": "001",
							"menuName": "现场测评",
							"menuCode": "RR1234",
							"menuAction": "https://www.baidu.com/"
						}
					]
				}
			]
		}
	]
};

	showSideMenu(result.data);
	// $("#navmenu").on("click", ".liname", function(index) {
	// 	var index = $("#navmenu .liname").index(this);
	// 	$("#navmenu>li>.dropdown-menu").eq(index).slideToggle();
	// 	$("#navmenu>li>.dropdown-menu").eq(index).parent().siblings("li").find(".dropdown-menu").slideUp();
	// });
	

});

function showSideMenu(res) {
	for(var i = 0; i < res.length; i++) {
		var html = "";
		html += "<li class='dropdown'>";
		html += "<a class='dropdown-toggle' data-toggle='dropdown'>" + res[i].menuName + " <span class='caret'></span></a>";
		html += "<ul class='dropdown-menu' role='menu'>";
		for(var k = 0; k < res[i].children.length; k++) {
			if(typeof(res[i].children[k].children) != 'undefined') {
				html += "<li class='dropdown'style='background: #0D67BB;' >";
				html += "<a href='" + res[i].children[k].menuAction + "' class='dropdown-toggle' data-toggle='dropdown'>" + res[i].children[k].menuName + "</a>";
				html += "<ul class='dropdown-menu'>";
				for(var j = 0; j < res[i].children[k].children.length; j++) {
					html += "<li>";
					html += "<a href='" + res[i].children[k].children[j].menuAction + "' target='myFrame' >" + res[i].children[k].children[j].menuName + "</a>";
					html += "</li>";
				}
				html += "</ul>";
				html += "</li>";
			} else if(typeof(res[i].children[k].children) == 'undefined'){
				html += "<li>";
				html += "<a href='" + res[i].children[k].menuAction + "' target='myFrame'>" + res[i].children[k].menuName + "</a>";
				html += "</li>";
			}
		}
		html += "</ul>";
		html += "</li>";
		$("#navmenu").append(html);
	};
	// $("#navmenu .dropdown-menu").eq(0).css({
	// 	"display": "block"
	// });
	// $("#navmenu .dropdown-menu").eq(0).find("li:eq(0)").addClass("current-page");

	var fram = "<iframe src='https://www.baidu.com/' name='myFrame' id='myIframe' width='100%' height='100%'  scrolling='auto' frameborder='0'></iframe>"
	$("#rightContent").append(fram);

	// $("#navmenu .dropdown-menu").on("click", "li", function() {
	// 	var index = $("#navmenu .dropdown-menu li").index(this);
	// 	$("#navmenu .dropdown-menu li").eq(index).parent().parent().siblings("li").find(".dropdown-menu").slideUp();
	// 	$("#navmenu .dropdown-menu li").eq(index).parent().parent().siblings("li").find(".dropdown-menu").find("li").removeClass("current-page");
	// 	$("#navmenu .dropdown-menu li").eq(index).addClass("current-page")
	// 	$("#navmenu .dropdown-menu li").eq(index).siblings().removeClass("current-page");
	// });

	
	// $("#navmenu").on("click", ".three_menu", function() {
	// 	var index = $("#navmenu .three_menu").index(this);
	// 	$("#navmenu .three_menu .dropdown-menu").eq(index).slideDown();
	// });
	//
	//
	//
	// $("#navmenu .three_menu").on("click", "li", function() {
	// 	var index = $("#navmenu .three_menu li").index(this);
	// 	$("#navmenu .three_menu li a").eq(index).css({
	// 		"color": "beige"
	// 	});
	// 	$("#navmenu .three_menu li a").eq(index).parent().siblings("li").find("a").css({
	// 		"color": "white"
	// 	});
	//
	// });


	var str = window.screen.availHeight - 170;
	$("#rightContent").css({
		"min-height": str
	});

	var bdHeight = document.documentElement.clientHeight;
	$("#rightContent").height(bdHeight - 65);

}