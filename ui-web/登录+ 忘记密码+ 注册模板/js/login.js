/****************************************************************
 *																*		
 * 						      代码库							*
 *                        www.dmaku.com							*
 *       		  努力创建完善、持续更新插件以及模板			*
 * 																*
****************************************************************/
$(document).ready(function(){

    $(".register_items input").keyup(function(e){
        if(e.keyCode >= 188){
            $(this).val(replaceQuote($(this).val()));
        }
    });

	behaviorWarpper(0,login_authCodeGen);
	loginValidate();//登录验证

	// 意义不明
	//通过检测链接中是否包含'?'来判断链接是否但参数，若有参数则弹出注册页面
  	// registerFromIndex
	if(typeof(pageType) !='undefined' && pageType=='register'){
		$(this).addClass("login_active");
		$(this).siblings(".p_login").removeClass("login_active");
		$(this).find(".img_register").css("background-position","0px -27px");
		$(".login_items").slideUp();
		$(".register_items").slideDown();
		$(".p_register").unbind('hover');
		behaviorWarpper(1, register_authCodeGen);
	}

	//登录注册切换
	var $register = $('.p_register'),
		$login = $('.p_login'),
		$copeLogin = $('.coopeLogin_title');

	// 注册的小图标的笑脸事件
	function handleRegisterIconEnter() {
		$(this).addClass("login_active").find(".img_register").stop().animate({"background-position-y":"-27px"},200);
	}
	function handleRegisterIconOut() {
		$(this).removeClass("login_active").find(".img_register").stop().animate({"background-position-y":"0px"},200);
	}

	// 登录标签点击的时候
	function handleClickLoginTab() {
		var $this = $(this),
			$loginBlk = $(".login_items");

			if(!$loginBlk.is(':visible')){
				behaviorWarpper(0,login_authCodeGen,true);
			}

			$(".login_error").hide();

			$this.addClass('login_active').siblings(".p_register").removeClass("login_active").find(".img_register").css("background-position","0px 0px");
			$(".register_items").slideUp();
			$(".coopeLogin_mainFiild").slideUp();
			$loginBlk.slideDown();



			$copeLogin.attr('type','OPEN').text('使用其他账号登录');
			$register.unbind('hover').hover(handleRegisterIconEnter, handleRegisterIconOut);
	}

	// 注册标签点击的时候
	function handleClickRegisterTab() {
		var $this = $(this),
			$registerBlk = $(".register_items");

			$(".login_error").hide();


			if(!$registerBlk.is(':visible')){
				behaviorWarpper(1,register_authCodeGen,true);
			}

			$this.addClass('login_active').siblings(".p_login").removeClass("login_active");
			$this.find(".img_register").css("background-position","0px -27px");
			$register.unbind('hover');

			$(".login_items").slideUp();
			$(".coopeLogin_mainFiild").slideUp();
			$registerBlk.slideDown();

			$copeLogin.attr('type','OPEN').text('使用其他账号登录');
	}

	// 合作登录被点击的时候
	function handleClickCoopeLoginTab() {
		var $this = $(this),
			tabType = $this.attr('type');

		if(tabType === 'OPEN'){
			$(".login_items").slideUp();
			$(".register_items").slideUp();
			$(".coopeLogin_mainFiild").slideDown(400,function(){
				$register.find(".img_register").stop().animate({"background-position-y":"0px"},200);
				$login.addClass('login_active').siblings(".p_register").removeClass("login_active");
			});
			$this.attr("type","CLOSED").text("直接登录");

		} else if(tabType === 'CLOSED'){
			$(".register_items").slideUp();
			$(".coopeLogin_mainFiild").slideUp();
			$(".login_items").slideDown();
			$this.attr("type","OPEN").text("使用其他账号登录");
		}
	}

	// 事件的绑定
	$register.hover(handleRegisterIconEnter, handleRegisterIconOut);
	$register.click(handleClickRegisterTab);
	$login.click(handleClickLoginTab);
	$copeLogin.click(handleClickCoopeLoginTab);


	//二级域名登陆，调整显示的公司字体大小
	var corpName = $(".p_login_Corp");
	if (corpName.length > 0) {
		var fontSize = parseInt(corpName.css("font-size").replace("px", ""));
		while ( getTextWidth(corpName.text(), fontSize, "MYH") > 318 ) {
			fontSize = fontSize-2;
			corpName.css("font-size", fontSize);
		}
	}

	function handleForgetPasswordConfirm() {
		// bind email confirm event when btn shown.
			var $email = $(this).siblings('.input'),
				emailVal = $.trim($email.val());

			if(emailVal && !$email.data('process')){
				$email.data('process',true);
				$.ajax({
					url: 'handler/handleForgetPassword.php',
					type: 'POST',
					dataType:'JSON',
					data:{
						"DATA":  JSON.stringify({
							"EMAIL": emailVal
						})
					}
				}).done(function(res){
					if(res.flag){
						$email.closest('.popwin_content').empty().append('<p class="popwin_tips">已发送邮件到注册邮箱，请根据提示重置密码</p><p class="popwin_description">如果遇到麻烦，可以发邮件到 service@mikecrm.com</p>').closest('.tinner').css("height", "185px");
					} else {
						$email.closest('.popwin_content').find('.popwin_error').show().closest('.tinner').css("height", "255px");
					}
				}).always(function(){
					$email.data('process',false);
				});
			}
	}

	// 回车提交邮箱
	function handleForgotPasswdInputKeyup(evt){
		var $this = $(this);
		if(evt.which === 13){
			handleForgetPasswordConfirm.call($this.siblings('.popwin_forgetPassword_confirm')[0]);
		}
	}

	function handleForgotPasswdBoxOpen(){
		var emailVal = $.trim($('#login_email').val()),
			$box = $('#forgetPasswordPopWin');

		if(emailVal){
			$box.find('.popwin_newForm_input').val(emailVal);
		}

		$box.find('.popwin_newForm_input').trigger('focus');

		$box.off('click.confirm').on('click.confirm','.popwin_forgetPassword_confirm',handleForgetPasswordConfirm);
		$box.off('keyup.emailEnterConfirm').on('keyup.emailEnterConfirm','.popwin_newForm_input',handleForgotPasswdInputKeyup);
	}

	//弹窗--忘记密码
	$("#forgetPassword").click(function(){
		TINY.box.show({
			html:$(".popwin_forgetPassword").html(),
			width:414,
			height:222,
			fixed:false,
			maskid:'blackmask',
			maskopacity:40,
			boxid: 'forgetPasswordPopWin',
			openjs: handleForgotPasswdBoxOpen
		});
	});

	//弹窗--服务协议
	$("#treaty").click(function(){
		TINY.box.show({
			html:$("#popwin_treaty").html(),
			width:414,
			height:470,
			fixed:false,
			maskid:'blackmask',
			maskopacity:40
		});
	});

	//登录状态下，点回车提交表单
	$('#login_main').on('keyup','#login_password,#login_authcode,#register_authcode',function(e){
		var keyCode = e.keyCode ? e.keyCode : e.which ? e.which : e.charCode;
		if (keyCode == 13){
			$(this).closest("form").find('.login_btn').trigger('click');
		}
	});

	$('#login_main').on('click','.img_authCode',function(e){
		if ($(this).closest('form').hasClass('login_items')) {
			behaviorWarpper(0,login_authCodeGen);
		}else{
			behaviorWarpper(1,register_authCodeGen);
		}
	});

	// 验证组件中的事件绑定
	inviteEvent();
	
	// wiki过来默认触发忘记密码
	var wiki = getParam('wiki');
	
	if(wiki && wiki.length > 0 && wiki === 'forget') {
		$('#forgetPassword').trigger('click');	
	}
	
	function getParam(name) {
		name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
		var regexS = "[\\?&]" + name + "=([^&#]*)";
		var regex = new RegExp(regexS);
		var results = regex.exec(window.location.search);
		if (results == null) {
			return "";
		} else {
			return decodeURIComponent(results[1].replace(/\+/g, " "));
		}
	}
});

