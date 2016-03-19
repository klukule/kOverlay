//*********************************
// Vars
//*********************************
var OverlayVisible = false;
var path = require('path');
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
  RegisterClickCallbacks();
  RegisterLocallHotkeys();
  if(Data.settings.showatstart){ //Just need to run once so it is here and not in UpdateSettings();
    ShowWindow();
  }else{
    ShowDesktopNotification("Application started","Press Ctrl+G to open overlay"); //When we dont show window after startup we atleast show some notification so user does know that app is running
  }
}

function RegisterLocallHotkeys(){
  RegisterKey(13,document,function(){
    ExecCommand($(".flip-current").data("IconInfo"));
  });
}

function RegisterClickCallbacks(){
  /*     RIGHT TOP BUTTONS WITH TOOLTIPS     */
    $("#buttonSettings").on("click",function(){
  		HideWindow();
  		OpenSettings();
  	});
  	$("#buttonClose").on("click",function(){
  		nw.App.quit();
  	});

/*     Carousel click     */
  $(document).on('click', ".flip-current", function(e) {
		ExecCommand($(this).data("IconInfo"));
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

function ExecCommand(data){
  console.log("Executing " + data[0]);
  nw.Shell.openItem(path.normalize(data[2]));
  if(Data.settings.closeafterlaunch){
    HideWindow();
  }else{
    ShowMessageLaunching(data);
  }
}

function ShowMessageLaunching(data){
  if(Data.settings.loadmessage){
    var name = data[0];
    var img = data[1];
    var imgsrc = "file://" + path.join(__dirname,img).replace(/\\/g,"/");
    $('#modalImg').attr('src',imgsrc);
    $("#modalAppName").text(name);
    if(!Data.settings.background){
    		$("#lmb").css("display","none");
    	}else{
    		$("#lmb").css("display","block");
    	}
     $("#launchingModal").css("opacity",0);
    	$('#launchingModal').addClass(function(){
    		$('#launchingModal').animate({opacity: 1}, 'slow');
    		return "is-active";
    	});


    	setTimeout(function(){
    		$('#launchingModal').animate({opacity: 0}, 'slow',function(){
    			$('#launchingModal').removeClass("is-active");
    			Window.focus();
    		});
    	},3000);

  }
}
