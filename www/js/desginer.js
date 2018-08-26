
<script type="text/javascript" src="jquery.min.js"></script>
<script type="text/javascript" src="jquery.imgbox.pack.js"></script>
<script type="text/javascript">
$(document).ready(function() {

  $(document).ready(function() {
   $(".formItemDiff1").hover(function() {
        $(this).css("background-position", "0px -555px");
        $(this).prevAll().css("background-position", "0px -555px");
        $(this).nextAll().css("background-position", "0px -575px");     
        $("#pointP1").html($(this).prevAll().length+"分");
        $('#pointP1').data('obj1',$(this).prevAll().length);
      });
  });
  
   $(".formItemDiff2").hover(function() {
        $(this).css("background-position", "0px -555px");
        $(this).prevAll().css("background-position", "0px -555px");
        $(this).nextAll().css("background-position", "0px -575px");     
        $("#pointP2").html($(this).prevAll().length+"分");
        $('#pointP2').data('obj2',$(this).prevAll().length);
      });
  });

$(document).ready(function() {
   $(".formItemDiff3").hover(function() {
        $(this).css("background-position", "0px -555px");
        $(this).prevAll().css("background-position", "0px -555px");
        $(this).nextAll().css("background-position", "0px -575px");     
        $("#pointP3").html($(this).prevAll().length+"分");
        $('#pointP3').data('obj3',$(this).prevAll().length);
      });
  });

//图片放大
$(document).ready(function(){
/*   $("#example").click(function(){
   alert("vvvvvvvvvvvvvvv")
  });*/
  $("#example").imgbox({
    'speedIn'   : 0,
    'speedOut'    : 0,
    'alignment'   : 'center',
    'overlayShow' : true,
    'allowMultiple' : false
  });
});
</script>