//登录验证/事件绑定
function loginValidate(){
	$('#login_items .login_btn').click(function(){
		var email = $('[name="EMAIL"]').val();
		var password = $('[name="PASSWORD"]').val();
		if (!email && !password) {
			$(".login_error").text("请输入登录邮箱和密码").css("display","block");
		}else if (!email) {
			$(".login_error").text("请输入邮箱").css("display","block");
		}else if (!password) {
			$(".login_error").text("请输入密码").css("display","block");
		}else if( ($('#login_authcode').length !== 0)&&(!$('[name="AUTHCODE"]').val()) ){
			$(".login_error").text("请输入验证码").css("display","block");
		}else{
			login();
		}
		return false;
	});

}



//注册验证
function registValidate(){
	$("#register_items").validate({
		rules: {
			EMAIL: {
				required: true,
				email: true,
				maxlength: 255,
				remote:{
					type: "POST",
					url: "handler/handleVerifyEmailOnRegister.php",
					data: {
						DATA:function(){
							var data =  '{"EMAIL":"'+$("#register_items").find("[name='EMAIL']").val()+'"}';
							return data;
						}
					},
					callback: function(data){
						// in data,
						// console.log(data);
						if(data.flag === false){
							// console.log(data);
							if(data.data === 'INVITED'){
								return '此邮箱已被邀请过，您可以 <a class="error-link invite-resend">重收邀请</a> 或 <a class="error-link create-new">创建新账号</a>';
							} else if(data.data === 'EXISTS'){
								return '此邮箱已被注册';
							}
						}
						return false;
					}
				}
			},
			PASSWORD: {
				required: true
			},
			NICKNAME: {
				required: true,
				maxlength: 30
			},
			PHONE: {
				maxlength: 30
			},
			COMPANY: {
				required: true,
				maxlength: 255
			}
		},
		messages: {
			EMAIL:{
				remote:"此邮箱已被注册"
			}
		},
		onkeyup: false,
		onclick: false,
		focusInvalid: false,
		success: function(label){
			$(label).parent().addClass("checkRight");
			$(label).remove();
		},
		errorPlacement: function(error,element){
			element.parent().removeClass("checkRight");
			error.appendTo(element.parent()).after("<div class='error_img'></div>");
		},
		submitHandler: function(){
			register();
		}
	});
}
var behaviorWarpper;
(function(){
	var statusRemember = {},
		lazyGetStatus = false,
		uncertain = {};

	// 获取当前状态
	behaviorWarpper = function(type,gener_cb,in_trigger,_cb){	// _cb 表示在调用完成之后的处理
		// 在注册、登录之前必须做的事情 ==== 验证是否太频繁
		type = type?'1':'0';

		if(lazyGetStatus){
			window.clearTimeout(lazyGetStatus);
		}
		lazyGetStatus = false;

		if(!statusRemember[type]){
			$.ajax({
				url: 'handler/handleGenAuthCode.php',
				type: 'POST',
				dataType: 'json',
				mode: 'abort',
				data: {
					'DATA': '{"TYPE":"'+type+'"}'
				}
			}).done(function (res) {
				if(res){
					uncertain[type] = false;
					if(!res.flag){
						// 需要隐藏按钮
						if(parseInt(type,10) === 0){
							$('#login_authcode').closest('.input_val').remove();
						} else {
							$('#register_authcode').closest('.input_val').remove();
						}
						if(_cb){
							_cb();
						}
					} else {
						statusRemember[type] = true;
						gener_cb(res.data);
						setTimeout(function(){
							statusRemember[type] = false;
						},2000);
					}
				} else {
					uncertain[type] = true;
					if(_cb){
						if(parseInt(type,10) === 0){
							$(".login_error").text("系统繁忙，请稍候重试").hide().fadeIn();
						} else {
							$(".register_error").text("系统繁忙，请稍候重试").css("display","block");
						}
					}

				}

			}).fail(function(){
				uncertain[type] = true;
			});
		} else {
			if(in_trigger){
				$('.img_authCode').attr('src','images/loading.gif').css({
					top: '-1px',
					height: '16px'
				});
				(function (t,__cb){
					lazyGetStatus = setTimeout(function (){
						behaviorWarpper(parseInt(t,10),__cb);
					},2000);
				})(type,gener_cb);
			}
		}
	};

	behaviorWarpper.getState = function(_type){
		return uncertain[_type];
	};

})();

