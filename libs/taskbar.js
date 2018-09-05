var TaskBar = new (function()
{
    var self = this;
    var tasks = [];
	var mapWindowToTask=new HashMap();
    var selfTaskBar = this;
	var style =  {backgroundColor: 'transparent'};
	var hoverStyle= {backgroundColor: 'rgba(0,255,255, 0.5)'};
	var activeStyle ={backgroundColor: 'rgba(0, 128, 255, 0.5)'};
	var attentionStyle = {backgroundColor: 'rgba(255,80,80,0.5)'};
		
    var element = document.createElement('div');
    element.style.position = 'fixed';
    element.style.bottom = '0px';
    element.style.left = '0px';
    element.style.width = '100%';
    element.style.zIndex = '200000';
	element.style.backgroundColor = 'rgba(104,153,153, 0.5)';
	this.element = element;
    var taskbarThemeObject;
    if (isMobile)
    {
        var divDrag = document.createElement('div');
        divDrag.style.top = '0px';
        divDrag.style.left = '0px';
        divDrag.style.width = '100%';
        var img = document.createElement('img');
        self.element.appendChild(img);
        img.src = 'images/black_menu.png';
        img.style.top = '0px';
        img.style.position = 'absolute';
        setSizes();
        var imgWidth;
        function setSizes()
        {
            divDrag.style.height = String(Window.divDragHeightTaskBarPx) + 'px';
            imgWidth = Windows.divDragHeightTaskBarPx * 1.5;
            img.style.width = String(imgWidth) + 'px';
            img.style.height = String(Window.divDragHeightTaskBarPx - 2) + 'px';
            img.style.top = '1px';
            img.style.left = 'calc(50% - ' + String(imgWidth / 2) + 'px)';
        }
        Themes.register({components: [
                {name: 'imgTaskbar', elements: [img]}
            ],
            callback: function (theme) {

            }
        }, undefined);
        element.appendChild(divDrag);
        element.style.height = String(Windows.divDragHeightTaskBarPx) + 'px';
        var startOffset = [];
        var timerMove;
        var showing = false;
        var step = Math.floor(Windows.divDragHeightTaskBarPx / 3);
        var lowerOuterBound = Windows.divDragHeightTaskBarPx + step;
        function vanish()
        {
            showing = false;
            var height = self.element.offsetHeight;

            if (timerMove)
            {
                timerMove.stop();
            }
            timerMove = new Timer(function ()
            {
                if (height > lowerOuterBound)
                {
                    height -= step;
                } else
                {
                    if (height > Window.divDragHeightTaskBarPx)
                        height = Window.divDragHeightTaskBarPx;
                    timerMove.stop();
                }
                self.element.style.height = String(height) + 'px';
                self.element.style.top = String(document.documentElement.clientHeight - height) + 'px';
            }, 5, -1);
        }
        this.vanish = vanish;
        function appear()
        {
            showing = true;
            var height = self.element.offsetHeight;
            var upperOuterBound = document.documentElement.clientHeight - step;
            if (timerMove)
            {
                timerMove.stop();
            }
            timerMove = new Timer(function ()
            {
                if (height < upperOuterBound)
                {
                    height += step;
                } else
                {
                    if (height < document.documentElement.clientHeight)
                        height = document.documentElement.clientHeight;
                    timerMove.stop();
                }
                self.element.style.height = String(height) + 'px';
                self.element.style.top = String(document.documentElement.clientHeight - height) + 'px';
            }, 5, -1);

        }
        self.element.addEventListener("resize", function ()
        {
            setSizes();
            if (showing)
            {
                self.element.style.height = String(document.documentElement.clientHeight) + 'px';
                self.element.style.top = '0px';
            } else
            {
                self.element.style.height = String(Window.divDragHeightTaskBarPx) + 'px';
                self.element.style.top = String(document.documentElement.clientHeight - Window.divDragHeightTaskBarPx) + 'px';

            }
        }, false);
        var moveEvent = function (e) {
            if (!e)
                var e = window.event;
            if (e.preventDefault)
            {
                e.preventDefault();
            }
            var height = (startOffset[0] - e.changedTouches[e.changedTouches.length - 1].pageY);
            if (height > document.documentElement.clientHeight)
                height = document.documentElement.clientHeight;
            else
            {
                if (height < Window.divDragHeightTaskBarPx)
                    height = Window.divDragHeightTaskBarPx;
            }
            self.element.style.height = String(height) + 'px';
            var top = document.documentElement.clientHeight - height;
            self.element.style.top = String(top) + 'px';
        };
        var upEvent = function (e)
        {
            if (!e)
                var e = window.event;
            if (e.preventDefault)
            {
                e.preventDefault();
            }
            if ((100 * (startOffset[0] - e.changedTouches[e.changedTouches.length - 1].pageY)) / document.documentElement.clientHeight > (showing ? 70 : 30))
                appear();
            else
                vanish();
            document.documentElement.removeEventListener("touchend", upEvent);
            divDrag.removeEventListener("touchmove", moveEvent);
            img.removeEventListener("touchmove", moveEvent);
        };
        var startEvent = function (e) {
            if (!e)
                var e = window.event;
            if (e.preventDefault)
            {
                e.preventDefault();
            }
            startOffset[0] = self.element.offsetHeight + e.changedTouches[0].pageY;
            document.documentElement.addEventListener("touchend", upEvent);
            divDrag.addEventListener("touchmove", moveEvent);
            img.addEventListener("touchmove", moveEvent);
        };
        divDrag.addEventListener("touchstart", startEvent);
        img.addEventListener("touchstart", startEvent);
		
        taskbarThemeObject = {name: 'taskbarMobile', elements: [divDrag]};
        element.style.background = '#111111';
        element.style.border = '0px';
    } 
	else
    {
        element.style.height = 'auto';
        element.style.paddingLeft = '12px';
        taskbarThemeObject = {name: 'taskbar', elements: [element]};
    }
    element.style.borderTop = '1px solid #aa00ff';
    SelectHelper.makeUnselectable(element);
    Themes.register({components: [taskbarThemeObject],callback: function (theme) {}}, undefined);
	document.body.appendChild(element);
	
	Windows.addEventListener(Windows.EventNames.WINDOW_CREATED, onWindowCreated);
	Windows.addEventListener(Windows.EventNames.WINDOW_DESTROYED, onWindowDestroyed);
	
	function onWindowCreated(e){
		var task = new Task(e.window);
		element.appendChild(task.element);
	}
	function onWindowDestroyed(e){
		var task = mapWindowToTask.get(e.window);
		if(task)
			task.dispose();
	}
    function Task(window)
    {
		console.log(window);
        var self = this;
        this.window = window;
		mapWindowToTask.put(window,this);
        if (isMobile)
            var height = Window.divDragHeightTaskBarPx;
        else
            var height = 25;
        var element = document.createElement('div');
		this.element = element;
        var img = document.createElement('img');
        element.style.position = 'relative';
        element.style.cursor = 'pointer';
        element.style.float = 'left';
        element.style.height = String(height) + 'px';
        element.style.width = 'auto';
        element.style.minWidth = String(height) + 'px';
        element.style.textAlign = 'center';
        element.style.marginRight = '6px';
        element.style.padding = '6px';
        img.style.height = '100%';
        img.src = window.getIcon();
        var tooltip = new Tooltip(window.getTooltip());
        styleFromObject(element, window.getTaskBarStyle());
        element.appendChild(img);
		
        new HoverAndClick(element, function (e) {
            styleFromObject(element, window.getTaskBarHoverStyle());
            var position = getAbsolute(element);
            tooltip.showAfterDelay(position.left, position.top);
        }, function () {
            tooltip.hide();
        }, clicked);
		window.addEventListener(Windows.EventNames.MINIMIZED, onWindowMinimized);
		window.addEventListener(Windows.EventNames.FOCUSSED, onWindowFocussed);
		window.addEventListener(Windows.EventNames.CLOSED, onWindowClosed);
        tasks.push(this);
		this.active=active;
		this.inactive=inactive;
        var timerFlash;
        var flashing = false;
		var flashCount=0;
        this.flash = function ()
        {
			if(!timerFlash){
				var styleInitial = self.element.style.cssText;
				timerFlash = new Timer(function () {
					if (flashing) {
						self.element.style.cssText = styleInitial;
						flashing = false;
					} else {
						self.element.style.backgroundColor = '#ccff00';
						flashing = true;
						if(flashCount>=6){
							timer.stop();
						}
					}
					flashCount++;
				}, 300, 6);
			}
			else {flashCount=0; timerFlash.reset();}
        };
        this.attention = function ()
        {
            if (Windows.getActive() != self.obj)
            {
                styleFromObject(self.element, attentionStyle);
            }
        };
		var disposed = false;
		this.dispose=function(){
			if(!disposed){
				disposed = true;
				delete mapWindowToTask.get(window);
				window.removeEventListener(Windows.EventNames.MINIMIZED, onWindowMinimized);
				window.removeEventListener(Windows.EventNames.FOCUSSED, onWindowFocussed);
				window.removeEventListener(Windows.EventNames.CLOSED, onWindowClosed);
				element.parentNode.removeChild(element);
				setActiveTask();
			}
		};
		function clicked(){
			console.log('clicked');
            if (selfTaskBar.vanish)
                selfTaskBar.vanish();
			var state = window.getState();
            if (Windows.getActive() == window)//if window is not active always unminimize it.
            {
				if(!state.minimized){
					window.minimize();
				}
				else{
					window.unminimize();
					setActiveTask(self);
				}
            }
			else{
				if(state.minimized)
				{
					window.unminimize();
					setActiveTask(self);
				}
				else{
					window.focus();
				}
            } 
		}
		function active(){
            styleFromObject(element, activeStyle);
		}
		function inactive(){
            styleFromObject(element, style);
		};
		function onWindowMinimized(){
			setActiveTask();
		}
		function onWindowMaximized(){
			
		}
		function onWindowFocussed(){
			setActiveTask(self);
		}
		function onWindowClosed(){
			self.dispose();
		}
    }
    function setActiveTask(task)
    {
			console.log(Windows.getActive());
		if(!task){
			var activeWindow = Windows.getActive();
			console.log(activeWindow);
			if(activeWindow&&!activeWindow.getState().minimized){
				task = mapWindowToTask.get(activeWindow);
			}
		}
		for (var i = 0, t; t= tasks[i]; i++)
		{
			if (t == task)
			{
				t.active();
			} 
			else
			{
				t.inactive();
				//styleFromObject(t.div, t.obj.taskBarInformation.style);
			}
		}
		
    }

})();
