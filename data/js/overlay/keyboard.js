var OnGlobalHotKey;
var Hotkey;

function RegisterGlobalHotKey(hotkeyString){
  if(Hotkey != undefined){
    UnregisterGlobalHotKey();
  }
  var option = {
		key : hotkeyString,
		active : function() {
			OnGlobalHotKey();
		},
		failed : function(msg) {
			alert(msg);
		}
	};
	 Hotkey = new nw.Shortcut(option);

	nw.App.registerGlobalHotKey(Hotkey);
}

function UnregisterGlobalHotKey(){
  nw.App.unregisterGlobalHotKey(Hotkey);
}

function RegisterKey(id,target,callback){
  if(target == undefined){
    target = document;
  }
  console.log("Creating keypress for target "+target+" and key "+id);
  $(target).keypress(function(e) {
    if(e.which == id) {
        callback();
    }
	});
}
