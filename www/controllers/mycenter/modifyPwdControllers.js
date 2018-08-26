define(['app','mainService', 'utilsService'], function (app) {
	//登录
	app.register.controller('modifyPwdCtrl', ['$scope', 'mainAjax', 'utils', '$templateCache', function ($scope, mainAjax, utils, $templateCache) {
		
		$scope.initData = function(){
			
			//预加载模板
			$templateCache.removeAll();	//移除所有模板内容，释放内存
			$templateCache.put('templates/mycenter/successTem.html',utils.getTemplates('templates/mycenter/successTem.html'));	//注册成功模板

			$scope.userData = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : new Object();
			$scope.user = $scope.userData;
		}
		
		//移除Modal
		$scope.closeModal = function(){
			$scope.modal.remove(); 
		}
		//下一步
		$scope.updatePwd = function(){
			//空检测
			if($scope.user.password=='' || $scope.user.newpwd=='' || $scope.user.renewpwd==''){
				utils.alert('请完善密码信息');
				return;
			}
			//新密码一致性检测
			if($scope.user.newpwd != $scope.user.renewpwd){
				utils.alert('新密码输入不一致，请重新输入');
				return;
			}


			//----------------此处提交数据，成功后执行以下语句
			
			$scope.userData.password = $scope.user.newpwd;
			localStorage.removeItem('user');
			localStorage.setItem('user', JSON.stringify($scope.userData));

			utils.modal('templates/mycenter/successTem.html', $scope);

			//定时跳转
			utils.timeCount(5, function(resultSecond){
				$scope.resultSecond = resultSecond;
				resultSecond.currSecond>=3 ? window.location.href='#/mycenter/my' : '';	//3秒后父页面跳转(loading时间约2秒)
				resultSecond.currSecond>=5 ? $scope.closeModal() : '';	//5秒后关闭弹层(避免提前关闭看到重设密码页)
			});

		}

 

	}])


})
