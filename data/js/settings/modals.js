var openedModal = "";
var path = require("path");

function ConstructModal(fields,target){
  var mid = "Modal-" + (new Date()).getTime();
  var modal = '<div class="modal is-active" id="'+mid+'"><div class="modal-background" onclick="ModalAbort();"></div>';
  modal += '<div class="modal-container"><div class="modal-content"><div class="box">';
  for(var field in fields){
    modal+=fields[field];
  }
  modal += '</div></div></div><button class="modal-close" onclick="ModalAbort();"></button></div>';
  openedModal = mid;
  modal = $(modal);
  modal.data("targetInfo",target);
  $("body").append(modal);
  $("a").on("click",function(e){
    e.preventDefault();
    OpenLinkExt($(this).attr("href"));
  });
}

function ModalSave(){
  ModalAbort();
}

function ModalAbort(){
  $("#"+openedModal).remove();
}

function EditItem(target){
  var data = $(target).parent().parent().data("ElemData");
  switch (data.Type) {
    case "app":
      ConstructModal([
        ElementInput("Shortcut name",data.Name,true),
        ElementFileInput("Select file",data.Value,true),
        ElementFileInput("Select thumbnail image",data.Icon,false),
        ElementSend("Save")
      ],data);
      break;
    case "bool":
      ConstructModal([
        ElementBoolWithSend("Select value",data.Value),
      ],data);
      break;
    case "color":
      ConstructModal([
        ElementColorWidthSend("Select color",data.Value),
      ],data);
      break;
    case "string":
      ConstructModal([
        ElementInputWithSend("Write HotKey",data.Value),
        ElementString("Need help with hotkey? <a href='https://github.com/klukule/kOverlay/wiki/Hotkey-creation-help'>Click here</a>"),
      ],data);
      break;
  }
}

function AddApp(){
  ConstructModal([
    ElementInput("Shortcut name","",true),
    ElementFileInput("Select file","",true),
    ElementFileInput("Select thumbnail image","",false)
  ]);
}

function Remove(target){
  console.log($(target).parent().parent().data("ElemData"));

}


function ElementInput(placeholder,value,editable){
  var html = '<p class="control"><input type="text" class="input is-fullwidth" placeholder="'+placeholder+'"  value="'+value+'" ';
  if(!editable){
    html+= "disabled";
  }
  html+= '></p>';
  return html;
}

function ElementInputWithSend(placeholder,value,editable){
  var html = '<p class="control is-grouped"><input type="text" class="input is-fullwidth" placeholder="'+placeholder+'" value="'+value+'" ';
  if(!editable){
    html+= "disabled";
  }
  html+= '><a class="button is-primary" onclick="ModalSave();">Save</a></p>';
  return html;
}


function ElementFileInput(placeholder,value,editable){
  value = path.resolve(__dirname,value);
  var html ="<p class='control is-grouped is-fullwidth is-text-centered'>";
  html+= '<a class="button is-primary" onclick="chooseFile(this)" style="width: 125px;">';
  html+= 'Choose File...';
  html+= '</a>';
  if(editable){
    html+= '<input type="text" class="input is-fullwidth" placeholder="'+placeholder+'" value="'+value+'">';
  }else{
    html+= '<input type="text" class="input is-fullwidth" placeholder="'+placeholder+'" value="'+value+'" disabled>';

  }
  html+="</p>";
  return html;
}

function chooseFile(buttonClicked) {
  name = "#fileDialog";
  var chooser = $(name);
  chooser.unbind('change');
  chooser.change(function(evt) {
    $($(buttonClicked).parent().children()[1]).val($(this).val());
    $(this).val("");
  });

  chooser.trigger('click');
}
function ElementBool(placeholder, value){
  var html ="<p class='control is-fullwidth is-text-centered'>";
  html+= "<span class='select	is-fullwidth'>";
  html+= '<select class="is-fullwidth">';
  if(value){
      html+= "<option selected>true</option>";
      html+= "<option>false</option>";
  }else{
    html+= "<option>true</option>";
    html+= "<option selected>false</option>";

  }
  html+="</select></span></p>";

  return html;
}
function ElementBoolWithSend(placeholder, value){
  var html ="<p class='control is-grouped is-fullwidth is-text-centered'>";
  html+= "<span class='select	is-fullwidth'>";
  html+= '<select class="is-fullwidth">';
  if(value){
      html+= "<option selected>true</option>";
      html+= "<option>false</option>";
  }else{
    html+= "<option>true</option>";
    html+= "<option selected>false</option>";

  }
  html+="</select></span><a class='button is-primary' onclick='ModalSave();'>Save</a></p>";
  return html;
}
function ElementColor(placeholder, value){
  var html = "";
  return html;
}

function ElementColorWidthSend(placeholder, value){
  var html = "";
  return html;
}

function ElementString(text){
  var html ="<p class='control is-fullwidth is-text-centered'>"+text+"</p>";
  return html;
}

function ElementSend(text){
  var html = '<a class="button is-primary is-fullwidth" onclick="ModalSave();">'+text+'</a>';
  return html;
}
