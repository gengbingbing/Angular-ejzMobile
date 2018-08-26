define(['app','mainService','utilsService','myAdvisorDirective'],function (app){
	app.register.controller('myCtrl', ['$scope','mainAjax', 'utils', '$templateCache','websocketer', function ($scope, mainAjax, utils, $templateCache,websocketer) {

		$scope.initData = function(){
			//预加载模板
			$templateCache.removeAll();	//移除所有模板内容，释放内存
			$templateCache.put('templates/mycenter/ejbpayTem.html',utils.getTemplates('templates/mycenter/ejbpayTem.html'));
			$templateCache.put('templates/mycenter/myAdvisorTem.html',utils.getTemplates('templates/mycenter/myAdvisorTem.html'));
			$templateCache.put('templates/mycenter/couponsTem.html',utils.getTemplates('templates/mycenter/couponsTem.html'));
			$templateCache.put('templates/mycenter/yjzTem.html',utils.getTemplates('templates/mycenter/yjzTem.html'));

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
		    //优惠券兑换码
		    $scope.couponsCode = {
		    	code:''
		    };
		}


		//移除Modal
		$scope.closeModal = function(){
			$scope.modal.remove(); 
		}
		
		//iframe弹层
		$scope.openEJB = function(){
			utils.modal('templates/mycenter/ejbpayTem.html', $scope);
		}
		//初始化iframe宽高
		$scope.iframeResize = function(){
			$scope.iframeSet = {
				width: '100%', 
				height: window.parent.document.body.scrollHeight - 44
			}
		}

		$scope.hide = function(){
			document.getElementById("aa").style.display="none";
		}

		// 我的顾问---------------------------------------------------需要创建一个变量，将消息列表的内容存进去，进行累加--------------------------------------
		// function send(){
		// 	var len = JSON.stringify(localStorage.getItem('chatLog')).length;
	 //        console.log((len/1024).toFixed(2)+"kb");  
	 //        // name = JSON.parse(localStorage.getItem('user')).username;

		// 	function checkForm(o) {
		// 		var name = $.trim($('input[name=name]').val());
		// 		var avatar = $.trim($('input[name=avatar]').val());
		// 		return true;
		// 	}

		// }
		
		$scope.myAdvisor =function(){ 
			document.getElementById("aa").style.display="block";
			document.getElementById("login_submit").click();
			document.getElementById("aa").style.display="none";
		}



		//优惠券
		$scope.openCoupons = function(){
			utils.modal('templates/mycenter/couponsTem.html', $scope);
			console.log(localStorage.getItem("designconstruction"));
			console.log(localStorage.getItem("designer"));
		}
		//使用优惠券
		$scope.useCoupons = function(){
			if(utils.chkNull($scope.couponsCode.code)){
				//校验兑换码操作
				console.log($scope.couponsCode.code);

			} else {
				utils.alert('请输入优惠券兑换码');
			}
		}


		// 我的装修进度
		$scope.myProgress = function(){
			utils.modal('templates/mycenter/myProgressTem.html', $scope);
		}
		$scope.See = function() {			
			var timer = setTimeout(function(){
                $scope.closeModal();
                clearTimeout(timer);
            }, 2000);
            window.location.href='#/main/index'
		}

		// 服务条款
		$scope.agreeItems = function(){
			utils.modal('templates/mycenter/yjzTem.html', $scope);
		}

		// 测试消息列表		
		ws.onmessage = function(event) {		   
	      	// console.log(event.data);
	      	// localStorage.setItem('chatLog', localStorage.getItem('chatLog')+event.data);
	      	$scope.userimg=[
				// 动态获取收到消息人的头像，用户名以及消息				
		        {img:'cache/img/000.jpg',username:'',usermessage: "你有新消息了:" + (event.data).substr(10,50)},  
	      	];
    	}
  		
    	$scope.jpush=[
				// 动态获取收到消息人的头像，用户名以及消息				 
		        {img:'cache/img/001.jpg',username:'',usermessage: 'jPush messager'}, 
		        {img:'cache/img/002.jpg',username:'',usermessage: "aaa"},  
		        {img:'cache/img/003.jpg',username:'',usermessage: 'bbb'},
		        {img:'cache/img/004.jpg',username:'',usermessage: "ccc"},  
		        {img:'cache/img/005.jpg',username:'',usermessage: 'ddd'},
		        {img:'cache/img/006.jpg',username:'',usermessage: "eee"},     
	      	];
		
		$scope.Test = function() {
			// utils.modal('templates/messageTem.html', $scope);
			document.getElementById("bb").style.display="block";
			$scope.OpenMessage = function() {
				document.getElementById("aa").style.display="block";
				document.getElementById("login_submit").click();
				document.getElementById("aa").style.display="none";
				document.getElementById("bb").style.display="none";
			}
			$scope.hide = function() {
				document.getElementById("bb").style.display="none";
				document.getElementById("aa").style.display="none";
			}
		}

		// 设置===================================================================================

		$scope.set = function() {
			utils.modal('templates/mycenter/setTem.html', $scope);
		}

		// 是否接收消息通知开关切换------用于切换是否接受推送的按钮
	    $scope.pushNotificationChange = function() {
	    	localStorage.setItem('user', JSON.stringify($scope.userData));
	    	if(JSON.parse(localStorage.getItem('user')).notifyState) {
	    		// 启动极光推送服务
	    		utils.initPush();
	    		console.log(JSON.parse(localStorage.getItem('user')).notifyState);

	    	} else {
	    		// 停止极光推送服务
	    		utils.stopPush();
	    		console.log("禁止推送消息...");
	    		utils.alert("如果关闭，你将不能接收服务信息！");
	    	}
	    	
	    };

	    // 计算缓存
        var cachesize = ((JSON.stringify(localStorage.getItem('chatLog')).length) / 1024).toFixed(2);
        if (cachesize == 0){
        	$scope.cache = 0 + " B";
        } else if (cachesize < 1024) {
        	$scope.cache = cachesize + " kb";
        } else {
        	$scope.cache = (cachesize/1024).toFixed(2) + " Mb";
        }		

		//清理缓存
		$scope.clearCache=function(){
			utils.MyshowDialog(function(event){
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

		// 修改密码
		$scope.updataPWD = function() {
			$scope.closeModal();
		}

		// 版本更新
		$scope.app = "已是最新版本";
		$scope.updataAPP = function() {
			// if() { // 检测版本号
				utils.alert("检测到新版本,是否更新？");
			// } else {
			// 	$scope.app = "已是最新版本";
			// }
		}

		//退出
		$scope.quit=function(){
			utils.MyshowDialog(function(event){
				//--------------此处做退出请求
				//退出成功
				$scope.userData.loginState = false;	//更新登录状态
				localStorage.setItem('user', JSON.stringify($scope.userData)); //更新缓存
				$scope.closeModal();
				utils.gotoLogin();
			}, '<p style="padding-top:10px; text-indent:2em;">确定退出应用吗?</p>', $scope);
		}

		// 设置=======================================================================================

	}])
})