//*********************************
// Vars
//*********************************
var OverlayVisible = false;
var Initialized = false;
//*********************************
// Entry Point
//*********************************
$(function(){
  //  $('html').css("display","none");
   Load("../settings.json");
   Load("../data.json");
   WatchFile("../settings.json",function(){Load("../settings.json");}); //TODO: Add function content
   WatchFile("../data.json",function(){Load("../data.json");}); //TODO: Add function content
   Initialize();
});

function Initialize(){
  RegisterGlobalHotKey(Data.settings.shortcut);
}

function ShowWindow(){

}

function HideWindow(){

}
