
   $(function(){

    // 获取手机号
      var nums=localStorage.getItem("number"+localStorage.count)
      // $("#please_num").html(nums);
      document.getElementById("please_num").innerHTML=nums;
      $("#please_num").css("color","#ff9000");
     //生成四位验证码
         var str="";
       function confirm_the_number(){
          for(var i=0;i<6;i++){
                var n=Math.floor(Math.random()*10);
                str+=n
            }
           console.log(str);
       }
      confirm_the_number();
     $("#giveNum").html(str);    
   //30秒倒计时
   var timer;
   var timer2
   var i=6;
  function time(){
    i--;
    $("#get_confirm_the_number").val(i+"秒重新发送短信");
    $("#get_confirm_the_number").prop("disabled",true)
    if(i<=0){
      i=1
     $("#get_confirm_the_number").val("重新发送短信");
    $("#get_confirm_the_number").prop("disabled",false)
    }

}
  timer=setInterval(time, 1000);



   // 获取新的验证码
   $("#get_confirm_the_number").click(function(){
    clearInterval(timer);
    clearInterval(timer2);
    i=6
    str="";
    confirm_the_number();
     $("#giveNum").html(str);  
     timer2=setInterval(time, 1000);
   });

   // 进入第三个页面
   $("#reconfirm").click(function(){
    if($("#confirm_the_number").val()==str){
      location.href="goToLoad.html";
    }else{
       $("#enter_error").show();
    }
   });
  

   });