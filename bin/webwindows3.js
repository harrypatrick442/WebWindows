function EventEnabledBuilder(obj)
{

	obj.addEventListener= function ( type, listener ) {

		if ( this._listeners == undefined )
                this._listeners = {};
		var listeners = this._listeners;

		if ( listeners[ type ] == undefined ) {
			listeners[ type ] = [];
		}

		if ( listeners[ type ].indexOf( listener ) == - 1 ) {

			listeners[ type ].push( listener );

		}
	};

	obj.hasEventListener= function ( type, listener ) {

		if ( this._listeners == undefined ) return false;

		var listeners = this._listeners;

		if ( listeners[ type ] !== undefined && listeners[ type ].indexOf( listener ) !== - 1 ) {

			return true;

		}

		return false;

	};

	obj.removeEventListener= function ( type, listener ) {

		if ( this._listeners == undefined ) return;

		var listeners = this._listeners;
		var listenerArray = listeners[ type ];

		if ( listenerArray !== undefined ) {

			var index = listenerArray.indexOf( listener );

			if ( index !== - 1 ) {

				listenerArray.splice( index, 1 );

			}

		}

	};

	obj.dispatchEvent= function ( event ) {
		if ( this._listeners == undefined )
                    return;
		var listeners = this._listeners;
		var listenerArray = listeners[ event.type ];
                
		if ( listenerArray !== undefined ) {

			event.target = this;
			var array = [], i = 0;
			var length = listenerArray.length;

			for ( i = 0; i < length; i ++ ) {
				array[ i ] = listenerArray[ i ];
			}
			for ( i = 0; i < length; i ++ ) {
				array[ i ].call( this, event );

			}

		}

	};
}

function Settings(settingsName, callbackReset)
{
    this.get = function (name)
    {
        try
        {
        //return JSON.parse(getCookie(settingsName + '_' + name));
        return JSON.parse(localStorage.getItem(settingsName + '_' + name));
    }
    catch(ex)
    {
        return undefined;
    }
    };
    this.set = function (name, obj)
    {
        try
        {
        //setCookie(settingsName + '_' + name, JSON.stringify(obj));
        localStorage.setItem(settingsName + '_' + name, JSON.stringify(obj));
    }
   catch(ex)
   {
       console.log(ex);
   }
    };
    this.reset=callbackReset;
    Settings.instances.push(this);
}
Settings.getAll=function(){
    return localStorage;
};
Settings.addRange=function(obj)
{
    for(var key in obj)
    {
        localStorage.setItem(key, JSON.stringify(obj[key]));
    }
};
Settings.instances=[];
Settings.resetAll = function ()
{
    
};
console.log('settings is done');


function verticallyCenter(element)
{
    element.style.position = 'relative';
    element.style.top = '50%';
    element.style.transform = 'translateY(-50%)';
    element.style.msTransform = 'translateY(-50%)';
    element.style.webkitTransform = 'translateY(-50%)';
    element.style.oTransform = 'translateY(-50%)';
}

function setText(element, text){
element.innerHTML=text;
}

var isMobile = false; //initiate as false
// device detection
if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent)
        || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0, 4)))
 isMobile = true;

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
function Timer(funct, delayMs, times, useWorkerIfAvailable, postponeStart)
{
    var self = this;
    var timesCount = 0;
    if (times == undefined)
    {
        times = -1;
    }
    if (delayMs == undefined)
    {
        delayMs = 10;
    }
    function tick()
    {
        if (times >= 0)
        {
            timesCount++;
            if (timesCount >= times)
            {
                self.stop();
            }
        }
        try
        {
            funct();
        } catch (ex)
        {
            console.log(ex);
        }
    }
    ;
    if (Timer.useWorker && (useWorkerIfAvailable == undefined || useWorkerIfAvailable))
    {


        var worker;
        /*try
        {

            worker = new Worker(window.thePageUrl + 'scripts/timer_worker.js');
        } catch (ex) {
          *///  console.log("(" + TimerWorker.toString() + ")();");
            worker = new Worker(URL.createObjectURL(new Blob(["(" + TimerWorker.toString() + ")();"], {type: 'text/javascript'})));
        //}
        worker.onmessage = function(e) {
            var data = e.data;
            switch (data.cmd)
            {
                case "tick":
                    tick();
                    break;
            }
        };
        this.stop = function()
        {
            worker.postMessage({'cmd': 'stop'});
        };
        this.reset = function()
        {
            timesCount = 0;
            worker.postMessage({'cmd': 'reset'});
        };
        worker.postMessage({'cmd': 'interval', 'delayMs': delayMs});
        if (!postponeStart)
            worker.postMessage({'cmd': 'start'}); // Start the worker.
    } else
    {

        var interval;
        function setInterval()
        {
            interval = window.setInterval(tick, delayMs);
        }
        function cancelInterval()
        {
            if (interval)
            {
                clearInterval(interval);
            }
        }
        this.stop = function()
        {
            cancelInterval();
        };
        this.reset = function()
        {
            timesCount = 0;
            cancelInterval();
            setInterval();
        };
        if (!postponeStart)
            setInterval();
    }
    this.setDelay = function(delay)
    {
        self.stop();
        delayMs = delay;
        self.reset();
    };
}
if (window.Worker && window.Blob)
{
    Timer.useWorker = true;
    var blob = new Blob();
    Timer.blobUrl = window.URL.createObjectURL(blob);

} else
{
    Timer.useWorker = false;
}
function TimerWorker()
{
    var self = this;
    var interval;
    function tick()
    {
        postMessage({'cmd': 'tick'});
    }
    function stop()
    {
        cancelInterval();
    }
    function _setInterval()
    {
        interval = setInterval(tick, String(self.delayMs));
    }
    function reset()
    {
        if (interval)
            cancelInterval();
        _setInterval();
    }
    ;
    function cancelInterval()
    {
        if (interval)
        {
            clearInterval(interval);
        }
    }
    function start()
    {
        _setInterval();
    }
    self.onmessage = function(e) {
        switch (e.data.cmd) {
            case 'reset':
                reset();
                break;
            case 'stop':
                stop();
                break;
            case 'start':
                start();
                break;
            case 'interval':
                self.delayMs = e.data.delayMs;
                break;
        }
    };
}

