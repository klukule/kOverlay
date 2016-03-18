var fs = require('fs-extra');

function Save(filename,path){
  var filenameWithoutExtension = filename.substr(0, filename.lastIndexOf('.'));
  var fileWithPath = "";
  var fc;

  if(path != undefined){
    if(path.endsWith("/") || path.endsWith("\\")){
      fileWithPath += path;
    }else{
      fileWithPath += path + "/";
    }
  }
  fileWithPath += filename;


  console.log("Saving file "+fileWithPath);

  try {
    fs.writeFileSync(fileWithPath,JSON.stringify(Data[filenameWithoutExtension]));
  } catch (e) {
    console.error("Failed to write file " + fileWithPath + "\n"+e);
  }
};

function Load(filename,path){
  var filenameWithoutExtension = filename.substr(0, filename.lastIndexOf('.'));
  var fileWithPath = "";
  var fc;

  if(path != undefined){
    if(path.endsWith("/") || path.endsWith("\\")){
      fileWithPath += path;
    }else{
      fileWithPath += path + "/";
    }
  }
  fileWithPath += filename;


  console.log("Loading file "+fileWithPath);

  try {
    fc = JSON.parse(fs.readFileSync(fileWithPath));
  } catch (e) {
    console.error("Failed to read file " + fileWithPath + "\n"+e);
  }

  Data[filenameWithoutExtension] = fc;
  return fc;
}
