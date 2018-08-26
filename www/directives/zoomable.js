define(['app'], function(app){
    app.register.directive('zoomable', function(scroll) {
        return {

            link: function(scope, element, attrs) {
                element.bind('load', function() {
                    var container = document.getElementById("container");
                    var content = document.getElementById("content");
                    var clientWidth = 0;
                    var clientHeight = 0;
                    // 初始化scroll
                    var scroller = new Scroller(scroll.render(content), {
                        scrollingX: true,
                        scrollingY: true,
                        animating: true,
                        bouncing: true,
                        locking: true,
                        zooming: true,
                        minZoom: 0.5,
                        maxZoom: 2
                    });
                    // 初始化ract
                    
                    var rect = container.getBoundingClientRect();
                    scroller.setPosition(rect.left + container.clientLeft, rect.top + container.clientTop);
                    var image = document.getElementById(scope.item.id);
                    console.log(scope.item.id)
                    var contentWidth = image.width;
                    var contentHeight = image.height;
                    var reflow = function() {
                        clientWidth = container.clientWidth;
                        clientHeight = container.clientHeight;
                        scroller.setDimensions(clientWidth, clientHeight, contentWidth, contentHeight);
                    };
                    window.addEventListener("resize", reflow, false);
                    reflow();
                    if ('ontouchstart' in window) {
                        container.addEventListener("touchstart", function(e) {
                            if (e.touches[0] && e.touches[0].target && e.touches[0].target.tagName.match(/input|textarea|select/i)) {
                                return;
                            }
                            scroller.doTouchStart(e.touches, e.timeStamp);
                            e.preventDefault();
                        }, false);
                        document.addEventListener("touchmove", function(e) {
                            scroller.doTouchMove(e.touches, e.timeStamp, e.scale);
                        }, false);
                        document.addEventListener("touchend", function(e) {
                            scroller.doTouchEnd(e.timeStamp);
                        }, false);
                        document.addEventListener("touchcancel", function(e) {
                            scroller.doTouchEnd(e.timeStamp);
                        }, false);
                    } else {
                        var mousedown = false;
                        container.addEventListener("mousedown", function(e) {
                            if (e.target.tagName.match(/input|textarea|select/i)) {
                                return;
                            }
                            scroller.doTouchStart([{
                                pageX: e.pageX,
                                pageY: e.pageY
                            }], e.timeStamp);
                            mousedown = true;
                        }, false);
                        document.addEventListener("mousemove", function(e) {
                            if (!mousedown) {
                                return;
                            }
                            scroller.doTouchMove([{
                                pageX: e.pageX,
                                pageY: e.pageY
                            }], e.timeStamp);
                            mousedown = true;
                        }, false);
                        document.addEventListener("mouseup", function(e) {
                            if (!mousedown) {
                                return;
                            }
                            scroller.doTouchEnd(e.timeStamp);
                            mousedown = false;
                        }, false);
                        container.addEventListener(navigator.userAgent.indexOf("Firefox") > -1 ? "DOMMouseScroll" : "mousewheel", function(e) {
                            scroller.doMouseZoom(e.detail ? (e.detail * -120) : e.wheelDelta, e.timeStamp, e.pageX, e.pageY);
                        }, false);
                    }
                });
            }
        }
    })
})   