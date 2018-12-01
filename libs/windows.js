
var Windows = new (function () {
    var self = this;
    var instances = [];
	var EventNames = {MAXIMIZED:'maximized', MINIMIZED:'minimized', FOCUSSED:'focussed', UNMINIMIZED:'unminimized', UNMAXIMIZED:'unmaximized', MOVED:'moved', CLOSED:'closed', WINDOW_CREATED:'windowcreated', WINDOW_DESTROYED:'windowdestroyed'};
	this.EventNames = EventNames;
	var zIndexOffset=100;
	var defaults = {
		minWidth:100,
		minHeight:100,
		maxWidth:1000,
		maxHeight:1000,
		minXPerc:0,
		minYPx:0,
		maxXPerc:100,
		maxYPx:10000,
		Resizer:true,
		dragable:true,
		closeable:true,
		minimizable:true,
		maximizable:true,
		minimizeOnClose:false
		
	};
	var defaultsOptional={};
    this.currentBounds = {minYPx: 0, maxYPx: 1200, minXPerc: 0, maxXPerc: 100};
	var frame ={left:0, top:0, right:0, bottom:0};
	EventEnabledBuilder(this);
	var count=1;
	this.Generic=function(params){
		this.count=count++;
		var self = this;
		var internal ={};
		var handle={public:this, internal:internal};
		for(var i in defaults)
		{
			var actual = params[i];
			if(actual==undefined)
				params[i]=defaults[i];
		}
		
		var previousSizes;
		var maximizedSizes;
		var cancelBringToFront;
		
		var name = params.name?params.name:'default';
		var tooltipMessage=params.tooltipMessage;
		var iconPath = params.iconPath;
		var minWidth = params.minWidth;
		var maxWidth = params.maxWidth;
		var minHeight = params.minHeight;
		var maxHeight =params.maxHeight;
		var defaultWidth = params.defaultWidth;
		var defaultHeight = params.defaultHeight;
		var defaultX = params.defaultX;
		var defaultY = params.defaultY;
		var minimized = params.minimized;
		var maximized = params.maximized;
		var minimizable= params.minimizable; 
		var maximizable = params.maximizable;
		var closeable = params.closeable;
		var minimizeOnClose = params.minimizeOnClose;
		var resizable = params.resizable;
		var dragable = params.dragable;
		var minXPerc = params.minXPerc;
		var maxXPerc = params.maxXPerc;
		var maxYPx = params.maxYPx;
		var minYPx = params.minYPx;
		var zIndexOffset = params.zIndexOffset;
		var saveName = params.saveName? params.saveName:name;
		EventEnabledBuilder(this);
		
		var settings = new Settings(saveName, function () {
			this.set("position");
			this.set("size");
			this.set("zIndex");
		});
        instances.push(handle);
		
		var timerFlash;
		var flashing = false;
		var flashCount=0;
		this.flash = function ()
		{
			var flashing = false;
			flashCount=0;
			if(!timerFlash)
				timerFlash = new Timer(function () {
					if (flashing) {
						styleFromObject(divInner, Themes.theme.components.frame);
						if(flashCount>=6)
							timerFlash.stop();
						flashing = false;
					} else {
						styleFromObject(divInner, Themes.theme.components.frameFlashing);
						flashing = true;
					}
					flashCount++;
				}, 50, -1);
			else{
				timerFlash.reset();
				flashCount=0;
			}
		};
		
		this.setName = function(name){
			setText(divName, name);
		};
		this.getIcon=function(){
			return iconPath;
		};
		this.getTooltip = function(){
			return tooltipMessage;
		};
		this.getTaskBarStyle=function(){
			return {backgroundColor: 'transparent'};
		};
		this.getTaskBarHoverStyle=function(){
			return{backgroundColor: 'rgba(0,255,255, 0.5)'};
		};
		this.getTaskBarActiveStyle=function(){
			return 	{backgroundColor: 'rgba(0, 128, 255, 0.5)'}; 
		};
		this.getTaskBarAttentionStyle=function(){
			return {backgroundColor: 'rgba(255,80,80,0.5)'};
		};
	//add code begins here for now
	

		handle.internal.setZIndex=function(zIndex){
			element.style.zIndex=String(zIndex);
			settings.set("zIndex", zIndex);
			dispatchZIndexChangedEvent();
		};
		
		this.getState=function(){
			return {maximized:maximized, minimized:minimized};
		};
		this.maximize = maximize;
		this.unmaximize = unmaximize;
		this.minimize = minimize;
		this.unminimize=unminimize;
		this.close = close;
		this.bringToFront = bringToFront;
		
		this.toggleMaximize = toggleMaximize;
		
		internal.screenResized=function(obj) {
			if (maximized) {
				setWindowSizePositionMaximized();
			}
		}
		internal.focus=focus;
		
		this.focus = focus;
		
		this.getMinimizable=function(){
			return minimizable;
		};
	
		var element = document.createElement('div');
		this.element = element
		element.classList.add('window-generic');
		var divInner = document.createElement('div');
		this.divInner = divInner;
		divInner.classList.add('inner');
		var divTab = document.createElement('div');
		this.divTab = divTab;
		divTab.classList.add('tab');
		var divMain = document.createElement('div');
		this.divMain = divMain;
		divMain.classList.add('main');
		var divName = document.createElement('div');
		divName.classList.add('name');
		var buttonClose;
		var buttonMinimize;
		var buttonMaximize;
		
		element.style.position = "absolute";
		
		
		verticallyCenter(divName);
		setText(divName, name);
		
		
		element.appendChild(divInner);
		divInner.appendChild(divTab);
		divTab.appendChild(divName);
		divInner.appendChild(divMain);
		document.documentElement.appendChild(element);
		document.documentElement.classList.add('web-windows');
		SelectHelper.makeUnselectable(element);
		
        document.body.appendChild(element);
        element.addEventListener("mousedown", clickedOnMe);
		initializePadding();
        if (!isMobile)
        {
            if (Resizer)
            {
                self.resizer = new Resizer(element, divInner, minWidth, minHeight, maxWidth, maxHeight, self.currentBounds, resized, dispatchResizedInstantaneousEvent);
            }
            if (dragable)
            {
                self.drag = new Drag(element, divTab, minXPerc, maxXPerc, minYPx, maxYPx, dragged, dragStarted);
            }
            if (closeable||minimizeOnClose)
            {
				buttonClose = new CloseButton(function () {
					if (minimizeOnClose)
					{
						minimize();
					}
					else
					{
						close();
					}
				});
				divTab.appendChild(buttonClose.element);
			}
            if (maximizable)
            {
                buttonMaximize = new MaximizeButton(toggleMaximize);
                divTab.appendChild(buttonMaximize.element);
            }
            if (minimizable)
            {
                buttonMinimize = new MinimizeButton(minimize);
                divTab.appendChild(buttonMinimize.element);
            }
        }
		
		var startPosition = settings.get("position");
		if (startPosition)
		{
			element.style.left = String(startPosition[0]) + 'px';
			element.style.top = String(startPosition[1]) + 'px';
		} else
		{
			element.style.left = String(defaultX) + 'px';
			element.style.top = String(defaultY) + 'px';
		}

		var startSize = settings.get("size");
		if (startSize)
		{
			if (startSize[0] < minWidth)
				startSize[0] = minWidth;
			if (startSize[1] < minHeight)
				startSize[1] = minHeight;
			element.style.width = String(startSize[0]) + 'px';
			element.style.height = String(startSize[1]) + 'px';
		} else
		{
			element.style.width = String(defaultWidth) + 'px';
			element.style.height = String(defaultHeight) + 'px';
		}

		var startZIndex = settings.get("zIndex");
		if (startZIndex)
		{
			element.style.zIndex = String(startZIndex);
		}
		element.appendChild(divInner);
		
        if(!minimized)self.unminimize();
		if (bringToFront != false)self.bringToFront();
		
		var themesObjectWindow = style(element, divInner, divTab);
		var themesObject = {components: [
				{name: 'body', elements: [divMain]},
				{name: 'text', elements: [divName]}
			],
			callback: function (theme) {

			}
		};
		Themes.register(themesObject, undefined);
		dispatchWindowCreatedEvent(self);
		
		function show()
		{
			element.style.display = 'inline';
		}
		function hide()
		{
			element.style.display = 'none';
		}
		function setWindowSizePositionMaximized(){
			var p = Resizer.padding * 2;
			setWindowSizePosition({
				width:document.documentElement.clientWidth-((frame.left?frame.left:0)+(frame.right?frame.right:0)), 
				height:document.documentElement.clientHeight - (p + (frame.top?frame.top:0)+(frame.left?frame.left:0)),
				top:(frame.top?frame.top:0)-Resizer.padding,
				left:(frame.left?frame.left:0)-Resizer.padding
			});
		}
		function clickedOnMe(){
            if(!cancelBringToFront)
                bringToFront();
            cancelBringToFront = false;
			dispatchFocussedEvent();
        }
		function initializePadding(){ 
			var padding=!isMobile?3:0;
			var paddingString = String(padding) + 'px';
			element.style.padding = paddingString;
			divInner.style.position = 'absolute';
			divInner.style.left = paddingString;
			divInner.style.top = paddingString;
			divInner.style.right = paddingString;
			divInner.style.bottom = paddingString;
		}
		function close()
		{
			instances.splice(instances.indexOf(handle), 1);
			document.body.removeChild(element);
			if (buttonClose)
			{
				buttonClose.close();
			}
			if (buttonMinimize)
			{
				buttonMinimize.close();
			}
			if (buttonMaximize)
			{
				buttonMaximize.close();
			}
			Themes.remove(themesObject);
			Themes.remove(themesObjectWindow);
			dispatchClosedEvent();
			dispatchWindowDestroyedEvent();
		}
		function resized(){
			console.log('resized');
			if(maximized){
				if(!maximizedSizes.equals(getSizes())){
					maximized=false;
				}
			}
			settings.set("position", [element.offsetLeft, element.offsetTop]);
			settings.set("size", [element.offsetWidth, element.offsetHeight]);
			dispatchResizedEvent();
		}
		function minimize() {
			if(minimized) return;
			hide();
			sendToBack();
			minimized=true;
			dispatchMinimizedEvent();
		}
		function unminimize(){
			if(!minimized)
				return;
			show();
			minimized=false;
			dispatchUnminimizedEvent();
			bringToFront();
		}
		function maximize()
		{
			if(maximized)return;
			unminimize();
			previousSizes = getSizes();
			setWindowSizePositionMaximized();
			maximizedSizes = getSizes();
			maximized = true;
			dispatchMaximizedEvent();
			bringToFront();
		}
		function unmaximize(mouseDragPosition)
		{
			if(!maximized)return;
			if (previousSizes)
			{
				if (!mouseDragPosition)
					setWindowSizePosition({
						width:previousSizes.width,
						height:previousSizes.height,
						top:previousSizes.top,
						left:previousSizes.left
					});
				else {
					var b = mouseDragPosition.left / document.documentElement.clientWidth;
					var leftOffset = (b * previousSizes.width);
					var l = mouseDragPosition.left - leftOffset;
					setWindowSizePosition({
						width:previousSizes.width, 
						height:previousSizes.height,
					left:l
					});
				}
			}
			maximized = false;
		}
		function toggleMaximize()
		{
			if (!maximized)
			{
				maximize();
			}
			else
			{
				unmaximize();
			}
		}
		function bringToFront()
		{
			instances.push(instances.splice(instances.indexOf(handle), 1)[0]);
			updateZIndices();
		};
		function sendToBack(){
			console.log('sent to back');
			instances.splice(0, 0, instances.splice(instances.indexOf(handle), 1)[0]);
			updateZIndices();
		}
		function focus(){
			bringToFront();
			dispatchFocussedEvent();
		}
		function dragged(){
			settings.set("position", [element.offsetLeft, element.offsetTop]);
			dispatchMovedEvent();
			dispatchDraggedEvent();
		}
		function dragStarted(){
			if(maximized)
				unmaximize(self, {left: e.screenX});
			dispatchUnmaximizedEvent();
		}
		function getSizes()
		{
			var p = Resizer.padding * 2;
			return new (function(){
					var self = this;
					this.width=element.offsetWidth - p; 
					this.height= element.offsetHeight - p; 
					this.top= element.offsetTop;
					this.left= element.offsetLeft;
					this.equals=function(s){
						return self.width==s.width&&self.height==s.height&&self.top==s.top&&self.left==s.left;
					};
			})();
		}

		function setWindowSizePosition(params)
		{
			element.style.height = String(params.height) + 'px';
			element.style.width = String(params.width) + 'px';
			if (top)
				element.style.top = String(params.top) + 'px';
			if (params.left)
				element.style.left = String(params.left) + 'px';
		}
		function dispatchResizedEvent(){
			self.dispatchEvent({type:EventNames.RESIZED});
		}
		function dispatchResizedInstantaneousEvent(){
			self.dispatchEvent({type:EventNames.RESIZED_INSTANTANEOUS});
		}
		function dispatchMaximizedEvent(){
			self.dispatchEvent({type:EventNames.MAXIMIZED});
		}
		function dispatchMinimizedEvent(){
			self.dispatchEvent({type:EventNames.MINIMIZED});
		}
		function dispatchUnminimizedEvent(){
			self.dispatchEvent({type:EventNames.UNMINIMIZED});
		}
		function dispatchUnmaximizedEvent(){
			self.dispatchEvent({type:EventNames.UNMAXIMIZED});
		}
		function dispatchMovedEvent(){
			self.dispatchEvent({type:EventNames.MOVED});
		}
		function dispatchClosedEvent(){
			self.dispatchEvent({type:EventNames.CLOSED});
		}
		function dispatchFocussedEvent(){
			self.dispatchEvent({type:EventNames.FOCUSSED});
		}
		function dispatchDraggedEvent(){
			self.dispatchEvent({type:EventNames.DRAGGED});
		}
		function dispatchZIndexChangedEvent(){
			self.dispatchEvent({type:EventNames.Z_INDEX_CHANGED});
		}
	};
	
	this.setFrame=function(frameIn){
		//top left bottom right
		frame = frameIn;
	};
    this.getActive = function ()
    {
		return instances.length<1?null:instances[instances.length-1].public;
    };
    this.getStartPosition = function ()
    {
        var diag;
        while (true)
        {
            diag = 100 * Math.random() | 0;
            if (!self.previousDiag)
            {
                break;
            }
            else
            {
                if (Math.abs(self.previousDiag - diag) > 19)
                {
                    break;
                }
            }
        }
        var top = 0;
        var left = 260;
        self.previousDiag = diag;
        return [left + diag, top + diag];
    };
    window.addEventListener("resize", function () {
        for (var i = 0; i < instances.length; i++)
        {
            instances[i].internal.screenResized();
        }
    }, false);
	
    this.divDragHeightTaskBarPx = document.documentElement.clientHeight / 12;
    function stopEventPropogation(e)
    {
        if (!e)
            e = window.event;

        //IE8 and Lower
        e.cancelBubble = true;
        //IE9 & Other Browsers
        if (e.stopPropagation) {
            e.stopPropagation();
        }
    }
	function updateZIndices(){
		var zIndex = zIndexOffset;
		for (var i = 0; i < instances.length; i++)
		{
			instances[i].internal.setZIndex(zIndex);
			zIndex++;//xxx not right and need to wrap window and internal object in object inside instances.
		}
	}
    function isWindow(obj)
    {
		for(var i=0; i<instances.length; i++){
			var instance = instances[i];
			if(instance.public==obj)
				return true;
		}
		return false;
    }
	/*
    this.getParentWindow = function (element)
	
    {
        while (true)
        {
            if (element.parentElement == document.documentElement)
            {
                return document.documentElement;
            }
            else
            {
                if (isWindow(element))
                {
                    return element;
                }
            }
            element = element.parentElement;
        }
    };*///should they even be doing this. It seems a little incorrect to me.
    function focusFrontWindow(){
        instances[instances.length-1].internal.focus();
    }
	
    function style(div, divInner, divTab)
    {
        var frameThemeObject;
        var frameBorderThemeObject;
        if (!isMobile)
        {
            frameThemeObject = {name: 'frame', elements: [divInner]};
            frameBorderThemeObject = {name: 'frameBorder', elements: [divInner]};
        }
        else
        {
            div.style.height = 'calc(100% - ' + String(self.divDragHeightTaskBarPx) + 'px)';
            frameThemeObject = {name: 'frameMobile', elements: [divInner]};
            frameBorderThemeObject = {name: 'frameBorderMobile', elements: [divInner]};
        }
        var themesObject = {components: [
                frameThemeObject,
                frameBorderThemeObject
            ],
            callback: function (theme) {

            }
        };
        Themes.register(themesObject, undefined);
    }
	function CloseButton(callback)
    {
        var button = new Button(callback, 'images/close_white.png', 'images/close_red.png');
        this.element = button.element;
        var themesObject = {components: [
                {name: 'closeImage', elements: [button.img]}
            ],
            callback: function (theme) {

            }
        };
        Themes.register(themesObject, undefined);
        this.close = function ()
        {
            Themes.remove(themesObject);
        };
    }
    function MinimizeButton(callback)
    {
        var button = new Button(callback, 'images/minimize_white.png', 'images/minimize_red.png');
        this.element = button.element;
        var themesObject = {components: [
                {name: 'minimizeImage', elements: [button.img]}
            ],
            callback: function (theme) {

            }
        };
        Themes.register(themesObject, undefined);
        this.close = function ()
        {
            Themes.remove(themesObject);
        };
    }
    function MaximizeButton(callback)
    {
        var button = new Button(callback, 'images/maximize_white.png', 'images/maximize_red.png');
        this.element = button.element;
        var themesObject = {components: [
                {name: 'maximizeImage', elements: [button.img]}
            ],
            callback: function (theme) {

            }
        };
        Themes.register(themesObject, undefined);
        this.close = function ()
        {
            Themes.remove(themesObject);
        };
    }
    function Button(callback, imageSource, imageSourceHover)
    {
		EventEnabledBuilder(this); 
        var self = this;
        var element = document.createElement('button');
		this.element = element;
		element.classList.add('button');
        var img = document.createElement('img');
        img.src = imageSource;
        element.appendChild(img);
        var previousImage;
        new Hover(element, function () {
            previousImage = img.src;
            img.src = imageSourceHover;
        }, function () {
            img.src = previousImage;

        });
        element.addEventListener("mousedown", function ()
        {
            if (window.Drag)
                Drag.cancel = true;
        });
        element.addEventListener("click", function ()
        {
            callback();
        });
    }
	function dispatchWindowCreatedEvent(window){
		self.dispatchEvent({type:EventNames.WINDOW_CREATED, window:window});
	}
	function dispatchWindowDestroyedEvent(window){
		self.dispatchEvent({type:EventNames.WINDOW_DESTROYED, window:window});
	}
})();
