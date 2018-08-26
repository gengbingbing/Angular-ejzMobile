define(['app'], function (app) {
	app.register.directive('temmode', ['$document','$timeout',function($document,$timeout) {	
		return{
			restrict: 'E',
			replace: true,
			template:'<ng:include src="tpl"></ng:include>',
			link:function(scope, element, attrs) {
				scope.tpl=attrs.tem;	
			}
		}
	}])
})
