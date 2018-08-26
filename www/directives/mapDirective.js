define(['app'], function (app) {
	//跳转到设计师详情
	app.register.directive('map', ['$document','utils',function($document,utils) {
		return{
			restrict: 'A',
			replace: true,
			scope :true,
			link:function(scope, element, attrs) {
				element.bind("click",function(event){ 
					// scope.$parent.$parent.$parent.$parent.$parent.$parent.masklayerShowHideClass2 = "RightColumnParentclassNotNone";
					scope.$parent.$parent.$parent.$parent.desginer2=scope.de;
					scope.$parent.$parent.$parent.$parent.masklayerShowHideClass3 = "RightColumnParentclassNotNone";
					scope.$parent.$parent.$parent.$parent.masklayerShowHideClass2 = "RightColumnParentclassNotNone";
					scope.$parent.$parent.$parent.$parent.DynamicTem2 = 'templates/map/desginerDetailsOther.html';
					scope.$parent.$parent.$parent.$parent.ceshi = ' ';
         			scope.$apply();  
				})
			}
		}
	}]);
 
    //跳转到监理详情
	app.register.directive('map2', ['$document','utils',function($document,utils) {
		return{
			restrict: 'A',
			replace: true,
			scope :true,
			link:function(scope, element, attrs) {
				element.bind("click",function(event){ 
					scope.$parent.$parent.$parent.$parent.supervision2=scope.su;
					scope.$parent.$parent.$parent.$parent.masklayerShowHideClass3 = "RightColumnParentclassNotNone";
					scope.$parent.$parent.$parent.$parent.masklayerShowHideClass2 = "RightColumnParentclassNotNone";
					scope.$parent.$parent.$parent.$parent.DynamicTem2 = 'templates/map/supervisionDetailsOther.html';
					scope.$parent.$parent.$parent.$parent.ceshi = ' ';
         			scope.$apply();  
				})
			}
		}
	}]);

	//跳转到商家详情
	app.register.directive('map3', ['$document','utils',function($document,utils) {
		return{
			restrict: 'A',
			replace: true,
			scope :true,
			link:function(scope, element, attrs) {
				element.bind("click",function(event){ 
					scope.$parent.$parent.$parent.merchant2=scope.me;
					scope.$parent.$parent.$parent.$parent.masklayerShowHideClass3 = "RightColumnParentclassNotNone";
					scope.$parent.$parent.$parent.$parent.masklayerShowHideClass2 = "RightColumnParentclassNotNone";
					scope.$parent.$parent.$parent.$parent.DynamicTem2 = 'templates/map/mercahntsDetailsOther.html';
					scope.$parent.$parent.$parent.$parent.ceshi = ' ';
					console.log(scope.$parent.$parent.$parent.merchant)
         			scope.$apply();  
				})
			}
		}
	}]);

	//跳转到装修公司详情
	app.register.directive('map4', ['$document','utils',function($document,utils) {
		return{
			restrict: 'A',
			replace: true,
			scope :true,
			link:function(scope, element, attrs) {
				element.bind("click",function(event){ 
					scope.$parent.$parent.$parent.$parent.company2=scope.ma;
					scope.$parent.$parent.$parent.$parent.masklayerShowHideClass3 = "RightColumnParentclassNotNone";
					scope.$parent.$parent.$parent.$parent.masklayerShowHideClass2 = "RightColumnParentclassNotNone";
					scope.$parent.$parent.$parent.$parent.DynamicTem2 = 'templates/map/companyDetailsOther.html';
					scope.$parent.$parent.$parent.$parent.ceshi = ' ';
					console.log(scope.$parent.$parent.$parent.$parent.company2);
                    scope.$apply();  
				})
			}
		} 
	}]);

	//跳转到业主详情
	app.register.directive('map5', ['$document','utils',function($document,utils) {
		return{
			restrict: 'A',
			replace: true,
			scope :true,
			link:function(scope, element, attrs) {
				element.bind("click",function(event){ 
					scope.$parent.$parent.$parent.$parent.owner2=scope.ow;
				    scope.$parent.$parent.$parent.$parent.masklayerShowHideClass3 = "RightColumnParentclassNotNone";
					scope.$parent.$parent.$parent.$parent.masklayerShowHideClass2 = "RightColumnParentclassNotNone";
					scope.$parent.$parent.$parent.$parent.DynamicTem2 = 'templates/map/ownerDetailsOther.html';
					scope.$parent.$parent.$parent.$parent.ceshi = ' ';
					console.log(scope.$parent.$parent.$parent.ow2)
         			scope.$apply();  
				})
			}
		}
	}]);

	//关闭页面
	app.register.directive('map1', ['$document','utils',function($document,utils) {
		return{
			restrict: 'A',
			replace: true,
			scope :true,
			link:function(scope, element, attrs) {
				element.bind("click",function(event){ 
					 scope.modal.remove();
				})
			}
		}
	}]);
})