function Resizable(div, divInner, minWidth, minHeight, maxWidth, maxHeight, bounds, callback, callbackInstantaneous) {
    var divLeft = document.createElement('div');
    var divTop = document.createElement('div');
    var divRight = document.createElement('div');
    var divBottom = document.createElement('div');
    var divLeftTop = document.createElement('div');
    var divLeftBottom = document.createElement('div');
    var divRightTop = document.createElement('div');
    var divRightBottom = document.createElement('div');
    divLeft.style = 'position:absolute;z-index:100;width:6px;height:100%;left:0px;top:0px;cursor:e-resize;';
    divRight.style = 'position:absolute;z-index:100;width:6px;height:100%;right:0px;top:0px;cursor:e-resize;';
    divTop.style = 'position:absolute;z-index:100;width:100%;height:6px;top:0px;left:0px;cursor:n-resize;';
    divBottom.style = 'position:absolute;z-index:100;width:100%;height:6px;bottom:0px;left:0px;cursor:n-resize;';
   
    function setCornerGeneric(div)
    {
        div.style.position = 'absolute';
        div.style.width = '10px';
        div.style.height = '10px';
        div.style.zIndex = '102';
    }
    setCornerGeneric(divLeftBottom);
    setCornerGeneric(divLeftTop);
    setCornerGeneric(divRightTop);
    setCornerGeneric(divRightBottom);
    divLeftBottom.style.bottom = '0px';
    divLeftBottom.style.left = '0px';
    divLeftTop.style.top = '0px';
    divLeftTop.style.left = '0px';
    divRightBottom.style.bottom = '0px';
    divRightBottom.style.right = '0px';
    divRightTop.style.top = '0px';
    divRightTop.style.right = '0px';
    divLeftBottom.style.cursor = 'sw-resize';
    divRightTop.style.cursor = 'sw-resize';
    divLeftTop.style.cursor = 'nw-resize';
    divRightBottom.style.cursor = 'nw-resize';
    if(minWidth<maxWidth)
    {
    div.appendChild(divLeft);
    div.appendChild(divRight);
    if(minHeight<maxHeight)
    {
    div.appendChild(divLeftTop);
    div.appendChild(divLeftBottom);
    div.appendChild(divRightTop);
    div.appendChild(divRightBottom);
    }
    }
    if(minHeight<maxHeight)
    {
    div.appendChild(divTop);
    div.appendChild(divBottom);
    }
    if(minWidth<maxWidth&&minHeight<maxHeight)
    {
    div.appendChild(divLeftTop);
    div.appendChild(divLeftBottom);
    div.appendChild(divRightTop);
    div.appendChild(divRightBottom);
    }
    var state = 'up';
    var startOffset = [];
    var timer;
    var moveEvent;
    var upEvent;
    this.setDimensions = function (array) {
        div.style.width = String(array[0]) + 'px';
        div.style.height = String(array[1]) + 'px';
    };
    this.getDimensions = function () {
        var array = [];
        array[0] = div.offsetWidth;
        array[1] = div.offsetHeight;
        return array;
    };
    function onMouseDown()
    {
        if (!isMobile)
        {
            moveEvent = function (e) {
                if (!e)
                    var e = window.event;
                doResize(e);
            };
            document.documentElement.addEventListener("mousemove", moveEvent);
            upEvent = function (e)
            {
                if (!e)
                    var e = window.event;

                state = 'up';
                document.documentElement.removeEventListener("mousemove", moveEvent);
                document.documentElement.removeEventListener("mouseup", upEvent);
            };
            document.documentElement.addEventListener("mouseup", upEvent);
        }
        else
        {
            moveEvent = function (e) {
                if (!e)
                    var e = window.event;
                doResize(e);
            };
            document.documentElement.addEventListener("touchmove", moveEvent);
            upEvent = function (e)
            {
                if (!e)
                    var e = window.event;

                state = 'up';
                document.documentElement.removeEventListener("touchmove", moveEvent);
                document.documentElement.removeEventListener("touchend", upEvent);
            };
            document.documentElement.addEventListener("touchend", upEvent);
        }
        timer = new Timer(function () {
            if (callback != undefined) {
            try
            {
                callback();
            }
            catch(ex)
            {
                console.log(ex);
            }
            }
        }, 1000, 1);
    }
    if (!isMobile)
    {
        divLeft.onmousedown = function (e) {
            state = 'down-left';
            startOffset[0] = div.offsetWidth + e.pageX - (2 * Resizable.padding);
            startOffset[1] = div.offsetLeft - e.pageX;
            onMouseDown();
        };
        divRight.onmousedown = function (e) {
            state = 'down-right';
            startOffset[0] = div.offsetWidth - (e.pageX + (2 * Resizable.padding));
            onMouseDown();
        };
        divTop.onmousedown = function (e) {
            state = 'down-top';
            startOffset[0] = div.offsetHeight + e.pageY - (2 * Resizable.padding);
            startOffset[1] = div.offsetTop - e.pageY;
            onMouseDown();
        };
        divBottom.onmousedown = function (e) {
            state = 'down-bottom';
            startOffset[0] = div.offsetHeight - (e.pageY + (2 * Resizable.padding));
            onMouseDown();
        };
        divLeftTop.onmousedown = function (e) {
            state = 'down-left-top';
            startOffset[0] = div.offsetWidth + e.pageX - (2 * Resizable.padding);
            startOffset[1] = div.offsetLeft - (e.pageX);
            startOffset[2] = div.offsetHeight + e.pageY - (2 * Resizable.padding);
            startOffset[3] = div.offsetTop - e.pageY;
            onMouseDown();
        };
        divLeftBottom.onmousedown = function (e) {
            state = 'down-left-bottom';
            startOffset[0] = div.offsetWidth + e.pageX - (2 * Resizable.padding);
            startOffset[1] = div.offsetLeft - (e.pageX);
            startOffset[2] = div.offsetHeight - (e.pageY + (2 * Resizable.padding));
            onMouseDown();
        };
        divRightTop.onmousedown = function (e) {
            state = 'down-right-top';
            startOffset[0] = div.offsetWidth - (e.pageX + (2 * Resizable.padding));
            startOffset[1] = div.offsetHeight + (e.pageY - (2 * Resizable.padding));
            startOffset[2] = div.offsetTop - e.pageY;
            onMouseDown();
        };
        divRightBottom.onmousedown = function (e) {
            state = 'down-right-bottom';
            startOffset[0] = div.offsetWidth - (e.pageX + (2 * Resizable.padding));
            startOffset[1] = div.offsetHeight - (e.pageY + (2 * Resizable.padding));
            onMouseDown();
        };
    }
    else
    {
        divLeft.touchstart = function (e) {
            state = 'down-left';
            startOffset[0] = div.offsetWidth + e.touches[0].pageX - (2 * Resizable.padding);
            startOffset[1] = div.offsetLeft - e.touches[0].pageX;
            onMouseDown();
        };
        divRight.touchstart = function (e) {
            state = 'down-right';
            startOffset[0] = div.offsetWidth - (e.touches[0].pageX + (2 * Resizable.padding));
            onMouseDown();
        };
        divTop.touchstart = function (e) {
            state = 'down-top';
            startOffset[0] = div.offsetHeight + e.touches[0].pageY - (2 * Resizable.padding);
            startOffset[1] = div.offsetTop - e.touches[0].pageY;
            onMouseDown();
        };
        divBottom.touchstart = function (e) {
            state = 'down-bottom';
            startOffset[0] = div.offsetHeight - (e.touches[0].pageY + (2 * Resizable.padding));
            onMouseDown();
        };
        divLeftTop.touchstart = function (e) {
            state = 'down-left-top';
            startOffset[0] = div.offsetWidth + e.touches[0].pageX - (2 * Resizable.padding);
            startOffset[1] = div.offsetLeft - (e.touches[0].pageX);
            startOffset[2] = div.offsetHeight + e.touches[0].pageY - (2 * Resizable.padding);
            startOffset[3] = div.offsetTop - e.touches[0].pageY;
            onMouseDown();
        };
        divLeftBottom.touchstart = function (e) {
            state = 'down-left-bottom';
            startOffset[0] = div.offsetWidth + e.touches[0].pageX - (2 * Resizable.padding);
            startOffset[1] = div.offsetLeft - (e.touches[0].pageX);
            startOffset[2] = div.offsetHeight - (e.touches[0].pageY + (2 * Resizable.padding));
            onMouseDown();
        };
        divRightTop.touchstart = function (e) {
            state = 'down-right-top';
            startOffset[0] = div.offsetWidth - (e.touches[0].pageX + (2 * Resizable.padding));
            startOffset[1] = div.offsetHeight + (e.touches[0].pageY - (2 * Resizable.padding));
            startOffset[2] = div.offsetTop - e.touches[0].pageY;
            onMouseDown();
        };
        divRightBottom.touchstart = function (e) {
            state = 'down-right-bottom';
            startOffset[0] = div.offsetWidth - (e.touches[0].pageX + (2 * Resizable.padding));
            startOffset[1] = div.offsetHeight - (e.touches[0].pageY + (2 * Resizable.padding));
            onMouseDown();
        };
    }
    function resizeLeft(x, y, a, b) {
        var width = a - x;
        var left = b + x;
        var leftPercent = 100 * (left / document.documentElement.offsetWidth);
        if (leftPercent < bounds.minXPercentage || width < minWidth || width > maxWidth)
        {
            return;
        }
        div.style.width = String(width) + 'px';
        div.style.left = String(left) + 'px';
    }
    function resizeRight(x, y, a) {
        var width = a + x;
        if (width < minWidth || width > maxWidth || 100 * ((width + div.offsetLeft) / document.documentElement.offsetWidth) > bounds.maxXPercentage) {
            return;
        }
        div.style.width = String(width) + 'px';
    }
    function resizeTop(x, y, a, b) {
        var height = a - y;
        var top = b + y;
        if (top < bounds.minYPx || height < minHeight || height > maxHeight) {
            return;
        }
        div.style.height = String(height) + 'px';
        div.style.top = String(top) + 'px';
    }
    function resizeBottom(x, y, a) {
        var height = a + y;
        if (height < minHeight || height > maxHeight || div.offsetTop + height > bounds.maxYPx) {
            return;
        }
        div.style.height = String(height) + 'px';
    }
    function doResize(e) {
        var x = e.pageX;
        var y = e.pageY;
        switch (state) {
            case "up":
                return;
            case "down-left":
                resizeLeft(x, y, startOffset[0], startOffset[1]);
                break;
            case "down-right":
                resizeRight(x, y, startOffset[0]);
                break;
            case "down-top":
                resizeTop(x, y, startOffset[0], startOffset[1]);
                break;
            case "down-bottom":
                resizeBottom(x, y, startOffset[0]);
                break;
            case "down-left-top":
                resizeLeft(x, y, startOffset[0], startOffset[1]);
                resizeTop(x, y, startOffset[2], startOffset[3]);
                break;
            case "down-left-bottom":
                resizeLeft(x, y, startOffset[0], startOffset[1]);
                resizeBottom(x, y, startOffset[2]);
                break;
            case "down-right-top":
                resizeRight(x, y, startOffset[0]);
                resizeTop(x, y, startOffset[1], startOffset[2]);
                break;
            case "down-right-bottom":
                resizeRight(x, y, startOffset[0]);
                resizeBottom(x, y, startOffset[1]);
                break;
        }
        timer.reset();
        if (callbackInstantaneous)
        {
            try
            {
                callbackInstantaneous();
            }
            catch(ex)
            {
                console.log(ex);
            }
        }
    }
    this.setBounds = function (boundsIn)//work in progress.
    {
        var previousBounds = bounds;
        bounds = boundsIn;
        if (previousBounds.minYpx < bounds.minYPx)
        {

        }
        if (previousBounds.maxYPx > bounds.maxYPx)
        {

        }
        if (previousBounds.minXPercent < bounds.minXPercentage)
        {

        }
        if (previousBounds.maxXPercent > bounds.maxXPercent)
        {

        }
    };
}
Resizable.padding = 3;



