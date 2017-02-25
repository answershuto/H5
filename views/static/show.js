(function(){
	var isPlay = true;
	$('#musicIcon').click(function(){
		isPlay = !isPlay;
		var audio = document.getElementById('musicAudio');
		if (isPlay) {
			audio.play();
			$('#musicIcon').addClass('rotate');
		}
		else{
			audio.pause();
			$('#musicIcon').removeClass('rotate');
		}
	})
})();