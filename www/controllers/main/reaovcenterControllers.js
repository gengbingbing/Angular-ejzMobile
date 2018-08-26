define(['app','mainService','utilsService'],function (app){
	app.register.controller('reaovcenterCtrl',['$scope','mainAjax','utils','$templateCache',function($scope,mainAjax,utils,$templateCache){
		

		//初始化页面，取消加载
	   /* $scope.initData=function (){
	 	    $templateCache.removeAll();
			$templateCache.put('templates/main/desginercenterTem.html',utils.getTemplates('templates/main/desginercenterTem.html'));	//发送验证码模板
	    }

	 	$scope.desginer=function(){
	    	
			utils.modal('templates/main/desginercenterTem.html',$scope);
	    }*/
	    $scope.closeModel=function (){

			$scope.modal.remove();

		}

		$scope.desginercenter=[

			{img:'images/photo_img.png',name:'吴克群',type:"高级",address:"陕西西安"},
		]

		$scope.desginerinfor=[

			{idea:'追求功能艺术化，质量感观化，人"物"合一化',style:'欧式 简约 现代',time:'3',marjor:'室内装潢设计及美术设计',eg:'枫林绿洲、枫林意树、曲江官邸',}
		]

		$scope.works=[

			{img:'cache/img/000.jpg',time:'2015-2-9',title:'枫林绿洲'},
			{img:'cache/img/000.jpg',time:'2015-2-9',title:'枫林绿洲'},
			{img:'cache/img/000.jpg',time:'2015-2-9',title:'枫林绿洲'},
			{img:'cache/img/000.jpg',time:'2015-2-9',title:'枫林绿洲'},
			{img:'cache/img/000.jpg',time:'2015-2-9',title:'枫林绿洲'},
			
		]
		
		$scope.closeModel=function (){

			$scope.modal.remove();

		}
	}])
})