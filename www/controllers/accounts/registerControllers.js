define(['app','mainService'], function (app) {

	app.register.controller('registerCtrl', ['$scope','mainAjax',function ($scope,mainAjax) {
		
		$scope.userinfo={	//初始化用户名、密码
			user_name : window.localStorage['user_name']==undefined ? '' : window.localStorage['user_name'],
			password : window.localStorage['password']==undefined ? '' : window.localStorage['password'],
		}











		//注册成功
		$scope.registSuccessFunction=function(_result){
			//将用户信息写入缓存
			var userCache = {
	  			user_name : $scope.userinfo.user_name,
	  			password : $scope.userinfo.password,
	  			id : _result.data.id,
	  			pid : _result.data.pid,
	  			mobile : _result.data.mobile,
	  			mail : _result.data.mail,
	  			group_id : _result.data.group_id,
	  			state : _result.data.state,
	  			sso_sid : localStorage['sso_sid'],
	  		}
	  		localStorage['userCache'] = JSON.stringify(userCache);
			// console.log(JSON.parse(localStorage['userCache']).user_name)
			if(_result.data.group_id == '1') {	//业主角色
				window.location.href = '#/accounts/index';
			} else if(_result.data.group_id == '5') {	//监理角色
				window.location.href = '#/monitor/index';
			}
		}
		//注册错误
		$scope.registErrorFunction=function(_result){
			alert(_result.error);
		}
		//点击注册
		$scope.registClick=function(){

			try{
				$scope.userinfo.client_id = localStorage['client_id'];
				$scope.userinfo.token = localStorage['token'];
				$scope.userinfo.sso_sid = localStorage['sso_sid'];
			} catch(err) {
				console.log('registClick: ' + err);
			}
			if($scope.userinfo.user_name.trim() == '' || $scope.userinfo.password.trim() == ''){
				alert("用户名和密码不能为空！")
				return;
			} else {
				var client = new HproseHttpClient("http://passport.zsj.test/Open/",["user_login"]);
				client.user_login( $scope.userinfo, function(result) {
					if(result.code==200){	//验证成功
				  		$scope.loginSuccessFunction(result);
					} else {	//验证失败
						$scope.loginErrorFunction(result);
					}
				},function(name,err) {
					console.log(name + ' : ' + err);
				});
			}
	    } 



	}])
})