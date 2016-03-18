//*********************************
// Vars
//*********************************
var Overlay;
var Settings;

//*********************************
// Entry Point
//*********************************
InitApp();



//*********************************
// Functions - Global
//*********************************
function InitApp(){
  SetupOverlay(function(){OpenOverlay();});
  SetupSettings(function(){});
}










//*********************************
// Functions - Overlay
//*********************************
function SetupOverlay(callback){
	Overlay = nw.Window.open ('overlay.html', {
		position: 'center',
		width: 1920,
		height: 1080,
		// show:false, //Don't know why but app wont start with tihs enabled, propably thanks to script entrypoint ;)
		frame:false,
		transparent:true,
		title: "Overlay"
	});
	Overlay.on('close', function() {
		Overlay.hide();
	});
  Overlay.hide(); //Hide on init :)
}

function OpenOverlay(callback){
  Overlay.show();
  callback();
}

//*********************************
// Functions - Settings
//*********************************
function SetupSettings(callback){
	Settings = nw.Window.open ('settings.html', {
		position: 'center',
		width: 1280,
		height: 720,
		// show:false, //Don't know why but app wont start with tihs enabled, propably thanks to script entrypoint ;)
		frame:false,
		transparent:true,
		title: "Settings"
	});
	Settings.on('close', function() {
		Settings.hide();
	});
  Settings.hide(); //Hide on init :)
}

function OpenSettings(callback){
  Settings.show();
  callback();
}
