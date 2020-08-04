/*弹出层*/
/*
	参数解释：
	title	标题
	url		请求的url
	id		需要操作的数据id
	w		弹出层宽度（缺省调默认值）
	h		弹出层高度（缺省调默认值）
*/
function x_admin_show(title,url,w,h){
	if (title == null || title == '') {
		title=false;
	};
	if (url == null || url == '') {
		url="404.html";
	};
	if (w == null || w == '') {
		w=800;
	};
	if (h == null || h == '') {
		h=($(window).height() - 50);
	};
	parent.layer.open({
		type: 2,  //类型，解析url
		area: [w+'px', 960 +'px'],
		fix: false, //不固定
		//resize:true,  允许右下角拖动使窗口大小变化
		//maxmin: false,  //放大缩小
		shadeClose: false,   //点击遮罩区域是否关闭页面   2020-05-27前是true
		shade:0.4,
		title: title,
		content: url
	});
}

/*关闭弹出框口*/
function x_admin_close(){
	var index = parent.layer.getFrameIndex(window.name);
	parent.layer.close(index);
}

