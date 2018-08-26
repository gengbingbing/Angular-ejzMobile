define(['app'], function (app) {
	//跳转到设计师列表
	app.register.directive('desginer', ['$document','utils','$timeout',function($document,utils,$timeout) {
		return{
			restrict: 'A',
			replace: true,
			scope :true,
			link:function(scope, element, attrs) {
				element.bind("click",function(event){ 
					/*
					 加入延迟的时间
					 */
					// scope.modal.remove();  
				    scope.$parent.$parent.$parent.closePayInfo();
				    scope.$parent.$parent.$parent.masklayerShowHideClass="RightColumnParentclassNotNone";
			        scope.$parent.$parent.$parent.DynamicTem='templates/main/invitDesginer.html'; 

			        // scope.$parent.$parent.$parent.desginElem=scope.company;
			        // scope.$parent.$parent.$parent.decorcompany.splice(scope.$parent.$parent.$parent.desginElem.desginerId-1,1);
			        scope.$apply();   
				})
			}
		}
	}]);

	//进行设计师列表选中项的判断，并跳到设计师详信息界面
	app.register.directive('desginer2', ['$document','utils',function($document,utils){
		return{
			restrict: 'A',
			replace: true,
			link:function(scope, element, attrs) {
				element.bind("click",function(event){
         			scope.$parent.$parent.$parent.desginElem = scope.company;
         			// scope.$parent.$parent.$parent.desginElem2 = scope.company;
         			scope.$parent.$parent.$parent.masklayerShowHideClass2 = "RightColumnParentclassNotNone";
         			scope.$parent.$parent.$parent.DynamicTem2 = "templates/main/desginCenterTem.html";
         			// utils.modal('templates/main/desginCenterTem.html', scope,1);
         			// console.log(scope.$parent.$parent.$parent.decorcompany[scope.$parent.$parent.$parent.desginElem.desginerId-1].name);
         			scope.$apply();    
				})
			}
		}
	}]);

	

	//跳转到评价设计师界面
	app.register.directive('desginer3', ['$document',function($document) {
		return{
			restrict: 'A',
			replace: true,
			scope: true,
			link:function(scope, element, attrs) {
				element.bind("click",function(event){
					scope.modal.remove();
					scope.$parent.$parent.$parent.masklayerShowHideClass="RightColumnParentclassNotNone";
					scope.$parent.$parent.$parent.DynamicTem='templates/main/searchalertViews.html';	
					scope.$parent.$parent.$parent.state = '已支付设计费';
					scope.$parent.$parent.$parent.changeState(1);
					scope.$apply();    
				})
			}
		}
	}]);

	//设计师评价界面的信息
    app.register.directive('desgin4', ['$document',function($document) {
		return{
			restrict: 'A',
			replace: true,
			scope: true,
			link:function(scope, element, attrs) {
				element.bind("click",function(event){
					  scope.$parent.$parent.$parent.evalDesginer=scope.di;
					  scope.$apply(); 
					  // console.log(scope.$parent.$parent.$parent.evalDesginer);
				})
			}
		}
	}]);

	//淘汰设计
	app.register.directive('desginer5', ['$document','utils',function($document,utils) {
		return{
			restrict: 'A',
			replace: true,
			scope :true,
			link:function(scope, element, attrs) {
				element.bind("click",function(event){ 
					scope.$parent.$parent.$parent.masklayerShowHideClass="RightColumnParentclassNotNone";
			        scope.$parent.$parent.$parent.DynamicTem='templates/main/invitDesginer.html';
			        scope.$apply();     
				})
			}
		}
	}]);

/*	//对于已经预约的设计师进行数据的清除，防止再次预约的时候重复预约
	app.register.directive('desginer6', ['$document','utils',function($document,utils) {
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
	}]);*/


	//进行监理选中列表的判断，并跳到对应的监理详细界面
	app.register.directive('supervision1', ['$document','utils',function($document,utils){
		return{
			restrict: 'A',
			replace: true,
			link:function(scope, element, attrs) {
				element.bind("click",function(event){   
         			scope.$parent.$parent.$parent.supervisionElem=scope.sup;
         			scope.$parent.$parent.$parent.masklayerShowHideClass2 = "RightColumnParentclassNotNone";
         			scope.$parent.$parent.$parent.DynamicTem2 = "templates/main/supervisionCenterTem.html";
         			console.log(scope.$parent.$parent.$parent.masklayerShowHideClass2 )
         			// utils.modal('templates/main/supervisionCenterTem.html', scope,1);
         			// console.log(scope.$parent.$parent.$parent.decorcompany[scope.$parent.$parent.$parent.desginElem.desginerId-1].name);
         			//console.log(scope.$parent.$parent.$parent.supervisionElem)
         			scope.$apply();    
				})
			}
		}
	}]);

	//进行装修公司选中列表的判断，并跳到对应的装修公司详细界面
	app.register.directive('company', ['$document','utils',function($document,utils){
		return{
			restrict: 'A',
			replace: true,
			link:function(scope, element, attrs) {
				element.bind("click",function(event){   
         			scope.$parent.$parent.$parent.companyElem=scope.com;
         			scope.$parent.$parent.$parent.masklayerShowHideClass2 = "RightColumnParentclassNotNone";
         			scope.$parent.$parent.$parent.DynamicTem2 = "templates/main/companyCenterTem.html";
         			// utils.modal('templates/main/companyCenterTem.html', scope,1);
         			scope.$apply();    
				})
			}
		}
	}]);

	//进行装修公司的中标和淘汰
	app.register.directive('company1', ['$document','utils',function($document,utils){
		return{
			restrict: 'A',
			replace: true,
			link:function(scope, element, attrs) {
				element.bind("click",function(event){   
				    scope.$parent.$parent.$parent.masklayerShowHideClass="RightColumnParentclassNotNone";
			        scope.$parent.$parent.$parent.DynamicTem='templates/main/invitCompany.html';  
			        scope.$parent.$parent.$parent.companyElem=scope.com;
			        // console.log(scope.$parent.$parent.$parent.companyElem.companyId)
			        // scope.$parent.$parent.$parent.decorateCompany.splice(scope.$parent.$parent.$parent.companyElem.companyId-1,1);
			        scope.$apply();   
				})
			}
		}
	}]);

	/*app.register.directive('iconinfo', ['$document','utils',function($document,utils){
		return{
			restrict: 'A',
			replace: true,
			link:function(scope, element, attrs) {
				element.bind("click",function(event){
         			scope.$parent.$parent.$parent.desginElem = scope.company;
         			console.log(scope.company)
         			scope.$parent.$parent.$parent.masklayerShowHideClass2 = "RightColumnParentclassNotNone";
         			scope.$parent.$parent.$parent.DynamicTem2 = "templates/main/desginCenterTem.html";
         			scope.$apply();    
				})
			}
		}
	}]);
*/


})




