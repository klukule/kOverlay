var OnGlobalHotKey = function(){console.error("Global Hotkey hook not added")};
var Hotkey;

function RegisterGlobalHotKey(hotkeyString){
  UnregisterGlobalHotKey(function(){
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
  });
}

function UnregisterGlobalHotKey(callback){
  if(Hotkey != undefined){
    nw.App.unregisterGlobalHotKey(Hotkey);
  }
  callback();
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
