var SettingsWindow;s
function SetupSettings(callback){
	SettingsWindow = nw.Window.open ('settings.html', {
		position: 'center',
		width: 1280,
		height: 720,
		// show:false, //Don't know why but app wont start with tihs enabled, propably thanks to script entrypoint ;)
		frame:false,
		transparent:true,
		title: "Settings"
	});
	SettingsWindow.on('close', function() {
		SettingsWindow.hide();
	});
  SettingsWindow.hide(); //Hide on init :)
	SettingsWindow.setResizable(false);
}

function OpenSettings(callback){
  SettingsWindow.show();
  callback();
}

function CloseSettings(callback){
  SettingsWindow.hide();
  callback();
}
