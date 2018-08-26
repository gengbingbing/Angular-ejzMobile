define(['app','mainService', 'utilsService'], function (app) {

	app.register.controller('registerCtrl', ['$scope', 'mainAjax', 'utils', '$templateCache', function ($scope, mainAjax, utils, $templateCache) {
		
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
				agree : false,	//同意条款，true时同意，false时不同意
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
			$templateCache.put('templates/mycenter/agreeItemsTem.html',utils.getTemplates('templates/mycenter/agreeItemsTem.html'));	//易家装服务条款
			$templateCache.put('templates/mycenter/successTem.html',utils.getTemplates('templates/mycenter/successTem.html'));	//注册成功模板

			$scope.user = {
				telephone: '13012341234',
				validate: '123456',
			}

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
		//注册
		$scope.regist = function(){
			//验证码空检测
			if(utils.chkNull($scope.user.validate)){
				if(utils.chkMobile($scope.user.telephone)){
					if($scope.varData.agree){	//同意条款,$scope.varData.agree为true

						//------------------------------------------- 此处作手机号查询，是否存在


						// 若手机号已存在于库中，则提示此手机号已注册
						// if(){	//手机号不存在于库中，存入缓存，发送短信，跳转页面
							var userData = {	//存入缓存
								username: $scope.user.telephone,
								telephone: $scope.user.telephone,

							};

							//----------------此处提交数据，成功后执行以下语句

							localStorage.removeItem('user');
							localStorage.setItem('user', JSON.stringify(userData));

							$scope.registSuccess();	//注册成功

						// } else {	// 若手机号已存在于库中，则提示此手机号已注册
						// 	utils.modal('此手机号已存在注册信息');
						// 	return;
						// }



					} else {	//不同意
						utils.alert('您没有同意易家装服务条款');
						return;
					}
				} else {
					utils.alert('请正确输入手机号');
					return;
				}
			} else {
				utils.alert('请输入验证码');
				return;
			}

			
		}

		//同意条款，变换$scope.varData.agree的状态为true还是false
		$scope.agreeItem = function(){
			$scope.varData.agree = !$scope.varData.agree;
		}
		//移除Modal
		$scope.closeModal = function(){
			$scope.modal.remove(); 
		}
		//打开服务条款弹层
		$scope.openItems = function(){
			utils.modal('templates/mycenter/agreeItemsTem.html', $scope);
		}
		//"我同意"
		$scope.agreeClick = function(){
			$scope.varData.agree = true;
			$scope.closeModal();
		}
		//"我拒绝"
		$scope.disagreeClick = function(){
			$scope.varData.agree = false;
			$scope.closeModal();
		}

		//注册成功
		$scope.registSuccess = function(){
			utils.modal('templates/mycenter/successTem.html', $scope);

			//获取密码存入user

			var vUser = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : '';

			$scope.user = vUser;

			//定时跳转
			utils.timeCount(5, function(resultSecond){
				$scope.resultSecond = resultSecond;
				resultSecond.currSecond>=3 ? window.location.href='#/mycenter/my' : '';	//3秒后父页面跳转(loading时间约2秒)
				resultSecond.currSecond>=5 ? $scope.closeModal() : '';	//5秒后关闭弹层(避免提前关闭看到注册页)
			});


		}

	}])


})