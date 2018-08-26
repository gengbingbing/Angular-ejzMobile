define(['app','mainService', 'utilsService'],function (app){

	app.register.controller('desgincontactCtrl', ['$scope', 'mainAjax','utils','$templateCache','$ionicActionSheet',function ( $scope,mainAjax,utils,$templateCache,$ionicActionSheet){
	    //初始化页面，取消加载
	    $scope.initData=function (){
	 	    $templateCache.removeAll();
	 		$templateCache.put('templates/main/descontactTem.html',utils.getTemplates('templates/main/descontactTem.html'));	//发送验证码模板

	        if(localStorage.getItem('user')) {
	          $scope.userData = localStorage.getItem('user')!='undefined' ? JSON.parse(localStorage.getItem('user')) : new Object();
	          $scope.$watch(function(){
	            var user = JSON.parse(localStorage.getItem('user'));
	            return user;
	          }, function(newVal, oldVal){
	            $scope.userData = newVal;
	          },true);
	        } else {
	            utils.gotoLogin();
	        }
	    }

	    //选择‘男’
	    function maleFunc(){
	    	$scope.userData.sex = '男';
	    	$scope.modifyUser();
	    }
	    //选择‘女’
	    function femaleFunc(){
	    	$scope.userData.sex = '女';
	    	$scope.modifyUser();
	    }
	    //选择性别
	    $scope.modifySex = function(){
	    	//自定义按钮
	    	var btnArray = [
	    		{txt: '男', clickFunc: maleFunc},
	    		{txt: '女', clickFunc: femaleFunc},
	    	]
	    	utils.bottomPopMenu('', btnArray);
	    }

	    //移除modal
	    $scope.closeModal=function(){
	    	$scope.modal.remove();
	    }
	    //打开modal
	 	$scope.clickcontact=function(){
			utils.modal('templates/main/descontactTem.html', $scope);
	    }












	    //修改用户信息
	    $scope.modifyUser = function(){

	        /***************此处做数据修改处理***************/


	        //修改成功，存入缓存
	        localStorage.setItem('user', JSON.stringify($scope.userData));

	    }


	}])
})