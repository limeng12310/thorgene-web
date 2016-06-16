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