$(document).scroll(function() {
	var navbar = document.getElementById('dh');
	if(($(document).scrollTop()>=650) && ($(document).scrollTop()<=1800)){
		navbar.className="nav nav-pills navtop2 navbar-fixed-top";
	}
	else {
		navbar.className="nav nav-pills navtop1";
	}
	console.log($(document).scrollTop());
});

//点击下拉菜单改为鼠标悬停下拉菜单
$(document).off('click.bs.dropdown.data-api');
//自动展开
$('.nav .dropdown').mouseenter(function(){
 $(this).addClass('open');
});
//自动关闭
$('.nav .dropdown').mouseleave(function(){
 $(this).removeClass('open');
});