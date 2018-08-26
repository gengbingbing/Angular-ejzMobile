
define(['app','mainService', 'utilsService', 'ngCordova'], function (app) {

  app.register.controller('personCtrl', ['$scope', 'mainAjax', 'utils', '$templateCache',  '$cordovaCamera', function ($scope, mainAjax, utils, $templateCache, $cordovaCamera) {

    //初始化数据
    $scope.initInfo=function(){
      $templateCache.removeAll(); //移除所有模板内容，释放内存
      $templateCache.put('templates/mycenter/personNameTem.html',utils.getTemplates('templates/mycenter/personNameTem.html')); //修改姓名模板
      $templateCache.put('templates/mycenter/personAddressTem.html',utils.getTemplates('templates/mycenter/personAddressTem.html')); //修改地址模板
      $templateCache.put('templates/mycenter/personSexTem.html',utils.getTemplates('templates/mycenter/personSexTem.html')); //修改性别模板
      $templateCache.put('templates/mycenter/personAreaTem.html',utils.getTemplates('templates/mycenter/personAreaTem.html')); //修改地区模板

    }
    //读取缓存数据
    $scope.initData = function(){
      if(localStorage.getItem('user')) {
        $scope.userData = localStorage.getItem('user')!='undefined' ? JSON.parse(localStorage.getItem('user')) : new Object();
        $scope.$watch(function(){ //监视用户信息
          var user = JSON.parse(localStorage.getItem('user'));
          return user;
        }, function (newVal, oldVal) {
          $scope.userData = newVal;
        }, true);
      } else {
        utils.alert('自动登录失败，请重新登录','身份失效', function(){
          utils.gotoLogin();
        });
      }

    }
    $scope.initData();

    //移除Modal
    $scope.closeModal = function(){
      $scope.modal.remove(); 
    }

    // 更改用户头像====================================================================
    document.addEventListener("deviceready", onDeviceReady, false);
    function onDeviceReady() {
        pictureSource = $cordovaCamera.PictureSourceType;
        destinationType = $cordovaCamera.DestinationType;
    }

    function onSuccess(imageData) {
        var image = document.getElementById('headimg');
        image.src = "data:image/jpeg;base64," + imageData;
        alert(imageData);
    }

    function onFail(message) {
        console.log('Failed because: ' + message);
    }

    // 调用照像机
    function takePhotoFunc() {
      // console.log(Camera);
      var options = {  
          quality: 50,
          sourceType: Camera.PictureSourceType.CAMERA,
          destinationType: Camera.DestinationType.FILE_URI
      };  
      $cordovaCamera.getPicture(options, onSuccess, onFail);
        
    }

    // 调用相册
    function localChooseFunc() {
      // var source = pictureSource.PHOTOLIBRARY;
      // $cordovaCamera.getPicture(onSuccess, onFail, { 
      //     quality: 50,
      //     destinationType: Camera.DestinationType.DATA_URL,
      //     sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
      //     allowEdit: true,
      //     encodingType: Camera.EncodingType.JPEG,
      //     targetWidth: 500,
      //     targetHeight: 500,
      //     popoverOptions: CameraPopoverOptions,
      //     saveToPhotoAlbum: false
      // }); 
      var options = {  
          quality: 50,
          sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
          destinationType: Camera.DestinationType.FILE_URI
      };  
      $cordovaCamera.getPicture(options, onSuccess, onFail);
    }
  
    //警告按钮事件
    function warningFunc(){
      console.log('警告按钮被点击')  
    }
    //修改头像
    $scope.modifyPhoto = function(){
      //自定义按钮
      var btnArray = [
        {txt: '拍照', clickFunc: takePhotoFunc},
        {txt: '在相册中选择', clickFunc: localChooseFunc},
      ]
      //警告按钮和事件
      var btnWarning = {
        txt: '删除',
        clickFunc: warningFunc
      }
      utils.bottomPopMenu('', btnArray, btnWarning, '取消');
    }

    // 更改用户头像====================================================================

    //修改姓名
    $scope.nameModal = function(){
      utils.modal('templates/mycenter/personNameTem.html', $scope);
    }
    //修改地址
    $scope.addressModal = function(){
      utils.modal('templates/mycenter/personAddressTem.html', $scope);
    }
    //修改性别
    $scope.sexModal = function(){
      utils.modal('templates/mycenter/personSexTem.html', $scope);
    }
    //修改地区
    $scope.areaModal = function(){
      utils.modal('templates/mycenter/personAreaTem.html', $scope);
    }
    //移除Modal
    $scope.closeModal = function(){
      $scope.modal.remove(); 
    }


    /*******修改姓名部分*******/
    //清空输入
    $scope.clearName = function(){
      $scope.userData.realname='';
    }
    //完成修改
    $scope.doneName = function(){
      $scope.modifyName();
    }
    //修改
    $scope.modifyName=function(){
      if($scope.userData && $scope.userData.realname && $scope.userData.realname.trim()!=''){

        /********************此处提交修改数据，成功后写入缓存********************/

        //写入缓存
        localStorage.setItem("user",JSON.stringify($scope.userData));
        $scope.closeModal();
      }else {
          utils.alert("请输入内容!");
      }
    }

    /*******修改地址部分*******/
    //清空输入
    $scope.clearAddress = function(){
      $scope.userData.address='';
    }
    //完成修改
    $scope.doneAddress = function(){
      $scope.modifyAddress();
    }
    //修改
    $scope.modifyAddress=function(){
      if($scope.userData && $scope.userData.address && $scope.userData.address.trim()!=''){

        /********************此处提交修改数据，成功后写入缓存********************/

        //写入缓存
        localStorage.setItem("user",JSON.stringify($scope.userData));
        $scope.closeModal();
      }else {
          utils.alert("请输入内容!");
      }
    }

    /*******修改性别部分*******/
    $scope.sexType = [
      {text:'男', value: '男'},
      {text:'女', value: '女'},
    ]
    //完成修改
    $scope.doneSex = function(){
      $scope.modifySex();
      $scope.closeModal();
    }
    //修改
    $scope.modifySex=function(){
      if($scope.userData && $scope.userData.sex){

        /********************此处提交修改数据，成功后写入缓存********************/

        //写入缓存
        localStorage.setItem("user",JSON.stringify($scope.userData));
      }
    }

    /*******修改地区部分*******/
    //清空输入
    $scope.clearArea = function(){
      $scope.userData.area='';
    }
    //完成修改
    $scope.doneArea = function(){
      $scope.modifyArea();
      $scope.closeModal();
    }
    //修改
    $scope.modifyArea=function(){
      if($scope.userData && $scope.userData.area && $scope.userData.area.trim()!=''){

        /********************此处提交修改数据，成功后写入缓存********************/

        //写入缓存
        localStorage.setItem("user",JSON.stringify($scope.userData));
      }
    }

  }])

})





