
     $(function(){

   //登录操作
    var phonenums=localStorage.getItem("number"+localStorage.count);
    document.getElementById("load_name").innerHTML=phonenums;
     $("#load_name").css("color","#ff9000");


    //出现弹出
    $("#oDoload").click(function(event) {
    	$(".bg_div").show();
    	$(".alert").show();
    });
     $("#goTo").click(function() {
     	if($("#phoneNumber").val()==localStorage.getItem("number"+localStorage.count) && $("#passwords").val()==localStorage.getItem("password"+localStorage.count)){
           location.href="last.html";
     	}else {
       $("#youError").show();
     	}
     });
  $("#phoneNumber").blur(function(event) {
  	$("#youError").hide();
  });
   
   $(".head_one").hover(function(){
    $(".head_one").addClass('change');
    $(".head_two").removeClass('change');
    	$(".cont_one").show();
   	$(".cont_two").hide()
   });
    $(".head_two").hover(function(){
    $(".head_two").addClass('change');
    $(".head_one").removeClass('change');
   	$(".cont_two").show();
   	$(".cont_one").hide()
   });
 });