//普通登录
function login() {
	var formid = $("#login_items");
	var dataLogin = tojson(formid);

	function __login(){
		$.ajax({
			type: "post",
			url: "handler/handleLoginN.php",
			dataType: 'JSON',
			data: {
				DATA: dataLogin
			},
			success: function (data) {
				if (data.flag){
					$(".login_error").css("display","none");

					if( destPage !== null ){
						location.href = destPage;
					}else{
						location.href = "listContact.php";
					}
				}else{
					if(data.errorCode+'' === '999'){
						// $(".login_error").text("系统异常，请重试").hide().fadeIn();
						window.location.reload();
					} else if(data.errorCode+'' === '111') {
						$(".login_error").text("验证码错误，请重新填写").hide().fadeIn();
					}  else if(data.errorCode+'' === '222') {
                        $(".login_error").text("该用户已被封禁,请联系客服").hide().fadeIn();
                    } else {
						$(".login_error").text("用户名或密码错误").hide().fadeIn();
					}
					behaviorWarpper(0,login_authCodeGen);
				}
			},
			error: function(){
				$(".login_error").text("系统异常，请稍候").hide().fadeIn();
			}
		});
	}

	if(behaviorWarpper.getState('0')){
		behaviorWarpper(0,login_authCodeGen,false,function(){
			__login();
		});
	} else {
		__login();
	}

}