// define(['app','mainService', 'utilsService','cordova'], function (app) {

//   app.register.controller('personCtrl', ['$scope', 'mainAjax', 'utils', '$templateCache', function ($scope, mainAjax, utils, $templateCache) {

//     //初始化数据
//     $scope.initInfo=function(){
//       $templateCache.removeAll(); //移除所有模板内容，释放内存
//       $templateCache.put('templates/mycenter/personNameTem.html',utils.getTemplates('templates/mycenter/personNameTem.html')); //修改姓名模板
//       $templateCache.put('templates/mycenter/personAddressTem.html',utils.getTemplates('templates/mycenter/personAddressTem.html')); //修改地址模板
//       $templateCache.put('templates/mycenter/personSexTem.html',utils.getTemplates('templates/mycenter/personSexTem.html')); //修改性别模板
//       $templateCache.put('templates/mycenter/personAreaTem.html',utils.getTemplates('templates/mycenter/personAreaTem.html')); //修改地区模板

//     }
//     //读取缓存数据
//     $scope.initData = function(){
//       if(localStorage.getItem('user')) {
//         $scope.userData = localStorage.getItem('user')!='undefined' ? JSON.parse(localStorage.getItem('user')) : new Object();
//         $scope.$watch(function(){ //监视用户信息
//           var user = JSON.parse(localStorage.getItem('user'));
//           return user;
//         }, function (newVal, oldVal) {
//           $scope.userData = newVal;
//         }, true);
//       } else {
//         utils.alert('自动登录失败，请重新登录','身份失效', function(){
//           utils.gotoLogin();
//         });
//       }

