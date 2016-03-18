//*********************************
// Vars
//*********************************
var Overlay;

//*********************************
// Entry Point
//*********************************
InitApp();



//*********************************
// Functions - Global
//*********************************
function InitApp(){
  SetupOverlay();
}

//*********************************
// Functions - Overlay
//*********************************
function SetupOverlay(callback){

	Overlay = nw.Window.open ('overlay.html', {
		position: 'center',
		width: 1920,
		height: 1080,
		 show:false,
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
  //callback();
}
