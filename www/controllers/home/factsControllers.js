define(['app'], function (app) {

		app.register.controller('facts', ['$scope',function($scope){
			console.log("facts")
			  $scope.names = 'Pajjket';
			  $scope.age = 99333333333;
			  $scope.sex = '我是男的';
			  $scope.say = function() {
			    alert('Hello，我是弹出消息');
			  };
		}])


})