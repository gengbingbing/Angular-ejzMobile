define(['app','mainService', 'utilsService'], function (app) {
	//登录
	app.register.controller('passwordCtrl', ['$scope', 'mainAjax', 'utils', '$templateCache', function ($scope, mainAjax, utils, $templateCache) {
		//计数处理事件
		$scope.countFunc = function(resultSecond){
			$scope.btnSend = {
				classname : resultSecond.lastSecond>0 ? 'btn_validSend_no' : 'btn_validSend',
				txt : resultSecond.lastSecond>0 ? resultSecond.lastSecond + ' 秒后可重新发送' : '发送短信验证码'
			}
		}
		$scope.initData = function(){
			// 作用域标记变量
			$scope.varData = {
				sendEnabled : true	//读秒是否禁用，防止此轮读秒未完成就执行下一轮读秒
			}
			//初始化读秒，防止页面刷新后秒数置零
			if(localStorage.getItem('resultSecond')!=undefined && localStorage.getItem('resultSecond')!=null){
				var resultSecond = JSON.parse(localStorage.getItem('resultSecond'));
				$scope.btnSend = {	//初始化读秒
					classname : resultSecond.lastSecond>0 ? 'btn_validSend_no' : 'btn_validSend',
					txt : resultSecond.lastSecond>0 ? resultSecond.lastSecond + ' 秒后可重新发送' : '发送短信验证码'
				}
				if(resultSecond.lastSecond>0){	//继续读秒
					utils.timeCount(resultSecond.lastSecond, $scope.countFunc);
					$scope.varData.sendEnabled = false;
				}
			}
			//预加载模板
			$templateCache.removeAll();	//移除所有模板内容，释放内存
			$templateCache.put('templates/mycenter/successTem.html',utils.getTemplates('templates/mycenter/successTem.html'));	//注册成功模板

			$scope.userData = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : new Object();//同步用户数据
			$scope.user = $scope.userData;	//页面所需用户信息
		}
		
		//发送短信验证码
		$scope.validSend = function(){
			//验证手机号
			if(utils.chkMobile($scope.user.telephone)){
				if($scope.varData.sendEnabled){	//发送按钮可用
					utils.timeCount(120, $scope.countFunc);
					$scope.varData.sendEnabled = false;
				}
			} else {
				utils.alert('请输入正确的手机号');
				return;
			}	
		}		

		//移除Modal
		$scope.closeModal = function(){
			$scope.modal.remove(); 
		}

		//下一步
		$scope.operateSuccess = function(){

			//检测手机号格式
			if(!utils.chkMobile($scope.user.telephone)){
				utils.alert('请输入正确的手机号');
				return;
			}
			if(!utils.chkNull($scope.user.validate)){
				utils.alert('请输入验证码');
				return;
			}

			// if(手机号存在){

				//----------------此处提交数据，成功后执行以下语句
				$scope.userData.telephone = $scope.user.telephone;
				localStorage.removeItem('user');
				localStorage.setItem('user', JSON.stringify($scope.userData));

				utils.modal('templates/mycenter/successTem.html', $scope);

				//定时跳转
				utils.timeCount(5, function(resultSecond){
					$scope.resultSecond = resultSecond;
					resultSecond.currSecond>=3 ? window.location.href='#/mycenter/my' : '';	//3秒后父页面跳转(loading时间约2秒)
					resultSecond.currSecond>=5 ? $scope.closeModal() : '';	//5秒后关闭弹层(避免提前关闭看到重设密码页)
				});
			// } else {
				// utils.alert('该手机号未与易家装业主账户绑定，请在网页版易家装网站进行此操作');
			// }

		}

	}])


})
