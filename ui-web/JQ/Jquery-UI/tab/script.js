$(function(){
	$("#tab").tabs();
	
	 var items=document.getElementsByTagName("a");
	 for (var i = 0; i < items.length; i++) {
	 	clickListner(i);
	 }
	 function clickListner(index){
	 	items[index].onclick=function(e){
	 		for (var i = 0; i < items.length; i++) {
	 			if (index==i) {
	 				items[i].style.backgroundColor="gray";
	 				items[i].style.color="black";
	 			}else{
	 				items[i].style.backgroundColor="black";
	 				items[i].style.color="white";
	 			}
	 		}
	 	}
	 }
});