function EfficientMovingCycle(element)
{
    var self = this;
    var moveEvent;
    var upEvent;
    this.onmousedown = function () {
    };
    this.onmousemove = function () {
    };
    this.onmouseup = function () {
    };
    this.ontouchstart = function () {
    };
    this.ontouchmove = function () {
    };
    this.ontouchend = function () {
    };
    if (!isMobile)
    {
        element.addEventListener("mousedown", function (e) {
            if (!e)
                var e = window.event;
            try
            {
                if(self.onmousedown(e)==false)
                    return;
            }
            catch (ex)
            {
                console.log(ex);
            }
        if(moveEvent)
                document.documentElement.removeEventListener("mousemove", moveEvent);
            if(upEvent)
                document.documentElement.removeEventListener("mouseup", upEvent);
            moveEvent = function (e) {
                if (!e)
                    var e = window.event;
                try
                {
                    self.onmousemove(e);
                }
                catch (ex)
                {
                    console.log(ex);
                }
            };
            document.documentElement.addEventListener("mousemove", moveEvent);
            upEvent = function (e) {
                if (!e)
                    var e = window.event;
                try
                {
                    self.onmouseup(e);
                }
                catch (ex)
                {
                    console.log(ex);
                }
                document.documentElement.removeEventListener("mousemove", moveEvent);
                document.documentElement.removeEventListener("mouseup", upEvent);
            };
            document.documentElement.addEventListener("mouseup", upEvent);
        });
    }
    else
    {
        element.addEventListener("touchstart", function (e) {
            if (!e)
                var e = window.event;
            try
            {
                if(self.ontouchstart(e)==false)
                    return;
            }
            catch (ex)
            {
                console.log(ex);
            }
        if(moveEvent)
                document.documentElement.removeEventListener("mousemove", moveEvent);
            if(upEvent)
                document.documentElement.removeEventListener("mouseup", upEvent);
            moveEvent = function (e) {
                if (!e)
                    var e = window.event;
                try
                {
                    self.ontouchmove(e);
                }
                catch (ex)
                {
                    console.log(ex);
                }
                if (e.preventDefault)
                {
                    e.preventDefault();
                }
            };
            document.documentElement.addEventListener("touchmove", moveEvent);
            upEvent = function (e) {
                if (!e)
                    var e = window.event;
                try
                {
                    self.ontouchend(e);
                }
                catch (ex)
                {
                    console.log(ex);
                }
                document.documentElement.removeEventListener("touchmove", moveEvent);
                document.documentElement.removeEventListener("touchend", upEvent);
            };
            document.documentElement.addEventListener("touchend", upEvent);
            if (e.preventDefault)
            {
                e.preventDefault();
            }
        });
    } 
}

function Drag(element, handle, minX, maxX, minY, maxY, callback, callbackStarted) {
    var minXPercent;
    var maxXPercent;
    var self = this;
    if (minY == undefined) {
        minY = 0;
    }
    if (minX== undefined) {
        minX = 0;
    }
    if (maxY== undefined) {
        maxY = 2000;
    }
    if (maxX== undefined) {
        maxX = 100;
    }
    var state = 0;
    var start;
    var timer;
    this.setPosition = function (array) {
        self.drag(array[0], array[1]);
    };
    this.getPosition = function () {
        var array = [];
        array[0] = element.offsetLeft;
        array[1] = element.offsetTop;
        return array;
    };
    var efficientMovingCycle = new EfficientMovingCycle(handle);
    
    efficientMovingCycle.onmousedown = function (e) {
        onDown(e.pageX, e.pageY, e);
    };
    efficientMovingCycle.ontouchstart = function (e) {
        onDown(e.touches[0].pageX, e.touches[0].pageY, e);
    };
    //handle.addEventListener("touchstart", function(e){
    //    onDown(e.touches[0].pageX, e.touches[0].pageY);
    //});
    function onDown(x, y, e)
    {
        if (element.style.display === "none")
        {
            return;
        }
        if(!Drag.cancel)
            if(callbackStarted)callbackStarted(e);
        start = [element.offsetLeft - x, element.offsetTop - y];
        maxXPercent = maxX - ((100 * element.offsetWidth) / document.documentElement.clientWidth);
        minXPercent = minX;
        if (maxXPercent < 0) {
            maxXPercent = 0;
        }
        else {
            if (maxXPercent > 100) {
                maxXPercent = 100;
            }
        }
        timer = new Timer(function () { if (callback != undefined) { callback(); } }, 1000, 1);
        state = 1;
    }
    efficientMovingCycle.onmousemove = function (e) {
        onMove(e.pageX, e.pageY);
    };
    efficientMovingCycle.ontouchmove = function (e) {
        onMove(e.touches[0].pageX, e.touches[0].pageY);
    };
    function onMove(x, y)
    {
        console.log()
        if(!Drag.cancel)
        if (state == 1) {
            self.drag((start[0] + x), (start[1] + y));
            timer.reset();
        }
    }
    this.drag=function(x, y)
    {
            var left = 100 * x / document.documentElement.clientWidth;
            if (left < minXPercent) {
                left = minXPercent;
            }
            else {
                if (left > maxXPercent) {
                    left = maxXPercent;
                }
            }
            element.style.left = String(left) + '%';
            if (y < minY) {
                y = minY;
            }
            else {
                if (y+element.offsetHeight > maxY) {
                    y = maxY - element.offsetHeight;
                }
            }
            element.style.top = String(y) + 'px';
    };
    
      efficientMovingCycle.onmouseup=function(){  
          
          console.log('cleared');
        Drag.cancel=false;
          state = 0;
    };
    efficientMovingCycle.ontouchend = function (e) {         
        Drag.cancel=false;
        state=0;
    };
}


function styleFromObject(element, style)
{
    for (var i in style)
    {
        var done = false;
        if (i.length > 2)
        {
            if (i.substring(0, 3) == '../')
            {
                var a = i.substring(3, i.length);
                element[a] = style[i];
                done = true;
            }
        }
        if (!done)
            element.style[i] = style[i];
    }
}

