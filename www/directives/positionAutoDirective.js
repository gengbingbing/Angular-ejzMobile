define(['app'], function (app) {

	app.register.directive("positionAuto", function () {
		return {
		restrict: "E",
		replace: true,
		//results为所有小区名称的集合
		template:'<div>' +
					'<input type="text" class="position_input" id="position_input" placeholder="输入小区名称进行查找" ng-model="res.realname" >' +
					'<a  class="btn_input" ng-click="positionFindByInput(res)">查找</a>' +
					'<ul class="ul_input" >' +
		  				'<li ng-repeat="res in results | filter:res" ng-click="positionChoose(res)">{{res.realname}}</li>' +
					'</ul>' +
				'</div>',
		link: function(scope, element, attrs, accordionController) {
				//输入框输入事件
				element.find('input').unbind('keydown keyup keypress').bind('keydown keyup keypress', function(){
				 	
					if(element.find('li').length>0 && (this.value.trim() == '' || this.value.trim() == element.find('li')[0].innerText)) {
					 	element.find('ul').css('display','none');
					} else if (element.find('li').length > 0) {
					 	element.find('ul').css('display','block');
					}

				})
				//自动列表点击事件
				element.find('ul').unbind('click').bind('click', function(e){
					if(e.target.tagName=='LI'){	//获取点击li的内容
						element.find('input').val(e.target.innerText);
			 			element.find('ul').css('display','none');
					}
					if(element.find('li').length>0 && element.find('input').val().trim() == element.find('li')[0].innerText){
		 				element.find('ul').css('display','none');
					}
		 		});
			},
		controller: function($scope){ 
				$scope.point={
					lng:105.914600,
					lat: 34.243592
				}
				$scope.result = '';
				//根据输入内容查找
				$scope.positionFindByInput = function(res){
					getPositionByName($scope.realname);
				}
				//点击下拉列表中的项
				$scope.positionChoose =  function (_argument){
					$scope.realname = _argument.realname;
				}
				//当第一次进入地图界面的时候为了防止经纬度坐标为空值而报错
/*				$scope.point={
						lng : 109.030661,
						lat : 34.265165
			    }*/
				localStorage.setItem('houseSearch_point', JSON.stringify($scope.point))
				//根据名称获取坐标位置
				function getPositionByName(_houseName){
					//根据小区名称进行小区坐标的查找 ——houseName为查询条件
					/******************此处写查询语句*********************/
					var result_find={};
/*
					result_find.position={
						lng : 109.030661,
						lat : 34.265165
					}*/
					//将小区查询到的经纬度传值给中心坐标
					$scope.point = result_find.position;

					localStorage['flag_result']=1;
					
					//查找后的小区坐标存入缓存，以备份
					localStorage.setItem('houseSearch_point', JSON.stringify($scope.point))

				}

			}


		};



	});

});