var Overlay = Window.Overlay;
var Data = {};
$(function(){
  SetupTabs();

   $(".appVer").html(nw.App.manifest.version);

   $("#windowClose").on("click",function(){
     nw.Window.get().hide();
   });

   $("a").on("click",function(e){
     e.preventDefault();
     OpenLinkExt($(this).attr("href"));
   });

   Load("../settings.json");
   Load("../data.json");
   WatchFile("../settings.json",function(){Load("../settings.json");SetupTables();});
   WatchFile("../data.json",function(){Load("../data.json");SetupTables();});
});

function OpenLinkExt(href){
  if(href == "#" || href == undefined){
    return;
  }
  nw.Shell.openExternal(href);
}