var Themes={};
    Themes.themes = {
        Blue: {
            components: {
                frame: {'background-color': '#0099ff'},
                frameFlashing: {'background-color': '#ccff00'},
                frameBorder: {'border': '1px solid #66a3ff', '-webkit-box-shadow': 'none','-moz-box-shadow': 'none','box-shadow': 'none', 'border-radius': '5px'},
                text: {'color': '#000000', 'font-weight': 'bold', 'font-size': '14px', 'font-family':'Arial'},
                controls: {'background-color': '#ccb3ff'},
                feed: {'background-color': '#e6ffff'},
                body: {'background-color': '#555555'},
                background: {'background-image': 'url("images/background.png")'},
                taskbar: {'background-color': 'rgba(102,153,153, 0.5)', 'border-top': '1px solid rgba(102,153,153,0.8)'},
                taskbarMobile: {'background-color': '#0099ff', 'border-top': '0'},
                text_color: {'color': '#000000'},
                text_font: { 'font-weight': 'bold', 'font-family':'Arial'},
                frame1: {'background-color': '#e6e6ff'},
                body1: {'background-color': '#555555'},
                closeImage:{'../src':window.thePageUrl+'images/close_black.png'},
                minimizeImage:{'../src':window.thePageUrl+'images/minimize_black.png'},
                maximizeImage:{'../src':window.thePageUrl+'images/maximize_black.png'},
                frameMobile: {'background-color': '#0099ff'},
                frameBorderMobile: {'border': '0px solid #66a3ff', '-webkit-box-shadow': 'none','-moz-box-shadow': 'none','box-shadow': 'none', 'border-radius': '0px'},
                imgTaskbar:{'../src':window.thePageUrl+'images/black_menu.png'}
                
            }
        },
        'Insane pink': {
            components: {
                frame: {'background-color': '#ff0066'},
                frameFlashing: {'background-color': '#ccff00'},
                frameBorder: {'border': '1px solid #9933ff', '-webkit-box-shadow': 'none','-moz-box-shadow': 'none','box-shadow': 'none', 'border-radius': '5px'},
                text: {'color': '#000000', 'font-weight': 'bold', 'font-size': '14px', 'font-family':'Arial'},
                controls: {'background-color': '#df80ff'},
                feed: {'background-color': '#e6ccff'},
                body: {'background-color': '#800080'},
                background: {'background-image': 'url("images/star--background-neon.jpg")'},
                taskbar: {'background-color': 'rgba(0,255,188, 0.4)', 'border-top': '1px solid rgba(0,255,188, 0.6)'},
                taskbarMobile: {'background-color': '#ff0066', 'border-top': '0'},
                text_color: {'color': '#000000'},
                text_font: { 'font-weight': 'bold', 'font-family':'Arial'},
                frame1: {'background-color': '#e6e6ff'},
                body1: {'background-color': '#800080'},
                closeImage:{'../src':window.thePageUrl+'images/close_black.png'},
                minimizeImage:{'../src':window.thePageUrl+'images/minimize_black.png'},
                maximizeImage:{'../src':window.thePageUrl+'images/maximize_black.png'},
                frameMobile: {'background-color': '#ff0066'},
                frameBorderMobile: {'border': '0px solid #9933ff', '-webkit-box-shadow': 'none','-moz-box-shadow': 'none','box-shadow': 'none', 'border-radius': '0px'},
                imgTaskbar:{'../src':window.thePageUrl+'images/black_menu.png'}
               
            }
        },
        Orange: {
            components: {
                frame: {'background-color': '#F68735'},
                frameFlashing: {'background-color': '#ccff00'},
                frameBorder: {'border': '1px solid #999FAD', '-webkit-box-shadow': 'none','-moz-box-shadow': 'none','box-shadow': 'none', 'border-radius': '5px'},
                text: {'color': '#000000', 'font-weight': 'bold', 'font-size': '14px', 'font-family':'Arial'},
                controls: {'background-color': '#A8ACB8'},
                feed: {'background-color': '#DDDDDB'},
                body: {'background-color': '#3F547F'},
                background: {'background-image': 'url("images/background.png")'},
                taskbar: {'background-color': 'rgba(102,153,153, 0.5)', 'border-top': '1px solid rgba(102,153,153,0.8)'},
                taskbarMobile: {'background-color': '#F68735', 'border-top': '0'},
                text_color: {'color': '#000000', 'font-weight': 'lighter'},
                text_font: { 'font-weight': 'bold', 'font-family':'Arial'},
                frame1: {'background-color': '#e6e6ff'},
                body1: {'background-color': '#3F547F'},
                closeImage:{'../src':window.thePageUrl+'images/close_black.png'},
                minimizeImage:{'../src':window.thePageUrl+'images/minimize_black.png'},
                maximizeImage:{'../src':window.thePageUrl+'images/maximize_black.png'},
                frameMobile: {'background-color': '#F68735'},
                frameBorderMobile: {'border': '0px solid #999FAD', '-webkit-box-shadow': 'none','-moz-box-shadow': 'none','box-shadow': 'none', 'border-radius': '0px'},
                imgTaskbar:{'../src':window.thePageUrl+'images/black_menu.png'}
            }
        },
        Dark: {
            components: {
                frame: {'background-color': '#2C2B2B'},
                frameFlashing: {'background-color': '#ccff00'},
                text: {'color': '#ffffff', 'font-weight': 'lighter', 'font-size': '12px', 'font-family':'Arial'},
                frameBorder: {'border': '0px solid #8fc800', '-webkit-box-shadow': '0px 0px 6px 1px rgba(143,200,0,0.8)','-moz-box-shadow': '0px 0px 6px 1px rgba(143,200,0,0.8)','box-shadow': '0px 0px 6px 1px rgba(143,200,0,0.8)', 'border-radius': '3px'},
                controls: {'background-color': '#555555'},
                feed: {'background-color': '#aaaaaa'},
                body: {'background-color': '#201F1F'},
                background: {'background-image': 'url("images/nights-sky.jpg")'},
                taskbar: {'background-color': 'rgba(102,153,153, 0.5)','border-top': '1px solid rgba(102,153,153, 0.75)'},
                taskbarMobile: {'background-color': '#2C2B2B', 'border-top': '0'},
                text_color: {'color': '#ffffff'},
                text_font: { 'font-weight': 'lighter', 'font-family':'Arial'},
                frame1: {'background-color': '#201F1F'},
                body1: {'background-color': '#201F1F'},
                closeImage:{'../src':window.thePageUrl+'images/close_white.png'},
                minimizeImage:{'../src':window.thePageUrl+'images/minimize_white.png'},
                maximizeImage:{'../src':window.thePageUrl+'images/maximize_white.png'},
                frameMobile: {'background-color': '#2C2B2B'},
                frameBorderMobile: {'border': '0px solid #8fc800', '-webkit-box-shadow': 'none','-moz-box-shadow': 'none','box-shadow': 'none', 'border-radius': '0px'},
                imgTaskbar:{'../src':window.thePageUrl+'images/white_menu.png'}
               
        }
    },
        Nature: {
            components: {
                frame: {'background-color': '#394d00'},
                frameFlashing: {'background-color': '#ccff00'},
                text: {'color': '#ffffff', 'font-weight': 'lighter', 'font-size': '12px', 'font-family':'Arial'},
                frameBorder: {'border': '1px solid #998800', '-webkit-box-shadow': 'none','-moz-box-shadow': 'none','box-shadow': 'none', 'border-radius': '5px'},
                controls: {'background-color': '#555555'},
                feed: {'background-color': '#aaaaaa'},
                body: {'background-color': '#331200'},
                background: {'background-image': 'url("images/trees.jpg")'},
                taskbar: {'background-color': 'rgba(230,92,0, 0.55)','border-top': '1px solid rgba(230,92,0, 0.75)'},
                taskbarMobile: {'background-color': '#394d00', 'border-top': '0'},
                text_color: {'color': '#ffffff'},
                text_font: { 'font-weight': 'lighter', 'font-family':'Arial'},
                frame1: {'background-color': '#201F1F'},
                body1: {'background-color': '#201F1F'},
                closeImage:{'../src':window.thePageUrl+'images/close_white.png'},
                minimizeImage:{'../src':window.thePageUrl+'images/minimize_white.png'},
                maximizeImage:{'../src':window.thePageUrl+'images/maximize_white.png'},
                frameMobile: {'background-color': '#394d00'},
                frameBorderMobile: {'border': '0px solid #998800', '-webkit-box-shadow': 'none','-moz-box-shadow': 'none','box-shadow': 'none', 'border-radius': '0px'},
                imgTaskbar:{'../src':window.thePageUrl+'images/white_menu.png'}

        }
    }
    };
