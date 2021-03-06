var data = {
  "settings":{},
  "data":{}
};


var aid;
var avalue;
var afile;
var win;

var gui = require('nw.gui');
var fs = require('fs-extra');

var activeTab = "tab1";
var activeItem = -1;
$(function(){
  win = gui.Window.get();
  win.setResizable(false);
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
  $("#windowClose").click(function(){
    win.hide();
  });

  $("#tab1button").click(function(){
    SwitchTo("tab1");
  });
  $("#tab2button").click(function(){
    SwitchTo("tab2");
  });
  $("#tab3button").click(function(){
    SwitchTo("tab3");
  });

  $("#iconModalSend").click(function(){
    ParseApp();
  });

 GenTables();

});
function GenTables(){
  var dashboardTable = $("#dashboardTable");
  dashboardTable.html("");

  AddElement(dashboardTable,"Background enabled"         ,data.settings["background"]  ,"background" ,"bool"   , "settings");
  AddElement(dashboardTable,"Background color 1"         ,data.settings["bg1"]         ,"bg1"        ,"color"  , "settings");
  AddElement(dashboardTable,"Background color 2"         ,data.settings["bg2"]         ,"bg2"        ,"color"  , "settings");
  AddElement(dashboardTable,"Show overlay hotkey"        ,data.settings["shortcut"]    ,"shortcut"   ,"hotkey" , "settings");
  AddElement(dashboardTable,"Show overlay after startup" ,data.settings["showatstart"] ,"showatstart","bool"   , "settings");
  AddElement(dashboardTable,"Show Loading message"       ,data.settings["loadmessage"] ,"loadmessage","bool"   , "settings");
  AddElement(dashboardTable,"Close overlay after starting application"       ,data.settings["closeafterlaunch"] ,"closeafterlaunch","bool"   , "settings");

  GenIcons();
}

function GenIcons(){
  var table = $("#shortcutsTable");
  table.parent().html("<tbody id='shortcutsTable'></tbody>");
  var table = $("#shortcutsTable");
  $("<thead><tr><th>Add</th><th></th><th></th><th></th><th></th><th class='table-link table-icon'><a href='#' onclick='EditApp(-1)'><i class='fa fa-plus'></i></a></th></tr>thead>").appendTo(table.parent());
  for(var i in data.data){
    var comp = "<tr>";
    comp +="<td>"+data.data[i].Name+"</td>";
    comp +="<td>"+data.data[i].Command+"</td>";
    if(i < data.data.length - 1){
      comp +="<td class='table-link table-icon'><a href='#' onclick='MoveDown("+i+")'><i class='fa fa-arrow-down'></i></a></td>";
    }else{
      comp += "<td></td>";
    }
    if(i > 0){
      comp +="<td class='table-link table-icon'><a href='#' onclick='MoveUp("+i+")'><i class='fa fa-arrow-up'></i></a></td>";
    }else{
      comp += "<td></td>";
    }
    comp += "<td class='table-link table-icon'><a href='#' onclick='EditApp("+i+")'><i class='fa fa-pencil'></i></a></td>";
    comp += "<td class='table-link table-icon is-alert'><a href='#' onclick='Remove("+i+")'><i class='fa fa-times'></i></a></td>";
    comp += "</tr>";
    var tr = $(comp);
    tr.appendTo(table);
  }
  $("<tfoot><tr><th>Add</th><th></th><th></th><th></th><th></th><th class='table-link table-icon'><a href='#' onclick='EditApp(-1)'><i class='fa fa-plus'></i></a></th></tr>tfoot>").appendTo(table.parent());

}

function EditApp(index){
  activeItem = index;
  if(index == -1){
    $("#appName").val("");
    $("#command").val("");
    $("#thumbnailUrl").val("");
  }else{
    $("#appName").val(data.data[index].Name);
    $("#command").val(data.data[index].Command);
    $("#thumbnailUrl").val(data.data[index].Image);
  }
  $("#iconModal").addClass("is-active");
}

function ParseApp(){
  $("#iconModal").removeClass("is-active");
  var an = $("#appName").val();
  var ac = $("#command").val();
  var ai = $("#thumbnailUrl").val();
  if(activeItem == -1){
    CopyImage(ai);
    var dat = {"Name":an,"Command":ac,"Image":"../icons/"+ai.split('\\').pop().split('/').pop()};
    data.data.push(dat);
  }else{
    if(!ai.startsWith("../")){
      fs.unlink(data.data[activeItem].Image);
      CopyImage(ai);
    }
    data.data[activeItem].Name = an;
    data.data[activeItem].Command = ac;
    data.data[activeItem].Image = "../icons/"+ai.split('\\').pop().split('/').pop();
  }
  SaveData();
  GenTables();
}

function MoveDown(index){
  var temp = data.data[index];
  data.data[index] = data.data[index+1];
  data.data[index+1] = temp;
  SaveData();
  GenTables();
}
function MoveUp(index){
  var temp = data.data[index];
  data.data[index] = data.data[index-1];
  data.data[index-1] = temp;
  SaveData();
  GenTables();
}

function Remove(index){
  fs.unlink(data.data[index].Image);
  data.data.splice(index,1);
  SaveData();
  GenTables();
}

function SaveData(){
  fs.writeFileSync("../data.json",JSON.stringify(data.data));
}

function CopyImage(source){
  var filename = source.split('\\').pop().split('/').pop();
  fs.copySync(source, "../icons/"+filename);

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


function SwitchTo(tab){
  $("#" + activeTab).removeClass("custom-active");
  $("#" + activeTab + "button").parent().removeClass("is-active");
  $("#" + tab).addClass("custom-active");
  $("#" + tab + "button").parent().addClass("is-active");
  activeTab = tab;
}

function SubmitForm(){
  var sender = $("#contactSender").val();
  var msg = $("#contactMessage").val();
  if(sender.length < 8 ){ //Im sorry for possible emails less than 8 chars long (highly unpropable :D)
    DisplayMessage($("#messageHolder"),"Field email required & must be longer than 8 characters","danger");
    return;
  }
  if(msg.length < 20){
    DisplayMessage($("#messageHolder"),"Field message required & must be longer than 20 characters","danger");
    return;
  }
  $.ajax({
    type: 'POST',
    url: 'http://static.moow.info/koverlay/Contact.php',
    data: {'sender': sender,'message':msg},
    success: function(msg) {
      DisplayMessage($("#messageHolder"),"Message successfully sent","success");
      $("#contactSender").val("");
      $("#contactMessage").val("");
    },
    error: function(){
      DisplayMessage($("#messageHolder"),"Try again, or contact me using methods above","danger");
    }
  });

}

function DisplayMessage(where,what,type){
  var typeClass = "";
  switch (type) {
    case "primary":
      typeClass = "is-primary";
      break;
    case "info":
      typeClass = "is-info";
      break;
    case "success":
      typeClass = "is-success";
      break;
    case "warning":
      typeClass = "is-warning";
      break;
    case "danger":
      typeClass = "is-danger";
      break;
    default:
      break;
  }
  $(where).append("<div class='notification "+typeClass+"'>"+what+"<button class='delete'></button></div>")
  //Reapply onClick event
  $('.delete').click(function() {
    $(this).parent().remove();
  });
}
