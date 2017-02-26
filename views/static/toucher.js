/**
 * @author 剧中人
 * @github https://github.com/bh-lay/toucher
 * @modified 2016-5-25 23:27
 * 
 */

 
(function(global,doc,factoryFn){
	//初始化toucher主方法
	var factory = factoryFn(global,doc);
	
	//提供window.util.toucher()接口
	global.util = global.util || {};
	global.util.toucher = global.util.toucher || factory;
	
	//提供CommonJS规范的接口
	global.define && define(function(require,exports,module){
		return factory;
	});
})(this,document,function(window,document){

	/**
	* class 操作
	*/
	var supports_classList = !!document.createElement('div').classList,
		// 是否含有某个 class
		hasClass = supports_classList ? function( node, classSingle ){
			return node && node.classList && node.classList.contains( classSingle );
		} : function ( node, classSingle ){
			if( !node || typeof( node.className ) !== 'string'  ){
				return false;
			}
			return !! node.className.match(new RegExp('(\\s|^)' + classSingle + '(\\s|$)'));
		};

	/**
	 * @method 事件触发器
	 * @description 根据事件最原始被触发的target，逐级向上追溯事件绑定
	 * 
	 * @param string 事件名
	 * @param object 原生事件对象
	 */
	function EMIT(eventName,e){
		this._events = this._events || {};
		//事件堆无该事件，结束触发
		if(!this._events[eventName]){
			return;
		}
		//记录尚未被执行掉的事件绑定
		var rest_events = this._events[eventName];
		
		//从事件源：target开始向上冒泡
		var target = e.target;
		while (1) {
			//若没有需要执行的事件，结束冒泡
			if(rest_events.length ==0){
				return;
			}
			//若已经冒泡至顶，检测顶级绑定，结束冒泡
			if(target == this.dom || !target){
				//遍历剩余所有事件绑定
				for(var i=0,total=rest_events.length;i<total;i++){
					var classStr = rest_events[i]['className'];
					var callback = rest_events[i]['fn'];
					//未指定事件委托，直接执行
					if(classStr == null){
						event_callback(eventName,callback,target,e);
					}
				}
				return;
			}
			
			//当前需要校验的事件集
			var eventsList = rest_events;
			//置空尚未执行掉的事件集
			rest_events = [];

			//遍历事件所有绑定
			for(var i=0,total=eventsList.length;i<total;i++){
				var classStr = eventsList[i]['className'];
				var callback = eventsList[i]['fn'];
				//符合事件委托，执行
				if(hasClass(target,classStr)){
					//返回false停止事件冒泡及后续事件，其余继续执行
					if(event_callback(eventName,callback,target,e) == false){
						return;
					}
				}else{
					//不符合执行条件，压回到尚未执行掉的列表中
					rest_events.push(eventsList[i]);
				}
			}
			//向上冒泡
			target = target.parentNode;
		}
	}
	
	/**
	 * 执行绑定的回调函数，并创建一个事件对象
	 * @param[string]事件名
	 * @param[function]被执行掉的函数
	 * @param[object]指向的dom
	 * @param[object]原生event对象
	 */
	function event_callback(name,fn,dom,e){
		//优先使用自定义的touches（目前是为了解决touchEnd无touches的问题）
		var touches = e.plugTouches || e.touches,
			touch = touches.length ? touches[0] : {},
			newE = {
				type : name,
				target : e.target,
				pageX : touch.pageX,
				pageY : touch.pageY,
				clientX : touch.clientX || 0,
				clientY : touch.clientY || 0
			};
		//为swipe事件增加交互初始位置及移动距离
		if(name.match(/^swipe/) && e.plugStartPosition){
			newE.startX = e.plugStartPosition.pageX;
			newE.startY = e.plugStartPosition.pageY;
			newE.moveX = newE.pageX - newE.startX;
			newE.moveY = newE.pageY - newE.startY;
		}
		//执行绑定事件的回调，并记录返回值
		var call_result = fn.call(dom,newE);
		//若返回false，阻止浏览器默认事件
		if(call_result == false){
			e.preventDefault();
			e.stopPropagation();
		}
		
		return call_result;
	}
	/**
	 * 判断swipe方向
	 */
	function swipeDirection(x1, x2, y1, y2) {
		return Math.abs(x1 - x2) >=	Math.abs(y1 - y2) ? (x1 - x2 > 0 ? 'Left' : 'Right') : (y1 - y2 > 0 ? 'Up' : 'Down');
	}

	/**
	 * 监听原生的事件，主动触发模拟事件
	 * 
	 */
	function eventListener(DOM){
		var this_touch = this;

		//轻击开始时间
		var touchStartTime = 0;
		
		//记录上一次点击时间
		var lastTouchTime = 0;
		
		//记录初始轻击的位置
		var x1,y1,x2,y2;
		
		//轻击事件的延时器
		var touchDelay;
		
		//测试长按事件的延时器
		var longTap;
		
		//记录当前事件是否已为等待结束的状态
		var isActive = false;
		//记录有坐标信息的事件
		var eventMark = null;
		//单次用户操作结束
		function actionOver(e){
			isActive = false;
			clearTimeout(longTap);
			clearTimeout(touchDelay);
		}
		
		//断定此次事件为轻击事件
		function isSingleTap(){
			actionOver();
			EMIT.call(this_touch,'singleTap',eventMark);
		}
		//触屏开始
		function touchStart(e){
			//缓存事件
			eventMark = e;
			x1 = e.touches[0].pageX;
			y1 = e.touches[0].pageY;
			x2 = 0;
			y2 = 0;
			isActive = true;
			touchStartTime = new Date();
			EMIT.call(this_touch,'swipeStart',e);
			//检测是否为长按
			clearTimeout(longTap);
			longTap = setTimeout(function(){
				actionOver(e);
				//断定此次事件为长按事件
				EMIT.call(this_touch,'longTap',e);
			},500);
		}
		//触屏结束
		function touchend(e){
			//touchend中，拿不到坐标位置信息，故使用全局保存下数据
			e.plugStartPosition = eventMark.plugStartPosition;
			e.plugTouches = eventMark.touches;
			
			EMIT.call(this_touch,'swipeEnd',e);
			if(!isActive){
				return;
			}
			var now = new Date();
			//若未监听doubleTap，直接响应
			if(!this_touch._events.doubleTap || this_touch._events.doubleTap.length == 0){
				isSingleTap();
			}else if(now - lastTouchTime > 200){
				//延迟响应
				touchDelay = setTimeout(isSingleTap,190);
			}else{
				clearTimeout(touchDelay);
				actionOver(e);
				//断定此次事件为连续两次轻击事件
				EMIT.call(this_touch,'doubleTap',eventMark);
			}
			lastTouchTime = now;
		}
		
		//手指移动
		function touchmove(e){
			//缓存事件
			eventMark = e;
			//在原生事件基础上记录初始位置（为swipe事件增加参数传递）
			e.plugStartPosition = {
				pageX : x1,
				pageY : y1
			};
			//断定此次事件为移动事件
			EMIT.call(this_touch,'swipe',e);

			if(!isActive){
				return;
			}
			x2 = e.touches[0].pageX;
			y2 = e.touches[0].pageY;
			if(Math.abs(x1-x2)>2 || Math.abs(y1-y2)>2){
				//断定此次事件为移动手势
				var direction = swipeDirection(x1, x2, y1, y2);
				EMIT.call(this_touch,'swipe' + direction,e);
			}else{
				//断定此次事件为轻击事件
				isSingleTap();
			}
			actionOver(e);
		}

		/**
		 * 对开始手势的监听
		 */
		DOM.addEventListener('touchstart',touchStart);
		DOM.addEventListener('MSPointerDown',touchStart);
		DOM.addEventListener('pointerdown',touchStart);

		/**
		 * 对手势结束的监听（轻击）
		 */
		DOM.addEventListener('touchend',touchend);
		DOM.addEventListener('MSPointerUp',touchend);
		DOM.addEventListener('pointerup',touchend);

		/**
		 * 对移动手势的监听
		 */
		DOM.addEventListener('touchmove',touchmove);
		DOM.addEventListener('MSPointerMove',touchmove);
		DOM.addEventListener('pointermove',touchmove);

		/**
		 * 对移动结束的监听
		 */
		DOM.addEventListener('touchcancel',actionOver);
		DOM.addEventListener('MSPointerCancel',actionOver);
		DOM.addEventListener('pointercancel',actionOver);
	}
	
	/**
	 * touch类
	 * 
	 */
	function Touch(DOM,param){
		var param = param || {};

		this.dom = DOM;
		//存储监听事件的回调
		this._events = {};
		//监听DOM原生事件
		eventListener.call(this,this.dom);
	}
	/**
	 * @method 增加事件监听
	 * @description 支持链式调用
	 * 
	 * @param string 事件名
	 * @param [string] 事件委托至某个class（可选）
	 * @param function 符合条件的事件被触发时需要执行的回调函数 
	 * 
	 **/
	Touch.prototype.on = function ON(eventStr,a,b){
		var className,fn;
		if(typeof(a) == 'string'){
			className = a.replace(/^\./,'');
			fn = b;
		}else{
			className = null;
			fn = a;
		}
		//检测callback是否合法,事件名参数是否存在·
		if(typeof(fn) == 'function' && eventStr && eventStr.length){
			var eventNames = eventStr.split(/\s+/);
			for(var i=0,total=eventNames.length;i<total;i++){
			
				var eventName = eventNames[i];
				//事件堆无该事件，创建一个事件堆
				if(!this._events[eventName]){
					this._events[eventName] = [];
				}
				this._events[eventName].push({
					className : className,
					fn : fn
				});
			}
		}
		
		//提供链式调用的支持
		return this;
	};
	
	//对外提供接口
	return function (dom){
		return new Touch(dom);
	};
});