function login_authCodeGen (_img){
	if($('#login_authcode').length === 0){
		$('<label class="input_val"><input class="input" name="AUTHCODE" id="login_authcode" autocomplete="off"><span style="display: none;">验证码</span><img class="img_authCode" src="data:image/png;base64,'+_img+'" style="top: -5px;height: 24px;" title="点击换一张"></label>').insertBefore('.login_msg').trigger('focus').find('input').blur();
	} else {
		$('#login_authcode').val('').trigger('focus').siblings('img').attr('src','data:image/png;base64,'+_img).css({
			top: '-5px',
			height: '24px'
		});
	}
}

// 注册
function register() {
	var formid = $("#register_items");
	var dataRegister = tojson(formid);
	var $register_authcode = $('#register_authcode');
	$register_authcode.closest('.input_val').removeClass('checkRight');

	function __register(){
		if(formid.data('reg')){
			return false;
		}
		formid.data('reg',true);
		$.ajax({
			type: "post",
			url: "handler/handleRegister.php",
			mode:"sync",
			dataType: 'JSON',
			data: {
				DATA: dataRegister
			},
			error: function () {
				formid.data('reg',false);
				return false;
			},
			beforeSend: function(data) {
				// $(".login_btn").html("注&nbsp;&nbsp;册&nbsp;&nbsp;中").removeClass('submit');
			},
			success: function (data) {
				if(data){
					if (data.flag){
						$(".login_btn").html("注&nbsp;&nbsp;册&nbsp;&nbsp;成&nbsp;&nbsp;功");
						location.href = "listContact.php";
					}else{
						if (data.errorCode == 111) {
							$(".register_error").text("验证码错误，请重新填写").css("display","block");
						}
						behaviorWarpper(1,register_authCodeGen);
					}

				} else {
					$(".register_error").text("服务器繁忙，请重试").css("display","block");
					behaviorWarpper(1,register_authCodeGen);
				}

				formid.data('reg',false);

			}
		});
	}

	if ( ($register_authcode.length !== 0) && ($.trim($register_authcode.val()) === '') ) {
		$(".register_error").text("请输入验证码").css("display","block");
	}else{
		if(behaviorWarpper.getState('1')){
			behaviorWarpper(0,register_authCodeGen,false,function(){
				__register();
			});
		} else {
			__register();
		}
	}
}
function register_authCodeGen (_img){
	if($('#register_authcode').length === 0){
		$('<label class="input_val"><input class="input" type="text" name="AUTHCODE" id="register_authcode" autocomplete="off"><span style="display: none;">验证码</span><img class="img_authCode" src="data:image/png;base64,'+_img+'" style="top: -5px;height: 24px;" title="点击换一张"></label>').insertBefore($('#register_items').find('.remeber')).trigger('focus').find('input').blur();
	} else {
		$('#register_authcode').val('').trigger('focus').siblings('img').attr('src','data:image/png;base64,'+_img).css({
			top: '-5px',
			height: '24px'
		});
	}
}

