define(['app'], function (app) {

	app.register.directive("slideCustom", function () {
		return {
			restrict: "E",
			replace: true,
			template:'<div class="slideType">' +
							'<a class="lt">&lt;</a>' +
							'<div class="slideRows">' +
								'<ul>' +
									'<li class="{{curOption.classname}}" style="width:{{liWidth}}" roleType="{{curOption.roleId}}" ng-repeat="curOption in slideOptions" ng-click="getData($event)">{{curOption.showname}}</li>' +
								'</ul>' +
							'</div>' +
							'<a class="gt">&gt;</a>' +
					'</div>',
			link: function(scope, element, attrs, accordionController) {

				init();

				// 左按键，向右滚动
				element.find('.lt').off('click').on('click', function(){
					scrollEvent('LEFT');
				});
				//右按键，向左滚动
				element.find('.gt').off('click').on('click', function(){
					scrollEvent('RIGHT');
				});
				//触屏
				element.find('.slideRows').off('touchstart').on('touchstart', function(event){
					startTouch(event);
				});
				//划屏
				element.find('.slideRows').off('touchmove').on('touchmove', function(event){
					scrollTouch(event);
				});


				// 初始化指令样式
				function init(){
					//初始化筛选项容器宽度
				    element.find('ul').width(scope.slideOptions.length * 80);

					//设置单项宽度
					scope.liWidth = '80px';
					scope.unitWidth = 80;
					if(scope.slideOptions.length<=3){
						scope.unitWidth = 100/scope.slideOptions.length * element.parent().width()*0.01;
						scope.liWidth = scope.unitWidth+'px';
						element.find('.slideRows').width('100%').css({'margin': '0', 'borderColor':'#F8F8F8'});
						element.find('ul').width(scope.slideOptions.length * scope.unitWidth);
						element.find('a').hide();
					}
					//目标marginLeft值(newLeft),最大marginLeft值(maxLeft),最小marginLeft值(minLeft)
					element.find('.slideRows').width(element.parent().width()*0.8);
					scope.maxLeft = 0, scope.minLeft = element.find('.slideRows').outerWidth()-element.find('ul').width()+element.find('li').length;
					scope.roleId = localStorage.getItem('searchRoleId') ? localStorage.getItem('searchRoleId') : '0';

					$.each(scope.slideOptions, function(v, item){
						if(scope.roleId == item.roleId){
							item.classname="slideTitle_active";
							return;
						}
					});
				}

				//点击项，进行相应id的传值
				scope.getData = function(event){
					// console.log(event)
					$(event.target).attr('class', 'slideTitle_active').siblings().attr('class','slideTitle');
					localStorage.removeItem('searchRoleId');
					localStorage.setItem('searchRoleId', $(event.target).attr('roleType'));
				}

				//触屏事件
				function startTouch(event) {
					scope.startX = event.originalEvent.targetTouches[0].pageX;
					console.log(scope.startX+"ggggggggggggggg")
					console.log("ceshi ")
				}
				//划屏事件
				function scrollTouch(event) {
					scope.moveX = event.originalEvent.targetTouches[0].pageX - scope.startX;
					
					console.log(scope.moveX);
					var curLeft = element.find('ul').css('marginLeft').replace('px', '') ? parseFloat(element.find('ul').css('marginLeft').replace('px', '')) : 0;
					if(curLeft>=scope.minLeft && curLeft<=scope.maxLeft){
						curLeft = curLeft + scope.moveX;
						if(curLeft<scope.minLeft || curLeft>scope.maxLeft){
							return;
						}
					} else if(curLeft<scope.minLeft){
						curLeft = scope.minLeft;
					} else if(curLeft>scope.maxLeft){
						curLeft = scope.maxLeft;
					}

					element.find('ul').css('marginLeft', curLeft + 'px');
				}
				// 滚动事件(_dir:方向'LEFT'或'RIGHT')
				function scrollEvent(_dir) {
					//ul当前的marginLeft值(curLeft)
					var curLeft = element.find('ul').css('marginLeft').replace('px', '') ? parseFloat(element.find('ul').css('marginLeft').replace('px', '')) : 0;					
					if(_dir == 'LEFT'){
						newLeft = curLeft>=scope.maxLeft ? scope.maxLeft : curLeft+scope.unitWidth;
					} else if(_dir == 'RIGHT') {
						newLeft = curLeft<=scope.minLeft ? scope.minLeft : curLeft-scope.unitWidth;
					}
					element.find('ul').animate({'marginLeft': newLeft + 'px'}, 300);
				}
			},
			controller: function($scope){
			}
		};
	});
    //图片指令
    app.register.directive("picture",function () {
    	 return {
			restrict: "E",
			replace: true,
			template:'<div id="picture" style="margin-top:230px; text-align:center;" >'+
                         '<p ng-click="closeTemplateA()" style="align:right">关闭</p>'+
                          '<img src="images/biao_img01.png" style="width:{{height}}px; height:{{width}}px;" ng-click="masklayerClickA()">'+
                     '</div>',
            link: function(scope, element, attrs, accordionController) {
                //进行元素的拖动
		        /* var hammertime = new 
		        (document.getElementById("picture"));
		         hammertime.add(new Hammer.pan());
		         hammertime.on("pan", function (e) {
		             var resultX = e.deltaX ;//x坐标
		             var resultY = e.deltaY ;//y坐标
		         });

	            //多点触控、捏合事件
		        hammertime.add(new Hammer.Pinch());
		        hammertime.on("pinchin", function (e) {
		        	var pinresultX = e.deltaX;
		        	var pinresultY = e.deltaY;
		        	//图片应当变化的大小
		        	var finalresultX = pinresultX-resultX;
		        	var finalresultY = pinresultY-resultY;
                    if(finalresultX<0 || finalresultY<0){
                    	//此处进行赋值改变图片的相应大小（缩小）
                    }else{
                    	//此处进行赋值改变图片的相应大小（放大）
                    }
		        });*/
			

			   var SwipeableCardView = ionic.views.View.inherit({  
				  initialize: function(opts) {  
				    // 保存卡片元素  
				    this.el = opts.el;  
				    this.bindEvents();  
				  },  
				  bindEvents: function() {  
				    var self = this;  
				  
				    ionic.onGesture('dragstart', function(e) {  
				      // 拖动过程开始  
				    }, this.el);  
				  
				    ionic.onGesture('drag', function(e) {  
				      // 拖动的过程  
				      window.rAF(function() {  
				        self._doDrag(e);  
				      });  
				    }, this.el);  
				  
				    ionic.onGesture('dragend', function(e) {  
				      // 拖动过程结束  
				    }, this.el);  
				  },  
				  _doDrag: function(e) {  
				    // 在拖动的过程中计算出我们已经拖多远  
				    var o = e.gesture.deltaY / 3;  
				  
				    // Get the angle of rotation based on the  
				    // drag distance and our distance from the   
				    // center of the card (computed in dragstart),  
				    // and the side of the card we are dragging from  
				    this.rotationAngle = Math.atan(o/this.touchDistance) * this.rotationDirection;  
				  
				    // Don't rotate if dragging up  
				    if(e.gesture.deltaY < 0) {  
				      this.rotationAngle = 0;  
				    }  
				  
				    // Update the y position of this view  
				    this.y = this.startY + (e.gesture.deltaY * 0.4);  
				  
				    // Apply the CSS transformation to the card,  
				    // translating it up or down, and rotating  
				    // it based on the computed angle  
				    this.el.style[ionic.CSS.TRANSFORM] = 'translate3d(' + this.x + 'px, ' + this.y  + 'px, 0) rotate(' + (this.rotationAngle || 0) + 'rad)';  
				  }  
				});  
/*// 然后加入相应的回调函数即可
hammer.ondragstart = function(ev) { };  // 开始拖动
hammer.ondrag = function(ev) { }; // 拖动中
hammer.ondragend = function(ev) { }; // 拖动结束
hammer.onswipe = function(ev) { }; // 滑动

hammer.ontap = function(ev) { }; // 单击
hammer.ondoubletap = function(ev) { }; //双击
hammer.onhold = function(ev) { }; // 长按

hammer.ontransformstart = function(ev) { }; // 双指收张开始
hammer.ontransform = function(ev) { }; // 双指收张中
hammer.ontransformend = function(ev) { }; // 双指收张结束

hammer.onrelease = function(ev) { }; // 手指离开屏幕*/





























            }


		}
    });








});