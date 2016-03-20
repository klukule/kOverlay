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
    tables[target] = [];
  }

  tables[target].push({"Name":name,"Value":value,"Type":DetermineType(value),"Table":target});
}

function AddElementApp(name,icon,command,target){
  if(tables[target] == undefined){
    tables[target] = [];
  }

  tables[target].push({"Name":name,"Value":command,"Type":DetermineType("app"),"Icon":icon,"Table":target});
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
  console.log("Generating item \""+elem.Name+"\"");
  var tr = $("<tr></tr>");
  tr.append("<td>"+elem.Name+"</td>");
  tr.append("<td>"+elem.Value+"</td>");
  tr.append("<td class='table-link table-icon'><a href='#' onclick='EditItem(this);'><i class='fa fa-pencil'></i></a></td>");

  tr.data("ElemData",elem);

  return tr;
}

function GenerateItemApp(tableId,elemId){
  var elem = tables[tableId][elemId];
  console.log("Generating item \""+elem.Name+"\"");
  var tr = $("<tr></tr>");
  tr.append("<td>"+elem.Name+"</td>");
  tr.append("<td>"+elem.Value+"</td>");
  if(elemId != 0){
    tr.append("<td class='table-link table-icon'><a href='#' onclick='MoveUp(this)'><i class='fa fa-arrow-up'></i></a></td>");
  }else{
    tr.append("<td></td>");
  }
  if(elemId != (tables[tableId].length - 1)){
    tr.append("<td class='table-link table-icon'><a href='#' onclick='MoveDown(this)'><i class='fa fa-arrow-down'></i></a></td>");
  }else{
    tr.append("<td></td>");
  }
  tr.append("<td class='table-link table-icon'><a href='#' onclick='EditItem(this)'><i class='fa fa-pencil'></i></a></td>");
  tr.append("<td class='table-link table-icon is-alert'><a href='#' onclick='Remove(this)'><i class='fa fa-times'></i></a></td>");
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

function GetIndexOfObject(table,elemId){
  for (var i = 0; i < table.length; i++) {
    if(table[i].Name == elemId){
      return i;
    }
  }
}

function GetElemAtIndex(table,index){
  var i = 0;
  for(var eid in table){
    if(i == index){
      return table[eid];
    }
    i++;
  }
}

function MoveUp(target){
  var data = $(target).parent().parent().data("ElemData");
  var cindex = GetIndexOfObject(tables[data.Table],data.Name);
  console.log(cindex + " => " + (cindex-1));
  var temp = tables[data.Table][cindex];
  tables[data.Table][cindex] = tables[data.Table][cindex-1];
  tables[data.Table][cindex-1] = temp;
  Clear(data.Table);
  GenTable(data.Table);

}
function MoveDown(target){
  var data = $(target).parent().parent().data("ElemData");
  var cindex = GetIndexOfObject(tables[data.Table],data.Name);
  console.log(cindex + " => " +(cindex+1));
  var temp = tables[data.Table][cindex];
  tables[data.Table][cindex] = tables[data.Table][cindex+1];
  tables[data.Table][cindex+1] = temp;
  Clear(data.Table);
  GenTable(data.Table);
}