//     }
//     $scope.initData();

//     //移除Modal
//     $scope.closeModal = function(){
//       $scope.modal.remove(); 
//     }

//     /*******修改头像部分*******/
//     document.addEventListener("deviceready", onDeviceReady, false);
//     function onDeviceReady() {
//         pictureSource = navigator.camera.PictureSourceType;
//         destinationType = navigator.camera.DestinationType;
//     }
    
//     // 拍照成功
//     // function onSuccess(imageData) {
//     //   // setimg(imageData);
//     //   var image = document.getElementById('headimg');
//     //   image.src = "data:image/jpeg;base64,"+imageData;
//     //   alert(image.src);
//     // }

//     function onSuccess(imageData) {     
//       var image = document.getElementById('headimg');
//       image.src = imageData; // imageData是拍照后，该图片的位置
//       alert(image.src);
//       // utils.modal('templates/mycenter/updataphoneTem.html', $scope); // 对拍照的图片进行裁剪
//       // var imagephone = document.getElementById('updataphone');     
//       // imagephone.src = imageData;
//     }
//     // 拍照失败
//     function onFail(message) {
//        utils.alert("Initializes ERROR..." + message);
//     }
//     //拍照按钮事件
//     function takePhotoFunc(){
//       navigator.camera.getPicture(onSuccess, onFail, {
//           quality: 50,
//           destinationType: navigator.camera.DestinationType.FILE_URI,
//           sourceType: Camera.PictureSourceType.CAMERA,
//           allowEdit: true,
//           encodingType: Camera.EncodingType.JPEG,
//           popoverOptions: CameraPopoverOptions,
//           saveToPhotoAlbum: false,
//       });
//       console.log('拍照上传');
//     }

//     //相册选择事件
//     function localChooseFunc(){
//       console.log('在相册中选择');
//       var source = pictureSource.PHOTOLIBRARY;
//       navigator.camera.getPicture(function (imageData) { alert(imageData); }, onFail, { 
//           quality: 50,
//           destinationType: destinationType.FILE_URI,
//           sourceType: source 
//       });
//       var source = pictureSource.PHOTOLIBRARY;
//     }
//     //警告按钮事件
//     function warningFunc(){
//       console.log('警告按钮被点击')  
//     }
//     //修改头像
//     $scope.modifyPhoto = function(){
//       //自定义按钮
//       var btnArray = [
//         {txt: '拍照', clickFunc: takePhotoFunc},
//         {txt: '在相册中选择', clickFunc: localChooseFunc},
//       ]
//       //警告按钮和事件
//       var btnWarning = {
//         txt: '删除',
//         clickFunc: warningFunc
//       }
//       utils.bottomPopMenu('', btnArray, btnWarning, '取消');
//     }

//     //修改姓名
//     $scope.nameModal = function(){
//       utils.modal('templates/mycenter/personNameTem.html', $scope);
//     }
//     //修改地址
//     $scope.addressModal = function(){
//       utils.modal('templates/mycenter/personAddressTem.html', $scope);
//     }
//     //修改性别
//     $scope.sexModal = function(){
//       utils.modal('templates/mycenter/personSexTem.html', $scope);
//     }
//     //修改地区
//     $scope.areaModal = function(){
//       utils.modal('templates/mycenter/personAreaTem.html', $scope);
//     }
//     //移除Modal
//     $scope.closeModal = function(){
//       $scope.modal.remove(); 
//     }


//     /*******修改姓名部分*******/
//     //清空输入
//     $scope.clearName = function(){
//       $scope.userData.realname='';
//     }
//     //完成修改
//     $scope.doneName = function(){
//       $scope.modifyName();
//     }
//     //修改
//     $scope.modifyName=function(){
//       if($scope.userData && $scope.userData.realname && $scope.userData.realname.trim()!=''){

//         /********************此处提交修改数据，成功后写入缓存********************/

//         //写入缓存
//         localStorage.setItem("user",JSON.stringify($scope.userData));
//         $scope.closeModal();
//       }else {
//           utils.alert("请输入内容!");
//       }
//     }

