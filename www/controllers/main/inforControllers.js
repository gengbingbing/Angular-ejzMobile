define(['app','mainService', 'utilsService'],function (app){
  app.register.controller('informationCtrl',  ['$scope', 'mainAjax','utils','$templateCache','$ionicActionSheet',function ( $scope,mainAjax,utils,$templateCache,$ionicActionSheet){
  	
   //初始化页面，取消加载
     $scope.initData=function (){
     	    $templateCache.removeAll();
     		$templateCache.put('templates/main/descosTem.html',utils.getTemplates('templates/main/descosTem.html'));	//发送验证码模板
     }

 	$scope.clickcost=function(){
    	
		utils.modal('templates/main/descosTem.html');
    }

    $scope.userData = JSON.parse(localStorage.getItem('user','rooms','units','situation','monitor','house','designer','designCost','decorateTypes','decorateStyle'));

  //   console.log(localStorage.getItem('user','rooms','units','situation','monitor','house','designer','designCost','decorateTypes','decorateStyle'));

  //   console.log($scope.userData);
    

		// $scope.information=[

		// 	{name:'房型/小区'},
		// 	{name:'户型／风格'},
		// 	{name:'装修类型'},
		// 	{name:'房屋情况'},
		// 	{name:'装修预算'},
		// 	{name:'设计要求'},
		// 	{name:'设计方式'},
		// 	{name:'联系方式'}
		// ]
  }])

})











