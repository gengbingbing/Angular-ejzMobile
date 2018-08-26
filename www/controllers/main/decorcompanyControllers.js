define(['app','mainService','utilsService'],function (app){

	app.register.controller('decorcompanyCtrl', ['$scope','mainAjax','utils','$templateCache',function($scope,mainAjax,utils,$templateCache){
		   $scope.initData=function (){
	 	    $templateCache.removeAll();
			$templateCache.put('templates/main/desginercenterTem.html',utils.getTemplates('templates/main/desginercenterTem.html'));	//发送验证码模板
	    }

	 	$scope.desginer=function(){
	    	
			utils.modal('templates/main/desginercenterTem.html',$scope);
	    }

		$scope.decorcompany=[
			{hrefimg:'../main/desginercenter',img:'cache/img/000.jpg',name:'吴克群',type:"高级",time:"3",hreficon:'#/main/sizehome',address:"陕西西安"},
			{hrefimg:'../main/desginercenter',img:'cache/img/001.jpg',name:'吴克群',type:"高级",time:"3",hreficon:'#/main/sizehome',address:"陕西西安"},
			{hrefimg:'../main/desginercenter',img:'cache/img/002.jpg',name:'吴克群',type:"高级",time:"3",hreficon:'#/main/sizehome',address:"陕西西安"},
			{hrefimg:'../main/desginercenter',img:'cache/img/003.jpg',name:'吴克群',type:"高级",time:"3",hreficon:'#/main/sizehome',address:"陕西西安"},
			{hrefimg:'../main/desginercenter',img:'cache/img/004.jpg',name:'吴克群',type:"高级",time:"3",hreficon:'#/main/sizehome',address:"陕西西安"},
		]
			
	}])
})