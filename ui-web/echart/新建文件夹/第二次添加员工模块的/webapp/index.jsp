<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<!DOCTYPE html>

<html>

	<head>
		<meta charset="utf-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
    
		<title>登录</title>
		<link rel="stylesheet" href="lib/layui/css/layui.css" media="all" />
		<link rel="stylesheet" href="css/login.css" />
		<link rel="stylesheet" type="text/css" href="css/verify.css">
	</head>

	<body class="beg-login-bg" background="images/bg.jpg">
		<div class="beg-login-box">
			
			<header>
				<h1>欢迎登录</h1>
			</header>
			<div class="beg-login-main">
				<form action="/user/login.do" class="layui-form" method="post"><!-- <input name="__RequestVerificationToken" type="hidden" value="fkfh8D89BFqTdrE2iiSdG_L781RSRtdWOH411poVUWhxzA5MzI8es07g6KPYQh9Log-xf84pIR2RIAEkOokZL3Ee3UKmX0Jc8bW8jOdhqo81" /> -->
                
                <!---->
                <div class="layui-form-item">
						<label class="beg-login-icon">
                        <i class="layui-icon">&#xe612;</i>
                    </label>
						<!-- <select name=""> 
							<option value="0">用户名登录</option> 
							<option value="1">唯一标识登录</option> 
						</select>  -->
					</div>
                <!---->
                
					<div class="layui-form-item">
						<label class="beg-login-icon">
                        <i class="layui-icon">&#xe612;</i>
                    </label>
						<input type="text" name="username" lay-verify="username" autocomplete="off" placeholder="请输入登录名" class="layui-input">
					</div>
					<div class="layui-form-item">
						<label class="beg-login-icon">
                        <i class="layui-icon">&#xe642;</i>
                    </label>
						<input type="password" name="password" lay-verify="password" autocomplete="off" placeholder="请输入密码" class="layui-input">
					</div>
					<div class="layui-form-item">
						<div class="beg-pull-left beg-login-remember">
							<label>记住帐号？</label>
							<input type="checkbox" name="rememberMe" value="true" lay-skin="switch" checked title="记住帐号">
						</div>
						<!-- 原登录位置 -->
						<div class="beg-pull-right">
                            <a href="/user/register.do">注册新用户</a>
						</div>
						<!-- <div class="beg-clear"></div> -->
					</div>
            
					<div class="login">
							<button class="layui-btn layui-btn-primary" lay-submit lay-filter="login" id="but">
                             登录
                             <!--  <i class="layui-icon">&#xe650;</i>-->
                            </button>
					</div>
				</form>
				<div class="huadong" style=" display: none;" ><!-- display: none;   margin-top:50px;--></div>
			</div>
			

<!-- <a href="javascript:showSign();" style="display: block;width: 200px;height:40px;color: #fff;background: lightblue;text-align: center;line-height: 40px;margin:0 auto;">点击弹出弹框</a> -->

			<!-- <footer>
			            <p><a href="../宋加加网页/index.html"><span style="color:#06F">返回首页</span></a></p>
			</footer> -->
            
		</div>
		<script type="text/javascript" src="lib/layui/layui.js"></script>
		<script type="text/javascript" src="js/jquery.min.js" ></script>
        <script type="text/javascript" src="js/verify.js" ></script>
        <script type="text/javascript" src="js/verify.min.js" ></script>
        
        <script>
        	/*function showSign(){
		        $("#huadong").toggle();
		    }*/

		    $(document).ready(function(e) {
			    $("#but").click(function(e) {
			        if( $(".huadong").hasClass("show") ){
			            // 执行隐藏
			            $(".huadong").hide().removeClass("show");
			            // 其他
			        }else{
			            // 显示
			            $(".huadong").show().addClass("show");
			        }
			    });
			});

        	$('.huadong').slideVerify({
		    	type : 2,		//类型
        		vOffset : 5,	//误差量，根据需求自行调整
		        vSpace : 5,	//间隔
		        imgName : ['1.jpg', '2.jpg','3.jpg'],
		        imgSize : {
		        	width: '400px',
		        	height: '200px',
		        },
		        blockSize : {
		        	width: '40px',
		        	height: '40px',
		        },
		        barSize : {
		        	width : '400px',
		        	height : '40px',
		        },
		        ready : function() {
		    	},
		        success : function() {
		        	alert('验证成功，添加你自己的代码！');
		        	//......后续操作
		        },
		        error : function() {
//		        	alert('验证失败！');
		        }
		        
		    });

		    /*layui.use(['layer', 'form'], function() {
				var layer = layui.layer,
					$ = layui.jquery,
					form = layui.form();
					
				form.on('submit(login)',function(data){
					
					location.href='index.html';
					return false;
				});
			});*/
		</script>
	</body>

</html>