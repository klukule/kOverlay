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

  }else{
    
  }
}

function UpdateData(){
  GenerateCarousel();
}

function ShowWindow(){

}

function HideWindow(){

}
