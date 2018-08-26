define(['app','mainService','utilsService'],function (app){

	app.register.controller('collectCtrl', ['$scope','mainAjax', 'utils', '$templateCache', function ($scope, mainAjax, utils, $templateCache) {

		$scope.initData = function(){
			//预加载模板
			$templateCache.removeAll();	//移除所有模板内容，释放内存
			$templateCache.put('templates/mycenter/decorateNeedTem.html',utils.getTemplates('templates/mycenter/decorateNeedTem.html'));
			$templateCache.put('templates/mycenter/ejbpayTem.html',utils.getTemplates('templates/mycenter/ejbpayTem.html'));
		}

	    if(localStorage.getItem('user')) {
			$scope.userData = localStorage.getItem('user')!='undefined' ? JSON.parse(localStorage.getItem('user')) : new Object();
			$scope.$watch(function(){
				var user = JSON.parse(localStorage.getItem('user'));
				return user;
			}, function(newVal, oldVal){
				$scope.userData = newVal;
			},true);
	    } else {
	        utils.gotoLogin();
	    }

		//移除Modal
		$scope.closeModal = function(){
			$scope.modal.remove(); 
		}

		$scope.collection = [			 
	        { img:'http://img6.faloo.com/Picture/0x0/0/747/747488.jpg', imgmessage: "中欧结合，最新豪华款" },  
	        { img:'cache/img/003.jpg', imgmessage: '创艺装修' },
	        { img:'cache/img/004.jpg', imgmessage: "高冷欧式幻化装修" },  
	        { img:'cache/img/005.jpg', imgmessage: '地中海温馨套装' },
	        { img:'cache/img/006.jpg', imgmessage: "中式仿古，皇宫无敌装" },     
	    ];

	    $scope.bigImg = function(collectionImg) {
	    	document.getElementById("bigImgTem").style.display = "block";
	    	$scope.ImgUrl = collectionImg.img;
	    }

	    $scope.quitBigImg = function() {
	    	document.getElementById("bigImgTem").style.display = "none";
	    }

		









		

	}])
})