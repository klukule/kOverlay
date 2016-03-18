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

	nw.Window.open ('overlay.html', {
		position: 'center',
		width: 1920,
		height: 1080,
		show:false,
		frame:false,
		transparent:true,
		title: "Overlay"
	},function(win){
    Overlay.on('close', function() {
  		Overlay.hide();
  	});
    Overlay.hide(); //Hide on init :)
    Overlay = win;
  });

}

function OpenOverlay(callback){
  Overlay.show();
  //callback();
}
