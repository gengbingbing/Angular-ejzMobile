define(['app'], function (app) {
 app.register.service('ajaxService',['$http','blockUI',function($http,blockUI){
 	this.ajaxGet=function(route,successFunction,errorFunction){
 		// blockUI.start();
        setTimeout(function () {
            $http({ method: 'JSONP', url: route,params:{callback:'JSON_CALLBACK'} }).success(function (response, status, headers, config) {
                blockUI.stop();
                successFunction(response, status);
            }).error(function (response) {
                blockUI.stop();
                errorFunction(response);
            });
        }, 1000);

 	}
 	this.ajaxPost = function (data, route, successFunction, errorFunction) {
        // blockUI.start();
        setTimeout(function () {
            $http({method:'POST',url:route, data:data}).success(function (response, status, headers, config) {
                blockUI.stop();
                successFunction(response, status);
            }).error(function (response) {
                blockUI.stop();                 
                errorFunction(response);
                errorFunction(response);
            });
        }, 1000);
    }

    this.localGet = function(route, successFunction, errorFunction){
        $http.get(route).success(function(response, status) {
            successFunction(response, status);
        }).error(function(response){
            errorFunction(response);
        });
    }


 }])

})