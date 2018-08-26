define(['app', 'mainService','utilsService', 'positionAutoDirective', 'slideCustomDirective','map','masklayer','temmode', 'cordova', 'ngCordova'], function (app) {
// define(['app', 'mainService','utilsService', 'positionAutoDirective', 'slideCustomDirective','map','masklayer','temmode'], function (app) {
	app.register.controller('homeCtrl', ['$scope', 'mainAjax','$rootScope','$timeout','utils','baiduMapApi', function ($scope,mainAjax,$rootScope,$timeout,utils,baiduMapApi) {
		$scope.tpl = '';
		$scope.results = '';
    $scope.company2 = ''; 
    $scope.desginer2 = ''; 
    $scope.owner2 = '';
    $scope.supervision2 = '';
    $scope.merchant2 ='';
    $scope.DynamicTem = '';
    $scope.DynamicTem2 = '';
    $scope.DynamicTem3 = '';
    $scope.masklayerSignOut2 = 'ng-enter-active';
    $scope.ceshi="";
    $scope.img1=$scope.img2=$scope.img3=$scope.img4=$scope.img5= '';
		$scope.masklayerShowHideClass = "RightColumnParentclassNone";
    $scope.masklayerShowHideClass2="RightColumnParentclassNone";
    $scope.masklayerShowHideClass3="RightColumnParentclassNone";
    $scope.results = '';

  // 自动定位==========================================================================
    $scope.lng = {lng: 108.914241, lat: 34.24301}
      var timer = setTimeout(function(){
        $scope.auto_position();
        clearTimeout(timer);
    }, 1);
    // 自动定位
    $scope.auto_position = function(){
        navigator.geolocation.getCurrentPosition(onSuccess_position, onError_position);
    }
    
    // 显示位置信息中的“Position”属性
    function onSuccess_position(position) {
        var autolng = position.coords.longitude; 
        var autolat = position.coords.latitude;
        console.log(autolng+","+autolat); 
        $scope.lng = {lng: autolng, lat: autolat}
    }

    // 如果获取位置信息出现问题，则显示一个警告
    function onError_position() {
      console.log('定位失败！');
    }

   
    //获取小区信息，填充自动列表小区数据
    mainAjax.getHouse(getPositionSuccess, getPostionError);

		//获取小区信息，填充自动列表小区数据
		 $scope.initData = function() {
          //预加载项
          $templateCache.removeAll(); //移除所有模板内容，释放内存
          $templateCache.put('templates/main/mapMain.html', utils.getTemplates('templates/main/mapMain.html')); //主页模板    
          $templateCache.put('templates/main/leftSpan.html', utils.getTemplates('templates/main/leftSpan.html')); //左边span模板          
          $templateCache.put('templates/main/companyDetails.html', utils.getTemplates('templates/main/companyDetails.html')); //公司模板      
          $templateCache.put('templates/main/desginerDetails.html', utils.getTemplates('templates/main/desginerDetails.html')); //设计师模板      
          $templateCache.put('templates/main/merchantsDetails.html', utils.getTemplates('templates/main/merchantsDetails.html')); //商家模板      
          $templateCache.put('templates/main/ownerDetails.html', utils.getTemplates('templates/main/ownerDetails.html')); //业主模板      
          $templateCache.put('templates/main/supervisionDetails.html', utils.getTemplates('templates/main/supervisionDetails.html')); //监理模板         
          $templateCache.put('templates/main/companyCenter.html', utils.getTemplates('templates/main/companyCenter.html')); 
          $templateCache.put('templates/main/desginerCenter.html', utils.getTemplates('templates/main/desginerCenter.html')); 
          $templateCache.put('templates/main/merchantsCenter.html', utils.getTemplates('templates/main/merchantsCenter.html')); 
          $templateCache.put('templates/main/supervisionCenter.html', utils.getTemplates('templates/main/supervisionCenter.html')); 
          $templateCache.put('templates/main/ownerCenter.html', utils.getTemplates('templates/main/ownerCenter.html')); 

        }
        $scope.books = [
          { title: 'The DaVinci Code', author: 'F. Scott Fitzgerald' },
          { title: 'The Great Gatsby', author: 'Dan Browns' },
          { title: 'Angels & Demons',  author: 'Dan Louis' },
          { title: 'The Lost Symbol',  author: 'David Maine' },
          { title: 'Old Man\'s War',   author: 'Rob Grant' }
        ];



        //设计师数据模拟
        $scope.decorcompany=[
        {state:'预约量房',desginScore:'7',minCost:50,desginCost:'50-150',introduction:'设计，是一连串沟通与需求的激荡 以品味和专业穿针引线 将动线、机能、收纳等实用功能隐喻于美学之中 融入自然环境与文化 设计，由此有了呼吸的温度。',hrefimg:'#/main/desginercenter',img:'cache/img/000.jpg',name:'设计师A',type:"高级设计师",time:"3",style:'简欧，宜家',hreficon:'#/main/sizehome',address:"陕西西安",desginerId:"1"
          ,works:{img1:'images/biao_img01.png',time1:'2015-2-9',title1:'枫林绿洲',img2:'images/biao_img01.png',title2:'枫林绿洲',time2:'2015-2-9',img3:'images/biao_img01.png',title2:'枫林绿洲',time3:'2015-2-9'}},
        {state:'预约量房',desginScore:'4',minCost:100,desginCost:'100-150',introduction:'设计，是一连串沟通与需求的激荡 以品味和专业穿针引线 将动线、机能、收纳等实用功能隐喻于美学之中 融入自然环境与文化 设计，由此有了呼吸的温度。',hrefimg:'#/main/desgincenter',img:'cache/img/001.jpg',name:'设计师B',type:"高级设计师",time:"3",style:'简欧，宜家',hreficon:'#/main/sizehome',address:"陕西西安",desginerId:"2"
          ,works:{img1:'images/biao_img01.png',time1:'2015-2-9',title1:'枫林绿洲',img2:'images/biao_img01.png',title2:'枫林绿洲',time2:'2015-2-9',img3:'images/biao_img01.png',title2:'枫林绿洲',time3:'2015-2-9'}},
        {state:'预约量房',desginScore:'6',minCost:90,desginCost:'90-150',introduction:'设计，是一连串沟通与需求的激荡 以品味和专业穿针引线 将动线、机能、收纳等实用功能隐喻于美学之中 融入自然环境与文化 设计，由此有了呼吸的温度。',hrefimg:'#/main/desgincenter',img:'cache/img/002.jpg',name:'设计师C',type:"初级设计师",time:"3",style:'简欧，宜家',hreficon:'#/main/sizehome',address:"陕西西安",desginerId:"3"
          ,works:{img1:'images/biao_img01.png',time1:'2015-2-9',title1:'枫林绿洲',img2:'images/biao_img01.png',title2:'枫林绿洲',time2:'2015-2-9',img3:'images/biao_img01.png',title2:'枫林绿洲',time3:'2015-2-9'}},
        {state:'预约量房',desginScore:'3',minCost:80,desginCost:'80-100',introduction:'设计，是一连串沟通与需求的激荡 以品味和专业穿针引线 将动线、机能、收纳等实用功能隐喻于美学之中 融入自然环境与文化 设计，由此有了呼吸的温度。',hrefimg:'#/main/desgincenter',img:'cache/img/003.jpg',name:'设计师F',type:"中级设计师",time:"3",style:'简欧，宜家',hreficon:'#/main/sizehome',address:"陕西西安",desginerId:"4"
          ,works:{img1:'images/biao_img01.png',time1:'2015-2-9',title1:'枫林绿洲',img2:'images/biao_img01.png',title2:'枫林绿洲',time2:'2015-2-9',img3:'images/biao_img01.png',title2:'枫林绿洲',time3:'2015-2-9'}},
        {state:'预约量房',desginScore:'1',minCost:70,desginCost:'70-150',introduction:'设计，是一连串沟通与需求的激荡 以品味和专业穿针引线 将动线、机能、收纳等实用功能隐喻于美学之中 融入自然环境与文化 设计，由此有了呼吸的温度。',hrefimg:'#/main/desgincenter',img:'cache/img/004.jpg',name:'设计师G',type:"中级设计师",time:"3",style:'简欧，宜家',hreficon:'#/main/sizehome',address:"陕西西安",desginerId:"5"
          ,works:{img1:'images/biao_img01.png',time1:'2015-2-9',title1:'枫林绿洲',img2:'images/biao_img01.png',title2:'枫林绿洲',time2:'2015-2-9',img3:'images/biao_img01.png',title2:'枫林绿洲',time3:'2015-2-9'}},      
        {state:'预约量房',desginScore:'8',minCost:60,desginCost:'60-100',introduction:'设计，是一连串沟通与需求的激荡 以品味和专业穿针引线 将动线、机能、收纳等实用功能隐喻于美学之中 融入自然环境与文化 设计，由此有了呼吸的温度。',hrefimg:'#/main/desgincenter',img:'cache/img/003.jpg',name:'设计师D',type:"高级设计师",time:"3",style:'简欧，宜家',hreficon:'#/main/sizehome',address:"陕西西安",desginerId:"4"
          ,works:{img1:'images/biao_img01.png',time1:'2015-2-9',title1:'枫林绿洲',img2:'images/biao_img01.png',title2:'枫林绿洲',time2:'2015-2-9',img3:'images/biao_img01.png',title2:'枫林绿洲',time3:'2015-2-9'}},
        {state:'预约量房',desginScore:'9',minCost:40,desginCost:'40-150',introduction:'设计，是一连串沟通与需求的激荡 以品味和专业穿针引线 将动线、机能、收纳等实用功能隐喻于美学之中 融入自然环境与文化 设计，由此有了呼吸的温度。',hrefimg:'#/main/desgincenter',img:'cache/img/004.jpg',name:'设计师E',type:"初级设计师",time:"3",style:'简欧，宜家',hreficon:'#/main/sizehome',address:"陕西西安",desginerId:"5"
          ,works:{img1:'images/biao_img01.png',time1:'2015-2-9',title1:'枫林绿洲',img2:'images/biao_img01.png',title2:'枫林绿洲',time2:'2015-2-9',img3:'images/biao_img01.png',title2:'枫林绿洲',time3:'2015-2-9'}}      
      ]       
     
      


      //监理模拟数据 
      $scope.supervision=[
         {name:'监理A',minCost:100,desginScore:'9',desginCost:'100-100',type:'高级监理',img:'images/jianli_icon0.jpg',introduction:'专心为每一位业主服务',time:'3年',cicty:'西安',state:'邀请监理',works:{img1:'images/zp_pic3.jpg',img2:'images/zp_pic3.jpg',img3:'images/zp_pic3.jpg'}},
         {name:'监理B',minCost:200,desginScore:'6',desginCost:'200-100',type:'高级监理',img:'images/jianli_icon0.jpg',introduction:'专心为每一位业主服务',time:'3年',cicty:'西安',state:'邀请监理',works:{img1:'images/zp_pic3.jpg',img2:'images/zp_pic3.jpg',img3:'images/zp_pic3.jpg'}},        
         {name:'监理C',minCost:300,desginScore:'7',desginCost:'300-100',type:'高级监理',img:'images/jianli_icon4.jpg',introduction:'专心为每一位业主服务',time:'3年',cicty:'西安',state:'邀请监理',works:{img1:'images/zp_pic3.jpg',img2:'images/zp_pic3.jpg',img3:'images/zp_pic3.jpg'}},      
         {name:'监理D',minCost:400,desginScore:'8',desginCost:'400-100',type:'初级监理',img:'images/jianli_icon0.jpg',introduction:'专心为每一位业主服务',time:'3年',cicty:'西安',state:'邀请监理',works:{img1:'images/zp_pic3.jpg',img2:'images/zp_pic3.jpg',img3:'images/zp_pic3.jpg'}},
         {name:'监理E',minCost:500,desginScore:'5',desginCost:'500-100',type:'初级监理',img:'images/jianli_icon0.jpg',introduction:'专心为每一位业主服务',time:'3年',cicty:'西安',state:'邀请监理',works:{img1:'images/zp_pic3.jpg',img2:'images/zp_pic3.jpg',img3:'images/zp_pic3.jpg'}},
         {name:'监理F',minCost:900,desginScore:'1',desginCost:'900-100',type:'中级监理',img:'images/jianli_icon0.jpg',introduction:'专心为每一位业主服务',time:'3年',cicty:'西安',state:'邀请监理',works:{img1:'images/zp_pic3.jpg',img2:'images/zp_pic3.jpg',img3:'images/zp_pic3.jpg'}},
         {name:'监理G',minCost:800,desginScore:'3',desginCost:'800-100',type:'中级监理',img:'images/jianli_icon0.jpg',introduction:'专心为每一位业主服务',time:'3年',cicty:'西安',state:'邀请监理',works:{img1:'images/zp_pic3.jpg',img2:'images/zp_pic3.jpg',img3:'images/zp_pic3.jpg'}},
         {name:'监理H',minCost:600,desginScore:'4',desginCost:'600-100',type:'初级监理',img:'images/jianli_icon0.jpg',introduction:'专心为每一位业主服务',time:'3年',cicty:'西安',state:'邀请监理',works:{img1:'images/zp_pic3.jpg',img2:'images/zp_pic3.jpg',img3:'images/zp_pic3.jpg'}}
      ]

      //模拟装修公司数据
      $scope.decorateCompany=[
          {state:'预约量房',name:'公司A',score:'5',companyId:"1",decorateCase:{img1:'images/photo_img.png',img2:'images/pic0.jpg',img3:'images/pic0.jpg'},state:'预约装修' ,img:'images/gs_icon2.jpg',telephone:'123456789',address:'雁塔区',serviceType:'施工：家装,工装|设计：|免费服务：免费量房,免费设计,免费出预算 方案|承包方式：半包,全包,全包带软装',instruction:'设计，是一连串沟通与需求的激荡 以品味和专业穿针引线 将动线、机能、收纳等实用功能隐喻于美学之中 融入自然环境与文化 设计，由此有了呼吸的温度。',works:{img1:'images/biao_img01.png',time1:'2015-2-9',title1:'枫林绿洲',img2:'images/biao_img01.png',title2:'枫林绿洲',time2:'2015-2-9',img3:'images/biao_img01.png',title2:'枫林绿洲',time3:'2015-2-9'}},
          {state:'预约量房',name:'公司B',score:'6',companyId:"2",decorateCase:{img1:'images/photo_img.png',img2:'images/pic0.jpg',img3:'images/pic0.jpg'},state:'预约装修' ,img:'images/gs_icon2.jpg',telephone:'123456789',address:'雁塔区',serviceType:'施工：家装,工装|设计：|免费服务：免费量房,免费设计,免费出预算 方案|承包方式：半包,全包,全包带软装',instruction:'设计，是一连串沟通与需求的激荡 以品味和专业穿针引线 将动线、机能、收纳等实用功能隐喻于美学之中 融入自然环境与文化 设计，由此有了呼吸的温度。',works:{img1:'images/biao_img01.png',time1:'2015-2-9',title1:'枫林绿洲',img2:'images/biao_img01.png',title2:'枫林绿洲',time2:'2015-2-9',img3:'images/biao_img01.png',title2:'枫林绿洲',time3:'2015-2-9'}},
          {state:'预约量房',name:'公司C',score:'7',companyId:"3",decorateCase:{img1:'images/photo_img.png',img2:'images/pic0.jpg',img3:'images/pic0.jpg'},state:'预约装修' ,img:'images/gs_icon2.jpg',telephone:'123456789',address:'雁塔区',serviceType:'施工：家装,工装|设计：|免费服务：免费量房,免费设计,免费出预算 方案|承包方式：半包,全包,全包带软装',instruction:'设计，是一连串沟通与需求的激荡 以品味和专业穿针引线 将动线、机能、收纳等实用功能隐喻于美学之中 融入自然环境与文化 设计，由此有了呼吸的温度。',works:{img1:'images/biao_img01.png',time1:'2015-2-9',title1:'枫林绿洲',img2:'images/biao_img01.png',title2:'枫林绿洲',time2:'2015-2-9',img3:'images/biao_img01.png',title2:'枫林绿洲',time3:'2015-2-9'}},
          {state:'预约量房',name:'公司D',score:'3',companyId:"4",decorateCase:{img1:'images/photo_img.png',img2:'images/pic0.jpg',img3:'images/pic0.jpg'},state:'预约装修' ,img:'images/gs_icon2.jpg',telephone:'123456789',address:'雁塔区',serviceType:'施工：家装,工装|设计：|免费服务：免费量房,免费设计,免费出预算 方案|承包方式：半包,全包,全包带软装',instruction:'设计，是一连串沟通与需求的激荡 以品味和专业穿针引线 将动线、机能、收纳等实用功能隐喻于美学之中 融入自然环境与文化 设计，由此有了呼吸的温度。',works:{img1:'images/biao_img01.png',time1:'2015-2-9',title1:'枫林绿洲',img2:'images/biao_img01.png',title2:'枫林绿洲',time2:'2015-2-9',img3:'images/biao_img01.png',title2:'枫林绿洲',time3:'2015-2-9'}},
          {state:'预约量房',name:'公司E',score:'4',companyId:"5",decorateCase:{img1:'images/photo_img.png',img2:'images/pic0.jpg',img3:'images/pic0.jpg'},state:'预约装修' ,img:'images/gs_icon2.jpg',telephone:'123456789',address:'雁塔区',serviceType:'施工：家装,工装|设计：|免费服务：免费量房,免费设计,免费出预算 方案|承包方式：半包,全包,全包带软装',instruction:'设计，是一连串沟通与需求的激荡 以品味和专业穿针引线 将动线、机能、收纳等实用功能隐喻于美学之中 融入自然环境与文化 设计，由此有了呼吸的温度。',works:{img1:'images/biao_img01.png',time1:'2015-2-9',title1:'枫林绿洲',img2:'images/biao_img01.png',title2:'枫林绿洲',time2:'2015-2-9',img3:'images/biao_img01.png',title2:'枫林绿洲',time3:'2015-2-9'}},
          {state:'预约量房',name:'公司F',score:'5',companyId:"6",decorateCase:{img1:'images/photo_img.png',img2:'images/pic0.jpg',img3:'images/pic0.jpg'},state:'预约装修' ,img:'images/gs_icon2.jpg',telephone:'123456789',address:'雁塔区',serviceType:'施工：家装,工装|设计：|免费服务：免费量房,免费设计,免费出预算 方案|承包方式：半包,全包,全包带软装',instruction:'设计，是一连串沟通与需求的激荡 以品味和专业穿针引线 将动线、机能、收纳等实用功能隐喻于美学之中 融入自然环境与文化 设计，由此有了呼吸的温度。',works:{img1:'images/biao_img01.png',time1:'2015-2-9',title1:'枫林绿洲',img2:'images/biao_img01.png',title2:'枫林绿洲',time2:'2015-2-9',img3:'images/biao_img01.png',title2:'枫林绿洲',time3:'2015-2-9'}},
          {state:'预约量房',name:'公司G',score:'6',companyId:"7",decorateCase:{img1:'images/photo_img.png',img2:'images/pic0.jpg',img3:'images/pic0.jpg'},state:'预约装修' ,img:'images/gs_icon2.jpg',telephone:'123456789',address:'雁塔区',serviceType:'施工：家装,工装|设计：|免费服务：免费量房,免费设计,免费出预算 方案|承包方式：半包,全包,全包带软装',instruction:'设计，是一连串沟通与需求的激荡 以品味和专业穿针引线 将动线、机能、收纳等实用功能隐喻于美学之中 融入自然环境与文化 设计，由此有了呼吸的温度。',works:{img1:'images/biao_img01.png',time1:'2015-2-9',title1:'枫林绿洲',img2:'images/biao_img01.png',title2:'枫林绿洲',time2:'2015-2-9',img3:'images/biao_img01.png',title2:'枫林绿洲',time3:'2015-2-9'}},
          {state:'预约量房',name:'公司H',score:'7',companyId:"8",decorateCase:{img1:'images/photo_img.png',img2:'images/pic0.jpg',img3:'images/pic0.jpg'},state:'预约装修' ,img:'images/gs_icon2.jpg',telephone:'123456789',address:'雁塔区',serviceType:'施工：家装,工装|设计：|免费服务：免费量房,免费设计,免费出预算 方案|承包方式：半包,全包,全包带软装',instruction:'设计，是一连串沟通与需求的激荡 以品味和专业穿针引线 将动线、机能、收纳等实用功能隐喻于美学之中 融入自然环境与文化 设计，由此有了呼吸的温度。',works:{img1:'images/biao_img01.png',time1:'2015-2-9',title1:'枫林绿洲',img2:'images/biao_img01.png',title2:'枫林绿洲',time2:'2015-2-9',img3:'images/biao_img01.png',title2:'枫林绿洲',time3:'2015-2-9'}},
          {state:'预约量房',name:'公司I',score:'8',companyId:"9",decorateCase:{img1:'images/photo_img.png',img2:'images/pic0.jpg',img3:'images/pic0.jpg'},state:'预约装修' ,img:'images/gs_icon2.jpg',telephone:'123456789',address:'雁塔区',serviceType:'施工：家装,工装|设计：|免费服务：免费量房,免费设计,免费出预算 方案|承包方式：半包,全包,全包带软装',instruction:'设计，是一连串沟通与需求的激荡 以品味和专业穿针引线 将动线、机能、收纳等实用功能隐喻于美学之中 融入自然环境与文化 设计，由此有了呼吸的温度。',works:{img1:'images/biao_img01.png',time1:'2015-2-9',title1:'枫林绿洲',img2:'images/biao_img01.png',title2:'枫林绿洲',time2:'2015-2-9',img3:'images/biao_img01.png',title2:'枫林绿洲',time3:'2015-2-9'}},
          {state:'预约量房',name:'公司J',score:'9',companyId:"10",decorateCase:{img1:'images/pic0.jpg',img2:'images/pic0.jpg',img3:'images/pic0.jpg'},state:'预约装修' ,img:'images/gs_icon2.jpg',telephone:'123456789',address:'雁塔区',serviceType:'施工：家装,工装|设计：|免费服务：免费量房,免费设计,免费出预算 方案|承包方式：半包,全包,全包带软装',instruction:'设计，是一连串沟通与需求的激荡 以品味和专业穿针引线 将动线、机能、收纳等实用功能隐喻于美学之中 融入自然环境与文化 设计，由此有了呼吸的温度。',works:{img1:'images/biao_img01.png',time1:'2015-2-9',title1:'枫林绿洲',img2:'images/biao_img01.png',title2:'枫林绿洲',time2:'2015-2-9',img3:'images/biao_img01.png',title2:'枫林绿洲',time3:'2015-2-9'}}
      ]

      //业主模拟数据
        $scope.owner=[
          {name:'业主A',img:'images/gs_icon2.jpg',telephone:'123456789',instruction:'设计，是一连串沟通与需求的激荡 以品味和专业穿针引线 将动线、机能、收纳等实用功能隐喻于美学之中 融入自然环境与文化 设计，由此有了呼吸的温度。',works:{img1:'images/biao_img01.png',time1:'2015-2-9',title1:'枫林绿洲',img2:'images/biao_img01.png',title2:'枫林绿洲',time2:'2015-2-9',img3:'images/biao_img01.png',title2:'枫林绿洲',time3:'2015-2-9'}},
          {name:'业主B',img:'images/gs_icon2.jpg',telephone:'123456789',instruction:'设计，是一连串沟通与需求的激荡 以品味和专业穿针引线 将动线、机能、收纳等实用功能隐喻于美学之中 融入自然环境与文化 设计，由此有了呼吸的温度。',works:{img1:'images/biao_img01.png',time1:'2015-2-9',title1:'枫林绿洲',img2:'images/biao_img01.png',title2:'枫林绿洲',time2:'2015-2-9',img3:'images/biao_img01.png',title2:'枫林绿洲',time3:'2015-2-9'}},
          {name:'业主C',img:'images/gs_icon2.jpg',telephone:'123456789',instruction:'设计，是一连串沟通与需求的激荡 以品味和专业穿针引线 将动线、机能、收纳等实用功能隐喻于美学之中 融入自然环境与文化 设计，由此有了呼吸的温度。',works:{img1:'images/biao_img01.png',time1:'2015-2-9',title1:'枫林绿洲',img2:'images/biao_img01.png',title2:'枫林绿洲',time2:'2015-2-9',img3:'images/biao_img01.png',title2:'枫林绿洲',time3:'2015-2-9'}},
          {name:'业主D',img:'images/gs_icon2.jpg',telephone:'123456789',instruction:'设计，是一连串沟通与需求的激荡 以品味和专业穿针引线 将动线、机能、收纳等实用功能隐喻于美学之中 融入自然环境与文化 设计，由此有了呼吸的温度。',works:{img1:'images/biao_img01.png',time1:'2015-2-9',title1:'枫林绿洲',img2:'images/biao_img01.png',title2:'枫林绿洲',time2:'2015-2-9',img3:'images/biao_img01.png',title2:'枫林绿洲',time3:'2015-2-9'}},
          {name:'业主E',img:'images/gs_icon2.jpg',telephone:'123456789',instruction:'设计，是一连串沟通与需求的激荡 以品味和专业穿针引线 将动线、机能、收纳等实用功能隐喻于美学之中 融入自然环境与文化 设计，由此有了呼吸的温度。',works:{img1:'images/biao_img01.png',time1:'2015-2-9',title1:'枫林绿洲',img2:'images/biao_img01.png',title2:'枫林绿洲',time2:'2015-2-9',img3:'images/biao_img01.png',title2:'枫林绿洲',time3:'2015-2-9'}},
          {name:'业主F',img:'images/gs_icon2.jpg',telephone:'123456789',instruction:'设计，是一连串沟通与需求的激荡 以品味和专业穿针引线 将动线、机能、收纳等实用功能隐喻于美学之中 融入自然环境与文化 设计，由此有了呼吸的温度。',works:{img1:'images/biao_img01.png',time1:'2015-2-9',title1:'枫林绿洲',img2:'images/biao_img01.png',title2:'枫林绿洲',time2:'2015-2-9',img3:'images/biao_img01.png',title2:'枫林绿洲',time3:'2015-2-9'}},
          {name:'业主G',img:'images/gs_icon2.jpg',telephone:'123456789',instruction:'设计，是一连串沟通与需求的激荡 以品味和专业穿针引线 将动线、机能、收纳等实用功能隐喻于美学之中 融入自然环境与文化 设计，由此有了呼吸的温度。',works:{img1:'images/biao_img01.png',time1:'2015-2-9',title1:'枫林绿洲',img2:'images/biao_img01.png',title2:'枫林绿洲',time2:'2015-2-9',img3:'images/biao_img01.png',title2:'枫林绿洲',time3:'2015-2-9'}},
          {name:'业主H',img:'images/gs_icon2.jpg',telephone:'123456789',instruction:'设计，是一连串沟通与需求的激荡 以品味和专业穿针引线 将动线、机能、收纳等实用功能隐喻于美学之中 融入自然环境与文化 设计，由此有了呼吸的温度。',works:{img1:'images/biao_img01.png',time1:'2015-2-9',title1:'枫林绿洲',img2:'images/biao_img01.png',title2:'枫林绿洲',time2:'2015-2-9',img3:'images/biao_img01.png',title2:'枫林绿洲',time3:'2015-2-9'}},
          {name:'业主I',img:'images/gs_icon2.jpg',telephone:'123456789',instruction:'设计，是一连串沟通与需求的激荡 以品味和专业穿针引线 将动线、机能、收纳等实用功能隐喻于美学之中 融入自然环境与文化 设计，由此有了呼吸的温度。',works:{img1:'images/biao_img01.png',time1:'2015-2-9',title1:'枫林绿洲',img2:'images/biao_img01.png',title2:'枫林绿洲',time2:'2015-2-9',img3:'images/biao_img01.png',title2:'枫林绿洲',time3:'2015-2-9'}},
          {name:'业主J',img:'images/gs_icon2.jpg',telephone:'123456789',instruction:'设计，是一连串沟通与需求的激荡 以品味和专业穿针引线 将动线、机能、收纳等实用功能隐喻于美学之中 融入自然环境与文化 设计，由此有了呼吸的温度。',works:{img1:'images/biao_img01.png',time1:'2015-2-9',title1:'枫林绿洲',img2:'images/biao_img01.png',title2:'枫林绿洲',time2:'2015-2-9',img3:'images/biao_img01.png',title2:'枫林绿洲',time3:'2015-2-9'}},
          {name:'业主A',img:'images/gs_icon2.jpg',telephone:'123456789',instruction:'设计，是一连串沟通与需求的激荡 以品味和专业穿针引线 将动线、机能、收纳等实用功能隐喻于美学之中 融入自然环境与文化 设计，由此有了呼吸的温度。',works:{img1:'images/biao_img01.png',time1:'2015-2-9',title1:'枫林绿洲',img2:'images/biao_img01.png',title2:'枫林绿洲',time2:'2015-2-9',img3:'images/biao_img01.png',title2:'枫林绿洲',time3:'2015-2-9'}},       
      ]
		$scope.slideOptions = [
			{showname:'所有动态', roleId:0, classname:'slideTitle'},
			{showname:'业主', roleId:1, classname:'slideTitle'},
			{showname:'装修公司', roleId:2, classname:'slideTitle'},
			{showname:'设计师', roleId:4, classname:'slideTitle'},
			{showname:'监理', roleId:5, classname:'slideTitle'},
			{showname:'商家', roleId:3, classname:'slideTitle'}
		];

/*      $scope.masklayerClick = function(templates) {
          $scope.masklayerSignOut3 = 'ng-leave-active';
          $timeout(function() {
            $scope.DynamicTem3='';
            $scope.masklayerShowHideClass3 = "RightColumnParentclassNone";
            $scope.masklayerSignOut3 = "ng-enter-active";
          }, 300)
          $timeout(function() {
            $scope.masklayerShowHideClass3 = "RightColumnParentclassNotNone";
            $scope.DynamicTem3 = templates;
            $scope.$apply();
          }, 310)
      }*/

       $scope.masklayerClick = function(templates) {
          $scope.masklayerSignOut3 = 'ng-leave-active';
          $timeout(function() {
            $scope.DynamicTem3='';
            $scope.masklayerShowHideClass3 = "RightColumnParentclassNone";
            $scope.masklayerSignOut3 = "ng-enter-active";
          }, 300)
          $timeout(function() {
            $scope.masklayerShowHideClass3 = "RightColumnParentclassNotNone";
            $scope.DynamicTem3 = templates;
          }, 350)
      }

      $scope.masklayerClickT = function(templates1,templates2) {
          $timeout(function() {
            $scope.masklayerShowHideClass = "RightColumnParentclassNotNone";
            $scope.masklayerSignOut = "ng-enter-active";
            $scope.DynamicTem = templates1;
            $scope.DynamicTem3 = '';
          })
          $timeout(function() {
            $scope.masklayerShowHideClass3 = "RightColumnParentclassNotNone";
            $scope.masklayerSignOut3 = "ng-enter-active";
            $scope.DynamicTem3 = templates2;
          }, 500)
        }


    $scope.books = [
    { title: 'The DaVinci Code' },
    { title: 'The Great Gatsby' },
    { title: 'Angels & Demons'  }, 
    { title: 'The Lost Symbol'  },
    { title: 'Old Man\'s War'   }
  ];


    //筛选显示
    $scope.choice = function(str){ 
      if(str == '初级设计师' || str == '中级设计师' || str == '高级设计师'){
        $scope.type = 'type';
        $scope.search = str;
      }else if(str == '设计师评分'){
        $scope.search = ''; 
        $scope.expression = '-desginScore'; 
      }else if(str == '设计师价格'){
        $scope.price();
      }else if(str == '设计师热门'){ 
        $scope.type = 'type';
        $scope.search = '';
      }else if(str == '初级监理' || str == '中级监理' || str == '高级监理'){
        $scope.type = 'type';
        $scope.search = str;
      }else if(str == '监理评分'){
        $scope.type = 'desginScore';
        $scope.search = '';
        $scope.expression = '-desginScore';
      }else if(str == '监理价格'){ 
        $scope.price();
      }else if(str == '监理热门'){ 
        $scope.type = 'desginCost';
        $scope.search = '';
      }else if(str == '公司评分'){
        $scope.type = 'desginScore';
        $scope.search = '';
        $scope.expression = '-desginScore'
      }else if(str == '公司价格'){
        $scope.price();
      }else if(str == '公司热门'){
        //*************
      }
    }

    var val = true; 
    $scope.price = function(){
      if(val){
       $scope.search = '';
       $scope.expression = '-minCost'; 
       val = !val;
      }else{
        $scope.search = '';
        $scope.expression = '+minCost';
        val = !val;  
      }
    }

    //点击侧边栏 进行相应判断 1:设计师  2：业主 3：装修公司 4：监理 5：商家
    $scope.choose = function(_id) {
        //初始化筛选条件
        $scope.search = '';
        $scope.expression = '';
      if (_id == 1) {
        $scope.img1='images/role_desginer_hover.jpg';
        $scope.img2=$scope.img3=$scope.img4=$scope.img5='';
        $scope.masklayerClick('templates/map/desginerCenter.html');
      } else if (_id == 2) {
        $scope.img2='images/role_hover.jpg';
        $scope.img1=$scope.img3=$scope.img4=$scope.img5='';
        $scope.masklayerClick('templates/map/ownerCenter.html');
      } else if (_id == 3) {   
        $scope.expression = '';
        $scope.img3='images/ren_hover.jpg';
        $scope.img1=$scope.img2=$scope.img4=$scope.img5='';
         $scope.masklayerClick('templates/map/companyCenter.html');
      } else if (_id == 4) {
        $scope.img4='images/role_super_hover.jpg';
        $scope.img1=$scope.img2=$scope.img3=$scope.img5='';
         $scope.masklayerClick('templates/map/supervisionCenter.html');
      } else if (_id == 5) {
        $scope.img5='images/role_buy_hover.jpg';
        $scope.img1=$scope.img2=$scope.img3=$scope.img4='';
         $scope.masklayerClick('templates/map/merchantsCenter.html');
      } else {
         $scope.masklayerClick('templates/map/desginerCenter.html');
      }
    }
    $scope.masklayerClick2= function(){
      $scope.ceshi = 'show'; 
      $scope.masklayerShowHideClass2="RightColumnParentclassNone";
      // $scope.masklayerSignOut2 = 'ng-leave-active';
    }
    $scope.masklayerClick3= function(){
      $scope.masklayerShowHideClass3="RightColumnParentclassNone";
    }


    var a = b =0;
    var DId = new Array();
    var CId = new Array();
    var end = {};

    //此处进行地图中设计师 装修公司的预约。
    $scope.makeAppointment = function(_role, _state) {
      if (_state == 1) {
        // console.log(_role)
        // console.log(_state)
        if ($scope.desginer2.state == "预约量房") {
          if (a >= 3) {
            utils.alert("你最多只能预约三个设计师,在取消前面的设计师后可以继续预约！")
          } else {
            DId[a] = _role
            a = ++a;
            console.log(_role)
            // $scope.desginer2.state = "已经预约";
            //获取id值进行数组中状态的变化                                                                                                                                               
            // console.log($scope.desginer2.desginerId.replace(/\b(0+)/gi,""))
            $scope.mapDesginer[$scope.desginer2.desginerId.replace(/\b(0+)/gi,"")-1].state = '已经预约' ;
            $scope.desginer2.state  = '已经预约'
            // $scope.aaa = $scope.mapDesginer
            // console.log($scope.mapDesginer)
            // console.log($scope.mapDesginer[$scope.desginer2.desginerId.replace(/\b(0+)/gi,"")-1])
/*            $scope.mapDesginer = $scope.desginer2;
            console.log($scope.mapDesginer)*/

            $scope.MDesginer = DId;
            console.log($scope.MDesginer)
          }
        } else {
          utils.showDialog("", "你要取消该设计师为你预约量房", "", function() {
            for (var x in DId) {
              if ($scope.desginer2.desginerId == DId[x].desginerId) {
                DId.splice(x, 1)
                console.log("删除成功")
              }
            }
            $scope.desginer2.state = "预约量房";
            a = --a;
            $scope.MDesginer = DId;
           // console.log($scope.MDesginer )
          });
        }
        //通过将预约好的设计师存入缓存中在我要装修阶段进行展示。
        localStorage.setItem('MDesginer', JSON.stringify($scope.MDesginer));
        var MDesginer = localStorage.getItem('MDesginer') != 'undefined' ? JSON.parse(localStorage.getItem('MDesginer')) : new Object();
        console.log(MDesginer)
      } else {
        if ($scope.company2.state == "预约装修") {
          if (b >= 3) {
            utils.alert("你最多只能预约三个装修公司,在取消前面的装修公司后可以继续预约！")
          } else {
            CId[b] = _role
            b = ++b;
            $scope.company2.state = "已经预约";
            $scope.mapCompany[$scope.company2.companyId.replace(/\b(0+)/gi,"")-1].state = '已经预约' ;
            $scope.MCompany = CId;
           // console.log($scope.MDesginer)
          }
        } else {
          utils.showDialog("", "你要取消该装修公司装修你的房子", "", function() {
            for (var x in CId) {
              if ($scope.company2.companyId == CId[x].companyId) {
                CId.splice(x, 1)
                console.log("删除成功")
              }
            }
            $scope.company2.state = "预约装修";
            b = --b;
            $scope.MCompany = CId;
            // console.log($scope.MCompany+"rhrhe")
          });
        }
        console.log($scope.MCompany)
        localStorage.setItem('MCompany', JSON.stringify($scope.MCompany));
        // var MCompany = localStorage.getItem('MCompany') != 'undefined' ? JSON.parse(localStorage.getItem('MCompany')) : new Object();
        // console.log(MCompany)
      }
    }

    
    //移除Modal
    $scope.closeModal = function() { 
      $scope.modal.remove();
    }
		// console.log(utils.masklayerClickT());
		/*获取各角色请求数据*/
		// function getDynamicSuccess(response, status) {
		// 	if(status == 200){
		// 		$scope.resultsRole = response;
		// 		localStorage.setItem('resultsRole', $scope.resultsRole);
		// 		console.log($scope.resultsRole)
		// 	}
		// }
		// function getDynamicError(response){
		// 	console.log(response);
		// }
    /*获取各角色请求数据 结束*/
    /*获取小区信息*/
    function getPositionSuccess(response, status) {
      if(status == 200){
        $scope.results = response;
        // console.log($scope.results)
      }
    }
    function getPostionError(response){
      console.log(response);
    }



      /*moredata 界面上ng-if的判断 ，false为禁止 ；
      messages：将查询到的结果存放的到数组中
      perpage、currentPage分别是当前页面 和该页面的初始话加载的数据(此处是将查询的参数进行后台的传递)
      */
    var vm = $scope.vm = {
      moredata: true,
      messages: [],
      pagination: {
        perPage: 1,
        currentPage: 3
      },
       
      init: function () {
        // console.log("初始数据")
        mainAjax.getMessagesData(vm.pagination.perPage,vm.pagination.currentPage,$scope.messagessuccessFunction,$scope.messageserrorFunction)       
        /*services.getMessages({perPage: vm.pagination.perPage, page: vm.pagination.currentPage}, function (data) {
          vm.messages = data;
        })*/
      },
      show: function (message) {
        if (message.static) {
          message.static = false;
        } else {
          message.static = true;
        }
      },
      doRefresh: function() {
/*        $timeout(function() {
          $scope.$broadcast('scroll.refreshComplete');
        }, 1000);*/
        $scope.$broadcast('scroll.refreshComplete');
      },
      loadMore: function () {
          vm.pagination.currentPage += 1;
          console.log("加载更多数据",vm.pagination.perPage,vm.pagination.currentPage)
          mainAjax.getMessagesData(vm.pagination.perPage,vm.pagination.currentPage,$scope.messagessuccessFunction,$scope.messageserrorFunction);
          /*services.getMessages({perPage: vm.pagination.perPage, page: vm.pagination.currentPage}, function (data) {
            vm.messages = vm.messages.concat(data);
            if (data.length == 0) {
              vm.moredata = true;
            };            
          })*/
     
        }
    }




		/*获取小区信息 结束*/

	}])

})