Themes.arrayObjects = [];
Themes.restyleObject = function (object, theme)
{
    if (object && theme && theme.components) {
        for (var k = 0; k < object.components.length; k++)
        {
            var component = object.components[k];
            if (component)
            {
                var style = theme.components[component.name];
                if (style)
                {
                    for (var l = 0; l < component.elements.length; l++)
                    {
                        styleFromObject(component.elements[l], style);
                    }
                }
            }
        }
        if (object.callback)
        {
            object.callback(theme);
        }
    }
};
Themes.restyle = function (name)
{
    var theme = Themes.themes[name];
    Themes.theme = theme;
    if (theme && theme.components)
    {
        for (var j = 0; j < Themes.arrayObjects.length; j++)
        {
            var object = Themes.arrayObjects[j];
            Themes.restyleObject(object, Themes.theme);
        }
    }

};
Themes.remove = function (obj)
{
    Themes.arrayObjects.splice(Themes.arrayObjects.indexOf(obj), 1);
};
Themes.register = function (obj)//obj contains a map that maps a component name ( such as frame-color) to the element. if themeName is undefined, the default will.
{
    Themes.arrayObjects.push(obj);
    Themes.restyleObject(obj, Themes.theme);
};


/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function Hover(element, callbackEnter, callbackLeave)
{
    var previousStyle;
    
    element.addEventListener('mouseenter', function(e){
        
                            if (!e) var e = window.event;
                            previousStyle=element.style.cssText; callbackEnter(e);
                        });
    element.addEventListener('mouseleave', function(e){
        
                            if (!e) var e = window.event;
                            element.style.cssText=previousStyle; if(callbackLeave){callbackLeave(e);}
                        });
}
function HoverAndClick(element, callbackEnter, callbackLeave, callbackMousedown, callbackMouseUp)
{
    var previousStyle;
    element.addEventListener('mouseenter', function(e){
        
                            if (!e) var e = window.event;
                            enter(e);
                        });
    element.addEventListener('mouseleave', function(e){
        
                            if (!e) var e = window.event;
                            leave(e);
                        });
    element.addEventListener('mousedown', function(e){
        
                            if (!e) var e = window.event;
                            if(callbackMousedown){leave(e);callbackMousedown(e);enter(e);}
                        });
    element.addEventListener('mouseup', function(e){
        
                            if (!e) var e = window.event;
                            if(callbackMouseUp){callbackMouseUp(e);}
                        });
    function enter(e)

    {
        previousStyle=element.style.cssText; if(callbackEnter)callbackEnter(e);
    }
    function leave(e)
    {
    element.style.cssText=previousStyle; if(callbackLeave){callbackLeave(e);}
    }
}


var Windows = new (function () {
    var self = this;
    var selfWindows=this;
    this.maxYPx = 1200;
    this.maxWidthPx = 1800;
    this.maxHeightPx = 1800;
    this.instances = [];
    this.currentBounds = {minYPx: 0, maxYPx: 1200, minXPercent: 0, maxXPercent: 100};
    this.add = function (params)
    {
        this.instances.push(params.obj);
        document.body.appendChild(params.obj.div);
        var obj = params.obj;
        var divInner = params.divInner;
        var divTab = params.divTab;
        var windowInformation = params.windowInformation;
        var callbacks = params.callbacks;
        var minimized = params.minimized;
        obj.div.addEventListener("mousedown", function () {
            if (!obj.cancelBringToFront)
            {
                self.bringToFront(obj);
            }
            obj.cancelBringToFront = false;
        });
        if (!windowInformation)
            windowInformation = new WindowInformation();
        obj.windowInformation = windowInformation;
        obj.windowMethods = {resized: function () {
        //        maximized = false;
            }};
        if (!callbacks)
            var callbacks = new WindowCallbacks();
        obj.windowMethods.callbacks = callbacks;
        obj.div.addEventListener("resize", obj.windowMethods.resized, false);
        var padding;
        if (!isMobile)
        {
            padding = 3;
        }
        else
        {
            padding = 0;
        }
        var paddingString = String(padding) + 'px';
        obj.div.style.padding = paddingString;
        divInner.style.position = 'absolute';
        divInner.style.left = paddingString;
        divInner.style.top = paddingString;
        divInner.style.right = paddingString;
        divInner.style.bottom = paddingString;
        if (!isMobile)
        {
            if (windowInformation.resizable)
            {
                obj.resizable = new Resizable(obj.div, divInner, windowInformation.minWidthPx, windowInformation.minHeightPx, windowInformation.maxWidthPx, windowInformation.maxHeightPx, self.currentBounds,
                        callbacks.resized,
                        callbacks.resizedInstantaneous);
            }
            if (windowInformation.dragable)
            {
                obj.drag = new Drag(obj.div, divTab, windowInformation.minXPercent, windowInformation.maxXPercent, windowInformation.minYPx, windowInformation.maxYPx, function ()
                {
                    try
                    {
                        if (callbacks.dragged)
                            callbacks.dragged();

                    }
                    catch (ex)
                    {
                        console.log(ex);
                    }
                }
                , function (e) {
                    if(windowInformation.maximized)
                    Window.unmaximize(obj, {left: e.screenX});
                    try
                    {
                        if (callbacks.unmaximized)
                            callbacks.unmaximized();

                    }
                    catch (ex)
                    {
                        console.log(ex);
                    }
                });
            }
        }
        if (!isMobile)
        {
            if (windowInformation.closeable||windowInformation.minimizeOnClose)
            {
            obj.buttonClose = new Window.CloseButton(function () {
                if (windowInformation.minimizeOnClose)
                {
                    if (callbacks.minimize)
                    {
                        callbacks.minimize();
                    }
                }
                else
                {
                    if (callbacks.close)
                    {
                        callbacks.close();
                    }
                }
            });
            divTab.appendChild(obj.buttonClose.button);
        }
            if (windowInformation.maximizable)
            {
                obj.buttonMaximize = new Window.MaximizeButton(function () {
                    if (callbacks.maximize)
                        callbacks.maximize();
                });
                divTab.appendChild(obj.buttonMaximize.button);
            }
            if (windowInformation.minimizable)
            {
                obj.buttonMinimize = new Window.MinimizeButton(function () {
                    if (callbacks.minimize)
                        callbacks.minimize();
                });
                divTab.appendChild(obj.buttonMinimize.button);
            }
        }
        if(!minimized&&obj.show)
        {
            obj.show();
        }
    };
    this.isWindow = function (element)
    {
        return self.instances.indexOf(element) >= 0;
    };
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
                if (self.isWindow(element))
                {
                    return element;
                }
            }
            element = element.parentElement;
        }
    };
    this.remove = function (obj)
    {
        self.instances.splice(self.instances.indexOf(obj), 1);
        document.body.removeChild(obj.div);
        if (obj.buttonClose)
        {
            obj.buttonClose.close();
        }
        if (obj.buttonMinimize)
        {
            obj.buttonMinimize.close();
        }
        if (obj.buttonMaximize)
        {
            obj.buttonMaximize.close();
        }
    };
    this.hide = function (obj)
    {
        obj.hide();
        var spliced = self.instances.splice(self.instances.indexOf(obj), 1)[0];
        if (spliced)
        {
            self.instances.splice(0, 0, spliced);
            focusFrontWindow();
        }
    };
    this.show = function (obj)
    {
        obj.show();
    };
    this.cancelBringToFront = function (obj)
    {
        obj.cancelBringToFront = true;
    };
    this.bringToFront = function (obj)
    {
        var spliced = self.instances.splice(self.instances.indexOf(obj), 1)[0];
        if (spliced)
        {
            self.instances.push(spliced);
        }
        var zIndex = 100;
        for (var i = 0; i < self.instances.length; i++)
        {
            var obj = self.instances[i];
            obj.div.style.zIndex = String(zIndex);
            if (obj.windowMethods.callbacks.callbackZIndexChanged)
            {
                obj.windowMethods.callbacks.callbackZIndexChanged(zIndex);
            }
            zIndex++;
        }
        focusFrontWindow();
    };
    function focusFrontWindow(){
        var frontWindow = self.instances[self.instances.length-1];
        if(frontWindow.windowMethods.callbacks.focussed){
            frontWindow.windowMethods.callbacks.focussed();}
    }
    this.getActive = function ()
    {
        var i = self.instances.length - 1;
        while (i >= 0)
        {
            var active = self.instances[i];
            if (active.div.style.display != 'none')
            {
                return active;
            }
            i--;
        }
        return null;
    };
})();


