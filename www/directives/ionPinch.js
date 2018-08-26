define(['app'], function(app){
  app.register.directive('ionPinch', function($timeout) {
    return {
      restrict: 'A',
      link: function($scope, $element) {
                console.log($element)

        $timeout(function() {
          var square = $element[0],
              posX = 0,
              posY = 0,
              lastPosX = 0,
              lastPosY = 0,
              bufferX = 0,
              bufferY = 0,
              scale = 1,
              lastScale,
              rotation = 0,
              last_rotation, dragReady = 0;
          ionic.onGesture('touch drag dragend doubletap pinch tap swipe', function(e) {
            e.gesture.srcEvent.preventDefault();
            e.gesture.preventDefault();
            switch (e.type) {
              case 'touch':
                lastScale = scale;
                last_rotation = rotation;
                break;
              case 'drag':
                console.log(e.type)
                posX = e.gesture.deltaX + lastPosX;
                posY = e.gesture.deltaY + lastPosY;
                break;
              // case 'transform':
              //   alert(lastScale)
              //   alert(e.gesture.scale)
              //   alert(e.type)
              //   rotation = e.gesture.rotation + last_rotation;
              //   scale = e.gesture.scale * lastScale
              //   break;
              case 'dragend':
                console.log(e.type)
                lastPosX = posX;
                lastPosY = posY;
                lastScale = scale;
                break;
              case 'doubletap':
                if(scale < 3){
                  scale = e.gesture.scale * 1.5
                }else{
                  scale = e.gesture.scale / 1.5
                }
                break;
              case 'tap':
                if(scale > 1 || scale < 1){
                  scale = 1
                }
                break;
              case 'pinch':
                // rotation = e.gesture.rotation + last_rotation;
                scale = e.gesture.scale * lastScale
               break;
            }
            var transform =
                // "translate3d(" + posX + "px," + posY + "px, 0) " +
                "scale(" + scale + ")"
                // "rotate(" + rotation + "deg) ";
            e.target.style.transform = transform;
            e.target.style.webkitTransform = transform;
          }, $element[0]);
        });
      }
    }
  })
})