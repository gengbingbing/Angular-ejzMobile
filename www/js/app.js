define(['angularAMD','ngCordova','angular-block-ui','angular-response-lag', 'ng-baidu-map', 'angular-filter', 'jquery','bootstrap-ui'], function (angularAMD) {
  var app = angular.module("app", ['ui.router','angular.filter', 'ngCordova','ionic','blockUI','responseLag', 'ngBaiduMap', 'ui.bootstrap']);

  app.factory('websocketer', function(){
    // ws = new WebSocket("ws://192.168.184:8089/chatroom"); // 应该改为动态获取服务器的ip和端口号192.168.1.184
    ws = new WebSocket("ws://192.168.1.184:8089/chatroom");
    ws.onopen = function(event) {
      console.log("连接服务器");
    };
    return ws
  })


  app.config(['blockUIConfig','responseLagConfig',function(blockUIConfig,responseLagConfig) {
    blockUIConfig.message = 'loading.....';
    blockUIConfig.delay = 100;
    blockUIConfig.template = '<div class="block-ui-overlay"></div>'
                           + '<div class="block-ui-message-container" aria-live="assertive" aria-atomic="true">'
                           + '<div class="block-ui-message ng-binding" ng-class="$_blockUiMessageClass">{{state.message}}</div>'
                           + '</div>';
    responseLagConfig.enabled = true;
    responseLagConfig.timeout.min = 150;
    responseLagConfig.timeout.max = 1500;
    responseLagConfig.excludes.push(/.*\.md/i);
  }])
  app.config(function(baiduMapApiProvider){
       baiduMapApiProvider.version('2.1.3').accessKey('xC54jFD3kaMjy45CQhxjtnjO');
  });

  app.config(function ($stateProvider, $urlRouterProvider) {

      $stateProvider
         .state('index', angularAMD.route({
            url: "/",
            templateUrl:  G.path.templates+"/indexTem.html",
          }))
          /*.state('PageTab', angularAMD.route({
            url: "/PageTab",
            abstract: true,
            controller: 'TabCtrl',
            templateUrl:  G.path.templates+"/tabsTem.html",
            controllerUrl: G.path.controllers+'/main/tabControllers.js',
          }))*/
          .state('page', angularAMD.route({
            url: "/:section/:tree",
            views: {
              "": {
                /*controller: 'HomeCtrl',
                templateUrl: G.path.templates+"/homeTem.html",
                controllerUrl: G.path.controllers+'/main/mainControllers.js'*/
                templateUrl: function (rp) {return G.path.views+"/"+rp.section+"/"+rp.tree+"Views.html";  },
                resolve: {
                  load: ['$q', '$rootScope', '$location', function ($q, $rootScope, $location) {
                    var path = $location.path();
                    var parsePath = path.split("/");
                    var parentPath = parsePath[1];
                    var controllerName = parsePath[2];
                    // console.log(parentPath,controllerName)
                    var loadController =  G.path.controllers+'/'+parentPath+'/'+controllerName+'Controllers.js';                 

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
          
           $urlRouterProvider.otherwise("/");
          //console.log(G.path.controllers)
  })
  // app.run(['$ionicPlatform', '$rootScope','$ionicActionSheet', '$timeout','$cordovaAppVersion', '$ionicPopup', '$ionicLoading','$cordovaFileTransfer', '$cordovaFile', '$cordovaFileOpener2', function ($ionicPlatform, $rootScope,$ionicActionSheet, $timeout,  $cordovaAppVersion, $ionicPopup, $ionicLoading, $cordovaFileTransfer, $cordovaFile, $cordovaFileOpener2) {
  //       $ionicPlatform.ready(function ($rootScope) {
  //           // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
  //           // for form inputs)
  //           if (window.cordova && window.cordova.plugins.Keyboard) {
  //               cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
  //           }
  //           if (window.StatusBar) {
  //               // org.apache.cordova.statusbar required
  //               StatusBar.styleDefault();
  //           }

  //           //检测更新
  //           checkUpdate();

  //           document.addEventListener("menubutton", onHardwareMenuKeyDown, false);
  //       });


  //       // 菜单键
  //       function onHardwareMenuKeyDown() {
  //           $ionicActionSheet.show({
  //               titleText: '检查更新',
  //               buttons: [
  //                   { text: '关于' }
  //               ],
  //               destructiveText: '检查更新',
  //               cancelText: '取消',
  //               cancel: function () {
  //                   // add cancel code..
  //               },
  //               destructiveButtonClicked: function () {
  //                   //检查更新
  //                   checkUpdate();
  //               },
  //               buttonClicked: function (index) {

  //               }
  //           });
  //           $timeout(function () {
  //               hideSheet();
  //           }, 2000);
  //       };

  //       // 检查更新
  //       function checkUpdate() {
  //           var serverAppVersion = "1.0.0"; //从服务端获取最新版本
  //           //获取版本
  //           $cordovaAppVersion.getAppVersion().then(function (version) {
  //               //如果本地与服务端的APP版本不符合
  //               if (version != serverAppVersion) {
  //                   showUpdateConfirm();
  //               }
  //           });
  //       }

  //       // 显示是否更新对话框
  //       function showUpdateConfirm() {
  //           var confirmPopup = $ionicPopup.confirm({
  //               title: '版本升级',
  //               template: '1.xxxx;</br>2.xxxxxx;</br>3.xxxxxx;</br>4.xxxxxx', //从服务端获取更新的内容
  //               cancelText: '取消',
  //               okText: '升级'
  //           });
  //           confirmPopup.then(function (res) {
  //               if (res) {
  //                   $ionicLoading.show({
  //                       template: "已经下载：0%"
  //                   });
  //                   var url = "http://192.168.1.50/1.apk"; //可以从服务端获取更新APP的路径
  //                   var targetPath = "file:///storage/sdcard0/Download/1.apk"; //APP下载存放的路径，可以使用cordova file插件进行相关配置
  //                   var trustHosts = true
  //                   var options = {};
  //                   $cordovaFileTransfer.download(url, targetPath, options, trustHosts).then(function (result) {
  //                       // 打开下载下来的APP
  //                       $cordovaFileOpener2.open(targetPath, 'application/vnd.android.package-archive'
  //                       ).then(function () {
  //                               // 成功
  //                           }, function (err) {
  //                               // 错误
  //                           });
  //                       $ionicLoading.hide();
  //                   }, function (err) {
  //                       alert('下载失败');
  //                   }, function (progress) {
  //                       //进度，这里使用文字显示下载百分比
  //                       $timeout(function () {
  //                           var downloadProgress = (progress.loaded / progress.total) * 100;
  //                           $ionicLoading.show({
  //                               template: "已经下载：" + Math.floor(downloadProgress) + "%"
  //                           });
  //                           if (downloadProgress > 99) {
  //                               $ionicLoading.hide();
  //                           }
  //                       })
  //                   });
  //               } else {
  //                   // 取消更新
  //               }
  //           });
  //       }
  //   }]);

  app.run(function($ionicPlatform){
    
  });

  var indexController = function ($scope, $http,$templateCache,$location,$rootScope,blockUI){
     // console.log($location)

    $scope.$on('$stateChangeStart', function (scope, next, current) {
      //console.log("$stateChangeStart")
     
      var path = next.url;
      var parsePath = path.split("/");
      var parentPath = parsePath[1];

      if(current.section =="accounts" && current.tree != "login"){ //只限制点击‘个人中心’时验证登录
        $scope.checkLogin();
      }
    });
    $scope.$on('$stateChangeSuccess', function (scope, next, current) {

      //console.log("$stateChangeSuccess",next)
      
    });


    $scope.initializeController = function(){
      /*$http.get('templates/tabsTem.html', {  
        cache : $templateCache  
      });
      $http.get('templates/homeTem.html', {  
        cache : $templateCache  
      });
       $http.get('templates/mylongform.html', {  
        cache : $templateCache  
      });*/  
    }

    //登录检测
    $scope.checkLogin=function(){
      blockUI.start();

      var userCache = localStorage['userCache']==undefined ? '' : JSON.parse(localStorage['userCache']);
      $scope.userinfo={
        user_name : userCache.user_name==undefined ? '' : userCache.user_name,
        password : userCache.password==undefined ? '' : userCache.password,
      }
      try{
        $scope.userinfo.client_id = localStorage['client_id'];
        $scope.userinfo.token = localStorage['token'];
        $scope.userinfo.sso_sid = localStorage['sso_sid'];
      } catch(err) {
        console.log('loginClick: ' + err);
      }
      if($scope.userinfo.user_name.trim() == '' || $scope.userinfo.password.trim() == ''){
        $scope.loginErrorFunction();
        blockUI.stop();
        return;
      } else {
        var client = new HproseHttpClient("http://passport.zsj.test/Open/",["user_login"]);
        client.user_login( $scope.userinfo, function(result) {
          blockUI.stop();
          if(result.code==200){ //验证成功
            if(result.data.group_id == '1') {  //业主角色
              window.location.href = '#/accounts/index';
            } else if(result.data.group_id == '5') { //监理角色
              window.location.href = '#/monitor/index';
            }
          } else {  //验证失败
            window.location.href = "#/accounts/login"; 
          }
        },function(name,err) {
          console.log(name + ' : ' + err);
        });
      }
    } 

  }
  
  

  indexController.$inject = ['$scope', '$http','$templateCache','$location','$rootScope','blockUI'];
    app.controller("indexController", indexController);

    angularAMD.bootstrap(app);



 // console.log(app)
  return app
})