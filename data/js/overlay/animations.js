function FadeIn(callback){
	$('html').css("display","block");
	$('.flipster').fadeIn('fast',callback);
}

function FadeOut(callback){
	$('.flipster').fadeOut('fast',function(){
		$('html').css("display","none");
		callback();
	});
}