var Window = new (function () {
    document.body.style.overflowY = 'auto';
    var self = this;
    this.stopEventPropogation = function (e)
    {
        if (!e)
            e = window.event;

        //IE8 and Lower
        e.cancelBubble = true;
        //IE9 & Other Browsers
        if (e.stopPropagation) {
            e.stopPropagation();
        }
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
    this.maximize = function (obj, fillElseReduce)
    {

        var windowInformation = obj.windowInformation;
        if (fillElseReduce != undefined)
        {
            if (fillElseReduce)
            {
                maximize(obj);
            }
            else
            {
                unmaximize(obj);
            }
        }
        else
        {
            if (!windowInformation.maximized || (windowInformation.maximized && !equalValues(getSizes(obj), windowInformation.maximizedSizes)))
            {
                maximize(obj);
            }
            else
            {
                unmaximize(obj);
            }
        }
    };
    this.unmaximize = function (obj, mouseDragPosition) {
        unmaximize(obj, mouseDragPosition);
    };
    this.resize = function (obj) {
        if (obj.windowInformation.maximized) {
            var p = Resizable.padding * 2;
            setWindowSizePosition(obj, document.documentElement.clientWidth, document.documentElement.clientHeight - (p + Windows.taskBar.div.offsetHeight), -Resizable.padding, -Resizable.padding);
        }
    };

    this.style = function (div, divInner, divTab)
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
            div.style.position = 'fixed';
            div.style.width = '100%';
            div.style.height = 'calc(100% - ' + String(self.divDragHeightTaskBarPx) + 'px)';
            div.style.left = '0px';
            div.style.top = '0px';
            div.style.margin = '0';
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
    };
    this.CloseButton = function (callback)
    {
        var button = new self.Button(callback, 'images/close_white.png', 'images/close_red.png');
        this.button = button.button;
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
    };
    this.MinimizeButton = function (callback)
    {
        var button = new self.Button(callback, 'images/minimize_white.png', 'images/minimize_red.png');
        this.button = button.button;
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
    };
    this.MaximizeButton = function (callback)
    {
        var button = new self.Button(callback, 'images/maximize_white.png', 'images/maximize_red.png');
        this.button = button.button;
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
    };
    this.Button = function (callback, imageSource, imageSourceHover)
    {
        var self = this;
        this.button = document.createElement('button');
        this.button.style.float = 'right';
        this.button.style.border = '0px';
        this.button.style.backgroundColor = 'transparent';
        this.button.style.cursor = 'pointer';
        this.button.style.fontFamily = 'Arial';
        this.button.style.fontWeight = '900';
        this.button.style.fontSize = '14px';
        this.button.style.height = '12px';
        this.button.style.marginTop = '1px';
        this.img = document.createElement('img');
        this.img.src = window.thePageUrl + imageSource;
        this.button.appendChild(this.img);
        var previousImage;
        new Hover(this.button, function () {
            previousImage = self.img.src;
            self.img.src = window.thePageUrl + imageSourceHover;
        }, function () {
            self.img.src = previousImage;


        });
        this.button.addEventListener("mousedown", function ()
        {
            if (window.Drag)
                Drag.cancel = true;
        });
        this.button.addEventListener("click", function ()
        {
            callback();
        });

    };


    function getSizes(obj)
    {
        var p = Resizable.padding * 2;
        return {width: obj.div.offsetWidth - p, height: obj.div.offsetHeight - p, top: obj.div.offsetTop, left: obj.div.offsetLeft};
    }
    function maximize(obj)
    {
        var windowInformation = obj.windowInformation;
        windowInformation.previousSizes = getSizes(obj);
        var p = Resizable.padding * 2;
        setWindowSizePosition(obj, document.documentElement.clientWidth, document.documentElement.clientHeight - (p + Windows.taskBar.div.offsetHeight), -Resizable.padding, -Resizable.padding);
        windowInformation.maximizedSizes = getSizes(obj);
        windowInformation.maximized = true;
        
    }
    function unmaximize(obj, mouseDragPosition)
    {
        var windowInformation = obj.windowInformation;
        if (windowInformation.previousSizes)
        {
            if (!mouseDragPosition)
                setWindowSizePosition(obj, windowInformation.previousSizes.width, windowInformation.previousSizes.height, windowInformation.previousSizes.top, windowInformation.previousSizes.left);
            else {
                var b = mouseDragPosition.left / document.documentElement.clientWidth;
                var leftOffset = (b * windowInformation.previousSizes.width);
                var l = mouseDragPosition.left - leftOffset;
                console.log(l);
                setWindowSizePosition(obj, windowInformation.previousSizes.width, windowInformation.previousSizes.height, undefined, l);
            }
        }
        windowInformation.maximized = false;
    }
    function setWindowSizePosition(obj, width, height, top, left)
    {
        obj.div.style.height = String(height) + 'px';
        obj.div.style.width = String(width) + 'px';
        if (top)
            obj.div.style.top = String(top) + 'px';
        if (left)
            obj.div.style.left = String(left) + 'px';
    }
    window.addEventListener("resize", function () {
        for (var i = 0; i < Windows.instances.length; i++)
        {
            var obj = Windows.instances[i];
            self.resize(obj, true);
        }
    }, false);
    this.divDragHeightTaskBarPx = document.documentElement.clientHeight / 12;

})();

function WindowCallbacks(resized, dragged, minimize, maximize, close, callbackZIndexChanged, resizedInstantaneous, unmaximized, unminimized, focussed)
{
    this.resized = resized;
    this.dragged = dragged;
    this.minimize = minimize;
    this.maximize = maximize;
    this.close = close;
    this.callbackZIndexChanged = callbackZIndexChanged;
    this.resizedInstantaneous = resizedInstantaneous;
    this.unmaximized = unmaximized;
    this.unminimized = unminimized;
    this.focussed=focussed;
}
function WindowInformation(resizable, dragable, minWidthPx, minHeightPx, maxWidthPx, maxHeightPx, minXPercent, maxXPercent, minYPx, maxYPx, minimizable, maximizable, minimizeOnClose, closeable)
{
    if (!minWidthPx)
        minWidthPx = Windows.minWidthPx;
    if (!minHeightPx)
        minHeightPx = Windows.minHeightPx;
    if (!maxWidthPx)
        maxWidthPx = Windows.maxWidthPx;
    if (!maxHeightPx)
        maxHeightPx = Windows.maxHeightPx;
    if (!minXPercent)
        minXPercent = 0;
    if (!maxXPercent)
        maxXPercent = 100;
    if (!minYPx)
        minYPx = 0;
    if (!maxYPx)
        maxYPx = 1000;
    if (resizable == undefined)
        resizable = true;
    if (dragable == undefined)
        dragable = true;
    if(closeable==undefined)
        closeable=true;

    if (minimizable == undefined)
    {
        minimizable = true;
    }
    if (maximizable == undefined)
    {
        maximizable = true;
    }
    if (minimizeOnClose == undefined)
    {
        minimizeOnClose = false;
    }
    this.minWidthPx = minWidthPx;
    this.minHeightPx = minHeightPx;
    this.maxWidthPx = maxWidthPx;
    this.maxHeightPx = maxHeightPx;
    this.minXPercent = minXPercent;
    this.maxXPercent = maxXPercent;
    this.minYPx = minYPx;
    this.maxYPx = maxYPx;
    this.minimizable = minimizable;
    this.maximizable = maximizable;
    this.minimizeOnClose = minimizeOnClose;
    this.resizable = resizable;
    this.dragable = dragable;
    this.closeable = closeable;
}

function foreach(list, callback){
    for(var i=0; i<list.length; i++){callback(list[i]);}
}

var SelectHelper=new(function(){
var selectStrings =['webkitTouchCallout', 'webkitUserSelect', 'khtmlUserSelect', 'MozUserSelect', 'msUserSelect', 'userSelect', 'UserSelect'];
this.makeSelectable=function(element){
    setSelectable(element, "element");
};
this.makeUnselectable=function(element){
    setSelectable(element, "none");
};
function setSelectable(element, selectableString)
{
    if (element && element.type != 'text')//not text because this breaks internet explorer, stopping editing of text..
    {
        if (selectableString == "none")
        {
            if (element.nodeType == 1) {
                element.setAttribute("unselectable", "on");

            }
            if (element.onselectstart != undefined)// if IE
            {
                element.onselectstart = function () {
                    return false;
                };
            }
        }
        if (element.style)
        {
            var i = 0;
            foreach(selectStrings, function(selectString){
                if (element.style[selectString] != undefined)// if Firefox
                {
                    element.style[selectString] = selectableString;
                }
                i++;
            });
        }
        var child = element.firstChild;
        while (child) {
            setSelectable(child, selectableString);
            child = child.nextSibling;
        }
    }
}
})();


