$(document).ready(function(){
  $(".click").click(function(){
  $(".more").toggle(100);
  $(this).html($(this).html()=="展开"?"收起":"展开"); // 改变按钮的文字说明
  });
});