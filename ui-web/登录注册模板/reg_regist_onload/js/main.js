$(function() {

    var ok1 = false;
    var ok2 = false;
    var ok3 = false;
    var ok4 = false;
    var ok5 = false;
    var ok6 = false;
    // 确认手机号
        $("#phone").blur(function() {
            var reg = /^1\d{10}$/;
            var phone = $("#phone").val();
            if (reg.test(phone)) {
                $(".right_one").show();
                $(".error_one").hide();
                $("#phone").css("border-color", "#80bc2b")
                ok1=true;
            } else {
                $(".error_one").show();
                $(".right_one").hide();
                $("#phone").css("border-color", "#fd874c")
            }
        })



    // 设置密码
    $("#password").blur(function() {
        var reg = /^[a-zA-Z][\w]{5,12}/;
        var password = $("#password").val();
        if (reg.test(password)) {
            $(".right_two").show();
            $(".error_two").hide();
            $("#password").css("border-color", "#80bc2b")
            ok2=true;
        } else {
            $(".error_two").show();
            $(".right_two").hide();
            $("#password").css("border-color", "#fd874c")
        }
    })

    //确认密码 

        $("#repassword").blur(function() {
            var repassword = $("#repassword").val();
            if (repassword == $("#password").val()) {
                $(".right_third").show();
                $(".error_third").hide();
                $("#repassword").css("border-color", "#80bc2b")
               ok3=true;
            } else {
                $(".error_third").show();
                $(".right_third").hide();
                $("#repassword").css("border-color", "#fd874c")
            }
        })

 

    //设置邮箱
        $("#email").blur(function() {
            var reg = /^\w+@\w+(\.[a-z]{2,3}){1,2}$/;
            var email = $("#email").val();
            if (reg.test(email)) {
                $(".right_four").show();
                $(".error_four").hide();
                $("#email").css("border-color", "#80bc2b")
               ok4=true;
            } else {
                $(".error_four").show();
                $(".right_four").hide();
                $("#email").css("border-color", "#fd874c")
            }
        })

    // 验证码
        $("#confireph").blur(function() {
            var confireph = $("#confireph").val();
            if (confireph == "nodick") {
                $(".right_checknum").show();
                $(".error_five").hide();
                $("#confireph").css("border-color", "#80bc2b")
               ok5=true;
            } else {
                $(".error_five").show();
                $(".right_checknum").hide();
                $("#confireph").css("border-color", "#fd874c")
            }
        })


    // 遵守约定


        $("#oberrulls").click(function() {
            var oberrulls = $("#oberrulls").prop("checked");
            if (oberrulls == true) {
                $("#register").css("background-color", "#ff9000");
                $("#register").prop("disabled",false);
              ok6=true;
            } else {
                $("#register").css("background-color", "#e5e5e5");
                 $("#register").prop("disabled",true);
            }
        })


    $("#register").click(function() {
        if(!(ok1 && ok2 && ok3&& ok4&& ok5&& ok6) ){
        	return;
        }
            var count=localStorage.count;
            console.log(count)
			if(!count){
				count=1;
			}else{
				count++;
			}
			localStorage.setItem("number"+count,$("#phone").val());
			localStorage.setItem("password"+count,$("#password").val());
            localStorage.setItem("email"+count,$("#email").val());
			localStorage.setItem("count",count);

            $("#register").val("正在注册中...")
            setTimeout(function(){
                $("#myform").submit();
            },3000)
            // location.href="enter.html";
    });




});

