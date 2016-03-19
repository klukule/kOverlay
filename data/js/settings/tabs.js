var tabs = [];
function SetupTabs(){
  AddTab("Dashboard","tab1content",true);
  AddTab("Shortcuts","tab2content",false);
  AddTab("Support","tab3content",false);
  GenTabs();

}

function ActivateTab(name){
  for(var tab in tabs){
    if(tabs[tab].Name == name){
      tabs[tab].Active = true;
    }else{
      tabs[tab].Active = false;
    }
  }
  GenTabs();
}

function GenTabs(){
  $("#tabMenuContainer").html("");
  for(var tab in tabs){
    var li = $("<li></li>");
    if(tabs[tab].Active){
      li.addClass("is-active");
    }
    li.data("tabInfo",tabs[tab]);
    li.append("<a href='#'>"+tabs[tab].Name+"</a>");
    li.on("click",function(){
      ActivateTab($(this).data("tabInfo").Name);
    })
    $("#tabMenuContainer").append(li);
  }
}

function AddTab(name,target,active){
  tabs.push({"Name":name,"Target":target,"Active":active});
}
