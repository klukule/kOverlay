var openedModal = "";
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
        ElementFileInput("Select file",data.Image,false),
        ElementFileInput("Select thumbnail image",data.Image,false),
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
    ElementFileInput("Select file","",false),
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
  // <p class="control is-grouped">
  //   <a class="button is-primary" href="javascript:;" style="width: 125px;">
  //     Choose File...
  //     <input type="file" style="position:absolute;z-index:2;top:0;left:0;filter: alpha(opacity=0);-ms-filter:&quot;progid:DXImageTransform.Microsoft.Alpha(Opacity=0)&quot;;opacity:0;background-color:transparent;color:transparent;" name="file_source" size="50" onchange="$('#thumbnailUrl').val($(this).val());">
  //   </a>
  //   <input type="text" class="input is-fullwidth" id="thumbnailUrl" placeholder="Select thumbnail image">
  // </p>
  var html = "";
  return html;
}

function ElementBool(placeholder, value){
  // <p class="control">
  //   <span class="select	is-fullwidth">
  //     <select class="is-fullwidth" id="bmOut">
  //       <option>true</option>
  //       <option>false</option>
  //     </select>
  //   </span>
  // </p>
  var html = "";
  return html;
}
function ElementBoolWithSend(placeholder, value){
  // <p class="control is-grouped">
  //   <span class="select	is-fullwidth">
  //     <select class="is-fullwidth" id="bmOut">
  //       <option>true</option>
  //       <option>false</option>
  //     </select>
  //   </span>
  //   <a class="button is-primary" id="bmSend">
  //     Save
  //   </a>
  // </p>
  var html = "";
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
