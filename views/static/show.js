(function(){

	/*消息处理中心*/
	function newsCenter(){
		this.callbacks = {};
		this.news = [];
		var isAnimation = false;/*动画标识位，在动画过程中不能继续出发上拉下滑功能*/

		setInterval(function(){
			if (this.news.length && !isAnimation) {
				var newObj = this.news.shift();
				isAnimation = true;
				this.callbacks[newObj.type].forEach(function(f){
					typeof f === 'function' && f.call(newObj.that);
					setTimeout(function(){
						isAnimation = false;
					}, AnimationTime())
				})
			}
		}.bind(this), 100)
	};

	/*注册一个消息回调*/
	newsCenter.prototype.attach = function(type, func){
		(this.callbacks[type] === undefined) && (this.callbacks[type] = []);
		this.callbacks[type].push(func);
	}

	/*注销一个消息回调*/
	newsCenter.prototype.detach = function(type, func){
		if (!this.callbacks[type]) return;

		var index = this.callbacks[type].indexOf(func);
		if (index > -1) {
			this.callbacks[type].splice(index, 1);
		}
	}

	/*触发事件*/
	newsCenter.prototype.fire = function(type, that){
		if (this.callbacks[type] && this.news.length < 1) {
			/*事件中心最多纪录两条信息，再多直接丢弃（这里包括一条已经在执行的，已经推出消息队列）*/
			this.news.push({'type':type, 'that': that});
		}
	}

	/*新建事件处理中心并注册回调函数*/
	var newsCenterObj = new newsCenter();
	newsCenterObj.attach('swipeUp',up);
	newsCenterObj.attach('swipeDown',down);

	/*动画执行时间*/
	function AnimationTime(){
		return 1000;
	}

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

		var time = (type === 'up') ? 0 : AnimationTime();
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
	    newsCenterObj.fire('swipeUp');
	})

	myTouch.on('swipeDown',function(e){
	   newsCenterObj.fire('swipeDown');
	})

	function up(){
		if ((elePage < (pages.length - 1))) {
			showPage($(pages[elePage + 1]), 'up');
			hidePage($(pages[elePage]), 'up');
			elePage++;
		}
	}

	function down(){
		 if ((elePage > 0)) {
			showPage($(pages[elePage - 1]), 'down');
			hidePage($(pages[elePage]), 'down');
			elePage--;
		}
	}

})();