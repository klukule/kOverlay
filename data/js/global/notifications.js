function ShowDesktopNotification(title,text,duration){
  if(duration == undefined){
    duration = 1000; //set for 1 sec
  }
  var options = {
    // icon: "icon.png", //TODO: Add some icon
    body: text
   };

  var notification = new Notification(title,options);
  notification.onclick = function () {
  }

  notification.onshow = function () {
    setTimeout(function() {notification.close();}, 2000);
  }
}
