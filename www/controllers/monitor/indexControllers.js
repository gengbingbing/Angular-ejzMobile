define(['app'], function (app) {

	app.register.controller('IndexCtrl', ['$scope',function ($scope) {
		console.log("IndexCtrl")
		$scope.logout=function(){
			client=new HproseHttpClient("http://server.beesns.cn/index.php?m=member&c=index",["mobile_logout"])
			client.mobile_logout( window.localStorage['sso'],function(result) {
				console.log(result)
				setTimeout(function () {
		          window.location = "#/accounts/login";  
		        }, 10);
			},function(name, err) {
				console.log(err);
			});
		}
		
	}])
})