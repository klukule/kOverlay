var os = require('os');
var prettyBytes = require('pretty-bytes');
var gui = require('nw.gui');
var fs = require('fs');

var AppWin= gui.Window.get();
var SettingsWin;
var data = "";
var settings = "";
var tray;
var shortcut;
var CarouselID;
var AppShowEnabled = false;

var visible = false;
var flaunch = true;

$(function(){
	$('html').css("display","none");

	//Setup window
	AppWin.setShowInTaskbar(false);
	AppWin.setAlwaysOnTop(true);
	AppWin.moveTo(0,0);
	AppWin.resizeTo(window.screen.width,window.screen.height);
	AppWin.on('close',function(){
		gui.App.quit();
	});
	//Setup settings window
	SettingsWin = gui.Window.open ('settings.html', {
		position: 'center',
		width: 1280,
		height: 720,
		toolbar:false,
		show:false,
		frame:false,
		transparent:true,
		title: "Settings"
	});
	SettingsWin.on('close', function() {
		SettingsWin.hide();
	});

	//Hide windows
	SettingsWin.hide();
	AppWin.hide();

	//Load files
	ReloadData();
	ReloadSettings();

	//Watch files
	fs.watchFile('../data.json',function(){
		ReloadData();
		InitDisplay(); //Reinit data
	});
	fs.watchFile('../settings.json',function(){
		ReloadSettings();
	});

	//Setup tray icon
	InitTray();
	//Register Hotkey
	RegisterHotKey();

	//Generate data
	InitDisplay();
});


function InitDisplay(){
	AppShowEnabled = false;
	CarouselID = (new Date).getTime(); //Just to have allways random id
	GenCarousel(CarouselID, function(){
		AppShowEnabled = true;
		if(flaunch){
			if(settings.showatstart){
				ShowApp();
			}else{
				HideApp(); //Just 4 to be sure
				ShowNotification("App started","App is running, press " + settings.shortcut + " to show it");
			}
			flaunch = false;
		}
	});
}

function ReloadData() {
	data = JSON.parse(fs.readFileSync('../data.json'));
	InitDisplay(); //Reinit carousel
}

function ReloadSettings() {
	settings = JSON.parse(fs.readFileSync('../settings.json'));
	if(settings.background){
		$('html').css("background","radial-gradient(ellipse at center, "+settings.bg1+" 0%,"+settings.bg2 + " 100%");
	}else{
		$('html').css("background","rgba(0,0,0,0)"); //Transparent background

	}
	RegisterHotKey();
}

function GenCarousel(cid, callback) {
		$("#container").html('<div class="flipster" id="'+cid+'"><ul></ul></div>');
		var ul = $('#'+cid+' ul');

		for (var i = 0; i < data.length; i++) {
			var item = data[i];
			GenerateSlide(ul,item.Command,item.Name,item.Image);

		}
		// $('.flipser').css("height",$('html').height());
		ul.waitForImages(function() {
			$('html').css("display","block");
			console.log(document.height);
			$('#'+cid).flipster({
				style: 'carousel',
				touch: true
			});

			$('#'+cid).on('click', 'a', function (e) {

				e.preventDefault();

				// Open URL with default browser.
				gui.Shell.openExternal(e.target.href);

			});

			$('#'+cid).css({
        'position' : 'absolute',
        'left' : '50%',
        'top' : '50%',
        'margin-left' : function() {return -$(this).outerWidth()/2},
        'margin-top' : function() {return -$(this).outerHeight()/2}
	    });
			callback();
		});

}


function FadeIn(callback){
	$('html').css("display","block");
	$('.flipster').fadeIn('fast',callback);
}

function FadeOut(callback){
	$('.flipster').fadeOut('fast',function(){
		$('html').css("display","none");
		callback();
	});
}


function GenerateSlide(ul,href,title,image){
	var li = $('<li><img / onclick="ExecuteCommand()"><a target="_blank" onclick="ExecuteCommand()"></a></li>');

	li.find('a')
		.attr('href', href)
		.text(title);

	li.find('img').attr('src', image);
	li.appendTo(ul);
}

function ShowApp(){
	InitDisplay(); //Reinit display, sometimes buggy
	if(AppShowEnabled){
		visible = true;
		AppWin.show();
		AppWin.setShowInTaskbar(false);
		AppWin.focus();
		AppWin.setShowInTaskbar(false);
		FadeIn(function(){});
	}
}

function HideApp(){
	FadeOut(function(){
		visible = false;
		AppWin.hide();
	});
}


function ShowNotification(title,content){
	AppWin.setShowInTaskbar(false);
	var options = {
	  icon: window.location.href.slice(0,window.location.href.lastIndexOf("/")) + "/icon.png",
	  body: content
	 };

	 AppWin.setShowInTaskbar(false);
	var notification = new Notification(title,options);
	notification.onclick = function () {
	}

	notification.onshow = function () {
	  // auto close after 2 second
	  setTimeout(function() {notification.close();}, 2000);
	}
}

function InitTray(){
 gui.App.createShortcut(process.env.APPDATA + "\\Microsoft\\Windows\\Start Menu\\Programs\\temp\\kOverlay.lnk"); //It needs to have shortcut to be albe to show notifications (windows 8 and higher)

 tray = new gui.Tray({ title: 'Settings', icon: 'icon.png' });
	tray.on("click",function(){
		HideApp();
		SettingsWin.show();
		SettingsWin.focus();
	});
}

function RegisterHotKey(){
	if(shortcut != undefined){
		gui.App.unregisterGlobalHotKey(shortcut);
	}
	var option = {
		key : settings.shortcut,
		active : function() {
			if(visible){
				HideApp();
			}else{
				ShowApp();
			}
		},
		failed : function(msg) {
			alert(msg);
		}
	};
	shortcut = new gui.Shortcut(option);

	gui.App.registerGlobalHotKey(shortcut);
}

function ExecuteCommand(){
	//Find command from node
	//Execute command
}
