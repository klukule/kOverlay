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
   WatchFile("../settings.json",function(){Load("../settings.json");UpdateSettings();});
   WatchFile("../data.json",function(){Load("../data.json");UpdateData();});
   Initialize();
});

function Initialize(){
  UpdateSettings();
  UpdateData();
}

function UpdateSettings(){
  RegisterGlobalHotKey(Data.settings.shortcut);
  if(Data.settings.background){
    $('html').css("background","radial-gradient(ellipse at center, "+Data.settings.bg1+" 0%,"+Data.settings.bg2 + " 100%");
    $("#buttonSettings").removeClass("custom-nobg");
    $("#buttonClose").removeClass("custom-nobg");
  }else{
  	$('html').css("background","rgba(0,0,0,0)"); //Transparent background
  	$("#buttonSettings").addClass("custom-nobg");
  	$("#buttonClose").addClass("custom-nobg");
  }
}

function UpdateData(){
  GenerateCarousel();
}

function ShowWindow(){

}

function HideWindow(){

}
