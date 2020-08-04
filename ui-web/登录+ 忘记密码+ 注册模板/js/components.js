/****************************************************************
 *																*		
 * 						      代码库							*
 *                        www.dmaku.com							*
 *       		  努力创建完善、持续更新插件以及模板			*
 * 																*
****************************************************************/
//下拉菜单
$(document).ready(function(){
    var hasTouchEvent = ('ontouchstart' in window);
    $(".btn-group").each(function(){
        var btn_groupWidth = $(this).width();
        if (btn_groupWidth > 20) {
            $(this).find(".dropdown-menu").css("min-width",btn_groupWidth);
        }
    });

    $("body").live("click",function(e){
        $(".btn-group").removeClass("open");
        if(hasTouchEvent){
            $(".btn-group").css("z-index","auto");
        }
    });
    $(".btn-group").live("click",function(e) {
        e.stopPropagation();
        if ($(this).hasClass("open")) {
            $(this).removeClass("open");
            if(hasTouchEvent){
                $(this).css("z-index","auto");
            }
        }else{
            $(".btn-group").not(this).removeClass("open");
            $(this).addClass("open");
            if(hasTouchEvent){
                $(".btn-group").not(this).css("z-index","auto");
                $(this).css("z-index","1000");
            }
        }
    });
    $(".dropdown-menu li").live("click",function(){
        var droptext=$(this).text();
        $(this).parent(".dropdown-menu").parent(".btn-group").find(".dropdown-toggle span").text(droptext).attr("name",($(this).index()+1));
        $(this).parent(".dropdown-menu").parent(".btn-group").parent(".info").find(".info_select").text(droptext);
        $(this).parent(".dropdown-menu").parent(".btn-group").removeClass("open");
        if(hasTouchEvent){
            $(this).parent(".dropdown-menu").parent(".btn-group").css("z-index","auto");
        }
        return false;
    });
});

//下拉-操作
$(document).ready(function(){
    $(".dropdown_operate").css({"opacity":"0"});
    $(".dropdown_operate li").hide();
    $(".btn_arrow").live("click",function(e){
        e.stopPropagation();
        var top = $(this).siblings(".dropdown_operate").css("top");
        if($(this).siblings(".dropdown_operate").css("top") != "10px"){
            $(this).siblings(".dropdown_operate").animate({top:"10px",opacity:0},100,function(){
                $(this).css("display","none").find("li").hide();
            });
        }else{
            $(this).siblings(".dropdown_operate").css("display","block");
            $(this).siblings(".dropdown_operate").animate({opacity:1,top:"30px"},200);
            $(this).siblings(".dropdown_operate").find("li").show();
            $(".btn_arrow").not(this).siblings(".dropdown_operate").animate({top:"10px",opacity:0},100,function(){
                $(this).css("display","none").find("li").hide();
            });
        }
    });

    //选择群组下拉
    $(".group_arrow").die('click').live("click",function(e){
        e.stopPropagation();
        $(this).siblings(".saveToGroup").find("li:not(:last,:first)").remove();     
        getGroup(true);
        var top = $(this).siblings(".dropdown_operate").css("top");
        if($(this).siblings(".dropdown_operate").css("top") != "10px"){
            $(this).siblings(".saveToGroup").getNiceScroll().hide();
            $(this).siblings(".dropdown_operate").animate({top:"10px",opacity:0},100,function(){
                $(this).css("display","none").find("li").hide();
            });
        }else{
            $(this).siblings(".saveToGroup").getNiceScroll().show();
            $(this).siblings(".dropdown_operate").css("display","block");
            $(this).siblings(".dropdown_operate").animate({opacity:1,top:"30px"},200);
            $(this).siblings(".dropdown_operate").find("li").show();
        }
        return false;
    });
    $(".group_operate li").live("click",function(){
        if($(this).find(".input_checkbox").hasClass("checked")){
            $(this).find(".input_checkbox").removeClass("checked").find(':checkbox').attr("checked", false);
        }else{
            $(this).find(".input_checkbox").addClass("checked").find(':checkbox').attr("checked", "checked");
        }
    });
    // $(".groupClose").live("click",function(){
    //     $(this).closest(".dropdown_operate").animate({top:"10px",opacity:0},100,function(){
    //         $(this).css("display","none").find("li").hide();
    //     });
    // });
    $("body").live("click",function(e){
        $(".dropdown_operate").animate({top:"10px",opacity:0},100,function(){
            $(".dropdown_operate").css("display","none");
            $(".dropdown_operate li").hide();
        });
        $(".dropdown_operate").siblings('.form_moreOpe').siblings(".dropdown_operate").remove();
        $(".dropdown_operate").siblings('.form_addGroup').removeClass('active').siblings(".dropdown_operate").remove();
    });
    $(".dropdown_group .group_operate .group_firstLi, .dropdown_group .group_operate .input_creatGroup").live("click",function(e){
        e.stopPropagation();
    });
});

