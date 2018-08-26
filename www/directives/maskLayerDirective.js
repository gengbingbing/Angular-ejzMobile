define(['app'], function (app) {
	app.register.directive('masklayer', ['$document','$timeout',function($document,$timeout) {	
	
		return{
			restrict: 'A',
			replace: true,
			
			link:function(scope, element, attrs) {
				element.bind('mousedown', function(event) {
					scope.masklayerSignOut='ng-leave-active';				
					$timeout(function(){
		            	scope.masklayerShowHideClass='RightColumnParentclassNone';
		            	scope.masklayerShowHideClass3='RightColumnParentclassNone';
		            	scope.masklayerSignOut='ng-enter-active';
		            	scope.DynamicTem='';
		          	},550);
					scope.$apply();
				})
			}
		}
	}])
})