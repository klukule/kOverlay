var os = require('os');
var prettyBytes = require('pretty-bytes');
var gui = require('nw.gui');
var fs = require('fs');

var AppWin= gui.Window.get();
var SettingsWin;
var data = "";
var settings = "";
var tray;

var visible = false;


$(function(){
	$('html').css("display","none");

	AppWin.setShowInTaskbar(false);
	AppWin.setAlwaysOnTop(true);
	AppWin.moveTo(0,0);
	AppWin.resizeTo(window.screen.width,window.screen.height);

	settings = JSON.parse(fs.readFileSync('../settings.json'));
	data = JSON.parse(fs.readFileSync('../data.json'));

	gui.App.createShortcut(process.env.APPDATA + "\\Microsoft\\Windows\\Start Menu\\Programs\\temp\\kOverlay.lnk"); //It needs to have shortcut to be albe to show notifications (windows 8 and higher)

	InitTray();

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
	var shortcut = new gui.Shortcut(option);

	gui.App.registerGlobalHotKey(shortcut);

	GenCarousel(function(){
		if(settings.background){
			$('html').css("background","radial-gradient(ellipse at center, "+settings.bg1+" 0%,"+settings.bg2 + " 100%");
		}
		if(settings.showatstart){
			ShowApp();
		}else{
			HideApp();
			ShowNotification("App started","App is running, press " + settings.shortcut + " to show it");
		}
	});

	SettingsWin = gui.Window.open ('settings.html', {
		position: 'center',
		width: 1280,
		height: 720,
		toolbar:false,
		show:false,
		title: "Settings"
	});
	SettingsWin.on('close', function() {
  	SettingsWin.hide();
	});
});

function GenCarousel(callback) {
		var ul = $('.flipster ul');
		for (var i = 0; i < data.length; i++) {
			var item = data[i];
			GenerateSlide(ul,item.Command,item.Name,item.Image);

		}
		// $('.flipser').css("height",$('html').height());
		ul.waitForImages(function() {
			$('html').css("display","block");
			$('.flipster').flipster({
				style: 'carousel',
				touch: true
			});

			$('.flipster').on('click', 'a', function (e) {

				e.preventDefault();

				// Open URL with default browser.
				gui.Shell.openExternal(e.target.href);

			});

			$('.flipster').css({
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
	var li = $('<li><img /><a target="_blank"></a></li>');

	li.find('a')
		.attr('href', href)
		.text(title);

	li.find('img').attr('src', image);
	li.appendTo(ul);
}

function ShowApp(){
	visible = true;
	AppWin.show();
	AppWin.setShowInTaskbar(false);
	AppWin.focus();
	AppWin.setShowInTaskbar(false);
	FadeIn(function(){});
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
 tray = new gui.Tray({ title: 'Settings', icon: 'icon.png' });
	tray.on("click",function(){
		HideApp();
		SettingsWin.show();
		SwttingsWin.focus();
	});
}
