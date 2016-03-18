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
