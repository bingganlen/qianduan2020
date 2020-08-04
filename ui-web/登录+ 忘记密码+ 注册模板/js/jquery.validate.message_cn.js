/****************************************************************
 *																*		
 * 						      代码库							*
 *                        www.dmaku.com							*
 *       		  努力创建完善、持续更新插件以及模板			*
 * 																*
****************************************************************/
var cnmsg = {
	required: "此项为必填项",
	remote: "请修正该字段",
	email: "请输入正确格式的电子邮件",
	url: "请输入合法的网址",
	date: "请输入合法的日期",
	dateISO: "请输入合法的日期 (ISO).",
	number: "请输入合法的数字",
	phone: "请输入正确格式的号码",
	chrnum: "只能输入数字和字母",
	digits: "只能输入整数",
	creditcard: "请输入合法的信用卡号",
	equalTo: "两次输入不同，请重新输入",
	accept: "请输入拥有合法后缀名的字符串",
	maxlength: jQuery.format("长度最多为 {0} "),
	minlength: jQuery.format("长度最少是 {0} "),
	rangelength: jQuery.format("长度应介于 {0} 和 {1} "),
	range: jQuery.format("请输入一个介于 {0} 和 {1} 之间的值"), 
	max: jQuery.format("请输入一个最大为 {0} 的值"),
	min: jQuery.format("请输入一个最小为 {0} 的值")};
jQuery.extend(jQuery.validator.messages, cnmsg);