function Tooltip(text)
{
    var self = this;
    if(!isMobile)
    {
    var timerTooltip;
    this.div = document.createElement('div');
    var divBody = document.createElement('div');
    var divArrow = document.createElement('div');
    this.div.style.position='fixed';
    this.div.style.width='auto';
    this.div.style.height='auto';
    this.div.style.display='none';
    this.div.style.zIndex='400000';
    divBody.style.backgroundColor='#222222';
    divBody.style.borderRadius='6px';
    divBody.style.color = '#ffffff';
    divBody.style.padding='6px';
    divBody.style.fontFamily='Arial';
    divArrow.style.width='0'; 
    divArrow.style.height='0'; 
    divArrow.style.borderLeft='10px solid transparent';
    divArrow.style.borderRight='10px solid transparent';
    divArrow.style.borderTop='10px solid #222222';
    divArrow.style.marginLeft='10px';
    setText(divBody, text);
    this.div.appendChild(divBody);
    this.div.appendChild(divArrow);
    document.body.appendChild(this.div);
    }
    this.show = function(x, y)
    {
        if(!isMobile)
        {
            self.div.style.left=String(x-10)+'px';
            self.div.style.display='block';
            self.div.style.top=String(y-(self.div.offsetHeight))+'px';
        }
    };
    this.showAfterDelay = function(x, y){
        if(!isMobile)
        {
            timerTooltip = new Timer(function(){self.show(x, y);}, 800, 1, false);
        }
    };
    this.hide=function()
    {
        if(!isMobile)
        {
            if(timerTooltip)
            {
                timerTooltip.stop();
            }
        self.div.style.display='none';
        }
    };
}

function getAbsolute(element)
{
    var offsets = {};
    offsets.left = 0;
    offsets.right = 0;
    offsets.top = 0;
    offsets.bottom = 0;
    var skip=0;
    try{
        while(true)
        {
            var rect=element.getBoundingClientRect();
            if(skip==0)
            {
            offsets.left += element.offsetLeft- element.scrollLeft;
            offsets.right += element.offsetRight- element.scrollRight;
            offsets.top +=  element.offsetTop- element.scrollTop;
            offsets.bottom += element.offsetBottom- element.scrollBottom;
        }
        else
        {
            skip--;
        }
            if(element.parentElement==document.documentElement)
            {
                return offsets;
            }
            element = element.parentElement;
        }
    }
    catch(ex)
    {

    }
}
function getZIndex (element) {      
  var z = window.document.defaultView.getComputedStyle(element).getPropertyValue('z-index');
  if (isNaN(z)) return window.getZIndex(element.parentNode);
  return z; 
};

function TaskBar()
{

    var tasks = [];
    var self = this;
    var selfTaskBar = this;
    this.div = document.createElement('div');
    this.div.style.position = 'fixed';
    this.div.style.bottom = '0px';
    this.div.style.left = '0px';
    this.div.style.width = '100%';
    this.div.style.zIndex = '200000';
    this.div.style.backgroundColor = 'rgba(104,153,153, 0.5)';
    if (isMobile)
    {
        var divDrag = document.createElement('div');
        divDrag.style.top = '0px';
        divDrag.style.left = '0px';
        divDrag.style.width = '100%';
        var img = document.createElement('img');
        self.div.appendChild(img);
        img.src = window.thePageUrl + 'images/black_menu.png';
        img.style.top = '0px';
        img.style.position = 'absolute';
        setSizes();
        var imgWidth;
        function setSizes()
        {
            divDrag.style.height = String(Window.divDragHeightTaskBarPx) + 'px';
            imgWidth = Window.divDragHeightTaskBarPx * 1.5;
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
        this.div.appendChild(divDrag);
        this.div.style.height = String(Window.divDragHeightTaskBarPx) + 'px';
        var startOffset = [];
        var timerMove;
        var showing = false;
        var step = Math.floor(Window.divDragHeightTaskBarPx / 3);
        var lowerOuterBound = Window.divDragHeightTaskBarPx + step;
        function vanish()
        {
            showing = false;
            var height = self.div.offsetHeight;

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
                self.div.style.height = String(height) + 'px';
                self.div.style.top = String(document.documentElement.clientHeight - height) + 'px';
            }, 5, -1);
        }
        this.vanish = vanish;
        function appear()
        {
            showing = true;
            var height = self.div.offsetHeight;
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
                self.div.style.height = String(height) + 'px';
                self.div.style.top = String(document.documentElement.clientHeight - height) + 'px';
            }, 5, -1);

        }
        self.div.addEventListener("resize", function ()
        {
            setSizes();
            if (showing)
            {
                self.div.style.height = String(document.documentElement.clientHeight) + 'px';
                self.div.style.top = '0px';
            } else
            {
                self.div.style.height = String(Window.divDragHeightTaskBarPx) + 'px';
                self.div.style.top = String(document.documentElement.clientHeight - Window.divDragHeightTaskBarPx) + 'px';

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
            self.div.style.height = String(height) + 'px';
            var top = document.documentElement.clientHeight - height;
            self.div.style.top = String(top) + 'px';
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
            startOffset[0] = self.div.offsetHeight + e.changedTouches[0].pageY;
            document.documentElement.addEventListener("touchend", upEvent);
            divDrag.addEventListener("touchmove", moveEvent);
            img.addEventListener("touchmove", moveEvent);
        };
        divDrag.addEventListener("touchstart", startEvent);
        img.addEventListener("touchstart", startEvent);
    } else
    {
        this.div.style.height = 'auto';
        this.div.style.paddingLeft = '12px';
    }
    this.div.style.borderTop = '1px solid #aa00ff';
    this.add = function (obj)
    {
        if (obj.taskBarInformation)
        {
            self.div.appendChild(new Task(obj).div);
        }
    };
    function setActiveTask(task)
    {
        for (var i = 0; i < tasks.length; i++)
        {
            var t = tasks[i];
            if (t == task)
            {
                styleFromObject(t.div, t.obj.taskBarInformation.activeStyle);
            } else
            {
                styleFromObject(t.div, t.obj.taskBarInformation.style);
            }
        }
    }
    function Task(obj)
    {
        var self = this;
        this.obj = obj;
        obj.task = this;
        if (isMobile)
            var height = Window.divDragHeightTaskBarPx;
        else
            var height = 25;
        this.div = document.createElement('div');
        var img = document.createElement('img');
        this.div.style.position = 'relative';
        this.div.style.cursor = 'pointer';
        this.div.style.float = 'left';
        this.div.style.height = String(height) + 'px';
        this.div.style.width = 'auto';
        this.div.style.minWidth = String(height) + 'px';
        this.div.style.textAlign = 'center';
        this.div.style.marginRight = '6px';
        this.div.style.padding = '6px';
        img.style.height = '100%';
        img.src = window.thePageUrl + obj.taskBarInformation.icon;
        var tooltip = new Tooltip(obj.taskBarInformation.tooltip);
        styleFromObject(self.div, obj.taskBarInformation.style);
        this.div.appendChild(img);
        new HoverAndClick(this.div, function (e) {
            styleFromObject(self.div, obj.taskBarInformation.hoverStyle);
            var position = getAbsolute(self.div);
            tooltip.showAfterDelay(position.left, position.top);
        }, function () {
            tooltip.hide();
        }, function (e) {
            if (selfTaskBar.vanish)
                selfTaskBar.vanish();
            if (Windows.getActive() != self.obj)
            {
                self.unminimize();
            } else
            {
                self.minimize();
            }
        });

        this.unminimize = function ()
        {
            Windows.show(self.obj);
            Windows.bringToFront(self.obj);
            setActiveTask(self);
        };
        this.minimize = function ()
        {
            if(!self.obj.windowInformation||self.obj.windowInformation.minimizable){
            Windows.hide(self.obj);
            var active = Windows.getActive();
            if (active != null)
            {
                setActiveTask(active.task);
            } else
            {
                setActiveTask(null);
            }
        }
        };
        this.maximize = function ()
        {
            setActiveTask(self);
            Window.maximize(obj);
        };
        obj.div.addEventListener("mousedown", function ()
        {
            setActiveTask(self);
        });
        tasks.push(this);
        this.remove = function ()
        {
            self.minimize();
            selfTaskBar.div.removeChild(self.div);
        };
        var timerFlash;
        this.flash = function ()
        {
            var styleInitial = self.div.style.cssText;
            var flashing = false;
            timerFlash = new Timer(function () {
                if (flashing) {
                    self.div.style.cssText = styleInitial;
                    flashing = false;
                } else {
                    self.div.style.backgroundColor = '#ccff00';
                    flashing = true;
                }
            }, 300, 6);
        };
        this.attention = function ()
        {
            if (Windows.getActive() != self.obj)
            {
                styleFromObject(self.div, obj.taskBarInformation.attentionStyle);
            }
        };
    }
    SelectHelper.makeUnselectable(this.div);
    var taskbarThemeObject;
    if (isMobile)
    {
        taskbarThemeObject = {name: 'taskbarMobile', elements: [divDrag]};
        self.div.style.background = '#111111';
        self.div.style.border = '0px';
    } else
    {
        taskbarThemeObject = {name: 'taskbar', elements: [self.div]};
    }
    Themes.register({components: [
            taskbarThemeObject
        ],
        callback: function (theme) {

        }}, undefined);
}
var taskBar = new TaskBar();
Windows.taskBar = taskBar;
document.body.appendChild(taskBar.div);
TaskBar.add = function (obj)
{
    taskBar.add(obj);
};

