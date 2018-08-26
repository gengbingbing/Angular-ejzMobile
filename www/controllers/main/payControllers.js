define(['app', 'mainService', 'utilsService'], function(app) {
  app.register.controller('payCtrl', ['$scope', 'mainAjax', 'utils', '$templateCache', '$ionicActionSheet',
    function($scope, mainAjax, utils, $templateCache, $ionicActionSheet) {

      //初始化页面，取消加载
      $scope.initData = function() {
        $templateCache.removeAll();
        $templateCache.put('templates/main/descosTem.html', utils.getTemplates('templates/main/descosTem.html')); //发送验证码模板
      }

      $scope.clickcost = function() {
        utils.modal('templates/main/descosTem.html');
      }

      $scope.userData = JSON.parse(localStorage.getItem('user', 'rooms', 'units', 'situation', 'monitor', 'house', 'designer', 'designCost', 'decorateTypes', 'decorateStyle', 'paybond'));

      //设计保证金的金额
      $scope.bond = {
        price: "500"
      };
      //支付保证金
      $scope.paybond = function(){
        //存入保证金
        $scope.inbond=$scope.bond.price;
        //进行相应的转账

         utils.alert('支付成功！');
      }
      $scope.total =0;
      //每位客户可选择三名设计师
      $scope.appointmentDesgin = function(_company){        
        $scope.total <= 3 ? ++$scope.total : utils.alert("你最多只能选择三个设计师为你服务，在取消前面的设计师后可继续选择！");
        utils.alert($scope.total);       
      } 

      $scope.appointmentDesgin=function(){
         utils.alert("提交成功");
      }

      $scope.invitdesgin=[
        {hrefimg:'#/main/desgincenter',img:'images/photo_img.png',name:'我家我家装修公司',type:"高级",time:"3",hreficon:'#/main/sizehome',address:"陕西西安"},
        {hrefimg:'../main/desginercenter',img:'images/photo_img.png',name:'吴克群',type:"高级",time:"3",hreficon:'#/main/sizehome',address:"陕西西安"},
        {hrefimg:'../main/desginercenter',img:'images/photo_img.png',name:'吴克群',type:"高级",time:"3",hreficon:'#/main/sizehome',address:"陕西西安"},
        {hrefimg:'../main/desginercenter',img:'images/photo_img.png',name:'吴克群',type:"高级",time:"3",hreficon:'#/main/sizehome',address:"陕西西安"},
        {hrefimg:'../main/desginercenter',img:'images/photo_img.png',name:'吴克群',type:"高级",time:"3",hreficon:'#/main/sizehome',address:"陕西西安"},
        {hrefimg:'../main/desginercenter',img:'images/photo_img.png',name:'吴克群',type:"高级",time:"3",hreficon:'#/main/sizehome',address:"陕西西安"},
      ]

      $scope.invitdesgin=[
        {hrefimg:'#/main/desgincenter',img:'images/photo_img.png',name:'我家我家装修公司',type:"高级",time:"3",hreficon:'#/main/sizehome',address:"陕西西安"},
        {hrefimg:'../main/desginercenter',img:'images/photo_img.png',name:'吴克群',type:"高级",time:"3",hreficon:'#/main/sizehome',address:"陕西西安"},
        {hrefimg:'../main/desginercenter',img:'images/photo_img.png',name:'吴克群',type:"高级",time:"3",hreficon:'#/main/sizehome',address:"陕西西安"},
        {hrefimg:'../main/desginercenter',img:'images/photo_img.png',name:'吴克群',type:"高级",time:"3",hreficon:'#/main/sizehome',address:"陕西西安"},
        {hrefimg:'../main/desginercenter',img:'images/photo_img.png',name:'吴克群',type:"高级",time:"3",hreficon:'#/main/sizehome',address:"陕西西安"},
        {hrefimg:'../main/desginercenter',img:'images/photo_img.png',name:'吴克群',type:"高级",time:"3",hreficon:'#/main/sizehome',address:"陕西西安"},
      ]

      $scope.desginercenter=[
        {img:'images/photo_img.png',name:'吴克群',type:"高级",address:"陕西西安"}
      ]

    }

  ])

})