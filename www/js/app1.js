define(['angularAMD','ngCordova','angular-block-ui','angular-response-lag'], function (angularAMD) {
  var app = angular.module("app", ['ui.router','ngCordova','ionic','blockUI','responseLag']);
  app.config(['blockUIConfig','responseLagConfig',function(blockUIConfig,responseLagConfig) {
    blockUIConfig.message = 'loging.....';
    blockUIConfig.delay = 100;
    blockUIConfig.template = '<div class="block-ui-overlay" style="opacity: {{state.opacity}};"></div>'
                           + '<div class="block-ui-message-container" aria-live="assertive" aria-atomic="true">'
                           + '<div class="block-ui-message ng-binding" ng-class="$_blockUiMessageClass">{{state.message}}</div>'
                           + '</div>';
    responseLagConfig.enabled = true;
    responseLagConfig.timeout.min = 750;
    responseLagConfig.timeout.max = 2500;
    responseLagConfig.excludes.push(/.*\.md/i);
  }])
  app.config(function ($stateProvider, $urlRouterProvider) {
    //console.log($stateProvider)
      $stateProvider
         .state('index', angularAMD.route({
            url: "/index",
            //controller: 'index',
            templateUrl:  G.path.templates+"/indexTem.html",
            //controllerUrl: G.path.controllers+'/main/indexControllers.js'
          }))
          .state('tabs', angularAMD.route({
            url: "/tab",
            abstract: true,
            templateUrl:  G.path.templates+"/tabsTem.html"
          }))

          .state('tabs.home', angularAMD.route({
            url: "/home/:cnatactId",
            views: {
              "home-tab": {
                /*controller: 'HomeCtrl',
                templateUrl: G.path.templates+"/homeTem.html",
                controllerUrl: G.path.controllers+'/main/mainControllers.js'*/
                templateUrl: function (rp) { console.log(rp);return G.path.views+"/home/"+rp.cnatactId+"Tem.html" },
                resolve: {
                  load: ['$q', '$rootScope', '$location',function ($q, $rootScope,$location) {
                    var path=$location.path();
                    var parsePath=path.split("/");
                    var parentPath=parsePath[2]
                    var controlleName=parsePath[3]
                    console.log(parsePath,controlleName)
                    var loadController =  G.path.controllers+'/home/'+controlleName+ 'controllers.js';                 
                    var deferred = $q.defer();
                    require([loadController], function () {
                        $rootScope.$apply(function () {
                            deferred.resolve();
                        });
                    });
                    return deferred.promise;
                  }]
                }
              }
            }
          }))
          

 .state('tabs.livingMuseum', angularAMD.route({
            url: "/livingMuseum/:cnatactId",
            views: {
              "livingMuseum-tab": {
                /*controller: 'HomeCtrl',
                templateUrl: G.path.templates+"/homeTem.html",
                controllerUrl: G.path.controllers+'/main/mainControllers.js'*/
                templateUrl: function (rp) { console.log(rp);return G.path.views+"/livingMuseum/"+rp.cnatactId+"Tem.html" },
                resolve: {
                  load: ['$q', '$rootScope', '$location',function ($q, $rootScope,$location) {
                    var path=$location.path();
                    var parsePath=path.split("/");
                    var parentPath=parsePath[2]
                    var controlleName=parsePath[3]
                    console.log(parsePath,controlleName)
                    var loadController =  G.path.controllers+'/livingMuseum/'+controlleName+ 'controllers.js';                 
                    var deferred = $q.defer();
                    require([loadController], function () {
                        $rootScope.$apply(function () {
                            deferred.resolve();
                        });
                    });
                    return deferred.promise;
                  }]
                }
              }
            }
          }))
          

 .state('tabs.index', angularAMD.route({
            url: "/mycenter/:cnatactId",
            views: {
              "index-tab": {
                /*controller: 'HomeCtrl',
                templateUrl: G.path.templates+"/homeTem.html",
                controllerUrl: G.path.controllers+'/main/mainControllers.js'*/
                templateUrl: function (rp) { console.log(rp);return G.path.views+"/mycenter/"+rp.cnatactId+"Tem.html" },
                resolve: {
                  load: ['$q', '$rootScope', '$location',function ($q, $rootScope,$location) {
                    var path=$location.path();
                    var parsePath=path.split("/");
                    var parentPath=parsePath[2]
                    var controlleName=parsePath[3]
                    console.log(parsePath,controlleName)
                    var loadController =  G.path.controllers+'/mycenter/'+controlleName+ 'controllers.js';                 
                    var deferred = $q.defer();
                    require([loadController], function () {
                        $rootScope.$apply(function () {
                            deferred.resolve();
                        });
                    });
                    return deferred.promise;
                  }]
                }
              }
            }
          }))

//注册
 .state('tabs.register', angularAMD.route({
            url: "/mycenter/:cnatactId",
            views: {
              "register-tab": {
                /*controller: 'HomeCtrl',
                templateUrl: G.path.templates+"/homeTem.html",
                controllerUrl: G.path.controllers+'/main/mainControllers.js'*/
                templateUrl: function (rp) { console.log(rp);return G.path.views+"/mycenter/"+rp.cnatactId+"Tem.html" },
                resolve: {
                  load: ['$q', '$rootScope', '$location',function ($q, $rootScope,$location) {
                    var path=$location.path();
                    var parsePath=path.split("/");
                    var parentPath=parsePath[2]
                    var controlleName=parsePath[3]
                    console.log(parsePath,controlleName)
                    var loadController =  G.path.controllers+'/mycenter/'+controlleName+ 'controllers.js';                 
                    var deferred = $q.defer();
                    require([loadController], function () {
                        $rootScope.$apply(function () {
                            deferred.resolve();
                        });
                    });
                    return deferred.promise;
                  }]
                }
              }
            }
          }))

          /* .state('tabs.me', angularAMD.route({
            url: "/me",
            views: {
              "me-tab": {
                /*controller: 'HomeCtrl',
                templateUrl: G.path.templates+"/homeTem.html",
                controllerUrl: G.path.controllers+'/main/mainControllers.js'
                templateUrl: function (rp) {  return G.path.templates+"/loginTem.html";  },
                resolve: {
                  load: ['$q', '$rootScope', function ($q, $rootScope,$location) {
                    console.log($location)
                    var loadController =  G.path.controllers+'/login/loginControllers.js';                 

                    var deferred = $q.defer();
                    require([loadController], function () {
                        $rootScope.$apply(function () {
                            deferred.resolve();
                        });
                    });
                    return deferred.promise;
                  }]
                }
              }
            }
          }))*/




 /*.state('tabs.about', angularAMD.route({
            url: "/about",
            views: {
              "about-tab": {
                /*controller: 'HomeCtrl',
                templateUrl: G.path.templates+"/homeTem.html",
                controllerUrl: G.path.controllers+'/main/mainControllers.js'
                templateUrl: function (rp) {  return G.path.templates+"/activTem.html";  },
                resolve: {
                  load: ['$q', '$rootScope', function ($q, $rootScope,$location) {
                    console.log($location)
                    var loadController =  G.path.controllers+'/activ/activControllers.js';                 

                    var deferred = $q.defer();
                    require([loadController], function () {
                        $rootScope.$apply(function () {
                            deferred.resolve();
                        });
                    });
                    return deferred.promise;
                  }]
                }
              }
            }
          }))*/

           $urlRouterProvider.otherwise("/index");
          //console.log(G.path.controllers)
  })

  app.controller("indexController", ['$scope', '$http', '$templateCache',function ($scope, $http,$templateCache) {
   // console.log("111111");
   
    $scope.initializeController = function(){
      $http.get('templates/tabsTem.html', {  
        cache : $templateCache  
      });
      $http.get('templates/homeTem.html', {  
        cache : $templateCache  
      });
       $http.get('templates/mylongform.html', {  
        cache : $templateCache  
      });
     
    }
  }])
 // console.log(app)
  return angularAMD.bootstrap(app);
})