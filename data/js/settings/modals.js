function ConstructModal(){
  var mid = "Modal-" + (new Date()).getTime();
}

function ModalSave(){

}

function ModalAbort(){

}

function EditItem(target){
  console.log($(target).parent().parent().data("ElemData"));
}

function AddApp(){

}

function Remove(target){
  console.log($(target).parent().parent().data("ElemData"));

}
