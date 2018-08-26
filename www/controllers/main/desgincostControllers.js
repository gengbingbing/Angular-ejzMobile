define(['app', 'mainService', 'utilsService'], function(app) {
	app.register.controller('desgincostCtrl', ['$scope', 'mainAjax', 'utils', '$templateCache', '$ionicActionSheet',
		function($scope, mainAjax, utils, $templateCache, $ionicActionSheet) {

			//初始化页面，取消加载
			$scope.initData = function() {
				$templateCache.removeAll();
				$templateCache.put('templates/main/descosTem.html', utils.getTemplates('templates/main/descosTem.html')); //发送验证码模板

		        if(localStorage.getItem('user')) {
		          $scope.userData = localStorage.getItem('user')!='undefined' ? JSON.parse(localStorage.getItem('user')) : new Object();
		          if($scope.userData!=undefined && !$scope.userData.bidder) {
		            $scope.userData.bidder = new Object();
		          }
		          $scope.$watch(function(){
		            var user = JSON.parse(localStorage.getItem('user'));
		            var bidder = user!=undefined ? user.bidder : new Object();
		            return bidder;
		          }, function(newVal, oldVal){
		            $scope.userData.bidder = newVal;
		          },true);
		        } else {
		            utils.gotoLogin();
		        }
		        //获取设计费用范围
		        mainAjax.getDesignCost(function(response,status){
		        	$scope.designCost = response;
		        }, function(response){
		        	console.log(response);
		        });
			}

		    //移除modal
		    $scope.closeModal = function() {
		    	$scope.modal.remove();
		    }
		    //打开选择modal
		    $scope.chooseModal = function(){
		    	utils.modal('templates/main/descosTem.html', $scope);
		    }

			$scope.designModes = [{
				txt: '免费设计',
				val: '0'	
			},{
				txt: '付费设计',
				val: '1'	
			}];



			//打开设计方式选择
			$scope.chooseModeClick = function() {
		        $scope.userData ? '' : $scope.userData=new Object();
		        $scope.results = $scope.designModes;
		        $scope.modalOptions = {
		          type: 'designMode', //modal的选择类型
		          txt: $scope.userData.bidder && $scope.userData.bidder.designMode && $scope.userData.bidder.designMode.val + '',  //modal的选择默认值
		          title: '选择设计方式'
		        }
				$scope.chooseModal();
			}
		    //点击设计方式项
		    $scope.clickDesignMode = function(_item){
		        $scope.userData.bidder ? '' : $scope.userData.bidder=new Object();
		        $scope.userData.bidder.designMode = {
		          txt : _item.txt,
		          val : _item.val
		        }
		        //更新数据
		        $scope.modifyBidder();
		    }
			//打开设计费用选择
			$scope.chooseCostClick = function() {
		        $scope.userData ? '' : $scope.userData=new Object();
		        $scope.results = $scope.designCost;
		        $scope.modalOptions = {
		          type: 'designCost', //modal的选择类型
		          txt: $scope.userData.bidder && $scope.userData.bidder.designCost && $scope.userData.bidder.designCost.val + '',  //modal的选择默认值
		          title: '选择设计费用范围'
		        }
				$scope.chooseModal();
			}
		    //点击设计费用项
		    $scope.clickDesignCost = function(_item){
		        $scope.userData.bidder ? '' : $scope.userData.bidder=new Object();
		        $scope.userData.bidder.designCost = {
		          txt : _item.txt,
		          val : _item.val
		        }
		        //更新数据
		        $scope.modifyBidder();
		    }

			//点击项
		    $scope.chooseClick = function(_item){
		        switch($scope.modalOptions.type) { //根据不同数据填充对应变量
		          case 'designMode': $scope.clickDesignMode(_item); break;
		          case 'designCost': $scope.clickDesignCost(_item); break;
		          default: 
		            console.log('类型错误: ' + $scope.chooseType);
		        }
		        $scope.closeModal();  //关闭modal
		    }

		    //修改标信息
		    $scope.modifyBidder = function(){

		        /***************此处做数据修改处理***************/


		        //修改成功，存入缓存
		        localStorage.setItem('user', JSON.stringify($scope.userData));

		    }

		}
	])
})