//     /*******修改地址部分*******/
//     //清空输入
//     $scope.clearAddress = function(){
//       $scope.userData.address='';
//     }
//     //完成修改
//     $scope.doneAddress = function(){
//       $scope.modifyAddress();
//     }
//     //修改
//     $scope.modifyAddress=function(){
//       if($scope.userData && $scope.userData.address && $scope.userData.address.trim()!=''){

//         /********************此处提交修改数据，成功后写入缓存********************/

//         //写入缓存
//         localStorage.setItem("user",JSON.stringify($scope.userData));
//         $scope.closeModal();
//       }else {
//           utils.alert("请输入内容!");
//       }
//     }

//     /*******修改性别部分*******/
//     $scope.sexType = [
//       {text:'男', value: '男'},
//       {text:'女', value: '女'},
//     ]
//     //完成修改
//     $scope.doneSex = function(){
//       $scope.modifySex();
//       $scope.closeModal();
//     }
//     //修改
//     $scope.modifySex=function(){
//       if($scope.userData && $scope.userData.sex){

//         /********************此处提交修改数据，成功后写入缓存********************/

//         //写入缓存
//         localStorage.setItem("user",JSON.stringify($scope.userData));
//       }
//     }

//     /*******修改地区部分*******/
//     //清空输入
//     $scope.clearArea = function(){
//       $scope.userData.area='';
//     }
//     //完成修改
//     $scope.doneArea = function(){
//       $scope.modifyArea();
//       $scope.closeModal();
//     }
//     //修改
//     $scope.modifyArea=function(){
//       if($scope.userData && $scope.userData.area && $scope.userData.area.trim()!=''){

//         /********************此处提交修改数据，成功后写入缓存********************/

//         //写入缓存
//         localStorage.setItem("user",JSON.stringify($scope.userData));
//       }
//     }
//     //*******修改地区部分*******/


   






// 	}])

//   //姓名
//   // .controller('personNameCtrl', ['$scope', 'mainAjax', 'utils', '$templateCache', function ($scope, mainAjax, utils, $templateCache) {
//   //   //读取缓存数据
//   //   try {
//   //     $scope.userData = JSON.parse(localStorage.getItem('user'));
//   //   } catch(event) {
//   //     console.log(event.message);
//   //     utils.alert('自动登录失败，请重新登录','身份失效', function(){
//   //       $scope.closeModal();
//   //     });
//   //   }

//   //   //移除Modal
//   //   $scope.closeModal = function(){
//   //     $scope.$parent.modal.remove(); 
//   //   }
//   //   //清空输入
//   //   $scope.clearTxt = function(){
//   //     $scope.userData.realname='';
//   //   }
//   //   //完成修改
//   //   $scope.doneModify = function(){
//   //     $scope.modifyName();
//   //     $scope.closeModal();
//   //   }
//   //   //修改
//   //   $scope.modifyName=function(){

//   //     if($scope.userData.realname.trim()!=''){

//   //       /********************此处提交修改数据，成功后写入缓存********************/

//   //       //写入缓存
//   //       localStorage.setItem("user",JSON.stringify($scope.userData));
//   //     }
//   //   }

//   // }])




//   // //我的地址
//   // .controller('personAddressCtrl', ['$scope', 'mainAjax', 'utils', '$templateCache', function ($scope, mainAjax, utils, $templateCache) {
//   //   //移除Modal
//   //   $scope.closeModal = function(){
//   //     $scope.$parent.modal.remove(); 
//   //   }  
//   //   //清空输入
//   //   $scope.clearTxt = function(){

//   //   }  

//   // }])

//   // //性别
//   // .controller('personSexCtrl', ['$scope', 'mainAjax', 'utils', '$templateCache', function ($scope, mainAjax, utils, $templateCache) {
//   //   //移除Modal
//   //   $scope.closeModal = function(){
//   //     $scope.$parent.modal.remove(); 
//   //   }  

//   // }])
//   // //地区
//   // .controller('personAreaCtrl', ['$scope', 'mainAjax', 'utils', '$templateCache', function ($scope, mainAjax, utils, $templateCache) {
//   //   //移除Modal
//   //   $scope.closeModal = function(){
//   //     $scope.$parent.modal.remove(); 
//   //   }  
//   //   //清空输入
//   //   $scope.clearTxt = function(){

//   //   }  

//   // }])









// })