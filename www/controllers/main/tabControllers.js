define(['app'], function (app) {

	app.controller('TabCtrl', ['$scope','$ionicTabsDelegate',function ($scope,$ionicTabsDelegate) {
		//console.log("TabCtrl")
		//console.log($ionicTabsDelegate)
		$scope.livingmuseumUrl = function() {
		    setTimeout(function () {
		    	//console.log("#tab/livingmuseum/index")
	            window.location = "#tab/livingmuseum/index";  
	        }, 10);
		}
		$scope.homeUrl = function() {
		    setTimeout(function () {
		    	//console.log("#tab/home/index")
	            window.location = "#tab/home/index";  
	        }, 10);
		}
		$scope.accountsUrl = function() {
		    setTimeout(function () {
		    	//console.log("#tab/accounts/index")
	            window.location = "#tab/accounts/index";  
	        }, 10);
		}
		
	}])
})