var path = require("path");

function GenerateCarousel(){
  var id = (new Date).getTime();
  _GenerateContainer(id, function(){});
}

function _GenerateContainer(id, callback){
  console.log("Generating Carousel with id " + id);
  $("#container").html('<div class="flipster" id="'+id+'"><ul></ul></div>');
  var ul = $('#'+id+' ul');
  		$("#overlayNoShortcuts").remove();
  		for (var i = 0; i < Data.data.length; i++) {
  			var item = Data.data[i];
  			_GenerateSlide(ul,item.Command,item.Name,item.Image);

  		}
  		if(Data.data.length > 0){
  			ul.waitForImages(function() {
  				$('html').css("display","block");
  				$('#'+id).flipster({
  					style: 'carousel',
  					touch: true,
  					start:0
  				});

  				$('#'+id).on('click', 'a', function (e) {

  					e.preventDefault();

  					// Open URL with default browser.
  					gui.Shell.openExternal(e.target.href);

  				});

  				$('#'+id).css({
  	        'position' : 'absolute',
  	        'left' : '50%',
  	        'top' : '50%',
  	        'margin-left' : function() {return -$(this).outerWidth()/2},
  	        'margin-top' : function() {return -$(this).outerHeight()/2}
  		    });
  				callback();
  			});
  		}else{
  			//Display message
  			var display = $('<div class="is-text-centered custom-overlay" id="overlayNoShortcuts"><div class="flex-container"><div><h1 class="title is-2 custom-modal-title">No shortcuts here</h1><h2 class="subtitle is-4 custom-modal-subtitle" id="modalAppName">Just open settings and add some</h2></div></div></div>');
  			display.appendTo($('body'));
  			callback();
  		}

  }


function _GenerateSlide(parent,command,title,image){
  console.log("Generating slide");
  var li = $('<li><img /><a target="_blank"></a></li>');
  li.data("IconInfo",[title,image,command]);
  li.find('a').attr('href', command).text(title);
  image = "file://" + path.join(__dirname,image).replace(/\\/g,"/");
  li.find('img').attr('src', image);
  li.appendTo(parent);
}
