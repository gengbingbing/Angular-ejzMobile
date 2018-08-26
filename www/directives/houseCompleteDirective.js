define(['app'], function (app) {

	app.register.directive("houseComplete", function () {
		return {
			restrict: "E",
			replace: true,
			template:'<div>' +
						'<div class="item item-input  item_line_input">' +
				          '<input type="text" placeholder="请输入小区名称" ng-model="postdata.HouseInfo.houseName" ng-change="houseInputChange(house)" >' +
				          '<span class="persond ion-ios-close"  ng-click="clearInput()"></span>' +
				        '</div>' +
				        '<ul class="auto_house">' +
				          '<li ng-repeat="house in DecorationInfo[0].HouseData.house.Data | filter:house" ng-click="houseClick(house)">{{house.realname}}</li>' +
				        '</ul>' +
					'</div>',
			link: function(scope, element, attrs, accordionController) {
		        
				element.find('ul.auto_house').hide();
				element.find('input').focus(function(){
				element.find('ul.auto_house').show();
				});

				scope.clearInput = function() {
		     		 scope.postdata.HouseInfo.houseName = '';
			    }
				//点击项
				scope.houseClick = function(_item){
					element.find('ul.auto_house').hide();
					element.find('input').val(_item.realname);
					scope.$parent.$parent.postdata.HouseInfo.houseName =_item.realname;
					scope.houseInputChange(_item);
				}
				  
				//改变输入
				scope.houseInputChange = function(_item){
					scope.decorateInfo ? '' : scope.decorateInfo = new Object();
					scope.decorateInfo.house = {
					  realname : _item.realname,
					}
				}
			}
		};



	});

});