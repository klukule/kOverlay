//nw.Window.get().Overlay Snippet to get control to overlay window from settings
$(function(){
  SetupTabs();
   $(".appVer").html(nw.App.manifest.version); //TEMP
   $("#windowClose").on("click",function(){ //TEMP
     nw.Window.get().hide();
   });
});
