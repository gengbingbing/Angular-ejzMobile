define(['app','mainService','utilsService'],function (app){

	app.register.controller('invitteamCtrl', ['$scope','mainAjax','utils','$templateCache',function($scope,mainAjax,utils,$templateCache){

		//初始化页面，取消加载
	    $scope.initData=function (){
	 	    $templateCache.removeAll();
			$templateCache.put('templates/main/desginercenterTem.html',utils.getTemplates('templates/main/desginercenterTem.html'));	//发送验证码模板
	    }

	 	$scope.desginer=function(){
	    	
			utils.modal('templates/main/desginercenterTem.html',$scope);
	    }
	

	}])
})
