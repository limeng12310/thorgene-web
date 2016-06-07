$(document).ready(function(){
  $(".click").click(function(){
  $(".more").toggle(100);
  $(this).html($(this).html()=="点击"?"收起":"点击"); // 改变按钮的文字说明
  });
});