define(['app','mainService','utilsService'],function (app){

	app.register.controller('constructionCtrl', ['$scope','mainAjax','utils','$templateCache',function($scope,mainAjax,utils,$templateCache){

		//初始化页面，取消加载
	    $scope.initData=function (){
	 	    $templateCache.removeAll();
			$templateCache.put('templates/main/desginercenterTem.html',utils.getTemplates('templates/main/desginercenterTem.html'));	//发送验证码模板
	    }

	 	$scope.desginer=function(){
	    	
			utils.modal('templates/main/desginercenterTem.html',$scope);
	    }

		$scope.invitdesgin=[

			{hrefimg:'#/main/desgincenter',img:'images/photo_img.png',name:'我家我家装修公司',type:"高级",time:"3",hreficon:'#/main/sizehome',address:"陕西西安"},
			{hrefimg:'../main/desginercenter',img:'images/photo_img.png',name:'吴克群',type:"高级",time:"3",hreficon:'#/main/sizehome',address:"陕西西安"},
			{hrefimg:'../main/desginercenter',img:'images/photo_img.png',name:'吴克群',type:"高级",time:"3",hreficon:'#/main/sizehome',address:"陕西西安"},
			{hrefimg:'../main/desginercenter',img:'images/photo_img.png',name:'吴克群',type:"高级",time:"3",hreficon:'#/main/sizehome',address:"陕西西安"},
			{hrefimg:'../main/desginercenter',img:'images/photo_img.png',name:'吴克群',type:"高级",time:"3",hreficon:'#/main/sizehome',address:"陕西西安"},
			{hrefimg:'../main/desginercenter',img:'images/photo_img.png',name:'吴克群',type:"高级",time:"3",hreficon:'#/main/sizehome',address:"陕西西安"},
		]
		
		
		$scope.desginercenter=[

			{img:'images/photo_img.png',name:'吴克群',type:"高级",address:"陕西西安"},
		]

	}])
})
