var fs = require('fs-extra');

function Save(filename){
  var filenameWOpath = filename.substr(filename.lastIndexOf('/'));
  var filenameWithoutExtension = filenameWOpath.substr(0, filenameWOpath.lastIndexOf('.'));

  console.log("Saving file "+filename);

  try {
    fs.writeFileSync(filename,JSON.stringify(Data[filenameWithoutExtension]));
  } catch (e) {
    console.error("Failed to write file " + filename + "\n"+e);
  }
};

function Load(filename,path){
  var filenameWOpath = filename.substr(filename.lastIndexOf('/')+1);
  var filenameWithoutExtension = filenameWOpath.substr(0, filenameWOpath.lastIndexOf('.'));
  var fc;

  try {
    fc = JSON.parse(fs.readFileSync(filename));
  } catch (e) {
    console.error("Failed to read file " + filename + "\n"+e);
  }

  console.log("Loading file "+filename);

  Data[filenameWithoutExtension] = fc;
  return fc;
}


function WatchFile(filename,callback){
  	fs.watchFile(filename,function(){
      callback();
  	});
}
