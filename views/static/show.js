(function(){

	function showPage(pageObj, type){
		if (type === 'down') {
			pageObj.addClass('show');
			pageObj.removeClass('hide');
		}
		pageObj.removeClass('page-hide');
		pageObj.addClass('page-show');
	}

	function hidePage(pageObj, type){
		if (type === 'up') {
			pageObj.addClass('hide');
			pageObj.removeClass('show');
		}

		var time = (type === 'up') ? 0 : 1000;
		setTimeout(function(){
			pageObj.addClass('page-hide');
			pageObj.removeClass('page-show');
		}, time)
		
	}

	var isPlay = true;
	var elePage = 0;
	var pages = $('.pages');

	pages.length && showPage($(pages[0]));

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

	var myTouch = util.toucher(document.getElementById('contain'));
	myTouch.on('swipeUp',function(e){
	    if (elePage < (pages.length - 1)) {
			showPage($(pages[elePage + 1]), 'up');
			hidePage($(pages[elePage]), 'up');
			elePage++;
		}
	})

	myTouch.on('swipeDown',function(e){
	    if (elePage > 0) {
			showPage($(pages[elePage - 1]), 'down');
			hidePage($(pages[elePage]), 'down');
			elePage--;
		}
	})

})();