//*********************************
// Vars
//*********************************
var OverlayVisible = false;
// var Initialized = false;
//*********************************
// Entry Point
//*********************************
$(function(){
   $('html').css("display","none");
   Load("../settings.json");
   Load("../data.json");
   WatchFile("../settings.json",function(){Load("../settings.json");UpdateSettings();});
   WatchFile("../data.json",function(){Load("../data.json");UpdateData();});
   Window.showDevTools();
   Initialize();
});

function Initialize(){
  SetupSettings();
  UpdateSettings();
  UpdateData();
  ActivateFuncions();
  ActivateClickCallbacks();
  if(Data.settings.showatstart){ //Just need to run once so it is here and not in UpdateSettings();
    ShowWindow();
  }
}

function ActivateClickCallbacks(){


/*     RIGHT TOP BUTTONS WITH TOOLTIPS     */
  $("#buttonSettings").on("click",function(){
		HideWindow();
		OpenSettings();
	});
	$("#buttonClose").on("click",function(){
		nw.App.quit();
	});
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
}

function UpdateData(){
  GenerateCarousel();

}

function ShowWindow(){
  GenerateCarousel();
  Window.show();
  Window.setShowInTaskbar(false);
  Window.focus();
  Window.setShowInTaskbar(false);
  FadeIn(function(){});
  OverlayVisible = true;

}

function HideWindow(){
  FadeOut(function(){
    visible = false;
    Window.hide();
  });
  $("#container").html(""); //Clear carousel, jsut to be sure
  OverlayVisible = false;
}

function GlobalHotkeyCallback(){
  if(OverlayVisible){
    HideWindow();
  }else{
    ShowWindow();
  }
}
