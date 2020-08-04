/****************************************************************
 *																*		
 * 						      代码库							*
 *                        www.dmaku.com							*
 *       		  努力创建完善、持续更新插件以及模板			*
 * 																*
****************************************************************/
if (!Array.prototype.indexOf)
{
    Array.prototype.indexOf = function(elt /*, from*/)
    {
        var len = this.length >>> 0;
        var from = Number(arguments[1]) || 0;
        from = (from < 0)
            ? Math.ceil(from)
            : Math.floor(from);
        if (from < 0)
            from += len;
        for (; from < len; from++)
        {
            if (from in this &&
                this[from] === elt)
                return from;
        }
        return -1;
    };
}

var contactsArray = {},
	contactsLengthAll,
	groupsArray = {},
	groupsLengthAll,
	keyword,
	abortCount;

// 改写jquery.ajax方法，增加mode属性 {abort,queue,sync}
(function($) {
    var ajax = $.ajax,
        pendingRequests = {},
        synced = [],
        syncedData = [],
        ajaxRunning = [];
    $.ajax = function(settings) {
        // create settings for compatibility with ajaxSetup
        settings = jQuery.extend(settings, jQuery.extend({}, jQuery.ajaxSettings, settings));
        var port = settings.port||settings.url;
        switch (settings.mode) {
            case "abort":
                if (pendingRequests[port]) {
                    pendingRequests[port].abort();
                }
                return pendingRequests[port] = ajax.apply(this, arguments);
            case "queue":
                var _old = settings.complete;
                settings.complete = function() {
                    if (_old) {
                        _old.apply(this, arguments);
                    }
                    if (jQuery([ajax]).queue("ajax" + port).length > 0) {
                        jQuery([ajax]).dequeue("ajax" + port);
                    } else {
                        ajaxRunning[port] = false;
                    }
                };
                jQuery([ajax]).queue("ajax" + port, function() {
                    ajax(settings);
                });
                if (jQuery([ajax]).queue("ajax" + port).length == 1 && !ajaxRunning[port]) {
                    ajaxRunning[port] = true;
                    jQuery([ajax]).dequeue("ajax" + port);
                }
                return;
            case "sync":
                var pos = synced.length;
                synced[pos] = {
                    error: settings.error,
                    success: settings.success,
                    complete: settings.complete,
                    done: false
                };
                syncedData[pos] = {
                    error: [],
                    success: [],
                    complete: []
                };
                settings.error = function() { syncedData[pos].error = arguments; };
                settings.success = function() { syncedData[pos].success = arguments; };
                settings.complete = function() {
                    syncedData[pos].complete = arguments;
                    synced[pos].done = true;
                    if (pos == 0 || !synced[pos - 1])
                        for (var i = pos; i < synced.length && synced[i].done; i++) {
                        if (synced[i].error) synced[i].error.apply(jQuery, syncedData[i].error);
                        if (synced[i].success) synced[i].success.apply(jQuery, syncedData[i].success);
                        if (synced[i].complete) synced[i].complete.apply(jQuery, syncedData[i].complete);
                        synced[i] = null;
                        syncedData[i] = null;
                    }
                };
        }
        return ajax.apply(this, arguments);
    };
})(jQuery);

