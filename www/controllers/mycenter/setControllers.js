define(['app','mainService','utilsService'],function (app){
	
	app.register.controller('setCtrl', ['$scope','mainAjax', 'utils', '$templateCache', function ($scope, mainAjax, utils, $templateCache) {
		$scope.initData = function(){
			//预加载模板
			$templateCache.removeAll();	//移除所有模板内容，释放内存
			
			if (localStorage.getItem('user')) {
				$scope.userData = localStorage.getItem('user') != 'undefined' ? JSON.parse(localStorage.getItem('user')) : new Object();
				$scope.userData.notifyState = utils.chkNull($scope.userData.notifyState) ? true : false;
			} else {
				utils.gotoLogin();
			}

		}

		//是否接收消息通知开关切换
	    $scope.pushNotificationChange = function() {
	    	localStorage.setItem('user', JSON.stringify($scope.userData));
	    	console.log();
	    };

	    /*================双向绑定的数据,判断缓存大小并显示------------view样式需改变================*/
        var cachesize = ((JSON.stringify(localStorage.getItem('chatLog')).length) / 1024).toFixed(2);
        if (cachesize == 0){
        	$scope.cache = 0 + " B";
        } else if (cachesize < 1024) {
        	$scope.cache = cachesize + " kb";
        } else {
        	$scope.cache = (cachesize/1024).toFixed(2) + " Mb";
        }
		/*================双向绑定的数据,判断缓存大小并显示------------view样式需改变================*/

		//清理缓存
		$scope.clearCache=function(){
			utils.showDialog(function(event){
				if(utils.chkNull(localStorage.getItem('user'))) {
					$scope.userBak = {
						username: JSON.parse(localStorage.getItem('user')).username,	//用户名
						password: JSON.parse(localStorage.getItem('user')).password,	//密码
						loginState: JSON.parse(localStorage.getItem('user')).loginState,	//登录状态
						notifyState: JSON.parse(localStorage.getItem('user')).notifyState	//是否接收消息通知
					}
				}
				localStorage.clear();
                $scope.cache = 0+"kb";
				
				localStorage.setItem('user', JSON.stringify($scope.userBak));				
				// utils.alert('缓存数据清理成功!');
			},'', $scope);
		}
		//退出
		$scope.quit=function(){
			utils.showDialog(function(event){
				//--------------此处做退出请求
				//退出成功
				$scope.userData.loginState = false;	//更新登录状态
				localStorage.setItem('user', JSON.stringify($scope.userData)); //更新缓存
				utils.gotoLogin();
			}, '<p style="padding-top:10px; text-indent:2em;">确定退出应用吗?</p>', $scope);
		}

	}])
})