define(['app','mainService', 'utilsService'], function (app) {
	//登录
	app.register.controller('loginCtrl', ['$scope', 'mainAjax', 'utils', '$templateCache', function ($scope, mainAjax, utils, $templateCache) {
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
			$templateCache.put('templates/mycenter/passwordTem.html',utils.getTemplates('templates/mycenter/passwordTem.html'));	//修改密码模板
			
			//存在用户名和密码缓存时，自动填充缓存数据，跳转到个人中心主页
			if(localStorage.getItem('user')){	//存在用户名密码缓存
				$scope.userData = JSON.parse(localStorage.getItem('user'));	
				

				//校验通过，更新登录状态(true,false),跳转页面
				if($scope.userData.loginState){

					//此处校验用户身份
					// if(身份通过){

						window.location.href="#/mycenter/my";
					// } else {	//跳转登陆页
					// 	utils.gotoLogin();
					// 	$scope.userData.loginState == 0;	//更新登录状态
					// }
				} else {
					utils.gotoLogin();
				}
			} else {
				$scope.userData = new Object();
			}
		}
		//发送短信验证码
		$scope.validSend = function(){
			if($scope.varData.sendEnabled){
				utils.timeCount(120, $scope.countFunc);
				$scope.varData.sendEnabled = false;
			}
		}

		//登录
		$scope.login = function() {	
			if(!utils.chkNull($scope.userData.username)){
				utils.alert('用户名不能为空');
				return;
			}
			if(!utils.chkNull($scope.userData.password)){
				utils.alert('密码不能为空');
				return;
			}
			// mainAjax.login($scope.successFunction,$scope.errorFunction);
		
			 $scope.userData.loginState = true;		//修改登录状态
		     localStorage.setItem('user', JSON.stringify($scope.userData));	//用户所有信息

		     // window.location.href='#/mycenter/my';	//跳转模板centerViews
			/******此处作登录查询******/

			// 登录成功,用户信息存入缓存

			 $scope.userData.loginState = true;		//修改登录状态
		     localStorage.setItem('user', JSON.stringify($scope.userData));	//用户所有信息

		     window.location.href='#/mycenter/my';	//跳转模板centerViews

			/******此处作登录查询******/

		};
		$scope.successFunction = function(response){
			$scope.userData = response;
			if($scope.userData.code == 200){
			  $scope.userData.loginState = true;		//修改登录状态
		      localStorage.setItem('user', JSON.stringify($scope.userData));	//用户所有信息
		      window.location.href='#/mycenter/my';	//跳转模板centerViews
			}

		}
		$scope.errorFunction  = function(response){
			$scope.userData = response;
			if($scope.userData.code == 300){
				console.log(userData.error)
			}
			// console.log(response);
		}
		//‘自动登录’勾选事件
		$scope.memoryPwd = function(){
			$scope.userData.memory = !$scope.userData.memory;
		}

		//找回密码modal
		$scope.updatePwdModal = function(){
	        utils.modal('templates/mycenter/passwordTem.html', $scope);
		}

		//操作成功
		$scope.operateSuccess = function(){
			utils.modal('templates/mycenter/successPwdTem.html', $scope);

			//---------此处获取密码,更新用户信息


			//定时跳转
			utils.timeCount(5, function(resultSecond){
				$scope.resultSecond = resultSecond;
				resultSecond.currSecond>=3 ? window.location.href='#/mycenter/my' : '';	//3秒后父页面跳转(loading时间约2秒)
				resultSecond.currSecond>=5 ? $scope.closeModal() : '';	//5秒后关闭弹层(避免提前关闭看到注册页)
			});


		}

 
		// $scope.main="1111111111"
		// $scope.userinfo={
		// 	username:"yz110",
		// 	password:"1234562"
		// }
		// console.log(JSON.stringify($scope.userinfo))


		/*$scope.loginsuccessFunction=function(response){
			console.log(response)
			window.localStorage['sso'] = JSON.stringify(response.sso_sid);
			var name = window.localStorage['sso'] || 'you';

			console.log('Hello,' + name+window.localStorage['name'] );

		}
		$scope.loginerrorFunction=function(response){

		}
		mainAjax.login($scope.loginsuccessFunction,$scope.loginerrorFunction)*/
		/*client=new HproseHttpClient("http://server.beesns.cn/index.php?m=member&c=index",["mobile_login","check_login"])
		client.mobile_login($scope.userinfo.username,$scope.userinfo.password,window.localStorage['sso'], function(result) {
        	
        	window.localStorage['userinfo']=JSON.stringify(result.data);
        	
        	$scope.xie=window.localStorage['userinfo']
        	
    	}, function(name, err) {
        	console.log(err);
   		});

		client.check_login( window.localStorage['sso'],function(result) {
			console.log(result)
		},function(name, err) {
        	console.log(err);
   		});*/

		/*$scope.loginsuccessFunction2=function(response){
			console.log(response)
			
		} 
   		mainAjax.login($scope.loginsuccessFunction2,$scope.loginerrorFunction)*/
   		//var sUserAgent = navigator.userAgent;
   		

	}])


})