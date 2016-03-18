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
  ActivateFuncions();
}

function ActivateFuncions(){
  $('.tooltip').tooltipster({
    animation: 'fade',
    delay: 100,
    theme: 'custom-tooltip',
    trigger: 'hover',
    position: 'left'
  });
}

function UpdateSettings(){
  RegisterGlobalHotKey(Data.settings.shortcut);
  OnGlobalHotKey = GlobalHotkeyCallback; //Hook event to my function
  if(Data.settings.background){
    $('html').css("background","radial-gradient(ellipse at center, "+Data.settings.bg1+" 0%,"+Data.settings.bg2 + " 100%");
    $("#buttonSettings").removeClass("custom-nobg");
    $("#buttonClose").removeClass("custom-nobg");
  }else{
  	$('html').css("background","rgba(0,0,0,0)"); //Transparent background
  	$("#buttonSettings").addClass("custom-nobg");
  	$("#buttonClose").addClass("custom-nobg");
  }

  //TODO: Open After launch
}

function UpdateData(){
  GenerateCarousel();
}

function ShowWindow(){
  //TODO: Open window with face in animation & regen content
  GenerateCarousel();
}

function HideWindow(){
  //TODO: Close window with fade off animation
  $("#container").html(""); //Clear carousel, jsut to be sure
}
var open = false;
function GlobalHotkeyCallback(){
  if(open){
    HideWindow();
  }else{
    ShowWindow();
  }
  open = !open;
  //TODO: Add proper open/close
}
