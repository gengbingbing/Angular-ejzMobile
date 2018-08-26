define(['app','mainService', 'utilsService'],function (app){
  app.register.controller('invitCtrl',  ['$scope', 'mainAjax','utils','$templateCache','$ionicActionSheet',function ( $scope,mainAjax,utils,$templateCache,$ionicActionSheet){
  	
   //初始化页面，取消加载
     $scope.initData=function (){
     	    $templateCache.removeAll();
     		$templateCache.put('templates/main/descosTem.html',utils.getTemplates('templates/main/descosTem.html'));	//发送验证码模板
     }

 	$scope.clickcost=function(){
    	
		utils.modal('templates/main/descosTem.html');
    }

    
	$scope.invitname=[

			{name:'邀请设计师',href:'#/main/invitdesgin'},
			{name:'邀请装修公司',href:'#/main/decorcompany'},
			
		]
		
  }])

})









