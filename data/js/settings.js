var data = {
  "settings":{},
  "data":{}
};


var aid;
var avalue;
var afile;

var gui = require('nw.gui');
var fs = require('fs');

$(function(){
  $(".appVer").text(gui.App.manifest.version);
  //Load settings file
  data.settings = JSON.parse(fs.readFileSync('../settings.json'));
	data.data = JSON.parse(fs.readFileSync('../data.json'));

  $('.modal-background, .modal-close').click(function() {
    $(this).parent().removeClass('is-active');
  });
  $('#colorPicker').colorpicker();
  $('#colorPicker').colorpicker().on('changeColor.colorpicker', function(event){
    $("#cmOut").val(event.color);
  });

  $( "#bmSend" ).click(function() {
    Save($("#bmOut").val());
    $(this).parent().parent().parent().parent().parent().removeClass('is-active');
  });
  $( "#cmSend" ).click(function() {
    Save($("#cmOut").val());
    $(this).parent().parent().parent().parent().parent().removeClass('is-active');
  });
  $( "#hmSend" ).click(function() {
    Save($("#hmOut").val());
    $(this).parent().parent().parent().parent().parent().removeClass('is-active');
  });

 var dashboardTable = $("#dashboardTable");

 GenTables();

});
function GenTables(){
  var dashboardTable = $("#dashboardTable");
  dashboardTable.html("");
  console.log(data.settings);
  AddElement(dashboardTable,"Background enabled"         ,data.settings["background"]  ,"background" ,"bool"   , "settings");
  AddElement(dashboardTable,"Background color 1"         ,data.settings["bg1"]         ,"bg1"        ,"color"  , "settings");
  AddElement(dashboardTable,"Background color 2"         ,data.settings["bg2"]         ,"bg2"        ,"color"  , "settings");
  AddElement(dashboardTable,"Show overlay hotkey"        ,data.settings["shortcut"]    ,"shortcut"   ,"hotkey" , "settings");
  AddElement(dashboardTable,"Show overlay after startup" ,data.settings["showatstart"] ,"showatstart","bool"   , "settings");
}
function AddElement(table,title,value,id,type,file){
  var ids = "\"" + id + "\"";
  var titles = "\"" + title + "\"";
  var values = "\"" + value + "\"";
  var types = "\"" + type + "\"";
  var files = "\"" + file + "\"";
  var tr = $("<tr><td>"+title+"</td><td>"+value+"</td><td class='table-link table-icon'><a href='#' onclick='ShowModal("+ids+","+types+","+values+","+files+")'><i class='fa fa-pencil'></i></a></td></tr>");
  tr.appendTo(table);
}


function ShowModal(id,type,value,file){
  aid = id;
  avalue = value;
  afile = file;
  switch (type) {
    case "bool":
      $("#bmOut").val(value);
      $("#boolModal").addClass("is-active");
      break;
    case "color":
      $('#colorPicker').colorpicker('setValue', value);
      $("#colorModal").addClass("is-active");
      break;
    case "hotkey":
      $("#hmOut").val(value);
      $("#hotkeyModal").addClass("is-active");
      break;

  }
}

function Save(val){
  data[afile][aid] = val;
  GenTables();
  //Convert stringified bool to bool
  if(val == "true"){
    val = true;
    data[afile][aid] = val;
  }else if(val == "false"){
    val = false;
    data[afile][aid] = val;
  }

  fs.writeFileSync("../"+afile+".json",JSON.stringify(data[afile]));
}