function GenericWindow(params)
{
    var name = params.name;
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
    var minimizable= params.minimizable; 
    var maximizable = params.maximizable;
    var closeable = params.closeable;
    var minimizeOnClose = params.minimizeOnClose;
    var bringToFront = params.bringToFront;
    
   

    var self = this;
    EventEnabledBuilder(this);
    var settings = new Settings(name, function () {
        this.set("position");
        this.set("size");
        this.set("zIndex");
    });
    this.taskBarInformation = {tooltip: tooltipMessage, icon: iconPath, style: {backgroundColor: 'transparent'}, hoverStyle: {backgroundColor: 'rgba(0,255,255, 0.5)'}, activeStyle: {backgroundColor: 'rgba(0, 128, 255, 0.5)'}, attentionStyle: {backgroundColor: 'rgba(255,80,80,0.5)'}};
    this.div = document.createElement('div');
    self.divInner = document.createElement('div');
    self.divTab = document.createElement('div');
    self.divMain = document.createElement('div');
    var divName = document.createElement('div');
    this.div.style.position = "absolute";
    self.divInner.style.position = 'absolute';
    self.divInner.style.border = '1px solid #66a3ff';
    self.divInner.style.backgroundColor = '#0099ff';
    self.divInner.style.padding = '0px 3px 3px 3px';
    self.divInner.style.borderRadius = "5px";
    self.divInner.style.overflow = 'hidden';
    self.divTab.style.float = 'left';
    self.divTab.style.width = "100%";
    self.divTab.style.height = "20px";
    self.divTab.style.cursor = 'move';
    divName.style.float = 'left';
    divName.style.paddingLeft = '5px';
    divName.style.fontFamily = 'Arial';
    divName.style.textOverflow='ellipsis';
    divName.style.overflow='hidden';
    verticallyCenter(divName);
    setText(divName, name);
    self.divMain.style.height = 'calc(100% - 20px)';
    self.divMain.style.width = '100%';
    self.divMain.style.bottom = '0px';
    self.divMain.style.float = 'left';
    self.divMain.style.position = 'relative';
    this.div.appendChild(self.divInner);
    self.divInner.appendChild(self.divTab);
    self.divTab.appendChild(divName);
    self.divInner.appendChild(self.divMain);
    document.documentElement.appendChild(this.div);

    var startPosition = settings.get("position");
    if (startPosition)
    {
        this.div.style.left = String(startPosition[0]) + 'px';
        this.div.style.top = String(startPosition[1]) + 'px';
    } else
    {
        this.div.style.left = String(defaultX) + 'px';
        this.div.style.top = String(defaultY) + 'px';
    }

    var startSize = settings.get("size");
    if (startSize)
    {
        if (startSize[0] < minWidth)
            startSize[0] = minWidth;
        if (startSize[1] < minHeight)
            startSize[1] = minHeight;
        this.div.style.width = String(startSize[0]) + 'px';
        this.div.style.height = String(startSize[1]) + 'px';
    } else
    {
        this.div.style.width = String(defaultWidth) + 'px';
        this.div.style.height = String(defaultHeight) + 'px';
    }

    var startZIndex = settings.get("zIndex");
    if (startZIndex)
    {
        self.div.style.zIndex = String(startZIndex);
    }
    this.div.appendChild(self.divInner);

    this.show = function (bringToFront)
    {
        self.div.style.display = 'inline';
        if (bringToFront)
        {
            Windows.bringToFront(self);
        }
        dispatchFocusedEvent();
    };
    this.hide = function ()
    {
        self.div.style.display = 'none';
    };
    SelectHelper.makeUnselectable(this.div);
    var themesObject = {components: [
            {name: 'body', elements: [self.divMain]},
            {name: 'text', elements: [divName]}
        ],
        callback: function (theme) {

        }
    };
    var callbackMinimize = minimizable ? function () {
        self.task.minimize();dispatchMinimizedEvent();
    } : function () {
    };
    var callbackMaximize = maximizable ? function () {
        self.task.maximize(); console.log('maximized'); dispatchMaximizedEvent();
    } : function () {
    };
    var callbackClose = minimizeOnClose ? function () {
        self.task.minimize();
    } : function () {
        close();
    };
    Themes.register(themesObject, undefined);
    var themesObjectWindow = Window.style(self.div, self.divInner, self.divTab);
    var windowInformation = new WindowInformation(true, true, minWidth, minHeight, maxWidth, maxHeight, 0, 100, 0, Windows.maxYPx, minimizable, maximizable, minimizeOnClose, closeable);
    var callbacks = new WindowCallbacks(function () {
        settings.set("position", [self.div.offsetLeft, self.div.offsetTop]);
        settings.set("size", [self.div.offsetWidth, self.div.offsetHeight]);
    }, function () {
        settings.set("position", [self.div.offsetLeft, self.div.offsetTop]);
        dispatchMovedEvent();
    }
    ,
            callbackMinimize,
            callbackMaximize,
            callbackClose, function (zIndex) {
                settings.set("zIndex", zIndex);
            }, function () {
                dispatchResizedEvent();
    },
 dispatchUnmaximizedEvent, dispatchUnminimizedEvent);
    var timerFlash;
    var flashing = false;
    this.flash = function ()
    {
        var flashing = false;
        timerFlash = new Timer(function () {
            if (flashing) {
                styleFromObject(self.divInner, Themes.theme.components.frame);
                flashing = false;
            } else {
                styleFromObject(self.divInner, Themes.theme.components.frameFlashing);
                flashing = true;
            }
        }, 50, 6);
    };
    
    this.bringToFront = function(){
        Windows.bringToFront(self);
    };
    this.setName = function(name){
        console.log(name);
        setText(divName, name);
    };
    var params = {obj: this,
        minimized: minimized,
        divTab: self.divTab,
        divInner: self.divInner,
        windowInformation: windowInformation,
        callbacks: callbacks};
    Windows.add(params);
    function close()
    {
        self.task.remove(self);
        Windows.remove(self);
        Themes.remove(themesObject);
        Themes.remove(themesObjectWindow);
        dispatchCloseEvent();
    }
    TaskBar.add(this);
    if (bringToFront != false)
        Windows.bringToFront(self);
    function dispatchResizedEvent(){
        self.dispatchEvent({type:'resized'});
    }
    function dispatchMaximizedEvent(){
        self.dispatchEvent({type:'maximized'});
    }
    function dispatchMinimizedEvent(){
        self.dispatchEvent({type:'minimized'});
    }
    function dispatchFocusedEvent(){
        self.dispatchEvent({type:'focus'});
    }
    function dispatchUnminimizedEvent(){
        self.dispatchEvent({type:'unminimized'});
    }
    function dispatchUnmaximizedEvent(){
        self.dispatchEvent({type:'unmaximized'});
    }
    function dispatchMovedEvent(){
        self.dispatchEvent({type:'moved'});
    }
    function dispatchCloseEvent(){
        self.dispatchEvent({type:'close'});
    }
}

console.log('loading webwindows');
if(GenericWindow){
	console.log('WebWindows says hi!');
}
console.log('loading webwindows');
var a = new GenericWindow();
if(GenericWindow){
	console.log('WebWindows says hi!');
}
