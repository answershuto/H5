(function(){

	/*防止微信或者其他移动端浏览器在下拉时触发原生操作，比如chrome里面的下拉刷新以及微信中的把整个显示区块下拉*/
	document.querySelector('body').addEventListener('touchstart', function (ev) {
	    event.preventDefault();
	});

	/*消息处理中心*/
	function newsCenter(){
		this.callbacks = {};
		this.news = [];
		this.isAnimation = false;/*动画标识位，在动画过程中不能继续出发上拉下滑功能*/
		var that = this;

		for(var i = 0; i < $('.pages').length; i++){
		$('.pages')[i].addEventListener("webkitAnimationEnd", function(e){
				/*当是design元素动画冒泡事件直接返回*/
				if (e.target.id.indexOf('design_') >= 0) return;

				that.isAnimation = false;
				that.exec();
				that.animation();
			})
		}
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
		if (this.callbacks[type] && this.news.length < 1 ) {
			/*事件中心最多纪录两条信息，再多直接丢弃（这里包括一条已经在执行的，已经推出消息队列）*/
			if (((type === 'swipeUp') && (elePage == (window.infoData.designInfos.pages.length-1))) 
				|| ((type === 'swipeDown') && (elePage == 0))) return;
			this.news.push({'type':type, 'that': that});
			this.exec();
		}
	}

	newsCenter.prototype.exec = function(){
		if (this.news.length && !this.isAnimation) {
			var newObj = this.news.shift();
			this.isAnimation = true;
			this.callbacks[newObj.type].forEach(function(f){
				typeof f === 'function' && f.call(newObj.that);
			})
		}
	}

	/*执行动画*/
	newsCenter.prototype.animation = function(isDelay){
		window.infoData.designInfos.pages[elePage].text.forEach(function(item, index){
			$('#' + item.id).css('display', 'block');
			for(var s in item.animationStyle){
				$('#' + item.id).css(s, item.animationStyle[s]);
			}
		})

		window.infoData.designInfos.pages[elePage].image.forEach(function(item, index){
			$('#' + item.id).css('display', 'block');
			for(var s in item.animationStyle){
				$('#' + item.id).css(s, item.animationStyle[s]);
			}		
		})
	}

	var isPlay = true;
	var elePage = 0;
	var pages = $('.pages');

	/*新建事件处理中心并注册回调函数*/
	var newsCenterObj = new newsCenter();
	newsCenterObj.attach('swipeUp',up);
	newsCenterObj.attach('swipeDown',down);
	newsCenterObj.animation();

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
		
		/*清楚隐藏页面的css动画，保证下次出现的时候会添加动画并执行*/
		var p = (type === 'up') ? (elePage - 1) : (elePage + 1);
		window.infoData.designInfos.pages[p].text.forEach(function(item, index){
			$('#' + item.id).css('display', 'none');
			for(var s in item.animationStyle){
				$('#' + item.id).css(s, '');
			}	
		})	

		window.infoData.designInfos.pages[p].image.forEach(function(item, index){
			$('#' + item.id).css('display', 'none');
			for(var s in item.animationStyle){
				$('#' + item.id).css(s, '');
			}	
		})	
	}


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
			elePage++;
			showPage($(pages[elePage]), 'up');
			hidePage($(pages[elePage - 1]), 'up');
		}
	}

	function down(){
		 if ((elePage > 0)) {
		 	elePage--;
			showPage($(pages[elePage]), 'down');
			hidePage($(pages[elePage + 1]), 'down');
		}
	}

})();