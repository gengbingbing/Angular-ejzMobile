define(['app', 'mainService', 'utilsService', 'houseCompleteDirective', 'masklayer','temmode','desginer', 'ionPinch'], function(app) {
  app.register.controller('decorateCtrl', [
    '$scope', 
    '$timeout',
    'mainAjax', 
    'utils',
    '$templateCache',  
    '$ionicActionSheet',
    '$http',
    function($scope, $timeout,mainAjax, utils, $templateCache, $ionicActionSheet,$http) {
    $scope.masklayerShowHideClass="RightColumnParentclassNone";
    $scope.masklayerShowHideClass2="RightColumnParentclassNone"
    $scope.masklayerShowHideClass3="RightColumnParentclassNone"
    $scope.masklayerSignOut = "ng-enter-active";
        $scope.DynamicTem='';
        $scope.DynamicTem2='';
        $scope.DynamicTem3='';
        $scope.tpl='';
        $scope.kvData = new Array();
        $scope.pid = "";
        $scope.house = {};
        $scope.stateC = $scope.state ="中标";
        $scope.isActive = true;
        $scope.itemsChecked = [];//复选框数据容器
        $scope.supervisionElem = {};
        $scope.supervisionComplete = {};
        $scope.companyModel = {};
        $scope.validateCodeShow = false;
        $scope.validateCodeShow = false;//手机号不合法时不显示输入验证码框 
        $scope.companyElem = {};
        $scope.companyElem2 = {};
        $scope.typeA = $scope.typeAC = false;
        $scope.typeB = $scope.typeBC = false;
        $scope.typeC = $scope.typeCC = false;
        $scope.typeD = $scope.typeDC = false;
        $scope.typeE = $scope.typeEC = false;
        $scope.typeF = $scope.typeFC = false;
        $scope.typeG = $scope.typeGC = true;
        $scope.typeH = $scope.typeHC = true;
        $scope.countryName = $scope.cityName = $scope.areaName = '-请选择-'
        $scope.postdata = {
          HouseInfo: {
            HouseType: '',
            DecorationType: '',
            budget:'',
            units:'',
            decorateStyle:'',
            situation:'',
            designCost:'',
            space:'',
            houseName:'', //小区
            requirements:'',  //设计要求
            designModes:'', //设计方式
            username:'',  //称呼
            telephone:'', //电话
            checkCode:'', //验证码
            place : []   //省市区
          },
          DecorateInfo : {
            budget:'',
            houseSituation:'',
            contractWay:'', 
            materialGrade:'', //主材档次
            resource:[],  //自行购买的主材
            selectMaterial:'',  //有无确定主材
            constructionRequirement:'', //施工要求
            hydropower:'',  //水电改造报价
          },
          DecorationRequirements: {}
        }

        $scope.results =[
                    {"realname":"枫林华府", "position":{"lng":"108.884776", "lat":"34.253946"}},
                    {"realname":"枫叶新都市", "position":{"lng":"108.891891", "lat":"34.240697"}},
                    {"realname":"机关小区", "position":{"lng":"108.930195", "lat":"34.232938"}},
                    {"realname":"都市皇庭", "position":{"lng":"108.942483", "lat":"34.254006"}},
                    {"realname":"绿地乐和城", "position":{"lng":"108.890813", "lat":"34.26958"}},
                    {"realname":"西城坊小区", "position":{"lng":"108.932494", "lat":"34.269759"}},
                    {"realname":"天马小区", "position":{"lng":"109.030661", "lat":"34.265165"}},
                    {"realname":"东建小区", "position":{"lng":"109.033464", "lat":"34.254126"}},
                    {"realname":"雁鸣家园", "position":{"lng":"108.972523", "lat":"34.255498"}},
                    {"realname":"高新领域", "position":{"lng":"108.84482", "lat":"34.225715"}},
                    {"realname":"紫薇康馨公寓", "position":{"lng":"108.835046", "lat":"34.214193"}},
                    {"realname":"金堆城小区", "position":{"lng":"108.861564", "lat":"34.159545"}},
                    {"realname":"长安市管小区", "position":{"lng":"108.953335", "lat":"34.157514"}},
                    {"realname":"曲江香都", "position":{"lng":"108.959515", "lat":"34.209595"}},
                    {"realname":"曲江公馆", "position":{"lng":"108.939178", "lat":"34.234788"}},
                    {"realname":"八一小区", "position":{"lng":"108.934075", "lat":"34.248755"}},
                    {"realname":"兰蒂斯城", "position":{"lng":"109.000837", "lat":"34.251022"}},
                    {"realname":"万景花园", "position":{"lng":"108.910504", "lat":"34.291594"}},
                    {"realname":"永丰公寓", "position":{"lng":"34.272086", "lat":"34.272086"}},
                    {"realname":"西辛庄", "position":{"lng":"108.882836", "lat":"34.24022"}}
                    ]
        $scope.DecorationInfo=[       
          {
            Text:"设计信息",
            State:'0',
            Color:'Orange', 
            Templates:'templates/main/houseInfoTem.html',
            Tem:'templates/main/houseInfoTemw.html',
            HouseData:{
                name:{
                  province : "省",
                  city : "市",
                  area : "县/区"
                },
                place:[
                  {text:"陕西省", zipCode:"610000", value:[
                    {text:"西安市", zipCode:"610100", value:[ 
                                                      {text:"新城区",value:"610102"},
                                                      {text:"碑林区",value:"610103"},
                                                      {text:"莲湖区",value:"610104"},
                                                      {text:"灞桥区",value:"610111"},
                                                      {text:"未央区",value:"610112"},
                                                      {text:"雁塔区",value:"610113"},
                                                      {text:"阎良区",value:"610114"},
                                                      {text:"临潼区",value:"610115"},
                                                      {text:"长安区",value:"610116"},
                                                      {text:"蓝田县",value:"610122"},
                                                      {text:"周至县",value:"610124"},
                                                      {text:"户  县",value:"610125"},
                                                      {text:"高陵县",value:"610126"}]},
                    {text:"延安市",zipCode:"610600", value:[ 
                                                      {text:"宝塔区",value:"610602"},
                                                      {text:"延长县",value:"610621"},
                                                      {text:"延川县",value:"610622"},
                                                      {text:"子长县",value:"610623"},
                                                      {text:"安塞县",value:"610624"},
                                                      {text:"志丹县",value:"610625"},
                                                      {text:"吴起县",value:"610626"},
                                                      {text:"甘泉县",value:"610627"},
                                                      {text:"富  县",value:"610628"},
                                                      {text:"洛川县",value:"610629"},
                                                      {text:"宜川县",value:"610630"},
                                                      {text:"黄龙县",value:"610631"},
                                                      {text:"黄陵县",value:"610632"}]},
                    {text:"咸阳市", zipCode:"610400", value:[ 
                                                      {text:"秦都区",value:"610402"},
                                                      {text:"杨陵区",value:"610403"},
                                                      {text:"渭城区",value:"610404"},
                                                      {text:"三原县",value:"610422"},
                                                      {text:"泾阳县",value:"610423"},
                                                      {text:"乾  县",value:"610424"},
                                                      {text:"礼泉县",value:"610425"},
                                                      {text:"永寿县",value:"610426"},
                                                      {text:"彬  县",value:"610427"},
                                                      {text:"长武县",value:"610428"},
                                                      {text:"旬邑县",value:"610429"},
                                                      {text:"淳化县",value:"610430"},
                                                      {text:"武功县",value:"610431"},
                                                      {text:"兴平市",value:"610481"}]},
                                            ]}
                ],
              HouseType:{
                  name:"房型",
                  Data:[{ text: "平层", value: "平层" },{ text: "跃层", value: "跃层" },{ text: "复式", value: "复式" },{ text: "别墅", value: "别墅" }],
              },
              DecorationType:{
                  name:"装修要求",
                  Data:[{ text: "婚房装修", value: "婚房装修" },{ text: "租赁简装", value: "租赁简装" },{ text: "自住装修", value: "自住装修" },{ text: "其他装修", value: "其他装修" }],
              },
              budget: {
                name: "装修预算",
                Data: [{text: "小于5万",value: "小于5万"},{text: "5-10万",value: "5-10万"}, {text: "10-20万",value: "10-20万"}, {text: "20万以上",value: "20万以上"}],
              },
              units: {
                name: "户型",
                Data: [{text: "一室一厅",value: "一室一厅"},{text: "两室一厅",value: "两室一厅"}, {text: "两室两厅",value: "两室两厅"}, {text: "三室一厅",value: "三室一厅"}, {text: "三室两厅",value: "三室两厅"}, {text: "其他",value: "其他"}]
              },
              decorateStyle: {
                name: "风格",
                Data:[{text: "欧式",value: "欧式"},{text: "美式",value: "美式"}, {text: "中式",value: "中式"}, {text: "日韩",value: "日韩"}, {text: "东南亚",value: "东南亚"}, {text: "地中海",value: "地中海"}, {text: "现代",value: "现代"}, {text: "田园",value: "田园"}, {text: "混搭",value: "混搭"}, {text: "其他",value: "其他"}]
              },
              situation: {
                name: "房屋情况",
                Data: [{text: "毛坯新房",value: "毛坯新房"},{text: "旧房翻新",value: "旧房翻新"}, {text: "局部改造",value: "局部改造"}, {text: "其他",value: "其他"}]
              },
              requirements : {
                name:"设计要求"
              },
              house : {
               name: "小区信息",
               space:"面积",
               Data: [
                      {"realname":"枫林华府", "position":{"lng":"108.884776", "lat":"34.253946"}},
                      {"realname":"枫叶新都市", "position":{"lng":"108.891891", "lat":"34.240697"}},
                      {"realname":"机关小区", "position":{"lng":"108.930195", "lat":"34.232938"}},
                      {"realname":"都市皇庭", "position":{"lng":"108.942483", "lat":"34.254006"}},
                      {"realname":"绿地乐和城", "position":{"lng":"108.890813", "lat":"34.26958"}},
                      {"realname":"西城坊小区", "position":{"lng":"108.932494", "lat":"34.269759"}},
                      {"realname":"天马小区", "position":{"lng":"109.030661", "lat":"34.265165"}},
                      {"realname":"东建小区", "position":{"lng":"109.033464", "lat":"34.254126"}},
                      {"realname":"雁鸣家园", "position":{"lng":"108.972523", "lat":"34.255498"}},
                      {"realname":"高新领域", "position":{"lng":"108.84482", "lat":"34.225715"}},
                      {"realname":"紫薇康馨公寓", "position":{"lng":"108.835046", "lat":"34.214193"}},
                      {"realname":"金堆城小区", "position":{"lng":"108.861564", "lat":"34.159545"}},
                      {"realname":"长安市管小区", "position":{"lng":"108.953335", "lat":"34.157514"}},
                      {"realname":"曲江香都", "position":{"lng":"108.959515", "lat":"34.209595"}},
                      {"realname":"曲江公馆", "position":{"lng":"108.939178", "lat":"34.234788"}},
                      {"realname":"八一小区", "position":{"lng":"108.934075", "lat":"34.248755"}},
                      {"realname":"兰蒂斯城", "position":{"lng":"109.000837", "lat":"34.251022"}},
                      {"realname":"万景花园", "position":{"lng":"108.910504", "lat":"34.291594"}},
                      {"realname":"永丰公寓", "position":{"lng":"34.272086", "lat":"34.272086"}},
                      {"realname":"西辛庄", "position":{"lng":"108.882836", "lat":"34.24022"}}
                      ]
              },
              designCost: {
                name: "设计花费",
                Data: [{text: "20",value: "20"},{text: "50",value: "50"}, {text: "100",value: "100"}, {text: "150",value: "150"}]
              },
             designModes: {
              name: "设计方式",
              Data: [{text: "免费设计",value: "免费设计"}, {text: "付费设计",value: "付费设计"}]
              },
              contactInfo : {
                username:"称呼：",
                telephone:"手机号码：",
                checkCode:"获取验证码"
              }
            }
          },
            //下标1
          {
            Text:"预约设计师",
            State:'0',
            Color:'Orange',
            Templates:'templates/main/invitDesginer.html',
            Tem:'templates/main/winEliminated.html'
          },
          
          //下标2
          { 
             Text:"装修",
             State:'0',
             Color:'Orange',
             Templates:'templates/main/decorateInfoTem.html',
             Tem:'templates/main/decorateInfoTemw.html',
             DecorationDemand :{
              constructionRequirement : "装修要求",
              budget: {
                name: "装修预算",
                Data: [{text: "小于5万",value: "小于5万"},{text: "5-10万",value: "5-10万"}, {text: "10-20万",value: "10-20万"}, {text: "20万以上",value: "20万以上"}],
                emphasize:"不包括家电及软装、家具的采买。"
              },
              houseSituation: {
                name: "房屋情况",
                Data: [{text: "毛坯新房",value: "毛坯新房"}, {text: "旧房翻新",value: "旧房翻新"}, {text: "局部改造",value: "局部改造"}, {text: "其他",value: "其他"}]
              },
              contractWay: {
                name: "承包方式",
                Data: 
                [
                  {text: "半包",value: [{text : "地板"},{text : "瓷砖"},{text : "洁具"},{text : "整体橱柜" },{text:"室内门"},{text:"壁纸"},{text:"开关插座"},{text:"石材"},{text:"衣柜"},{text : "书柜"}]},
                  {text: "全包",value: [{text: "有确定的主材", value:"如有确定的主材品牌及价格请标注出来，好让装修公司为您精准报价。", mark:"1"}, {mark:"2", text: "没有确定的主材", value:[{text: "一线品牌"},{text: "二线品牌"},{text: "三线品牌"}]}]},
                ],
                materialGrade: "要求装修公司使用主材档次为",
                selectMaterial: "请选择您要自行购买的主材，方便装修公司为您报价,以及后续采买",
                emphasize :"主材品牌档次会直接影响到装修总造价。"
              },
              hydropower : {
                name: "水电改造报价",
                Data:[{text:"包死价", value:"包死价"}, {text:"现场实测价", value:"现场实测价"}]
              }
            }         
          },





          //3
          {
           Text:"施工",
           State:'1',
           Color:'Orange',
           Templates:'templates/main/constructe.html',
           Tem:'templates/main/constructe.html'  
          }
          ]

      $scope.invitDesginerShow = {
        Text:"预约设计师",
        Templates:'templates/main/invitDesginer.html',
        Tem:'templates/main/winEliminated.html'
      }
   
      $scope.freeDesginerShow = {
        Text:"设计验收",
        Templates:'',
        Tem:'templates/main/desginAccetance.html'
      }
          

       //State:预约状态   desginScore：评分   desginCost：设计花费  introduction：设计师介绍   hrefimg：图片链接
       // img：设计师头像  name：设计师姓名   type：设计师等级  time：设计次数   desginerId：设计师id  works：作品
      $scope.decorcompany=[
        {state:'预约量房',desginScore:'7', minCost:40,desginCost:'40-150￥/㎡',introduction:'设计，是一连串沟通与需求的激荡 以品味和专业穿针引线 将动线、机能、收纳等实用功能隐喻于美学之中 融入自然环境与文化 设计，由此有了呼吸的温度。',hrefimg:'#/main/desginercenter',img:'cache/img/000.jpg',name:'设计师A',type:"高级设计师",time:"3",hreficon:'#/main/sizehome',address:"陕西西安",desginerId:"1"
          ,works:[{img:'images/biao_img01.png', id:"10", time:'2015-2-9',title1:'枫林绿洲'},{img:'images/biao_img01.png', id:"100", title:'枫林绿洲',time:'2015-2-9'},{img:'images/biao_img01.png', id:"1000", title:'枫林绿洲',time:'2015-2-9'}]},
        {state:'预约量房',desginScore:'4', minCost:100,desginCost:'100-150￥/㎡',introduction:'设计，是一连串沟通与需求的激荡 以品味和专业穿针引线 将动线、机能、收纳等实用功能隐喻于美学之中 融入自然环境与文化 设计，由此有了呼吸的温度。',hrefimg:'#/main/desgincenter',img:'cache/img/001.jpg',name:'设计师B',type:"高级设计师",time:"3",hreficon:'#/main/sizehome',address:"陕西西安",desginerId:"2"
        ,works:[{img:'images/biao_img01.png', id:"20", time:'2015-2-9',title1:'枫林绿洲'},{img:'images/biao_img01.png', id:"200", title:'枫林绿洲',time:'2015-2-9'},{img:'images/biao_img01.png', id:"2000", title:'枫林绿洲',time:'2015-2-9'}]},
        {state:'预约量房',desginScore:'6', minCost:50,desginCost:'50-150￥/㎡',introduction:'设计，是一连串沟通与需求的激荡 以品味和专业穿针引线 将动线、机能、收纳等实用功能隐喻于美学之中 融入自然环境与文化 设计，由此有了呼吸的温度。',hrefimg:'#/main/desgincenter',img:'cache/img/002.jpg',name:'设计师C',type:"初级设计师",time:"3",hreficon:'#/main/sizehome',address:"陕西西安",desginerId:"3"
        ,works:[{img:'images/biao_img01.png', id:"30", time:'2015-2-9',title1:'枫林绿洲'},{img:'images/biao_img01.png', id:"300", title:'枫林绿洲',time:'2015-2-9'},{img:'images/biao_img01.png', id:"3000", title:'枫林绿洲',time:'2015-2-9'}]},
        {state:'预约量房',desginScore:'8', minCost:60,desginCost:'60-100￥/㎡',introduction:'设计，是一连串沟通与需求的激荡 以品味和专业穿针引线 将动线、机能、收纳等实用功能隐喻于美学之中 融入自然环境与文化 设计，由此有了呼吸的温度。',hrefimg:'#/main/desgincenter',img:'cache/img/003.jpg',name:'设计师D',type:"中级设计师",time:"3",hreficon:'#/main/sizehome',address:"陕西西安",desginerId:"4"
        ,works:[{img:'images/biao_img01.png', id:"40", time:'2015-2-9',title1:'枫林绿洲'},{img:'images/biao_img01.png', id:"400", title:'枫林绿洲',time:'2015-2-9'},{img:'images/biao_img01.png', id:"4000", title:'枫林绿洲',time:'2015-2-9'}]},
        {state:'预约量房',desginScore:'9', minCost:70,desginCost:'70-150￥/㎡',introduction:'设计，是一连串沟通与需求的激荡 以品味和专业穿针引线 将动线、机能、收纳等实用功能隐喻于美学之中 融入自然环境与文化 设计，由此有了呼吸的温度。',hrefimg:'#/main/desgincenter',img:'cache/img/004.jpg',name:'设计师E',type:"中级设计师",time:"3",hreficon:'#/main/sizehome',address:"陕西西安",desginerId:"5"
        ,works:[{img:'images/biao_img01.png', id:"50", time:'2015-2-9',title1:'枫林绿洲'},{img:'images/biao_img01.png', id:"500", title:'枫林绿洲',time:'2015-2-9'},{img:'images/biao_img01.png', id:"5000", title:'枫林绿洲',time:'2015-2-9'}]},      
        {state:'预约量房',desginScore:'8', minCost:80,desginCost:'80-100￥/㎡',introduction:'设计，是一连串沟通与需求的激荡 以品味和专业穿针引线 将动线、机能、收纳等实用功能隐喻于美学之中 融入自然环境与文化 设计，由此有了呼吸的温度。',hrefimg:'#/main/desgincenter',img:'cache/img/003.jpg',name:'设计师D',type:"高级设计师",time:"3",hreficon:'#/main/sizehome',address:"陕西西安",desginerId:"6"
        ,works:[{img:'images/biao_img01.png', id:"60", time:'2015-2-9',title1:'枫林绿洲'},{img:'images/biao_img01.png', id:"600", title:'枫林绿洲',time:'2015-2-9'},{img:'images/biao_img01.png', id:"6000", title:'枫林绿洲',time:'2015-2-9'}]},
        {state:'预约量房',desginScore:'9', minCost:90,desginCost:'90-150￥/㎡',introduction:'设计，是一连串沟通与需求的激荡 以品味和专业穿针引线 将动线、机能、收纳等实用功能隐喻于美学之中 融入自然环境与文化 设计，由此有了呼吸的温度。',hrefimg:'#/main/desgincenter',img:'cache/img/004.jpg',name:'设计师E',type:"初级设计师",time:"3",hreficon:'#/main/sizehome',address:"陕西西安",desginerId:"7"
        ,works:[{img:'images/biao_img01.png', id:"70", time:'2015-2-9',title1:'枫林绿洲'},{img:'images/biao_img01.png', id:"700", title:'枫林绿洲',time:'2015-2-9'},{img:'images/biao_img01.png', id:"7000", title:'枫林绿洲',time:'2015-2-9'}]}      
      ]


      //施工
       $scope.constructe =[
        {node:'合同款',cost:'10000元',report:'合同款',operation:'已确认',state:'1'},
        {node:'装修预付款',report:'装修预付款',operation:'已支付',state:'1'},
        {node:'水电验收',time:'2015年11月25日',report:'水电验收报告',operation:'已支付',state:'1'},
        {node:'泥木验收',time:'2015年11月25日',report:'泥木验收报告',operation:'已支付',state:'1'},
        {node:'油漆验收',time:'2015年11月25日',report:'油漆验收报告',operation:'已支付',state:'0'},
        {node:'安装',time:'2015年11月25日',report:'安装竣工验收报告',operation:'已确认',state:'0'}
      ]

      //监理数据
      $scope.supervision=[
         {name:'监理A',cost:'600',type:'初级监理',img:'images/jianli_icon0.jpg',introduction:'专心为每一位业主服务',time:'3年',cicty:'西安',state:'邀请监理',works:{img1:'images/zp_pic3.jpg',img2:'images/zp_pic3.jpg',img3:'images/zp_pic3.jpg'}},
         {name:'监理B',cost:'600',type:'初级监理',img:'images/jianli_icon0.jpg',introduction:'专心为每一位业主服务',time:'3年',cicty:'西安',state:'邀请监理',works:{img1:'images/zp_pic3.jpg',img2:'images/zp_pic3.jpg',img3:'images/zp_pic3.jpg'}},        
         {name:'监理C',cost:'600',type:'高级监理',img:'images/jianli_icon4.jpg',introduction:'专心为每一位业主服务',time:'3年',cicty:'西安',state:'邀请监理',works:{img1:'images/zp_pic3.jpg',img2:'images/zp_pic3.jpg',img3:'images/zp_pic3.jpg'}},      
         {name:'监理D',cost:'600',type:'初级监理',img:'images/jianli_icon0.jpg',introduction:'专心为每一位业主服务',time:'3年',cicty:'西安',state:'邀请监理',works:{img1:'images/zp_pic3.jpg',img2:'images/zp_pic3.jpg',img3:'images/zp_pic3.jpg'}},
         {name:'监理E',cost:'600',type:'初级监理',img:'images/jianli_icon0.jpg',introduction:'专心为每一位业主服务',time:'3年',cicty:'西安',state:'邀请监理',works:{img1:'images/zp_pic3.jpg',img2:'images/zp_pic3.jpg',img3:'images/zp_pic3.jpg'}},
         {name:'监理F',cost:'600',type:'初级监理',img:'images/jianli_icon0.jpg',introduction:'专心为每一位业主服务',time:'3年',cicty:'西安',state:'邀请监理',works:{img1:'images/zp_pic3.jpg',img2:'images/zp_pic3.jpg',img3:'images/zp_pic3.jpg'}},
         {name:'监理G',cost:'600',type:'初级监理',img:'images/jianli_icon0.jpg',introduction:'专心为每一位业主服务',time:'3年',cicty:'西安',state:'邀请监理',works:{img1:'images/zp_pic3.jpg',img2:'images/zp_pic3.jpg',img3:'images/zp_pic3.jpg'}},
         {name:'监理H',cost:'600',type:'初级监理',img:'images/jianli_icon0.jpg',introduction:'专心为每一位业主服务',time:'3年',cicty:'西安',state:'邀请监理',works:{img1:'images/zp_pic3.jpg',img2:'images/zp_pic3.jpg',img3:'images/zp_pic3.jpg'}}
      ]

      //装修公司数据
      $scope.decorateCompany=[
          {name:'公司A',companyId:"1", minCost:90, desginCost:"90-1000", decorateCase:{img1:'images/pic0.jpg',img2:'images/pic0.jpg',img3:'images/pic0.jpg'},state:'预约装修', desginScore:'9',img:'images/gs_icon2.jpg',telephone:'123456789',address:'雁塔区',serviceType:'施工：家装,工装|设计：|免费服务：免费量房,免费设计,免费出预算 方案|承包方式：半包,全包,全包带软装',instruction:'设计，是一连串沟通与需求的激荡 以品味和专业穿针引线 将动线、机能、收纳等实用功能隐喻于美学之中 融入自然环境与文化 设计，由此有了呼吸的温度。',works:{img1:'images/biao_img01.png',time1:'2015-2-9',title1:'枫林绿洲',img2:'images/biao_img01.png',title2:'枫林绿洲',time2:'2015-2-9',img3:'images/biao_img01.png',title2:'枫林绿洲',time3:'2015-2-9'}},
          {name:'公司B',companyId:"2", minCost:80, desginCost:"80-1000", decorateCase:{img1:'images/pic0.jpg',img2:'images/pic0.jpg',img3:'images/pic0.jpg'},state:'预约装修', desginScore:'8',img:'images/gs_icon2.jpg',telephone:'123456789',address:'雁塔区',serviceType:'施工：家装,工装|设计：|免费服务：免费量房,免费设计,免费出预算 方案|承包方式：半包,全包,全包带软装',instruction:'设计，是一连串沟通与需求的激荡 以品味和专业穿针引线 将动线、机能、收纳等实用功能隐喻于美学之中 融入自然环境与文化 设计，由此有了呼吸的温度。',works:{img1:'images/biao_img01.png',time1:'2015-2-9',title1:'枫林绿洲',img2:'images/biao_img01.png',title2:'枫林绿洲',time2:'2015-2-9',img3:'images/biao_img01.png',title2:'枫林绿洲',time3:'2015-2-9'}},
          {name:'公司C',companyId:"3", minCost:40, desginCost:"40-1000", decorateCase:{img1:'images/pic0.jpg',img2:'images/pic0.jpg',img3:'images/pic0.jpg'},state:'预约装修', desginScore:'7',img:'images/gs_icon2.jpg',telephone:'123456789',address:'雁塔区',serviceType:'施工：家装,工装|设计：|免费服务：免费量房,免费设计,免费出预算 方案|承包方式：半包,全包,全包带软装',instruction:'设计，是一连串沟通与需求的激荡 以品味和专业穿针引线 将动线、机能、收纳等实用功能隐喻于美学之中 融入自然环境与文化 设计，由此有了呼吸的温度。',works:{img1:'images/biao_img01.png',time1:'2015-2-9',title1:'枫林绿洲',img2:'images/biao_img01.png',title2:'枫林绿洲',time2:'2015-2-9',img3:'images/biao_img01.png',title2:'枫林绿洲',time3:'2015-2-9'}},
          {name:'公司D',companyId:"4", minCost:20, desginCost:"20-1000", decorateCase:{img1:'images/pic0.jpg',img2:'images/pic0.jpg',img3:'images/pic0.jpg'},state:'预约装修', desginScore:'5',img:'images/gs_icon2.jpg',telephone:'123456789',address:'雁塔区',serviceType:'施工：家装,工装|设计：|免费服务：免费量房,免费设计,免费出预算 方案|承包方式：半包,全包,全包带软装',instruction:'设计，是一连串沟通与需求的激荡 以品味和专业穿针引线 将动线、机能、收纳等实用功能隐喻于美学之中 融入自然环境与文化 设计，由此有了呼吸的温度。',works:{img1:'images/biao_img01.png',time1:'2015-2-9',title1:'枫林绿洲',img2:'images/biao_img01.png',title2:'枫林绿洲',time2:'2015-2-9',img3:'images/biao_img01.png',title2:'枫林绿洲',time3:'2015-2-9'}},
          {name:'公司E',companyId:"5", minCost:20, desginCost:"20-1000", decorateCase:{img1:'images/pic0.jpg',img2:'images/pic0.jpg',img3:'images/pic0.jpg'},state:'预约装修', desginScore:'2',img:'images/gs_icon2.jpg',telephone:'123456789',address:'雁塔区',serviceType:'施工：家装,工装|设计：|免费服务：免费量房,免费设计,免费出预算 方案|承包方式：半包,全包,全包带软装',instruction:'设计，是一连串沟通与需求的激荡 以品味和专业穿针引线 将动线、机能、收纳等实用功能隐喻于美学之中 融入自然环境与文化 设计，由此有了呼吸的温度。',works:{img1:'images/biao_img01.png',time1:'2015-2-9',title1:'枫林绿洲',img2:'images/biao_img01.png',title2:'枫林绿洲',time2:'2015-2-9',img3:'images/biao_img01.png',title2:'枫林绿洲',time3:'2015-2-9'}},
          {name:'公司F',companyId:"6", minCost:10, desginCost:"10-1000", decorateCase:{img1:'images/pic0.jpg',img2:'images/pic0.jpg',img3:'images/pic0.jpg'},state:'预约装修', desginScore:'1',img:'images/gs_icon2.jpg',telephone:'123456789',address:'雁塔区',serviceType:'施工：家装,工装|设计：|免费服务：免费量房,免费设计,免费出预算 方案|承包方式：半包,全包,全包带软装',instruction:'设计，是一连串沟通与需求的激荡 以品味和专业穿针引线 将动线、机能、收纳等实用功能隐喻于美学之中 融入自然环境与文化 设计，由此有了呼吸的温度。',works:{img1:'images/biao_img01.png',time1:'2015-2-9',title1:'枫林绿洲',img2:'images/biao_img01.png',title2:'枫林绿洲',time2:'2015-2-9',img3:'images/biao_img01.png',title2:'枫林绿洲',time3:'2015-2-9'}},
          {name:'公司G',companyId:"7", minCost:70, desginCost:"70-1000", decorateCase:{img1:'images/pic0.jpg',img2:'images/pic0.jpg',img3:'images/pic0.jpg'},state:'预约装修', desginScore:'0',img:'images/gs_icon2.jpg',telephone:'123456789',address:'雁塔区',serviceType:'施工：家装,工装|设计：|免费服务：免费量房,免费设计,免费出预算 方案|承包方式：半包,全包,全包带软装',instruction:'设计，是一连串沟通与需求的激荡 以品味和专业穿针引线 将动线、机能、收纳等实用功能隐喻于美学之中 融入自然环境与文化 设计，由此有了呼吸的温度。',works:{img1:'images/biao_img01.png',time1:'2015-2-9',title1:'枫林绿洲',img2:'images/biao_img01.png',title2:'枫林绿洲',time2:'2015-2-9',img3:'images/biao_img01.png',title2:'枫林绿洲',time3:'2015-2-9'}},
          {name:'公司H',companyId:"8", minCost:30, desginCost:"30-1000", decorateCase:{img1:'images/pic0.jpg',img2:'images/pic0.jpg',img3:'images/pic0.jpg'},state:'预约装修', desginScore:'6',img:'images/gs_icon2.jpg',telephone:'123456789',address:'雁塔区',serviceType:'施工：家装,工装|设计：|免费服务：免费量房,免费设计,免费出预算 方案|承包方式：半包,全包,全包带软装',instruction:'设计，是一连串沟通与需求的激荡 以品味和专业穿针引线 将动线、机能、收纳等实用功能隐喻于美学之中 融入自然环境与文化 设计，由此有了呼吸的温度。',works:{img1:'images/biao_img01.png',time1:'2015-2-9',title1:'枫林绿洲',img2:'images/biao_img01.png',title2:'枫林绿洲',time2:'2015-2-9',img3:'images/biao_img01.png',title2:'枫林绿洲',time3:'2015-2-9'}},
          {name:'公司I',companyId:"9", minCost:50, desginCost:"50-1000", decorateCase:{img1:'images/pic0.jpg',img2:'images/pic0.jpg',img3:'images/pic0.jpg'},state:'预约装修', desginScore:'2',img:'images/gs_icon2.jpg',telephone:'123456789',address:'雁塔区',serviceType:'施工：家装,工装|设计：|免费服务：免费量房,免费设计,免费出预算 方案|承包方式：半包,全包,全包带软装',instruction:'设计，是一连串沟通与需求的激荡 以品味和专业穿针引线 将动线、机能、收纳等实用功能隐喻于美学之中 融入自然环境与文化 设计，由此有了呼吸的温度。',works:{img1:'images/biao_img01.png',time1:'2015-2-9',title1:'枫林绿洲',img2:'images/biao_img01.png',title2:'枫林绿洲',time2:'2015-2-9',img3:'images/biao_img01.png',title2:'枫林绿洲',time3:'2015-2-9'}},
          {name:'公司J',companyId:"10", minCost:60, desginCost:"60-1000", decorateCase:{img1:'images/pic0.jpg',img2:'images/pic0.jpg',img3:'images/pic0.jpg'},state:'预约装修', desginScore:'5',img:'images/gs_icon2.jpg',telephone:'123456789',address:'雁塔区',serviceType:'施工：家装,工装|设计：|免费服务：免费量房,免费设计,免费出预算 方案|承包方式：半包,全包,全包带软装',instruction:'设计，是一连串沟通与需求的激荡 以品味和专业穿针引线 将动线、机能、收纳等实用功能隐喻于美学之中 融入自然环境与文化 设计，由此有了呼吸的温度。',works:{img1:'images/biao_img01.png',time1:'2015-2-9',title1:'枫林绿洲',img2:'images/biao_img01.png',title2:'枫林绿洲',time2:'2015-2-9',img3:'images/biao_img01.png',title2:'枫林绿洲',time3:'2015-2-9'}}
      ]

        $scope.initData = function() {
          vm.init()
          //预加载项
          $templateCache.removeAll(); //移除所有模板内容，释放内存
          $templateCache.put('templates/main/decorateChooseTem.html', utils.getTemplates('templates/main/decorateChooseTem.html')); //列表选择模板
          $templateCache.put('templates/main/houseInputTem.html', utils.getTemplates('templates/main/houseInputTem.html')); //小区自动完成模板
          $templateCache.put('templates/main/numberInputTem.html', utils.getTemplates('templates/main/numberInputTem.html')); //输入数字模板
          $templateCache.put('templates/main/descosTem.html', utils.getTemplates('templates/main/descosTem.html'));
          $templateCache.put('templates/main/descontactTem.html', utils.getTemplates('templates/main/descontactTem.html'));
          $templateCache.put('templates/main/hoseinfoTemw.html', utils.getTemplates('templates/main/hoseinfoTemw.html'));
          $templateCache.put('templates/main/houseInfoTem.html', utils.getTemplates('templates/main/houseInfoTem.html'));          
          $templateCache.put('templates/main/decorationRequirementsTem.html', utils.getTemplates('templates/main/decorationRequirementsTem.html'));
          $templateCache.put('templates/main/contactInfo.html', utils.getTemplates('templates/main/contactInfo.html'));
          $templateCache.put('templates/main/decorateRequirements.html', utils.getTemplates('templates/main/decorateRequirements.html'));
          $templateCache.put('templates/main/desginRequirements.html', utils.getTemplates('templates/main/desginRequirements.html'));
          $templateCache.put('templates/main/desginType.html', utils.getTemplates('templates/main/desginType.html'));
          $templateCache.put('templates/main/evaluationDesginer.html', utils.getTemplates('templates/main/evaluationDesginer.html'));
          $templateCache.put('templates/main/payDesginCost.html', utils.getTemplates('templates/main/payDesginCost.html'));
          $templateCache.put('templates/main/payInfo.html', utils.getTemplates('templates/main/payInfo.html'));
          $templateCache.put('templates/main/evaluationDesginer.html', utils.getTemplates('templates/main/evaluationDesginer.html'));
          $templateCache.put('templates/main/desginCenterTem.html',utils.getTemplates('templates/main/desginCenterTem.html'));
          $templateCache.put('templates/main/descosTem.html',utils.getTemplates('templates/main/descosTem.html')); 
          $templateCache.put('templates/main/desginCenterTem.html',utils.getTemplates('templates/main/desginCenterTem.html')); 
          $templateCache.put('templates/main/winEliminated.html',utils.getTemplates('templates/main/winEliminated.html')); 
          $templateCache.put('templates/main/decorateInfoTem.html',utils.getTemplates('templates/main/decorateInfoTem.html')); 
          $templateCache.put('templates/main/decorateInfoTemw.html',utils.getTemplates('templates/main/decorateInfoTemw.html')); 
          $templateCache.put('templates/main/invitSupervision.html',utils.getTemplates('templates/main/invitSupervision.html')); 
          $templateCache.put('templates/main/supervisionCenterTem.html',utils.getTemplates('templates/main/supervisionCenterTem.html')); 
          $templateCache.put('templates/main/companyCenterTem.html',utils.getTemplates('templates/main/companyCenterTem.html')); 
          $templateCache.put('templates/main/invitCompany.html',utils.getTemplates('templates/main/invitCompany.html')); 
          $templateCache.put('templates/main/companyCenterTem.html',utils.getTemplates('templates/main/companyCenterTem.html')); 
          // $templateCache.put('templates/main/companyInfoTemw.html',utils.getTemplates('templates/main/companyInfoTemw.html')); 
          $templateCache.put('templates/main/companywinEliminate.html',utils.getTemplates('templates/main/companywinEliminate.html')); 
          $templateCache.put('templates/main/imagesView.html',utils.getTemplates('templates/main/imagesView.html')); 
          $templateCache.put('templates/main/invitDesginer.html',utils.getTemplates('templates/main/invitDesginer.html')); 
          
          if (localStorage.getItem('user')) {
            $scope.userData = localStorage.getItem('user') != 'undefined' ? JSON.parse(localStorage.getItem('user')) : new Object();
            if ($scope.userData != undefined && !$scope.userData.bidder) {
              $scope.userData.bidder = new Object();
            }
            $scope.$watch(function() {
              var user = JSON.parse(localStorage.getItem('user'));
              var bidder = user != undefined ? user.bidder : new Object();
              return bidder;
            }, function(newvalue, oldvalue) {
              $scope.userData.bidder = newvalue;
            }, true);
          } else {
            utils.gotoLogin();
          }
        }
      //面积格式检测   
      $scope.inputSpaceDone = function() {
        if ($scope.postdata.HouseInfo.space != undefined && $scope.postdata.HouseInfo.space.replace(/\D/g, '').trim() != '') {
         
            // $scope.postdata.HouseInfo.space,
            $scope.postdata.HouseInfo.space + '㎡'
         
        } else {
          utils.alert('你输入的面积不正确，请重新输入');
        }
      }
      
      $scope.decorateAll = true;
      $scope.decorateHalf = false;
      $scope.confirmResource = true;//初始化
      //设计方式的显示与隐藏
      $scope.showHide = function(){
        if($scope.postdata.HouseInfo.designModes == "免费设计"){
           $scope.showType=false;
           $scope.showTypeDe=false
        }
        if($scope.postdata.HouseInfo.designModes == "付费设计"){ 
          $scope.showType=true,
          $scope.showTypeDe=true         
        }
        if($scope.postdata.DecorateInfo.contractWay == "半包"){
          $scope.postdata.DecorateInfo.selectMaterial = ''; //清空全包的缓存数据
          $scope.confirmResource = true; 
          $scope.decorateAll = true;
          $scope.decorateHalf = true;
          $scope.emphasize = "";
        }
        if($scope.postdata.DecorateInfo.contractWay == "全包"){
          $scope.decorateAll = false;
          $scope.decorateHalf = false;
        }
        if($scope.postdata.DecorateInfo.selectMaterial == "有确定的主材"){
          $scope.confirmResource = true; 
          $scope.emphasize = $scope.DecorationInfo[2].DecorationDemand.contractWay.Data[1].value[0].value
        }
        if($scope.postdata.DecorateInfo.selectMaterial == "没有确定的主材"){
          $scope.confirmResource = false;
          $scope.emphasize = $scope.DecorationInfo[2].DecorationDemand.contractWay.emphasize
        }
      }

      //获取省市区下拉列表的值
      $scope.place = function(obj, id){
        if(obj == null || obj == ""){
          $scope.cityName = "-请选择-";
          $scope.areaName = "-请选择-"
        }else{
          if(id == 1){
            $scope.postdata.HouseInfo.place[0] = obj.zipCode
            $scope.countryName = obj.text;
          }
          if(id == 2){
            $scope.postdata.HouseInfo.place[1] = obj.zipCode
            if($scope.postdata.HouseInfo.place[2] != "" && $scope.postdata.HouseInfo.place[2] != null){
              $scope.postdata.HouseInfo.place.splice(2,1);
              $scope.areaName = "-请选择-";
            }
            $scope.cityName = obj.text;
          }
          if(id == 3){
            $scope.postdata.HouseInfo.place[2] = obj.value
            $scope.areaName = obj.text
          }
          console.log($scope.postdata.HouseInfo.place)
        }
      }

      //选择主材复选框数据
      $scope.itemMark = function(boo, item){
        if(boo){
          $scope.itemsChecked.push(item);
        }else{
          $scope.itemsChecked.splice($scope.itemsChecked.indexOf(item), 1);
        }
          console.log($scope.itemsChecked)
      }

      $scope.masklayerClickT = function(templates) {
          $scope.masklayerSignOut = 'ng-leave-active';
          $timeout(function() {
            $scope.masklayerShowHideClass = "RightColumnParentclassNone";
            $scope.masklayerSignOut = "ng-enter-active";
          }, 500)
          $timeout(function() {
            $scope.masklayerShowHideClass = "RightColumnParentclassNotNone";
            $scope.DynamicTem = templates;
          }, 600)
      }
       $scope.masklayerClickR = function(templates){
          $scope.masklayerShowHideClass = "RightColumnParentclassNotNone"
          $scope.DynamicTem = templates;
       }

      $scope.masklayerClickA = function(templates){
          $scope.masklayerShowHideClass3 = "RightColumnParentclassNotNone"
          // $scope.DynamicTem3 = templates;
       }

     $scope.checkPhone = function(str){
      if(utils.chkMobile(str)){
          //检测电话号码格式。格式无误，显示获取验证码框
          $scope.validateCodeShow = true;
      }
     }

    //发布任务，提交数据检查是否填完
    $scope.masklayerClick = function(templates) {
      if (templates == 'templates/main/decorateRequirements.html') {
        if ($scope.postdata.HouseInfo.place.length == 3 && $scope.postdata.HouseInfo.HouseType != '' && $scope.postdata.HouseInfo.HouseType != null && $scope.postdata.HouseInfo.DecorationType != '' && $scope.postdata.HouseInfo.DecorationType != null && $scope.postdata.HouseInfo.units != '' && $scope.postdata.HouseInfo.units != null && $scope.postdata.HouseInfo.houseName != '' && $scope.postdata.HouseInfo.houseName != null) {
          $scope.masklayerClickR(templates);
        }else {
          utils.alert("请完成上述信息的填写!");
        }
      } else if (templates == 'templates/main/desginRequirements.html') {
        if ($scope.postdata.HouseInfo.decorateStyle != '' && $scope.postdata.HouseInfo.decorateStyle != null && $scope.postdata.HouseInfo.budget != '' && $scope.postdata.HouseInfo.budget != null && $scope.postdata.HouseInfo.situation != '' && $scope.postdata.HouseInfo.situation != null) {
          $scope.masklayerClickR(templates);
        } else {
          utils.alert("请完成上述信息的填写!");
        }
      } else if (templates == 'templates/main/contactInfo.html') {
        if($scope.postdata.HouseInfo.space > 130 && $scope.postdata.HouseInfo.designModes == '免费设计'){
            utils.alert("面积大于130，不可享受免费设计，请选择付费设计")
        }else{
          if ($scope.postdata.HouseInfo.designModes == '免费设计') {
              $scope.postdata.HouseInfo.designCost = null;
              $scope.decorate = {
                 txt : $scope.postdata.HouseInfo.designCost 
              }
              $scope.masklayerClickR(templates);
          } else if ($scope.postdata.HouseInfo.designModes == '付费设计' && $scope.postdata.HouseInfo.designCost != '' && $scope.postdata.HouseInfo.designCost != null) {
            $scope.masklayerClickR(templates);
          } else {
            utils.alert("请检查信息是否填写正确!");
          }
        }    

      } else if(templates == 'templates/main/payInfo.html'){
        if(utils.chkMobile($scope.postdata.HouseInfo.telephone) && $scope.postdata.HouseInfo.checkCode != '' && $scope.postdata.HouseInfo.username != ''){
          if($scope.postdata.HouseInfo.designModes == '免费设计'){
            $scope.masklayerShowHideClass = "RightColumnParentclassNone"
            $scope.DecorationInfo.splice(1, 1, $scope.freeDesginerShow)//免费设计，将预约设计师节点替换成设计验收
            $scope.evalDesginer = '';
          }else {
            if($scope.DecorationInfo[1] == $scope.freeDesginerShow){
              $scope.DecorationInfo.splice(1, 1, $scope.invitDesginerShow)
            }
              $scope.masklayerClickR(templates);
          }
        }else {
          utils.alert("请检查信息是否填写正确!");
        }
        // 模拟提交数据
        $scope.allDecorateInfo( "DecorationInfo[0].HouseData.HouseType.name", $scope.postdata.HouseInfo.HouseType);
        $scope.allDecorateInfo( "DecorationInfo[0].HouseData.DecorationType.name", $scope.postdata.HouseInfo.DecorationType);
        $scope.allDecorateInfo( "$scope.DecorationInfo[0].HouseData.house.space", $scope.postdata.HouseInfo.space);
        $scope.allDecorateInfo( "$scope.DecorationInfo[0].HouseData.requirements.name", $scope.postdata.HouseInfo.requirements);
        $scope.allDecorateInfo( "DecorationInfo[0].HouseData.house.name", $scope.postdata.HouseInfo.houseName);
        $scope.allDecorateInfo( "DecorationInfo[0].HouseData.units.name", $scope.postdata.HouseInfo.units);
        $scope.allDecorateInfo( "DecorationInfo[0].HouseData.decorateStyle.name", $scope.postdata.HouseInfo.decorateStyle);
        $scope.allDecorateInfo( "DecorationInfo[0].HouseData.budget.name", $scope.postdata.HouseInfo.budget);
        $scope.allDecorateInfo( "DecorationInfo[0].HouseData.situation.name", $scope.postdata.HouseInfo.situation);
        $scope.allDecorateInfo( "DecorationInfo[0].HouseData.designModes.name", $scope.postdata.HouseInfo.designModes);
        $scope.allDecorateInfo( "DecorationInfo[0].HouseData.designCost.name", $scope.postdata.HouseInfo.designCost);
        $scope.allDecorateInfo( "DecorationInfo[0].HouseData.contactInfo.username", $scope.postdata.HouseInfo.username);
        $scope.allDecorateInfo( "DecorationInfo[0].HouseData.contactInfo.telephone", $scope.postdata.HouseInfo.telephone);
        $scope.allDecorateInfo( "DecorationInfo[0].HouseData.contactInfo.checkCode", $scope.postdata.HouseInfo.checkCode);
        $scope.allDecorateInfo( "DecorationInfo[0].HouseData.name.province", $scope.postdata.HouseInfo.place[0]);
        $scope.allDecorateInfo( "DecorationInfo[0].HouseData.name.city", $scope.postdata.HouseInfo.place[1]);
        $scope.allDecorateInfo( "DecorationInfo[0].HouseData.name.area", $scope.postdata.HouseInfo.place[2]);
        $scope.allDecorateInfo( "DecorationInfo[0].Templates", $scope.DecorationInfo[0].Templates);
        $scope.allDecorateInfo( "DecorationInfo[0].Tem", $scope.DecorationInfo[0].Tem);
        $scope.allDecorateInfo( "DecorationInfo[0].Text", $scope.DecorationInfo[0].Text);
        $scope.allDecorateInfo( "DecorationInfo[0].Color", $scope.DecorationInfo[0].Color);
        $scope.allDecorateInfo( "DecorationInfo[0].State", $scope.DecorationInfo[0].State);
        $scope.allDecorateInfo( "DecorationInfo[1].Templates", $scope.DecorationInfo[1].Templates);
        $scope.allDecorateInfo( "DecorationInfo[1].Tem", $scope.DecorationInfo[1].Tem);
        $scope.allDecorateInfo( "DecorationInfo[1].Text", $scope.DecorationInfo[1].Text);
        $scope.allDecorateInfo( "DecorationInfo[1].Color", $scope.DecorationInfo[1].Color);
        $scope.allDecorateInfo( "DecorationInfo[1].State", $scope.DecorationInfo[1].State);
        $scope.allDecorateInfo( "DecorationInfo[2].Templates", $scope.DecorationInfo[2].Templates);
        $scope.allDecorateInfo( "DecorationInfo[2].Tem", $scope.DecorationInfo[2].Tem);
        $scope.allDecorateInfo( "DecorationInfo[2].Text", $scope.DecorationInfo[2].Text);
        $scope.allDecorateInfo( "DecorationInfo[2].Color", $scope.DecorationInfo[2].Color);
        $scope.allDecorateInfo( "DecorationInfo[2].State", $scope.DecorationInfo[2].State);
        $scope.allDecorateInfo( "DecorationInfo[3].Templates", $scope.DecorationInfo[3].Templates);
        $scope.allDecorateInfo( "DecorationInfo[3].Tem", $scope.DecorationInfo[3].Tem);
        $scope.allDecorateInfo( "DecorationInfo[3].Text", $scope.DecorationInfo[3].Text);
        $scope.allDecorateInfo( "DecorationInfo[3].Color", $scope.DecorationInfo[3].Color);
        $scope.allDecorateInfo( "DecorationInfo[3].State", $scope.DecorationInfo[3].State);
        console.log($scope.kvData)
      }else if (templates == 'templates/main/decorationRequirementsTem.html') {
          $scope.masklayerClickR(templates);
      }else if(templates == 'invitDesginer'){
           $scope.masklayerClickR('templates/main/invitDesginer.html');
      }else if(templates == 'invitCompany'){
           $scope.masklayerClickR('templates/main/invitCompany.html');
      }else{
         utils.alert("请核对信息!");
      }
    }

    //测试传值用
    $scope.allDecorateInfo = function(key, value){
      $scope.kvData[key] = value;
    }

   //获取用户对设计者的评价,分数
   $scope.inputDesginerEval = function(){
     //服务态度打分   $('#pointP1').data('obj1') 设计水平打分   $('#pointP2').data('obj2') 工作效率打分   $('#pointP3').data('obj3')
    if($scope.decorateInfo.desginerEval != null && $('#pointP1').data('obj1') != null && $('#pointP2').data('obj2') != null && $('#pointP3').data('obj3') != null){        
      utils.alert("提交成功!");     
    }else{
      utils.alert("请填写你对设计师的意见!");
    }
   }


    //预约装修公司，进行比较中标和淘汰
    $scope.companyReservations = function(_item){ 
      if(!$scope.evalCompany){
        if(!$scope.companyElemOne){
          if(_item.state == "已预约"){
            utils.alert("您已预约当前设计师")
          }else{ 
            $scope.companyElemOne = _item;
            $scope.typeAC = true;
            $scope.typeBC = true;
            _item.state = "已预约"; 
            $scope.masklayerShowHideClass="RightColumnParentclassNone";
            $scope.masklayerShowHideClass2="RightColumnParentclassNone";   
          }
        }else if(!$scope.companyElemTwo){
          if(_item.state == "已预约"){
            utils.alert("您已预约当前设计师")
          }else{ 
            $scope.companyElemTwo = _item;
            $scope.typeCC=true;
            $scope.typeDC=true;
            _item.state = "已预约";
            $scope.masklayerShowHideClass="RightColumnParentclassNone";
            $scope.masklayerShowHideClass2="RightColumnParentclassNone";  
           }  
        }else if(!$scope.companyElemThree){
          if(_item.state == "已预约"){
            utils.alert("您已预约当前设计师")
          }else{ 
           $scope.companyElemThree = _item;
           $scope.typeEC=true;
           $scope.typeFC=true;
           _item.state = "已预约";
           $scope.masklayerShowHideClass="RightColumnParentclassNone";
           $scope.masklayerShowHideClass2="RightColumnParentclassNone";  
         }
        }
        else{
          //防止页面出错
          utils.alert("您最多只能选择三个设计师为你服务，在取消前面的设计师后可继续选择！");
          $scope.masklayerShowHideClass="RightColumnParentclassNone";         
        }     
      }else{
          utils.alert("您已成功预约，无需进行此操作！");
      }
    }

    //从地图上预约的设计师和装修公司
    $scope.MDesginer = localStorage.getItem('MDesginer') != 'undefined' ? (JSON.parse(localStorage.getItem('MDesginer')) != null ? JSON.parse(localStorage.getItem('MDesginer')) : new Array()) : new Array();
    $scope.MCompany = localStorage.getItem('MCompany') != 'undefined' ? (JSON.parse(localStorage.getItem('MCompany')) != null ? JSON.parse(localStorage.getItem('MCesginer')) : new Array()) : new Array();
    
  
    //预约量房,选择设计师进行比较
    $scope.roomReservations = function(obj){ 
      if(!$scope.evalDesginer){//判断如果已中标，无法进行预约
        if(!$scope.desginElemOne){
          if(obj.state == "已预约"){
            utils.alert("您已预约当前设计师")
          }else{ 
           $scope.desginElemOne = obj;
           $scope.typeA=true;
           $scope.typeB=true;
           obj.state = "已预约"; 
           $scope.masklayerShowHideClass="RightColumnParentclassNone";
           $scope.masklayerShowHideClass2="RightColumnParentclassNone";    
          }
        }else if(!$scope.desginElemTwo){
          if(obj.state == "已预约"){
            utils.alert("您已预约当前设计师")
          }else{ 
           $scope.desginElemTwo = obj;
           $scope.typeC=true;
           $scope.typeD=true;
           obj.state = "已预约";
           $scope.masklayerShowHideClass="RightColumnParentclassNone";
           $scope.masklayerShowHideClass2="RightColumnParentclassNone";  
          }
        }else if(!$scope.desginElemThree){
          if(obj.state == "已预约"){
            utils.alert("您已预约当前设计师")
          }else{ 
           $scope.desginElemThree = obj;
           $scope.typeE=true;
           $scope.typeF=true;
           obj.state = "已预约";
           $scope.masklayerShowHideClass="RightColumnParentclassNone";
           $scope.masklayerShowHideClass2="RightColumnParentclassNone";   
          }
        }else{
          utils.alert("您最多只能邀请三家公司为你服务，在取消前面的公司后可继续选择！");
          $scope.masklayerShowHideClass="RightColumnParentclassNone";
        }
      }else{
          utils.alert("您已成功预约，无需进行此操作！");
      }
    }

     //打开支付设计费model
    $scope.desginCost = function(_id){
      if(_id==$scope.desginElemOne){
        $scope.desginElemThree = $scope.desginElemTwo = '';
        $scope.typeE = $scope.typeC = false
        $scope.typeF = $scope.typeD = true;
      }else if(_id==$scope.desginElemTwo){
        $scope.desginElemThree = $scope.desginElemOne = '';
        $scope.typeE = $scope.typeA = false;
        $scope.typeF = $scope.typeB = true;
      }else if(_id==$scope.desginElemThree){
        $scope.desginElemTwo = $scope.desginElemOne = '';
        $scope.typeC = $scope.typeA = false;
        $scope.typeD = $scope.typeB = true;
      }else{
        //防止页面出错
        $scope.masklayerShowHideClass="RightColumnParentclassNone";
      }  
        $scope.state = "支付设计费"
        $scope.evalDesginer = _id;
        //支付完毕改变节点为设计验收
        $scope.DecorationInfo.splice(1, 1, $scope.freeDesginerShow)    
        $scope.masklayerShowHideClass = "RightColumnParentclassNone"
        //跳转到支付页面
        $scope.DynamicTem2 = "templates/main/payDesginCost.html";
        $scope.masklayerShowHideClass2 = "RightColumnParentclassNotNone";
  }

    //从地图上预约的设计师和装修公司
    var MDesginer = localStorage.getItem('MDesginer') != 'undefined' ? JSON.parse(localStorage.getItem('MDesginer')) : new Object();
    var MCompany = localStorage.getItem('MCompany') != 'undefined' ? JSON.parse(localStorage.getItem('MCompany')) : new Object();
    // console.log(MCompany)
    // console.log(MDesginer)


    //设计师部分
    var xd = null;
    for (xd in MDesginer) {
       xd = ++xd;
       // console.log(xd)
    }
    if (xd <= 1 && (MDesginer != null || MDesginer != undefined)) {
      $scope.typeB = true;
      $scope.typeA = true;
      $scope.desginElemOne = MDesginer[0];
      console.log($scope.desginElemOne)
      // console.log("111111111")
    } else if (xd <= 2 && (MDesginer != null || MDesginer != undefined)) {
      $scope.typeB = $scope.typeD = true;
      $scope.typeA = $scope.typeC = true;
      $scope.desginElemOne = MDesginer[0];
      $scope.desginElemTwo = MDesginer[1];
      // console.log("2222222222")
    } else if(xd <= 3 && (MDesginer != null || MDesginer != undefined)){
      $scope.typeB = $scope.typeD = $scope.typeF = true;
      $scope.typeA = $scope.typeC = $scope.typeE = true;
      $scope.desginElemOne = MDesginer[0];
      $scope.desginElemTwo = MDesginer[1];
      $scope.desginElemThree = MDesginer[2];
    }else{
        $scope.typeB = $scope.typeD = $scope.typeF = false;
        // console.log("33333333")
    }
    $scope.clearCache = function() {
      $templateCache.removeAll(); //移除所有模板内容，释放内存
      // console.log("成功")
    }

    //装修公司部分
    var md = null;
    for (md in MCompany) {
       md = ++md;
       // console.log(md)
    }
    if (md <= 1 && (MCompany != null || MCompany != undefined)) {
      $scope.typeBC = true;
      $scope.typeAC = true;
      $scope.companyElemOne = MCompany[0];
      // console.log($scope.desginElemOne)
    } else if (md <= 2 && (MCompany != null || MCompany != undefined)) {
      $scope.typeBC = $scope.typeDC = true;
      $scope.typeAC = $scope.typeCC = true;
      $scope.companyElemOne = MCompany[0];
      $scope.companyElemTwo = MCompany[1];
    } else if(md <= 3 && (MCompany != null || MCompany != undefined)){
      $scope.typeBC = $scope.typeDC= $scope.typeFC = true;
      $scope.typeAC = $scope.typeCC = $scope.typeEC = true;
      $scope.companyElemOne = MCompany[0];
      $scope.companyElemTwo = MCompany[1];
      $scope.companyElemThree = MCompany[2];
    }else{
       $scope.typeAC = $scope.typeCC = $scope.typeEC = false;
    }


    //从地图上预约的设计师和装修公司
     var MDesginer = localStorage.getItem('MDesginer') != 'undefined' ? JSON.parse(localStorage.getItem('MDesginer')) : new Object();
    var MCompany = localStorage.getItem('MCompany') != 'undefined' ? JSON.parse(localStorage.getItem('MCompany')) : new Object();
    // console.log(MCompany)
    // console.log(MDesginer)


    //设计师部分
    var xd = null;
    for (xd in MDesginer) {
       xd = ++xd;
       // console.log(xd)
    }
    if (xd <= 1 && (MDesginer != null || MDesginer != undefined)) {
      $scope.typeB = true;
      $scope.typeA = true;
      $scope.desginElemOne = MDesginer[0];
      console.log($scope.desginElemOne)
      // console.log("111111111")
    } else if (xd <= 2 && (MDesginer != null || MDesginer != undefined)) {
      $scope.typeB = $scope.typeD = true;
      $scope.typeA = $scope.typeC = true;
      $scope.desginElemOne = MDesginer[0];
      $scope.desginElemTwo = MDesginer[1];
      // console.log("2222222222")
    } else if(xd <= 3 && (MDesginer != null || MDesginer != undefined)){
      $scope.typeB = $scope.typeD = $scope.typeF = true;
      $scope.typeA = $scope.typeC = $scope.typeE = true;
      $scope.desginElemOne = MDesginer[0];
      $scope.desginElemTwo = MDesginer[1];
      $scope.desginElemThree = MDesginer[2];
    }else{
        $scope.typeB = $scope.typeD = $scope.typeF = false;
        // console.log("33333333")
    }
    $scope.clearCache = function() {
      $templateCache.removeAll(); //移除所有模板内容，释放内存
      // console.log("成功")
    }

    //装修公司部分
    var md = null;
    for (md in MCompany) {
       md = ++md;
       // console.log(md)
    }
    if (md <= 1 && (MCompany != null || MCompany != undefined)) {
      $scope.typeBC = true;
      $scope.typeAC = true;
      $scope.companyElemOne = MCompany[0];
      // console.log($scope.desginElemOne)
    } else if (md <= 2 && (MCompany != null || MCompany != undefined)) {
      $scope.typeBC = $scope.typeDC = true;
      $scope.typeAC = $scope.typeCC = true;
      $scope.companyElemOne = MCompany[0];
      $scope.companyElemTwo = MCompany[1];
    } else if(md <= 3 && (MCompany != null || MCompany != undefined)){
      $scope.typeBC = $scope.typeDC= $scope.typeFC = true;
      $scope.typeAC = $scope.typeCC = $scope.typeEC = true;
      $scope.companyElemOne = MCompany[0];
      $scope.companyElemTwo = MCompany[1];
      $scope.companyElemThree = MCompany[2];
    }else{
       $scope.typeAC = $scope.typeCC = $scope.typeEC = false;
    }

    //淘汰+中标
     $scope.select = function(str, id){
      if(str == '中标'){
        if($scope.state == '中标'){
          utils.showDialog("", "中标后不可更改，且支付设计费", "",function(){$scope.desginCost(id);});;
        }
      }
      if(str == '淘汰'){
       if(id == $scope.desginElemOne){
          id.state = '预约量房'
          $scope.desginElemOne = '';  //清空$scope.desginElemOne对象，注意不是传进来的id对象，(他两只是在此处相等)此处对全局作用
          $scope.typeA = $scope.typeB=false;
        }else if(id == $scope.desginElemTwo){
          id.state = '预约量房'
          $scope.desginElemTwo = '';
          $scope.typeC = $scope.typeD = false;
        }else{
          id.state = '预约量房'
          $scope.desginElemThree = '';
          $scope.typeE = $scope.typeF = false;
        }
      }
      if(str == '中标公司'){
         utils.showDialog("", "中标后不可更改，确认继续", "",function(){$scope.companySure(id);});
         document.getElementById("taotaiCom").style.display="none";
          // localStorage.setItem("designconstruction", id.name);
          // console.log(id);
      }
      if(str == '淘汰公司'){
        if(id == $scope.companyElemOne){
          id.state = '预约装修'
          $scope.companyElemOne = '';
          $scope.typeAC = $scope.typeBC = false;
        }else if(id == $scope.companyElemTwo){
          id.state = '预约装修'
          $scope.companyElemTwo = '';
          $scope.typeCC = $scope.typeDC = false;
        }else if(id == $scope.companyElemThree){
          id.state = '预约装修'
          $scope.companyElemThree = '';
          $scope.typeEC = $scope.typeFC = false;
        }
      }
    }
    
    //装修公司的确定
    $scope.companySure = function(_id){
      if(_id == $scope.companyElemOne){
        $scope.evalCompany = _id;
        $scope.stateC = "已中标"
        $scope.companyElem.state = "预约装修"; 
        $scope.companyElemTwo = $scope.companyElemThree = '';
        $scope.typeEC = $scope.typeCC = false
        $scope.typeFC = $scope.typeDC = true;        
        $scope.masklayerShowHideClass = "RightColumnParentclassNone"
      }else if(_id == $scope.companyElemTwo){
        $scope.evalCompany = _id;
        $scope.stateC = "已中标"
        $scope.companyElem.state = "预约装修"; 
        $scope.companyElemOne = $scope.companyElemThree = '';
        $scope.typeEC = $scope.typeAC = false
        $scope.typeFC = $scope.typeBC = true;        
        $scope.masklayerShowHideClass = "RightColumnParentclassNone"
      }else if(_id == $scope.companyElemThree){
        $scope.evalCompany = _id;
        $scope.stateC = "已中标"
        $scope.companyElem.state = "预约装修"; 
        $scope.companyElemTwo = $scope.companyElemOne = '';
        $scope.typeCC = $scope.typeAC = false
        $scope.typeDC = $scope.typeBC = true;          
        $scope.masklayerShowHideClass = "RightColumnParentclassNone"
      }else{
      //防止页面出错
      $scope.masklayerShowHideClass="RightColumnParentclassNotNone";
      $scope.DynamicTem='templates/main/companywinEliminate.html';   
      }     
    } 



    //图片预览
    $scope.iconInfo = function(obj){
      $scope.masklayerShowHideClass2 = "RightColumnParentclassNotNone";
      $scope.DynamicTem2 = "templates/main/desginCenterTem.html";
      $scope.desginElem = obj;
    }
    
    //点击作品预览大图
    $scope.imagesView = function(obj, str){
      if(str == '设计师页面' || str == '免费设计验收'){
        $scope.DynamicTem2 = "templates/main/imagesView.html";
        $scope.masklayerShowHideClass2 = "RightColumnParentclassNotNone";
        $scope.imageInfo = obj;
        $scope.showImage = false;
        $scope.showText = true;
      }
            /*if(str == '免费设计验收'){
        $scope.masklayerShowHideClass2 = "RightColumnParentclassNotNone";
        // $scope.masklayerShowHideClass3 = "RightColumnParentclassNotNone";
        $scope.DynamicTem2 = "templates/main/imagesView2.html";
        $scope.imageInfo = obj;  
      }*/
    }

    $scope.hindImage = function(){
      $scope.showImage = false;
      $scope.showText = true;
    }

    //验收各种图
    $scope.acceptancePicture = function(str, obj){
      $scope.showImage = true;
      $scope.showText = false;
      if(str == '平面图'){
      }
    }

    //进行各状态的样式的显示
    $scope.AA=$scope.BB=$scope.CC=$scope.DD=$scope.EE=$scope.FF= false;
    //加载之前进行合同款的检查，进行状态的判定
    if($scope.constructe[0].state == 1){
       $scope.constructe[0].operation ='已确认';
       $scope.constructe[0].cost = $scope.constructe[0].cost;
       $scope.AA = true;
           if($scope.constructe[1].state == 1){
              $scope.constructe[1].operation = '已支付';
              $scope.BB = true;
           }else{
              $scope.constructe[1].operation = '';
           }
           if($scope.constructe[2].state == 1){
              $scope.constructe[2].operation = '已支付';
              $scope.CC = true;
           }else{
              $scope.constructe[2].operation = '';
           }
           if($scope.constructe[3].state == 1){
              $scope.constructe[3].operation = '已支付';
              $scope.DD = true;
           }else{
              $scope.constructe[3].operation = '';
           }
           if($scope.constructe[4].state == 1){
              $scope.constructe[4].operation = '已支付';
              $scope.EE = true;
           }else{
              $scope.constructe[4].operation = '';
           }
           if($scope.constructe[5].state == 1){
             console.log($scope.constructe[5].state)
              $scope.constructe[5].operation = '已确认';
              $scope.FF = true; 
           }else{
              $scope.constructe[5].operation = '';
           }
    }else{
      //当还没开始合同款确认的时候将后面节点状态进行显示
       $scope.constructe[0].operation =  $scope.constructe[1].operation = $scope.constructe[2].operation = $scope.constructe[3].operation = $scope.constructe[4].operation = $scope.constructe[5].operation ='';
       $scope.constructe[0].cost = '';
    }
    // coststate  0 合同款没确定   1  合同款确定
    //施工 _clickState：标识状态属性值 0表示验收报告  1表示确认事件  _clickElement表示对应的参数  _clickother 区别对应的验收报告
    $scope.constructeSure = function(_clickState,_clickElement,_clickother){
      //进行验收报告的页面判断
      if(_clickState == 0){
         if (_clickother == 3) {
             $scope.imgPath ="aaaaa";
            console.log("111111111")
         }else if(_clickother == 4){
          console.log("2222222222")
         }else if(_clickother == 5){
          console.log("3333333")
         }else {
          console.log("4444444")
         }
         $scope.masklayerShowHideClass2="RightColumnParentclassNotNone";
         $scope.DynamicTem2='templates/main/constructeSure.html';
      }
      else{//当合同款确定后 ，显示下面的节点状态
        // console.log(_clickother)
        if($scope.constructe[0].state == 0 && _clickother == '合同'){
          console.log("22134213421421412")
           // console.log("等待装修公司提交合同款！")
           $scope.constructe[0].operation = '已确认';
           $scope.AA = true;
           $scope.constructe[0].cost = '等待装修公司提交合同款';
        }else{
/*          $scope.constructe[0].operation = '已确认';
          $scope.constructe[0].cost = $scope.constructe[0].cost;*/
          //进行安装竣工验收报告
          if($scope.constructe[5].state == '0' && _clickother == '安装'){
            $scope.constructe[5].operation = '已确认';
            $scope.FF = true;
           }
        }
      }

 }

     
    
    //保存图片
    $scope.savePhoto = function(){
      //自定义按钮
      var btnArray = [
        {txt: '保存到本地', clickFunc: save},
        {txt: '分享到...', clickFunc: shareTo},
      ]

      var btnWarning = {
        txt: '返回',
        clickFunc: warningFunc
      }
      utils.bottomPopMenu('', btnArray, btnWarning, '取消');
    }

    function save(){      
      console.log("save")
    }
    function shareTo(){
      console.log("shareTo")
    }

     //控制节点css样式
    var element = $scope.DecorationInfo;
    for (var x in element){
       if(element[x].State == "1"){
          $scope.DecorationInfo[x].Color ="Grey";
          // console.log(element[x].Text+"任务已经完成，只可以查看不能修改")
       }
    }

   //任务发布完成后出发该事件进行任务的锁定（只能查看信息，不能进行修改）

    $scope.changeState = function(_Num){
        $scope.DecorationInfo[_Num].State = "1";
        $scope.DecorationInfo[_Num].Color = "Grey";
        $scope.clickif($scope.DecorationInfo,"")
    }
    $scope.clickif = function($event, data) {
      if (data.State == "1") {
        $event.preventDefault();
      } else {
        if (data.Templates != undefined) {
          $scope.masklayerSignOut = 'ng-leave-active';
          $timeout(function() {
            $scope.masklayerShowHideClass = "RightColumnParentclassNone";
            $scope.masklayerSignOut = "ng-enter-active";
          }, 300)
          $timeout(function() {
            $scope.masklayerShowHideClass = "RightColumnParentclassNotNone";
            $scope.DynamicTem = data.Templates;
          }, 350)
        }else{
          return null;
        }
      }
    }

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
        $scope.type = 'desginCost';
        $scope.search = '';
      }else{

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

    //打开设计师modal    
    $scope.desginer_list = function(){
       utils.modal('templates/main/invitDesginer.html', $scope,1)
       $scope.modal.remove();
    }
    //打开设计师详细信息modal 
    $scope.desginer_info = function(){
       utils.modal('templates/main/desginCenterTem.html', $scope,1)
       $scope.modal.remove();
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

    $scope.messagessuccessFunction = function(response){  
      // vm.messages = response;
      vm.messages = vm.messages.concat(response);
/*      console.log(vm.messages)
      console.log(response.length)
      console.log(response)*/
      if(response == " " || response == null ){
          vm.moredata = false;
          console.log("可以添加");  
        }  
/*       当有查询语句的时候进行传值显示
      $scope.$broadcast('scroll.infiniteScrollComplete');
*/      // console.log("messagessuccessFunction")
    }
    $scope.messageserrorFunction=function(response){
      console.log("messageserrorFunction")
    }

    //关闭模板 D:设计师页面  C装修公司页面
    $scope.closeTemplate00000000000000 = function(obj){
      if(obj.mark == 'D'){
        $scope.masklayerShowHideClass2="RightColumnParentclassNone";
        
      }
      if(obj.mark == 'C'){
        $scope.masklayerShowHideClass3="RightColumnParentclassNone";
        // $scope.DynamicTem2 = "templates/main/desginCenterTem.html";
        // $scope.masklayerShowHideClass2="RightColumnParentclassNotNone";
      }else {
        $scope.masklayerShowHideClass2="RightColumnParentclassNone";
      }
    }


     //关闭模板
    $scope.closeTemplate = function(){
      $scope.masklayerShowHideClass = "RightColumnParentclassNone";
    }
    $scope.closeTemplate2 = function(){
      $scope.masklayerShowHideClass2="RightColumnParentclassNone";
    }
    $scope.closeTemplate3 = function(){
      $scope.masklayerShowHideClass3="RightColumnParentclassNone";
    }

    $scope.closeTemplateA = function(){
      $scope.masklayerShowHideClass3="RightColumnParentclassNone";
    }
    //打开设计比稿model
    $scope.winningEliminated = function(){
      utils.modal('templates/main/winEliminated.html', $scope,1);
    } 
    //打开选择modal
    $scope.chooseModal = function() {
      utils.modal('templates/main/decorateChooseTem.html', $scope, 1);
    }
    //打开小区modal（自动完成小区数据）
    $scope.houseModal = function() {
      utils.modal('templates/main/houseInputTem.html', $scope);
    }
    
    //打开modal
    $scope.clickcontact = function() {
      utils.modal('templates/main/descontactTem.html', $scope,1);
    }
    //打开监理详细modal
    $scope.supervisionModel = function(){
      if($scope.supervisionComplete.name== null){
        utils.alert("你还未邀请监理！");
      }else{
        console.log("测试")
          $scope.masklayerShowHideClass2="RightColumnParentclassNotNone";
          $scope.DynamicTem2='templates/main/supervisionCenterTem.html';
     }
    }

    //打开装修公司详细modal
    $scope.companyModel = function(){
      if($scope.evalCopmany == null){
        utils.alert("你还未邀请过装修公司！");
        console.log($scope.evalCopmany)
      }else{
       utils.modal('templates/main/companyCenterTem.html', $scope,1);
     }
    }
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
    //移除Modal
    $scope.closeModal = function(){
      $scope.modal.remove(); 
    }
    /*******上传图片部分*******/
    //拍照按钮事件
    function takePhotoFunc(){
      console.log('拍照上传');
    }
    //相册选择事件
    function localChooseFunc(){
      console.log('在相册中选择');
    }
    //警告按钮事件
    function warningFunc(){
      console.log('警告按钮被点击');  
    }
    //添加图片
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
    //弹出提交信息modal
    $scope.supervisionInfo = function(){
         utils.alert("提交成功！");     
/*      if($scope.supervisionComplete.name== null){
        utils.alert("请完善上述信息后在提交！");
      }else{
       utils.modal('templates/main/paySup.html', $scope,1);
     }*/
    }
    //打开设计师详细model
    $scope.desginerModel = function(){
       utils.modal('templates/main/desginCenterTem.html', $scope,1);
    }
    //打开支付保证金界面model
    $scope.payModel = function(){
      utils.modal('templates/main/payInfo.html', $scope,1);
    }
    //修改用户信息
    $scope.modifyUser = function() {
      //修改成功，存入缓存
      localStorage.setItem('user', JSON.stringify($scope.userData));
    }
    $scope.clickcost = function() {
      utils.modal('templates/main/descosTem.html');
      $scope.userData = JSON.parse(localStorage.getItem('user', 'rooms', 'units', 'situation', 'monitor', 'house', 'designer', 'designCost', 'decorateTypes', 'decorateStyle'));
    }
    }])

  app.register.controller('ModalInstanceCtrl', ['$scope', '$modalInstance', 'items',
    function($scope, $modalInstance, items) {
      $scope.items = items;
      $scope.selected = {
        item: $scope.items[0]
      };

      $scope.ok = function() {
        console.log($modalInstance);
        $modalInstance.close($scope.selected.item);
      };

      $scope.cancel = function() {
        $modalInstance.dismiss('cancel');
      };
    }
  ]);
})