//header
$(document).ready(function(){
	var searchIndex,
		hasTouchEvent = ('ontouchstart' in window);
	if(hasTouchEvent){
		$('#user').bind('touchstart',function(){
			if(!$(this).hasClass('user_hover')){
				$(this).addClass('user_hover');
			} else {
				$(this).removeClass('user_hover');
			}
			return false;
		});
		$('.user_set li').first().bind('touchend',function(){
			location.href = 'setting.php';
		});
		$('#logout').bind('touchend',function(){
			logout();
		});
		$('.a_user').removeAttr('href');
	}

	//微信公众平台二维码
	$(".wechatQRcode").hover(function(){
		$(".wechat_showplace").stop(true).show().animate({"top":"42px","opacity":"1"});
	},function(){
		$(".wechat_showplace").stop(true).animate({"top":"30px","opacity":"0"},200,function(){
			$(this).hide();
		});
	});
	//用户名字下拉菜单的宽度自适应
	if (parseInt($("#user").outerWidth(true)) > 80 ) {
		$(".user_set").width($("#user").outerWidth(true) - 10);
	}
	
	//退出
	$("#logout").click(function register() {
		logout();
	});
	//快速搜索
	$("#keyword").focus(function(){
		$(this).parent(".search_input").css({
			'box-shadow': 'inset 0 1px 3px rgba(0, 0, 0, 0.2),0 1px 15px rgba(255, 255, 255, 0.3)',
			"background-color":"#ffffff"
		});
	}).blur(function(){
		$(this).parent(".search_input").removeAttr('style');
	}).keyup(function(event){
		var _result = $("#frame_search");
		var searchLength = parseInt($(".search_result li").index(),0)+1;
		if (event.keyCode == "38") {//向上
			if (searchIndex>0) {
				searchIndex--;
			}
			$(".search_result li:not("+searchIndex+")").removeClass("searchHover");
			$(".search_result li:eq("+searchIndex+")").addClass("searchHover");
			if($(".search_result li:eq("+searchIndex+")").closest(".search_result").parent().hasClass("search_contact")){
				if ($(".search_result li:eq("+searchIndex+")").position().top < 0) {
					$(".search_contact .search_result").scrollTop($(".search_result li:eq("+searchIndex+")").position().top - $(".search_result li:first").position().top);
				}
			}else{
				var contactHeight = $(".search_contact").find(".search_result").height();
				if ($(".search_result li:eq("+searchIndex+")").position().top < contactHeight) {
					$(".search_group .search_result").scrollTop($(".search_result li:eq("+searchIndex+")").position().top - $(".search_group .search_result li:first").position().top);
				}
			}
		}else if (event.keyCode == "40") {//向下
			if (searchIndex<searchLength) {
				searchIndex++;
				$(".search_result li:not("+searchIndex+")").removeClass("searchHover");
				$(".search_result li:eq("+searchIndex+")").addClass("searchHover");
				if($(".search_result li:eq("+searchIndex+")").closest(".search_result").parent().hasClass("search_contact")){
					if ($(".search_result li:eq("+searchIndex+")").position().top > 190) {
						$(".search_contact .search_result").scrollTop($(".search_result li:eq("+searchIndex+")").position().top - $(".search_result li:first").position().top);
					}
				}else{
					var contactHeight = $(".search_contact").find(".search_result").height();
					if ($(".search_result li:eq("+searchIndex+")").position().top > (parseInt(contactHeight)+190)) {
						$(".search_group .search_result").scrollTop($(".search_result li:eq("+searchIndex+")").position().top - $(".search_group .search_result li:first").position().top);
					}
				}
			}
		}else if (event.keyCode == "13"){
			if ($(".search_result .searchHover").length > 0 ) {
				$(".search_result li").each(function(){
					if($(this).hasClass("searchHover")){
						if ( $(this).hasClass("contactsMore") ) {
							// var endI = contactsLengthAll;
							// $(this).remove();
							// showSearchContacts(10, endI);
							// $(".search_result").getNiceScroll().resize().show();
						}else if ( $(this).hasClass("groupsMore") ){
							// var endI = contactsLengthAll;
							// $(this).remove();
							// showSearchGroups(10, endI);
							// $(".search_result").getNiceScroll().resize().show();
						}else{
							if ($(this).parent().parent().hasClass('search_contact')) {
								var contactId = $(this).attr("contactSearchId");
								//location.href = "viewContact.php?ID="+contactId+"";
								window.open("viewContact.php?ID="+contactId+"");
							}else{
								var groupId = $(this).attr("groupsearchid");
								//location.href = "group.php?ID="+groupId+"";
								window.open("group.php?ID="+groupId+"")
							}
						}
					}
				});
			}else{
				keyword = $(this).val();
				if (keyword == "") {
					$("#frame_search").hide();
					$(".frame_searchIng").hide();
				}else{
					search(keyword);
				}
			}
		}else{
			searchIndex = -1;
			$(".search_contact .search_result").scrollTop(0);
			$(".search_group .search_result").scrollTop(0);
			keyword = $(this).val();
			if (keyword == "") {
				$("#frame_search").hide();
				$(".frame_searchIng").hide();
			}else{
				search(keyword);
			}
		}
	}).bind('paste',function(){
		searchIndex = -1;
		$(".search_contact .search_result").scrollTop(0);
		$(".search_group .search_result").scrollTop(0);
		var keyword = $.trim($(this).val());
		if (keyword === "") {
			$("#frame_search").hide();
			$(".frame_searchIng").hide();
		}else{
			search(keyword);
		}
	});

	// 每10分钟请求一次，防止session过期调用
	function sessionHold(){
		$.ajax({
			dataType: 'json',
			type: 'POST',
			url: 'handler/handleKeepSessionAlive.php'
		});
	}
	window.setInterval(sessionHold, 600000);


	/* 2015-10-20: ios9，reset.css里的body:overflow:hidden，导致无法缩放 */
	/* 1. 判断ios9 */
	/* 2. 覆盖body样式 */
	(function () {
		var ua = navigator.userAgent.toLowerCase();

		function isIOS9() {
			if(/like mac os x/.test(ua)
				&& /iphone|ipad|ipod/.test(ua)
				&& /os [9]_\d[_\d]* like mac os x/ig.test(ua)) {
				
				return true;
			}
			return false;
		}
		var ios9 = isIOS9();
		if(ios9) {
			$('body').css({
				'overflow': 'auto'
			});
		}
	})();
});

//快速搜索
function search(keyword){
	if(abortCount && abortCount.readystate != 4){
		abortCount.abort();
	}
	$.ajax({
		url: 'handler/handleQuickSearch.php',
		type: 'POST',
		dataType:'JSON',
		mode: "abort",
		data: {
			"DATA": '{"KEYWORD":'+$.toJSON(keyword)+'}'
		},
		beforeSend: function(){
			$(".frame_searchIng").empty().show().append("<span style=\"background:url('images/loading.gif') no-repeat;margin-top:5px;padding-left:30px\">正在搜索，请稍候...</span>");
			$("#keyword").siblings('.search_btn').css("background-image", "url(images/searching.gif)");
		},
		success: function(data){
			var matchInfo,
				matchTag,
				matchName,
				matchGroup,
				keyInfo,
				subKeyWordIndex,
				pinyinMod,
				pinyinModIndex,
				i,
				contactsLength,
				groupLength,
				contactsInfo = "",
				groupsInfo = "";
			if (data.flag) {
				$(".frame_searchIng").hide();
				$("#frame_search").hide();
				$(".search_result").empty();
				contactsLengthAll = 0;
				contactsArray = {};
				groupsLengthAll = 0;
				groupsArray = {};
				if (data.data.contacts.d) {
					$(".search_contact").show();
					contactsArray = data.data.contacts.d;
					showSearchContacts(0, 10);
				}else{
					$(".search_contact").hide();
				}
				if (data.data.groups.d) {
					$(".search_group").show();
					groupsArray = data.data.groups.d;
					showSearchGroups(0, 10);
					$(".search_group").find('.search_result').append(groupsInfo);
				}else{
					$(".search_group").hide();
				}
				getSearchCount();
				$("#frame_search").show();
				$(".search_result").niceScroll({
					cursorborder: "",
					cursorcolor: "#999",
					zindex: "520"
				}).resize().show();
			}else{
				$("#frame_search").hide();
				$(".search_result").empty();
				$(".frame_searchIng").empty().append('<span>抱歉，未搜索到匹配结果...</span>');
				$(".search_result").niceScroll().resize().hide();
			}
			if ($("#keyword").val() == "") {
				$("#frame_search").hide();
				$(".frame_searchIng").hide();
			}
		},
		complete: function(){
			$("#keyword").siblings('.search_btn').css("background-image", "url(images/search.png)");
		}
	});
}
function getSearchCount(){
	abortCount = $.ajax({
		url: 'handler/handleQuickSearchCount.php',
		type: 'POST',
		dataType:'JSON',
		mode: "abort",
		data: {
			"DATA": '{"KEYWORD":'+$.toJSON(keyword)+'}'
		},
		success: function(data){
			if (data.flag) {
				if (data.count.contacts > 10) {
					$(".search_contact").find('.search_result').append('<li class="contactsMore">当前仅显示'+data.count.contacts+'个搜索结果中的10项</li>');
				}
				if (data.count.groups > 10) {
					$(".search_group").find('.search_result').append('<li class="groupsMore">当前仅显示'+data.count.groups+'个搜索结果中的10项</li>');
				}
			}
		}
	});
}
$("body").live("click",function(){
	$("#frame_search").find('.search_result').getNiceScroll().hide();
	$("#frame_search").hide();
	$(".frame_searchIng").hide();
});
$(".search_result li").live("mouseover",function(){
	$(".search_result li").not(this).removeClass("searchHover");
	$(this).addClass("searchHover");
});
$(".search_result li").live("mouseout",function(){
	$(this).removeClass("searchHover");
});
$(".search_contact li").live("click",function(e){
	e.stopPropagation();
	if ($(this).hasClass("contactsMore")) {
		// var endI = contactsLengthAll;
		// $(this).remove();
		// showSearchContacts(10, endI);
		// $(".search_result").getNiceScroll().resize().show();
	}else{
		var contactId = $(this).attr("contactSearchId");
		window.open("viewContact.php?ID="+contactId+"");
	}
});
$(".search_group li").live("click",function(e){
	e.stopPropagation();
	if ($(this).hasClass("groupsMore")) {
		// var endI = groupsLengthAll;
		// $(this).remove();
		// showSearchGroups(10, endI);
		// $(".search_result").getNiceScroll().resize().show();
	}else{
		var groupId = $(this).attr("groupsearchid");
		window.open("group.php?ID="+groupId+"");
	}
});