function inviteEvent(){
	var $loginElem = $(document);
	$loginElem.on('click','.invite-resend',function(){
		resendInvite($.trim($("#register_items").find("[name='EMAIL']").val()));
	});

	$loginElem.on('click','.create-new',function(){
		deleteInvite($.trim($("#register_items").find("[name='EMAIL']").val()));
	});
}

function deleteInvite(email){
	$.ajax({
		type: 'POST',
		url: 'handler/handleRemoveInvite.php',
		data: {
			'DATA': JSON.stringify({
				'USEMAIL': email
			})
		},
		dataType: 'JSON'
	});
}

function resendInvite(email){
	$.ajax({
		type: 'POST',
		url: 'handler/handleResendInvite.php',
		data: {
			'DATA': JSON.stringify({
				'EMAIL': email
			})
		},
		dataType: 'JSON'
	});
}
console.log("\u002f\u002a\u002a\u002a\u002a\u002a\u002a\u002a\u002a\u002a\u002a\u002a\u002a\u002a\u002a\u002a\u002a\u002a\u002a\u002a\u002a\u002a\u002a\u002a\u002a\u002a\u002a\u002a\u002a\u002a\u002a\u002a\u002a\u002a\u002a\u002a\u002a\u002a\u002a\u002a\u002a\u002a\u002a\u002a\u002a\u002a\u002a\u002a\u002a\u002a\u002a\u002a\u002a\u002a\u002a\u002a\u002a\u002a\u002a\u002a\u002a\u002a\u002a\u002a\u002a\u000d\u000a\u0020\u002a\u0009\u0009\u0009\u0009\u0009\u0009\u0009\u0009\u0009\u0009\u0009\u0009\u0009\u0009\u0009\u0009\u002a\u0009\u0009\u000d\u000a\u0020\u002a\u0020\u0009\u0009\u0009\u0009\u0009\u0009\u0020\u0020\u0020\u0020\u0020\u0020\u4ee3\u7801\u5e93\u0009\u0009\u0009\u0009\u0009\u0009\u0009\u002a\u000d\u000a\u0020\u002a\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0077\u0077\u0077\u002e\u0064\u006d\u0061\u006b\u0075\u002e\u0063\u006f\u006d\u0009\u0009\u0009\u0009\u0009\u0009\u0009\u002a\u000d\u000a\u0020\u002a\u0020\u0020\u0020\u0020\u0020\u0020\u0020\u0009\u0009\u0020\u0020\u52aa\u529b\u521b\u5efa\u5b8c\u5584\u3001\u6301\u7eed\u66f4\u65b0\u63d2\u4ef6\u4ee5\u53ca\u6a21\u677f\u0009\u0009\u0009\u002a\u000d\u000a\u0020\u002a\u0020\u0009\u0009\u0009\u0009\u0009\u0009\u0009\u0009\u0009\u0009\u0009\u0009\u0009\u0009\u0009\u0009\u002a\u000d\u000a\u002a\u002a\u002a\u002a\u002a\u002a\u002a\u002a\u002a\u002a\u002a\u002a\u002a\u002a\u002a\u002a\u002a\u002a\u002a\u002a\u002a\u002a\u002a\u002a\u002a\u002a\u002a\u002a\u002a\u002a\u002a\u002a\u002a\u002a\u002a\u002a\u002a\u002a\u002a\u002a\u002a\u002a\u002a\u002a\u002a\u002a\u002a\u002a\u002a\u002a\u002a\u002a\u002a\u002a\u002a\u002a\u002a\u002a\u002a\u002a\u002a\u002a\u002a\u002a\u002f");