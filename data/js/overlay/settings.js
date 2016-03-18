var SettingsWindow;

function SetupSettings(){
  //nwjs 0.13.0 rc3 has undocumented edit in callback so you are unable to store window normally you need to use that callback
	nw.Window.open ('settings.html', {
		position: 'center',
		width: 1280,
		height: 720,
		min_width:1280,
		min_height:720,
		show:false,
		frame:false,
		title: "Settings"
	}, function(win){
    win.Overlay = Window; //Pass overlay as reference for recreating window
    win.on('close', function() {
      win.hide();
    });
    win.hide(); //Hide on init :)
    SettingsWindow = win;
  });

}

function OpenSettings(callback){
  SettingsWindow.show();
  SettingsWindow.focus();
  if(callback != undefined)
    callback();
}

function CloseSettings(callback){
  SettingsWindow.hide();
  if(callback != undefined)
    callback();
}
