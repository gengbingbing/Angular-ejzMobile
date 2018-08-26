define(['app','mainService', 'positionAutoDirective', 'slideCustomDirective','masklayer','temmode'], function (app) {

	app.register.controller('desginaccCtrl', ['$scope', 'mainAjax','$rootScope','baiduMapApi', function ($scope,mainAjax,$rootScope,baiduMapApi) {

		$scope.results == '';
        $scope.masklayerShowHideClass="RightColumnParentclassNone";
        $scope.masklayerSignOut="ng-enter-active";
        $scope.DynamicTem='';
		//获取小区信息，填充自动列表小区数据
		 $scope.initData = function() {
          //预加载项
          $templateCache.removeAll(); //移除所有模板内容，释放内存
          $templateCache.put('templates/main/contactInfo.html', utils.getTemplates('templates/main/contactInfo.html')); //列表选择模板      
        }


		$scope.slideOptions = [
			{showname:'所有动态', roleId:0, classname:'slideTitle'},
			{showname:'业主', roleId:1, classname:'slideTitle'},
			{showname:'装修公司', roleId:2, classname:'slideTitle'},
			{showname:'设计师', roleId:4, classname:'slideTitle'},
			{showname:'监理', roleId:5, classname:'slideTitle'},
			{showname:'商家', roleId:3, classname:'slideTitle'}
		];
		// console.log(utils.masklayerClickT());
		/*获取各角色请求数据*/
		// function getDynamicSuccess(response, status) {
		// 	if(status == 200){
		// 		$scope.resultsRole = response;
		// 		localStorage.setItem('resultsRole', $scope.resultsRole);
		// 		console.log($scope.resultsRole)
		// 	}
		// }
		// function getDynamicError(response){
		// 	console.log(response);
		// }
		/*获取各角色请求数据 结束*/
		/*获取小区信息*/
		function getPositionSuccess(response, status) {
			if(status == 200){
				$scope.results = response;
			}
		}
		function getPostionError(response){
			console.log(response);
		}
		/*获取小区信息 结束*/

	}])

})