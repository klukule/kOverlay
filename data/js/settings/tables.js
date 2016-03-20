var tables = {};

function SetupTables(){
  Clear("dashboardTable");
  Clear("shortcutsTable");
  AddElement("Background enabled",Data.settings.background,"dashboardTable");
  AddElement("Background color 1",Data.settings.bg1,"dashboardTable");
  AddElement("Background color 2",Data.settings.bg2,"dashboardTable");
  AddElement("Overlay open hotkey",Data.settings.shortcut,"dashboardTable");
  AddElement("Show overlay after startup",Data.settings.showatstart,"dashboardTable");
  AddElement("Show Loading message",Data.settings.loadmessage,"dashboardTable");
  AddElement("Close overlay after starting application",Data.settings.loadmessage,"dashboardTable");
  GenTable("dashboardTable");

  for(var app in Data.data){
    var app = Data.data[app];
    AddElementApp(app.Name,app.Image,app.Command,"shortcutsTable");
  }
  GenTable("shortcutsTable");

}

function AddElement(name,value,target){
  if(tables[target] == undefined){
    tables[target] = {};
  }

  tables[target][name] = {"Name":name,"Value":value,"Type":DetermineType(value)};
}

function AddElementApp(name,icon,command,target){
  if(tables[target] == undefined){
    tables[target] = {};
  }

  tables[target][name] = {"Name":name,"Value":command,"Type":DetermineType("app"),"Icon":icon};
}

function Clear(target){
  $("#" + target).html("");
}

function GenTable(target){
  for(var tid in tables){
    if(tid == target){
      console.log("Generating table "+target);
      for(var eid in tables[tid]){
        if(tables[tid][eid].Type == DetermineType("app")){
          $("#"+target).append(GenerateItemApp(tid,eid));
        }else{
          $("#"+target).append(GenerateItem(tid,eid));
        }
      }
      break;
    }
  }
}

function GenerateItem(tableId,elemId){
  var elem = tables[tableId][elemId];
  console.log("TEST");
  console.log(GetIdOfObject(tables[tableId],elemId));
  console.log("Generating item \""+elem.Name+"\"");
  var tr = $("<tr></tr>");
  tr.append("<td>"+elem.Name+"</td>");
  tr.append("<td>"+elem.Value+"</td>");
  tr.append("<td class='table-link table-icon'><a href='#' onclick='EditItem();'><i class='fa fa-pencil'></i></a></td>");

  tr.data("ElemData",elem);

  return tr;
}

function GenerateItemApp(tableId,elemId){
  var elem = tables[tableId][elemId];
  var tr = $("<tr></tr>");
  tr.append("<td>"+elem.Name+"</td>");
  tr.append("<td>"+elem.Value+"</td>");
  if(GetIdOfObject(tables[tableId],elemId) != 0){
    tr.append("<td class='table-link table-icon'><a href='#' onclick='MoveDown()'><i class='fa fa-arrow-down'></i></a></td>");
  }else{
    tr.append("<td></td>");
  }
  console.log("Generating "+elem.Name);
  console.log(GetIdOfObject(tables[tableId],elemId));
  console.log((GetLengthOfTable(tables[tableId])-1));
  if(GetIdOfObject(tables[tableId],elemId) != (GetLengthOfTable(tables[tableId])-1)){
    tr.append("<td class='table-link table-icon'><a href='#' onclick='MoveUp()'><i class='fa fa-arrow-up'></i></a></td>");
  }else{
    tr.append("<td></td>");
  }
  tr.append("<td class='table-link table-icon'><a href='#' onclick='EditItem()'><i class='fa fa-pencil'></i></a></td>");
  tr.append("<td class='table-link table-icon is-alert'><a href='#' onclick='Remove()'><i class='fa fa-times'></i></a></td>");
  tr.data("ElemData",elem);

  return tr;
}

function DetermineType(val){
  if(val == true || val == false){
    return "bool";
  }

  if(val.startsWith("rgba")){
    return "color";
  }

  if(val == "app"){
    return "app";
  }

  return "string";
}

function GetIdOfObject(table,elemId){
  var i = 0;
  for(var eid in table){
    if(elemId == eid){
      return i;
    }
    i++
  }
}

function GetLengthOfTable(table){
  return Object.keys(table).length;
}