//复选框样式
$(document).ready(function(){
    $("input[type=checkbox]").each(function(){
        if($(this).attr("checked") == "checked"){
            $(this).parent(".input_checkbox").addClass("checked");
        }
    });

    $(".input_checkbox").live("click", function (e){
        e.stopPropagation();
        if($(this).hasClass("checked")){
            $(this).removeClass("checked").find('input').attr("checked", false);
        }else{
            $(this).addClass("checked").find('input').attr("checked", "checked");
        }
    });
    $(".input_checkbox label").live("click",function(){
        if($(this).parent(".input_checkbox").hasClass("checked")){
            $(this).parent(".input_checkbox").removeClass("checked");
        }else{
            $(this).parent(".input_checkbox").addClass("checked");
        }
    });

    //三态复选框
    $(".states").live("click",function(){
        if ($(this).hasClass("states_none")) {
            $(this).removeClass("states_none").addClass("states_yes").attr("title","有");
        }else if ($(this).hasClass("states_yes")) {
            $(this).removeClass("states_yes").addClass("states_no").attr("title","没有");
        }else{
            $(this).removeClass("states_no").addClass("states_none").attr("title","无所谓");
        }
    });
});

//全选或全不选
$(document).ready(function(){
    //当点击全选框时
    $("#chkAll").live("click",function () {
        var flag = $("#chk_all").attr("checked");
        $("[name='chk_list']").each(function () {
            if(flag == "checked"){
                $(this).attr("checked", flag);
                $(this).parent(".input_checkbox").addClass("checked");
            }else{
                $(this).removeAttr("checked");
                $(this).parent(".input_checkbox").removeClass("checked");
            }
        });
    });
    checkList();
});

function checkList(){
    //如果全部选中勾上全选框，全部选中状态时取消了其中一个则取消全选框的选中状态
    $(".chkList").live("click",function () {
        if ($("[name='chk_list']:checked").length == $("[name='chk_list']").length) {
            $("#chk_all").attr("checked", "checked");
            $("#chkAll").addClass("checked");
        }else{
            $("#chk_all").removeAttr("checked");
            $("#chkAll").removeClass("checked");
        }
    });
}

$(document).ready(function(){
    //当点击全选框时
    $("#chkAll").click(function () {
        if($("#chkAll").hasClass("checked")){
            $(".chkList").addClass("checked");
        }
        else $(".chkList").removeClass("checked");
    });
    //如果全部选中勾上全选框，全部选中状态时取消了其中一个则取消全选框的选中状态
    $(".chkList").each(function () {
        $(this).click(function () {
            if ($(".listContact_table ul li .checked").length == $(".chkList").length) {
                $("#chkAll").addClass("checked");
            }
            else $("#chkAll").removeClass("checked");
        });
    });
});

//带文字描述的input框
function inputval(){
    $(".input").each(function(){
        triggerPlaceHolder(this);
    }).live('keyup', function(){
        triggerPlaceHolder(this);
    }).live('blur', function(){
        triggerPlaceHolder(this);
    });

    $(".input_val span").live("click", function(){
        $(this).siblings(".input").focus();
    });  
}

function triggerPlaceHolder(obj){
    if($(obj).val() !== ""){
        $(obj).siblings("span").hide();
    }else{
        $(obj).siblings("span").show();
    }
}


$(document).ready(function(){
    //input框的value设置
    inputval();
});

window.MK_ESCAPE = (function() {
    function html_encode(str) {
        var s = "";
        if (str.length == 0) return "";
        s = str.replace(/&/g, "&amp;");
        s = s.replace(/\n/g, "<br>");
        s = s.replace(/</g, "&lt;");
        s = s.replace(/>/g, "&gt;");
        s = s.replace(/ /g, "&nbsp;");
        s = s.replace(/\'/g, "&#39;");
        s = s.replace(/\"/g, "&quot;");
        return s;
    }

    function html_decode(str) {
        var s = "";
        if (str.length == 0) return "";
        s = str.replace(/&amp;/g, "&");
        s = s.replace(/&lt;/g, "<");
        s = s.replace(/&gt;/g, ">");
        s = s.replace(/&nbsp;/g, " ");
        s = s.replace(/&#39;/g, "\'");
        s = s.replace(/&quot;/g, "\"");
        s = s.replace(/<br>/g, "\n");
        return s;
    }

    function toHtmlStr(str){
        return html_encode(html_decode(str));
    }

    return {
        escape: function(html) { // html to str
            return html_encode(html);
        },
        unescape: function(str) { // str to html
            return html_decode(str);
        },
        tohtmlStr: function(str) {
            return toHtmlStr(str);
        }
    };
})();

function coverRemove(){
    $('.tips_cover').delay(300).fadeOut(100, function(){
        $('.tips_cover').remove();
    });
    $('.cover_content').delay(300).fadeOut(100, function(){
        $('.cover_content').remove();
    });
}