function showSearchContacts(startI, endI){
	var matchInfo,
		matchTag,
		matchName,
		keyInfo,
		subKeyWordIndex,
		pinyinMod,
		pinyinModIndex;
	$.each(contactsArray, function (i,v){
		matchInfo = "";
		matchTag = "";
		matchName = "";
		keyInfo = "";
		subKeyWordIndex = 0;
		if (v.company != undefined) {
			matchInfo = MK_ESCAPE.tohtmlStr(v.company);
		}
		if (v.email != undefined) {
			matchInfo = MK_ESCAPE.tohtmlStr(v.email);
		}
		if (v.address != undefined) {
			matchInfo = MK_ESCAPE.tohtmlStr(v.address);
		}
		if (v.content != undefined) {
			matchInfo = MK_ESCAPE.tohtmlStr(v.content);
		}
		subKeyWordIndex = encodeValue(matchInfo).split(';')[0].indexOf(keyword);
		pinyinMod = pinyinModify(keyword, matchInfo);
		if(pinyinMod.length > 0){
			pinyinModIndex = matchInfo.indexOf(pinyinMod);
		} else {
			pinyinModIndex = -1;
		}
		if(matchInfo.indexOf(keyword)>=0){
			keyInfo = keyword;
		}
		if(subKeyWordIndex >= 0){
			keyInfo = matchInfo.substr(subKeyWordIndex, keyword.length);
		}
		if(pinyinModIndex >= 0){
			keyInfo = pinyinMod;
		}
		keyInfo = keyInfo.replace(/[\$\^\{\[\(\|\)\*\+\?\\]/igm, function($){
			return '\\'+$;
		});

        if(keyInfo != '') {
            matchInfo = matchInfo.replace(new RegExp(keyInfo, 'igm'), function ($) {
                return '<span class="Corange">' + $ + '</span>';
            });
        }

		if (v.tag != undefined) {
			matchTag = MK_ESCAPE.tohtmlStr(v.tag);
			subKeyWordIndex = encodeValue(matchTag).indexOf(keyword);
			if(matchTag.indexOf(keyword)>=0){
				keyInfo = keyword;
			}
			if(subKeyWordIndex >= 0){
				keyInfo = matchTag.substr(subKeyWordIndex, keyword.length);
			}
			keyInfo = keyInfo.replace(/[\$\^\{\[\(\|\)\*\+\?\\]/igm, function($){
				return '\\'+$;
			});
			matchTag = matchTag.replace(new RegExp(keyInfo,'igm'),function($){
				return '<span class="Corange">'+$+'</span>';
			});
			matchTag = "<span>"+matchTag+"</span>";
		}

		if(v.name != undefined){
			matchName = MK_ESCAPE.tohtmlStr(v.name);
			subKeyWordIndex = encodeValue(matchName).split(';')[0].indexOf(keyword);
			pinyinMod = pinyinModify(keyword, matchName);
			if(pinyinMod.length > 0){
				pinyinModIndex = matchName.indexOf(pinyinMod);
			} else {
				pinyinModIndex = -1;
			}

			if(matchName.indexOf(keyword)>=0){
				keyInfo = keyword;
			}
			if(subKeyWordIndex >= 0){
				keyInfo = matchName.substr(subKeyWordIndex, keyword.length);
			}
			if(pinyinModIndex >= 0){
				keyInfo = pinyinMod;
			}
			keyInfo = keyInfo.replace(/[\$\^\{\[\(\|\)\*\+\?\\]/igm, function($){
				return '\\'+$;
			});
			if(keyInfo.length > 0){
				matchName = matchName.replace(new RegExp(keyInfo,'igm'),function($){
					return '<span class="Corange">'+$+'</span>';
				});
			}
			matchName = "<span>"+matchName+"</span>";
		}
		$(".search_contact").find('.search_result').append("<li contactSearchId = '"+v.id+"'><div class='search_img_contact'></div><p class='contactR_name'>"+matchName+"</p><p class='contactR_matchTag'>"+matchTag+"</p><p class='contactR_matchInfo'>"+matchInfo+"</p></li>");
	});
}
function showSearchGroups(startI,endI){
	var matchGroup,
		keyInfo,
		subKeyWordIndex;
	$.each(groupsArray, function (i,v){
		matchGroup = "";
		keyInfo = "";
		subKeyWordIndex = 0;
		if(v.name != undefined){
			matchGroup = MK_ESCAPE.tohtmlStr(v.name);
			subKeyWordIndex = encodeValue(matchGroup).indexOf(keyword);
			if(matchGroup.indexOf(keyword)>=0){
				keyInfo = keyword;
			} else if(subKeyWordIndex >= 0){
				keyInfo = matchGroup.substr(subKeyWordIndex, keyword.length);
			}
			keyInfo = keyInfo.replace(/[\$\^\{\[\(\|\)\*\+\?\\]/igm, function($){
				return '\\'+$;
			});
			matchGroup = matchGroup.replace(new RegExp(keyInfo,'igm'),function($){
				return '<span class="Corange">'+$+'</span>';
			});
			matchGroup = "<span>"+matchGroup+"</span>";
		}

		$(".search_group").find('.search_result').append("<li groupSearchId = '"+v.id+"'><div class='search_img_group'></div><p class='groupResult_name'>"+matchGroup+"</p><span class='groupResult_count'>"+v.count+"</span></li>");
	});
}

//退出
function logout(){
    if(typeof(MKGlobal) !== 'undefined' && typeof(MKGlobal.unsaveinfo) !== 'undefined') {
        if (MKGlobal.unsaveinfo !== 0) {
            //sth unsaved
            if(confirm("您有编辑的内容尚未保存，确定退出？")) {
                $(window).off('beforeunload');
            }else{
                return false;
            }
        }
    }
	$.ajax({
		type: "post",
		url: "handler/handleLogout.php",
		error: function () {
			return false;
		},
		success: function (data) {
			var json = eval("("+data+")");
			if (json.flag){
				location.href = "login.php";
			}
		}
	});
}

function replaceQuote(StringObj){
    return StringObj.replace(/"/g , "").replace(/'/g , "").replace(/\\/g , "");
}

function _sendRequest(orderId){
	return $.ajax({
		url: 'handler/handleCheckOrder.php',
		type: 'POST',
		data: {
			"DATA": '{"ORDER":"' + orderId + '"}'
		},
		dataType: 'JSON'
	});
}

//sidebar
$(document).ready(function(){

	// 红包活动
	$(".icon_gift").click(function(){
		$.ajax({
			url: 'handler/handleAddOrder.php',
			type: 'POST',
			data: {
				"DATA": "{\"PURCHASE\":[{\"TYPE\":\"1\", \"QUOTA\":\"1\"}]}"
			},
			dataType:'JSON',
			success: function(data){
				if (data.flag){
					var orderId = data.data;
					TINY.box.show({
						html:$(".popwin_gift").html(),
						width: 460,
						height: 460,
						animate:true,
						close:true,
						boxid:"gift_box",
						openjs: function(){
							var giftBox = $("#gift_box");
							giftBox.find(".popwin_pay_confirm").click(function(event) {
								var _selfBtn = $(this);
								giftBox.find("input").val(orderId).parent().submit();

								_selfBtn.text("么么哒~红包快到碗里来~").unbind('click');
								_selfBtn.siblings('.popwin_pay_cancel').remove();

								_selfBtn.click(function(event) {
									_sendRequest(orderId).done(function(data){
										if(data.flag){
											window.clearInterval();
											giftBox.find(".title").text('你真是个好人，送你一个新年皮肤~');
											giftBox.find(".content").html('麻麻说，不能随便要别人的钱钱 %>_<%<br />钱钱还给你，帮你放到账户里啦~');
											_selfBtn.text("新年快乐~").click(function(event) {
												location.reload();
											});
										}
									});
								});

								window.setTimeout(function(){
									var intervalID = window.setInterval(function(){
										_sendRequest(orderId).done(function(data){
											if(data.flag){
												window.clearInterval(intervalID);
												giftBox.find(".title").text('你真是个好人，送你一个新年皮肤~');
												giftBox.find(".content").html('麻麻说，不能随便要别人的钱钱 %>_<%<br />钱钱还给你，帮你放到账户里啦~');
												_selfBtn.text("新年快乐~").click(function(event) {
													location.reload();
												});
											}
										});
									},2000);
								},10000);
							});
						}
					});
				}
			}
		});
	});

	$(".navItem_box").hover(function(){
		$(this).css("backgroundColor",'#3A6C92').stop(true).animate({width:"110px"},200);
		return false;
	},function(){
		$(this).stop(true).animate({width:"38px",backgroundColor:"transparent"},200);
		return false;
	});
	$(".importContact").click(function(){
        if(typeof(formBuilderUnSaveMsg)==="string" && typeof(unSavedHandle)==="function"){
            if(!unSavedHandle()){
                return false;
            }
        }
		location.href = "importContactStep.php";
	});
	$(".newContact").click(function(){
		window.open("newContact.php");
		//location.href = "newContact.php";
	});
	$(".newMail").click(function(){
        if(typeof(formBuilderUnSaveMsg)==="string" && typeof(unSavedHandle)==="function"){
            if(!unSavedHandle()){
                return false;
            }
        }
		TINY.box.show({
			html:$(".popwin_newMail").html(),
			width: 460,
			height: 220,
			animate:true,
			close:true,
			boxid:"popwin",
			openjs: function(){
				$(".popwin_newMail_input").keyup(function(e){
					if ( e.keyCode == 13 ) {
						var mailName = $(this).val();
						if (mailName!="") {
							addMail(mailName);
						}
					}
				});
			}
		});
		var isClicked = false;
		$(".popwin_newMail_confirm").live("click",function(){
			var mailName = $(this).siblings(".popwin_newMail_input").val();
			if (mailName!="") {
				if(!isClicked){
					isClicked = true;
					addMail(mailName);
				}
			}
		});
	});
	$(".newMessage").click(function(){
		location.href = "newMessage.php";
	});

	$(".formBuilder").click(function(){
        if(typeof(formBuilderUnSaveMsg)==="string" && typeof(unSavedHandle)==="function"){
            if(!unSavedHandle()){
                return false;
            }
        }
		var _type = 1; 
		TINY.box.show({
			html:$(".popwin_newForm").html(),
			width: 480,
			height: 300,
			animate:true,
			close:true,
			boxid:"popwin",
			openjs: function(){
				// 选择状态
				
				$('.popwin_formtype').unbind('click').bind('click',function(){
					var $this = $(this);
					if($this.hasClass('popwin_formtype_normal')){
						_type = 1;
					} else if($this.hasClass('popwin_formtype_logic')) {
						_type = 2;
					}

					$this.parent('.popwin_formTypeContent').slideUp(200,function(){
						$this.parent('.popwin_formTypeContent').siblings('.popwin_formNameContent').fadeIn(200);
					});
				});

				$(".popwin_newForm_input").keyup(function(e){
					if ( e.keyCode == 13 ) {
						var formName = $(this).val();
						if (formName!="") {
							addForm(formName,_type);
						}
					};
				});
			}
		});
		$(".popwin_newForm_confirm").live("click",function(){
			var formName = $(this).siblings(".popwin_newForm_input").val();
			if (formName!="") {
				addForm(formName,_type);
			}
		});
	});
	//留言反馈
	$(".messageFeedback").click(function(){
		TINY.box.show({
			html:$(".popwin_messageFeedback").html(),
			width: 500,
			height: 300,
			animate:true,
			close:true,
			boxid: "messageFeedback_win",
			openjs: function(){
				//messageVal();
				$(".tbox .messagePlaceHolder").click(function(){
					$(".messagesTous").focus();
				});
				$(".messagesTous").keyup(function(){
					triggerPlaceHolder(this);
				});
				//messageFeedbackValidate();
				$(".tbox input").keyup(function(){
					if ($(this).val()!="") {
						$(this).removeClass("popwin_inputError");
					}else{
						$(this).addClass("popwin_inputError");
					}
				});
				$(".tbox .messagesTous").keyup(function(){
					if ($(this).val()!="") {
						$(this).removeClass("popwin_inputError");
					}else{
						$(this).addClass("popwin_inputError");
					}
				});

				$(".popwin_messageFeedback_confirm").click(function(){
					if ($(this).hasClass('btn_blue')) {
						if ($(".tbox .message_name").val() == "") {
							$(".tbox .message_name").addClass("popwin_inputError");
						}
						if ($(".tbox .message_email").val() == "") {
							$(".tbox .message_email").addClass("popwin_inputError");
						}
						if ($(".tbox .messagesTous").val() == "") {
							$(".tbox .messagesTous").addClass("popwin_inputError");
						}
						if ( $(".tbox .message_name").val() != "" && $(".tbox .message_email").val() != "" && $(".tbox .messagesTous").val() != "") {
							var generateJSON = '{"form":{"title":"留言反馈","logo":"","subtitle":""},"component":[{"name":"basic_name","id":"com1","title":"姓名","required":false,"instruct":"","value":'+JSON.stringify($(".tbox .message_name").val())+',"size":"input medium"},{"name":"basic_email","id":"com2","title":"邮箱","required":false,"instruct":"","value":'+JSON.stringify($(".tbox .message_email").val())+',"size":"input medium"},{"name":"basic_mobile","id":"com4","title":"手机","required":false,"instruct":"","value":'+JSON.stringify($(".tbox .message_phone").val())+',"size":"input medium"},{"name":"id_multiple","id":"com3","title":"留言内容","required":false,"instruct":"","value":'+$.toJSON($(".tbox .messagesTous").val())+',"size":"textarea medium"}],"contact":{"NAME":'+JSON.stringify($(".tbox .message_name").val())+',"LEGEND":'+$.toJSON( encodeValue( ($(".tbox .message_name").val()||"") ) )+',"GENDER":"","EMAIL":['+JSON.stringify($(".tbox .message_email").val())+'],"COMPANY":"","CITY":"","JOB":"","WEBSITE":"","ADDRESS":"","FAX":[],"MOBILE":['+JSON.stringify($(".tbox .message_phone").val())+'],"PHONE":[],"QQ":[],"FLAGS":[{"N":"留言用户","L":"lyyh"}],"GROUPS":"102"},"sendMail":true,"sendToEmail":"service@mikecrm.com","sendToName":"麦客团队"}';
							messageFeedback(generateJSON);
						}
					}

				});
			}
		});
	});

	//分享麦客
	$(".userSurvey").click(function(){
		window.open('http://www.mikecrm.com/form/form.php?TOKEN=af0a30d8eee954dc4b0bd0f58ee3ac74');
	});

	//麦客百科
	$(".nav_mikeWiki").click(function(){
		window.open('http://wiki.mikecrm.com');
	});

	//分享麦客
	$(".nav_shareMike").click(function(){
		TINY.box.show({
			html:$(".popwin_shareMike").html(),
			width: 480,
			height: 205,
			animate:true,
			close:true,
			boxid:"shareMike_box",
			openjs: function(){
				shareMikeTiny();
			}
		});
	});

	//启用表单
	$(".btn_formEnable").click(function(){
		TINY.box.show({
			html:$("#popwin_EnableForm").html(),
			width:414,
			height:225,
			fixed:false,
			maskid:'blackmask',
			maskopacity:40,
			boxid:"EnableForm_box",
			openjs:function(){
				//获取停止收集表单时间
				if ($(".formDisable_result").text()) {
					var disableResultTime = $(".formDisable_result").find(".year").text()+"/"+datePad($(".formDisable_result").find(".month").text())+"/"+datePad($(".formDisable_result").find(".day").text())+" "+$(".formDisable_result").find(".time").text().replace("：",":")+":00";
				}

				//获取当前时间
				var date = new Date();
				$("#EnableForm_box .current_time").find(".year").text(date.getFullYear()).siblings(".month").text(datePad(date.getMonth()+1)).siblings(".day").text(datePad(date.getDate())).siblings(".time").text(datePad(date.getHours())+":"+datePad(date.getMinutes()));
				//提交表单
				$(".popwin_EnableForm_confirm").click(function(){
					var enableYear = $(this).siblings(".enable_time").find(".year").val();
					var enableMonth = $(this).siblings(".enable_time").find(".month").val();
					var enableDay = $(this).siblings(".enable_time").find(".day").val();
					var enableTime = $(this).siblings(".enable_time").find(".time").val();

					var validateTime = enableYear+"-"+enableMonth+"-"+enableDay;
					var regdate = /((^((1[8-9]\d{2})|([2-9]\d{3}))([-\/\._])(10|12|0?[13578])([-\/\._])(3[01]|[12][0-9]|0?[1-9])$)|(^((1[8-9]\d{2})|([2-9]\d{3}))([-\/\._])(11|0?[469])([-\/\._])(30|[12][0-9]|0?[1-9])$)|(^((1[8-9]\d{2})|([2-9]\d{3}))([-\/\._])(0?2)([-\/\._])(2[0-8]|1[0-9]|0?[1-9])$)|(^([2468][048]00)([-\/\._])(0?2)([-\/\._])(29)$)|(^([3579][26]00)([-\/\._])(0?2)([-\/\._])(29)$)|(^([1][89][0][48])([-\/\._])(0?2)([-\/\._])(29)$)|(^([2-9][0-9][0][48])([-\/\._])(0?2)([-\/\._])(29)$)|(^([1][89][2468][048])([-\/\._])(0?2)([-\/\._])(29)$)|(^([2-9][0-9][2468][048])([-\/\._])(0?2)([-\/\._])(29)$)|(^([1][89][13579][26])([-\/\._])(0?2)([-\/\._])(29)$)|(^([2-9][0-9][13579][26])([-\/\._])(0?2)([-\/\._])(29)$))/ig;
					var regDateTime = /^((20|21|22|23|[01]?\d):[0-5]?\d$)/;

					var enableStartTime = enableYear+"/"+datePad(enableMonth)+"/"+datePad(enableDay)+" "+enableTime.replace("：",":")+":00";
					var currentTime = date.getFullYear()+"/"+datePad(date.getMonth()+1)+"/"+datePad(date.getDate())+" "+date.getHours()+":"+date.getMinutes()+":00";
					if ( enableYear=="" || enableMonth=="" || enableDay=="" || enableTime=="" ) {
						$(this).siblings(".enableError").css("visibility","visible").text("请输入完整的启用表单时的时间");
					}else{
						if (!regdate.test(validateTime) || !regDateTime.test(enableTime.replace("：",":"))) {
							$(this).siblings(".enableError").css("visibility","visible").text("请输入正确的时间");
						}else if (enableStartTime < currentTime) {
							$(this).siblings(".enableError").css("visibility","visible").text("启用表单的时间不能早于当前时间哦~~");
						}else if (disableResultTime <= enableStartTime) {
							$(this).siblings(".enableError").css("visibility","visible").text("启用表单的时间需早于停用表单的时间哦~~");
						}else{
							$(this).siblings(".enableError").css("visibility","hidden");
							TINY.box.hide();
							$(".formEnable_result").empty().append('开始收集表单时间：<span class="year">'+enableYear+'</span> 年 <span class="month">'+datePad(enableMonth)+'</span> 月 <span class="day">'+datePad(enableDay)+'</span> 日 <span class="time">'+enableTime.replace("：",":")+'</span>');
						}
					}
				});
			}
		});
	});

	//停用表单
	$(".btn_formDisable").live("click",function(){
		TINY.box.show({
			html:$("#popwin_disableForm").html(),
			width:414,
			height:245,
			fixed:false,
			maskid:'blackmask',
			maskopacity:40,
			boxid:"disableForm_box",
			openjs:function(){
				//按钮的切换
				$(".btn_switchBtn a").click(function(){
					var switchIndex = $(this).index();
					$("#disableForm_box").find(".btn_switchBtn a:not(:eq("+switchIndex+"))").removeClass("active");
					$("#disableForm_box").find(".btn_switchBtn a:eq("+switchIndex+")").addClass("active");
					$("#disableForm_box").find(".switchField:not(:eq("+switchIndex+"))").hide();
					$("#disableForm_box").find(".switchField:eq("+switchIndex+")").show();
				});
				//获取启用表单时间
				if ($(".formEnable_result").text()) {
					var enableResultTime = $(".formEnable_result").find(".year").text()+"/"+datePad($(".formEnable_result").find(".month").text())+"/"+datePad($(".formEnable_result").find(".day").text())+" "+$(".formEnable_result").find(".time").text().replace("：",":")+":00";
				}

				//获取当前时间
				var date = new Date();
				$("#disableForm_box .current_time").find(".year").text(date.getFullYear()).siblings(".month").text(datePad(date.getMonth()+1)).siblings(".day").text(datePad(date.getDate())).siblings(".time").text(datePad(date.getHours())+":"+datePad(date.getMinutes()));
				//提交表单
				$(".popwin_disableForm_confirm").click(function(){
					if ($(this).closest(".switchField").hasClass("switchDisableTime")) {//按时间
						var disableYear = $(this).siblings(".disable_time").find(".year").val();
						var disableMonth = $(this).siblings(".disable_time").find(".month").val();
						var disableDay = $(this).siblings(".disable_time").find(".day").val();
						var disableTime = $(this).siblings(".disable_time").find(".time").val();

						var validateTime = disableYear+"-"+disableMonth+"-"+disableDay;
						var reg = /((^((1[8-9]\d{2})|([2-9]\d{3}))([-\/\._])(10|12|0?[13578])([-\/\._])(3[01]|[12][0-9]|0?[1-9])$)|(^((1[8-9]\d{2})|([2-9]\d{3}))([-\/\._])(11|0?[469])([-\/\._])(30|[12][0-9]|0?[1-9])$)|(^((1[8-9]\d{2})|([2-9]\d{3}))([-\/\._])(0?2)([-\/\._])(2[0-8]|1[0-9]|0?[1-9])$)|(^([2468][048]00)([-\/\._])(0?2)([-\/\._])(29)$)|(^([3579][26]00)([-\/\._])(0?2)([-\/\._])(29)$)|(^([1][89][0][48])([-\/\._])(0?2)([-\/\._])(29)$)|(^([2-9][0-9][0][48])([-\/\._])(0?2)([-\/\._])(29)$)|(^([1][89][2468][048])([-\/\._])(0?2)([-\/\._])(29)$)|(^([2-9][0-9][2468][048])([-\/\._])(0?2)([-\/\._])(29)$)|(^([1][89][13579][26])([-\/\._])(0?2)([-\/\._])(29)$)|(^([2-9][0-9][13579][26])([-\/\._])(0?2)([-\/\._])(29)$))/ig;
						var regTime = /^((20|21|22|23|[01]?\d):[0-5]?\d$)/;

						var endTime = disableYear+"/"+datePad(disableMonth)+"/"+datePad(disableDay)+" "+disableTime.replace("：",":")+":00";
						var startTime = date.getFullYear()+"/"+datePad(date.getMonth()+1)+"/"+datePad(date.getDate())+" "+date.getHours()+":"+date.getMinutes()+":00";
						if ( disableYear=="" || disableMonth=="" || disableDay=="" || disableTime=="" ) {
							$(this).siblings(".disableError").css("visibility","visible").text("请输入完整的停用表单时的时间");
						}else{
							if (!reg.test(validateTime) || !regTime.test(disableTime.replace("：",":"))) {
								$(this).siblings(".disableError").css("visibility","visible").text("请输入正确的时间");
							}else if (endTime < startTime) {
								$(this).siblings(".disableError").css("visibility","visible").text("停用表单的时间不能早于当前时间哦~~");
							}else if (endTime <= enableResultTime) {
								$(this).siblings(".disableError").css("visibility","visible").text("停用表单的时间需晚于启用表单的时间哦~~");
							}else{
								$(this).siblings(".disableError").css("visibility","hidden");
								TINY.box.hide();
								$(".formDisable_result").empty().append('停止收集表单时间：<span class="year">'+disableYear+'</span> 年 <span class="month">'+datePad(disableMonth)+'</span> 月 <span class="day">'+datePad(disableDay)+'</span> 日 <span class="time">'+disableTime.replace("：",":")+'</span>');
							}
						}
					}else{//按反馈数
						var feedbackNum = $(this).siblings(".disable_feedbackNum").find(".feedbackNum").val();
						var currentNum = $(this).siblings(".current_feedbackNum").find("span").text();
						if (feedbackNum == 0) {
							$(this).siblings(".disableError").css("visibility","visible").text("请填写停用表单时的反馈数");
						}else{
							if (parseInt(feedbackNum) < parseInt(currentNum)) {
								$(this).siblings(".disableError").css("visibility","visible").text("停用表单时的反馈数不能少于当前的反馈数哦~~");
							}else{
								$(this).siblings(".disableError").css("visibility","hidden");
								//~~~~~~~~~~~~~~
							}
						}

					}
				});
			}
		});
	});

    $(".formBuilderUnSaveEventOnSideBar").trigger('load');

});

function shareMikeTiny(){
	$(".jiathis_button_tsina").click(function(){
		window.open('http://www.jiathis.com/send/?webid=tsina&url=http://www.mikecrm.com&title=麦客是一款简洁易用的表单制作与联系人管理工具，你可以自己设计表单，收集结构化数据，轻松进行客户管理。我在使用麦客，你也来试试吧！');
	});
	$(".jiathis_button_weixin").click(function(){
		window.open('http://www.jiathis.com/send/?webid=weixin&url=http://www.mikecrm.com&title=麦客是一款简洁易用的表单制作与联系人管理工具，你可以自己设计表单，收集结构化数据，轻松进行客户管理。我在使用麦客，你也来试试吧！');
	});
	$(".jiathis_button_douban").click(function(){
		window.open('http://www.jiathis.com/send/?webid=douban&url=http://www.mikecrm.com&title=麦客是一款简洁易用的表单制作与联系人管理工具，你可以自己设计表单，收集结构化数据，轻松进行客户管理。我在使用麦客，你也来试试吧！');
	});
	$(".jiathis_button_cqq").click(function(){
		window.open('http://www.jiathis.com/send/?webid=cqq&url=http://www.mikecrm.com&title=麦客是一款简洁易用的表单制作与联系人管理工具，你可以自己设计表单，收集结构化数据，轻松进行客户管理。我在使用麦客，你也来试试吧！');
	});
	$(".jiathis_button_renren").click(function(){
		window.open('http://www.jiathis.com/send/?webid=renren&url=http://www.mikecrm.com&title=麦客是一款简洁易用的表单制作与联系人管理工具，你可以自己设计表单，收集结构化数据，轻松进行客户管理。我在使用麦客，你也来试试吧！');
	});
}

function messageVal(){
	$(".tbox .messagePlaceHolder").click(function(){
		$(".messagesTous").focus();
	});
	$(".messagesTous").keyup(function(){
		triggerPlaceHolder(this);
	});
}
function triggerPlaceHolder(obj){
    if($(obj).val() !== ""){
        $(obj).siblings("span").hide();
    }else{
        $(obj).siblings("span").show();
    }
}
function messageFeedback(generateJSON){
	var confirm_Btn = $("#messageFeedback_win .popwin_messageFeedback_confirm");
	$.ajax({
		url: 'handler/handleAddFormFeedback.php',
		type: 'POST',
		data: {
			"DATA": "{\"FORMTOKEN\":\"a140a9a4d955f056ed8bc692598fabba\",\"TEMPLATE\":"+generateJSON+",\"INFO\":\"北京 朝阳区\"}"
		},
		dataType: 'JSON',
		beforeSend: function(data){
			confirm_Btn.removeClass('btn_blue').addClass('btn_gray').removeClass('popwin_messageFeedback_confirm').text("提交中...")
		},
		success: function(data){
			$(".messageFeedback_content:last").empty().append('<p style="margin-top:60px;">感谢您的反馈，我们会尽快与您取得联系！:)</p><a class="button btn_blue popwin_messageFeedback_close" style="margin-top:85px;">确定</a>');
			$(".popwin_messageFeedback_close").live("click",function(){
				TINY.box.hide();
			});
		}
	});
}
function messageFeedbackValidate(){
	$(".tbox input").keyup(function(){
		if ($(this).val()!="") {
			$(this).removeClass("popwin_inputError");
		}else{
			$(this).addClass("popwin_inputError");
		}
	});
	$(".tbox .messagesTous").keyup(function(){
		if ($(this).val()!="") {
			$(this).removeClass("popwin_inputError");
		}else{
			$(this).addClass("popwin_inputError");
		}
	});
}

//form表单下的input的name和value传值，转换成json
function tojson(formid){
	var dataArr = new Array();
	formid.find("input").each(function(i){
		var name = $(this).attr("name");
		if((name == "PASSWORD" ) || name == "OLDPASSWORD" || name == "NEWPASSWORD" || name == "NEWPASSWORDAGAIN"){
			if ($(this).val()!="") {
				var value = hex_md5($(this).val());
			}else{
				var value = "";
			}
		}else if ($(this).attr("type") == "checkbox") {
			var value = ($(this).attr("checked") == "checked")?"true":"false";
		}else{
			var value = $(this).val();
		}
		dataArr.push( '"'+name+'":"'+$.trim(value)+'"' );
	});
	var dataStr = dataArr.join(",");
	dataStr = '{'+dataStr+'}';
	return dataStr;
}

//提交表单
$(document).ready(function(){
	$(".submit").live('click',function(){
		$(this).closest("form").submit();
	});
});

function addForm(formName, formType){
	//{"NAME":"这是一个表单"}';
	$.ajax({
		url: 'handler/handleAddForm.php',
		type: 'POST',
		data: {
			"DATA":"{\"NAME\":"+$.toJSON(formName)+",\"TYPE\":\""+formType+"\"}"
		},
		dataType: 'JSON',
		beforeSend: function(){
			$(".popwin_newForm_confirm").text("正在准备表单...");
		},
		success: function(data){
			if(data.flag){
				var id = data.data;
				$.ajax({
					url: 'handler/handleAlterForm.php',
					type: 'POST',
					data: {
						"DATA": "{\"FRID\":\""+id+"\",\"FIELD\":\"TEMPLATE\",\"VALUE\":"+$.toJSON('{"form":{"title":"空白表单","logo":"","subtitle":"从头开始创建您的表单"},"component":[]}')+"}"
					},
					dataType: 'JSON',
					complete: function(){
						location.href = "formTemplate.php?ID="+id+'&TYPE='+formType;
					}
				});
				//location.href = "formBuilderStep1.php?ID="+data.data;
			}
		}
	});
}

function addMail (mailName){
	$.ajax({
		url: 'handler/handleAddMail.php',
		type: 'POST',
		data: {
			"DATA": "{\"NAME\":"+$.toJSON(mailName)+"}"
		},
		dataType: 'JSON',
		beforeSend: function(){
			$(".popwin_newMail_confirm").text("正在准备邮件...");
		},
		success: function(data){
			if(data.flag){
				// 储存空邮件...
				var id = data.data;
				location.href = "mailTemplate.php?ID="+id;
			}
		}
	});
}

//合并联系人
function autoMerge(){
	$.ajax({
		url: 'handler/handleMergeContact.php',
		type: 'POST',
		dataType: 'JSON',
		beforeSend: function(){

		},
		success: function(data){
			if(data.flag){

			}
		}
	});
};

/**
 *	文字转换的方法 - 将文字转换成拼音首字母 ,大写字母转换成小写字母
 *	@param	value 传入一个字符串，将这个字符串解析
 *	@author Samuel Shen
 *	@2012 - 11 - 30
 */

function encodeValue(value) {
	var newValue = "",
		tmpVal = "",
		tmpChineseSpell;
	for(var i = 0; i < value.length; i++) {
		if(/^[\u4e00-\u9fa5]+/.test( value.charAt(i) )) {
			tmpChineseSpell = getChineseSpell(value.charAt(i));
			newValue += tmpChineseSpell[1];
			// console.log(getChineseSpell(value.charAt(i)));
			tmpVal += tmpChineseSpell[0];
		} else {
			newValue += value.charAt(i).toLowerCase();
			tmpVal += value.charAt(i).toLowerCase();
		}
	}
	newValue += ';'+tmpVal;
	return newValue;
}

function encodeValueExtend(value) {
	var newValue = "",
		tmpVal = "",
		valueArray = [],
		_R,
		tmpChineseSpell;
	for(var i = 0; i < value.length; i++) {
		if(/^[\u4e00-\u9fa5]+/.test( value.charAt(i) )) {
			tmpChineseSpell = getChineseSpell(value.charAt(i));
			tmpVal += tmpChineseSpell[0];
			valueArray.push({'value':tmpChineseSpell[0],'length':tmpChineseSpell[0].length});
		} else {
			tmpVal += value.charAt(i).toLowerCase();
			valueArray.push({'value':value.charAt(i).toLowerCase(),'length':1});
		}
	}
	newValue = tmpVal;
	_R = [newValue,valueArray];
	return _R;
}

// 输入的是拼音和字符串，返回字符串的值
function pinyinModify(pinyin, str) {
	var strEncodeObj = encodeValueExtend(str),
		startIndex = strEncodeObj[0].indexOf(pinyin),
		endIndex = startIndex+pinyin.length,
		tmpPinyin = pinyin,
		_R = '';
	if(startIndex >= 0){
		var tmpLength = 0,	// 整体的位置
			currentLength = 0, // 匹配部分占有的值
			oldTempLength = 0;
		for (var charIndex in strEncodeObj[1]) {

			if(tmpPinyin.length > 0){
				oldTempLength = tmpLength;
				tmpLength += strEncodeObj[1][charIndex]['length'];
				if(tmpLength > startIndex){
					var maxCutLen = 0;
					var cutStart = tmpLength - startIndex;
					if(tmpLength >= endIndex){
						maxCutLen = tmpPinyin.length;
					} else{
						if(cutStart > strEncodeObj[1][charIndex]['length']){
							maxCutLen = strEncodeObj[1][charIndex]['length'];
						} else {
							maxCutLen = cutStart;
						}
					}
					tmpPinyin = tmpPinyin.substring(maxCutLen, tmpPinyin.length);
					_R += str[charIndex];
				}
			} else {
				break;
			}
		}
	}
	return _R;
}

//处理月份
function datePad(date){
	var length = date.toString().length;
	if (length<2) {
		dateP = "0" + date;
	}else{
		dateP = date;
	}
	return dateP;
}

function isEmptyObject(obj) {
	for (var name in obj) {
		return false;
	}
	return true;
}