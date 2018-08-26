(function() {
  angular.module('ngBaiduMap', [])
    .factory('baiduMapScriptLoader', baiduMapScriptLoader)
    .provider('baiduMapApi', baiduMapApiProvider)
    .directive('baiduMap', baiduMap);

  /*
   * 用于管理百度地图 API 脚本
   */
  // @ngInject

  function baiduMapScriptLoader($q) {

    var mapApi = $q.defer();
    var callbackName = randomCallbackName();
    window[callbackName] = initialize;
    return load;

    function load(version, accessKey) {
      // load baidu map api
      var script = document.createElement('script');

      var baiduLoader = 'http://api.map.baidu.com/api?' + 'v=' + version + '&ak=' + accessKey + '&callback=' + callbackName;

      script.src = baiduLoader;
      document.body.appendChild(script);

      return mapApi.promise;
    }

    function initialize() {
      mapApi.resolve(BMap);
      delete window[callbackName];
    }
  }
  /*
   * 用于配置加载地图的方法
   */

  function baiduMapApiProvider() {

    this.$get = $get;
    this.accessKey = accessKey;
    this.version = version;
    this.options = {
      version: '2.0'
    };

    return this;

    function accessKey(accessKey) {
      this.options.accessKey = accessKey;
      return this;
    }

    function version(version) {
      this.options.version = version;
      return this;
    }

    // @ngInject

    function $get(baiduMapScriptLoader) {
      return baiduMapScriptLoader(this.options.version, this.options.accessKey);
    }
  }

  /*
   * 生成随机的 callback 方法名
   */

  function randomCallbackName() {
    var name = '_callback' + (Math.random() + 1).toString(36).substring(2, 5)
    return name;
  }

  /*
   * directive 定义
   */
  // @ngInject

  function baiduMap(baiduMapApi, $rootScope) {
    return {
      require: 'baiduMap',
      scope: {
        center: '='
      },
      link: link,
      controller: controller
    };

    function link(scope, element, attrs, controller) {
      // element.css('display', 'block');
      baiduMapApi.then(function(BMap) {
        var map = new BMap.Map(element[0]);
        controller.init(map);
      });
      element.css({
        'width': '100%',
        'height': '100%',
        'position': 'absolute',
        'top': '0',
        'left': '0'
      });
      element.parent().children('.map_search').css('display', 'block'); //地图创建成功后再显示

    }
  }

  /*
   * 用于控制 directive 的内部 controller
   */
  // @ngInject

  function controller($scope, $q, mainAjax) {
    var vm = this;

    $scope.vMap = '';
    this.init = init;

    return;

    function init(map) {
      localStorage['flag_result'] = 0; //小区名称标记变量加入缓存，0时不为标记添加小区名称，1时添加
      var center = $scope.center;

      console.log($scope.center);
      map.centerAndZoom(new BMap.Point(center.lng, center.lat), 16); //19是最大级别
      marker_house = new BMap.Marker(new BMap.Point(center.lng, center.lat));
      map.addOverlay(marker_house);

      //获取角色信息
      $scope.vMap = map;

      mainAjax.getResultData(getRoleSuccess, getRoleError); //菜单栏获取指定角色
      mainAjax.getHouse(getHouseSuccess, getHouseError);
      mainAjax.getAlldata(getDataSuccess, getDataError); //获取所有角色

      /********鼠标滚轮动作********/
      map.enableScrollWheelZoom(true);
      /********鼠标滚轮动作********/

      /********拖拽动作********/
      map.addEventListener('dragend', function(type, target) {
        localStorage['flag_result'] = 0;
        var center = map.getCenter();
        $scope.center = center;
        console.log(center);
        $scope.$apply();

      });
      /********拖拽动作********/
      /********监视中心点********/
      $scope.$watch('center', function(newVal, oldVal) {
        var point = new BMap.Point(newVal.lng, newVal.lat);
        map.panTo(point);
        var flag_result = localStorage['flag_result'] ? localStorage['flag_result'] : 0;
        if (flag_result == 1) { //点击‘查找’后重新定位新坐标，否则在拖拽地图过程中不操作
          position_house(newVal);
        }
        //坐标刷新时，更新屏幕范围内地图信息
        mainAjax.getResultData(getRoleSuccess, getRoleError);

      }, true);
      /********监视中心点********/

      /********监视条件角色Id变化********/
      $scope.$watch(function() {
        $scope.roleTypeId = localStorage.getItem('searchRoleId') ? localStorage.getItem('searchRoleId') : '0';
        return $scope.roleTypeId;
      }, function(newValue, oldValue) {
        mainAjax.getResultData(getRoleSuccess, getRoleError);
      });
      /********监视条件角色Id变化********/

      /********监听缩放事件********/
      map.addEventListener("zoomend", function() {
        //屏幕范围变化时，更新屏幕范围内地图信息
        mainAjax.getResultData(getRoleSuccess, getRoleError);
      });
      /********监听缩放事件 结束********/



      //获取点击位置坐标，测试用
      map.addEventListener("click", function(event) {
        console.log(event.point.lng, event.point.lat)
      });


      //获取角色信息

      function getRoleSuccess(response, status) {
        if (status == 200) {
          remove_overlay(); //清除覆盖物
          getRoleLabel(response);
        }
      }

      function getRoleError(response) {
        console.log(response + " getRoleError ");
      }

      //获取房屋信息

      function getHouseSuccess(response, status) {
        if (status == 200) {
          getHouseLabel(response);
        } else {
          console.log(response);
        }
      }

      function getHouseError(response) {

      }

      function getHouseLabel(response) {
        $scope.house = response;
      }



      //获取所有数据

      function getDataSuccess(resopnse, status) {
        if (status == 200) {
          getDataLabel(resopnse);
        }
      }

      function getDataError(response) {
        console.log(response)
      }

      function getDataLabel(response) {
        //分别筛选出全部信息中的角色
        $scope.allRole1 = [];
        $scope.allRole2 = [];
        $scope.allRole3 = [];
        $scope.allRole4 = [];
        $scope.allRole5 = [];

        for (var x in response) {
          if (response[x].logo == '设计师') {
            $scope.allRole1.push(response[x]);
          } else if (response[x].logo == '业主') {
            $scope.allRole2.push(response[x]);
          } else if (response[x].logo == '装修公司') {
            $scope.allRole3.push(response[x]);
          } else if (response[x].logo == '监理') {
            $scope.allRole4.push(response[x]);
          } else if (response[x].logo == '商家') {
            $scope.allRole5.push(response[x]);
          }
        }
      }

      //查找角色

      function getRoleLabel(response) {
        for (var index in response) {
          var curper = response[index];
          var curlng = curper.position.lng, //经度
            curlat = curper.position.lat, //纬度
            curicon = curper.photo;
          curtitle = curper.realname;
          cururl = curper.url;
          curlogo = curper.logo;

          //左上角和右下角经纬度
          var leftTopPos = {
            lng: map.getBounds().getSouthWest().lng,
            lat: map.getBounds().getSouthWest().lat
          },
            rightBottomPos = {
              lng: map.getBounds().getNorthEast().lng,
              lat: map.getBounds().getNorthEast().lat
            }
            //只添加屏幕范围内的
          if (curlng > leftTopPos.lng && curlng < rightBottomPos.lng && curlat > leftTopPos.lat && curlat < rightBottomPos.lat) {
            //获取小区的精度和纬度进行相应接下的比较
            var houseLngLat = $scope.house;
            var logo = response[index].logo;
            var response = response;
            var iconPoint = new BMap.Point(curlng, curlat),
              iconSrc = curicon,
              iconTitle = curtitle,
              iconUrl = cururl;
            this_index = index;
            var iconPoint = new BMap.Point(curlng, curlat),
              iconSrc = curicon,
              iconTitle = curtitle;
            var myCompOverlay = new ComplexCustomOverlay(iconPoint, iconSrc, iconTitle, iconUrl, curper, this_index, response);
            map.addOverlay(myCompOverlay);

          }
        }
      }



      /********自定义覆盖物********/
      // 自定义头像链接

      function ComplexCustomOverlay(point, imgsrc, iconTitle, iconUrl, curper, index, response) {
        this._point = point;
        this._imgsrc = imgsrc;
        this._imgTitle = iconTitle;
        this._imgUrl = iconUrl;
        this.curper = curper;
        this._index = index;
        this_response = response;
      }

      ComplexCustomOverlay.prototype = new BMap.Overlay();
      ComplexCustomOverlay.prototype.initialize = function(map) {
        this._map = map;
        var a = this._a = document.createElement("a");
        a.className = 'a_label_map';
        a.title = this._index;


        //初始化筛选角色
        $scope.$parent.mapDesginer = $scope.allRole1;
        $scope.$parent.mapOwner = $scope.allRole2;
        $scope.$parent.mapCompany = $scope.allRole3;
        $scope.$parent.mapSupervision = $scope.allRole4;
        $scope.$parent.mapMerchants = $scope.allRole5;

        a.addEventListener("click", function() {
          var id = a.getAttribute('title'); //获取点击图标的id值
          if (this_response[id].logo == '设计师') {
            // $scope.$parent.mapDesginer = $scope.allRole1;
            // $scope.$parent.singleData = this_response[id];
            $scope.$parent.desginer2 = this_response[id];
            console.log(this_response[id])
            $scope.$parent.ceshi = 'show';
            $scope.$parent.img1 = 'images/role_desginer_hover.jpg';
            $scope.$parent.img2 = $scope.$parent.img3 = $scope.$parent.img4 = $scope.$parent.img5 = '';
            $scope.$parent.masklayerClickT('templates/map/mapMain.html', 'templates/map/desginerDetails.html');
            $scope.$apply();
          } else if (this_response[id].logo == '业主') {
            $scope.$parent.mapOwner = $scope.allRole2;
            $scope.$parent.singleData = this_response[id];
            $scope.$parent.ceshi = 'show'
            $scope.$parent.img2 = 'images/role_hover.jpg';
            $scope.$parent.img1 = $scope.$parent.img3 = $scope.$parent.img4 = $scope.$parent.img5 = '';
            $scope.$parent.masklayerClickT('templates/map/mapMain.html', 'templates/map/ownerDetails.html');
            $scope.$apply();
          } else if (this_response[id].logo == '装修公司') {
            $scope.$parent.mapCompany = $scope.allRole3;
            $scope.$parent.company2 = this_response[id];
            console.log($scope.$parent.company2)
            $scope.$parent.ceshi = 'show';
            $scope.$parent.img3 = 'images/role_buy_hover.jpg';
            $scope.$parent.img1 = $scope.$parent.img2 = $scope.$parent.img4 = $scope.$parent.img5 = '';
            $scope.$parent.masklayerClickT('templates/map/mapMain.html', 'templates/map/companyDetails.html');
            $scope.$apply();
          } else if (this_response[id].logo == '监理') {
            $scope.$parent.mapSupervision = $scope.allRole4;
            $scope.$parent.singleData = this_response[id];
            $scope.$parent.ceshi = 'show';
            $scope.$parent.img4 = 'images/role_super_hover.jpg';
            $scope.$parent.img1 = $scope.$parent.img2 = $scope.$parent.img3 = $scope.$parent.img5 = '';
            $scope.$parent.masklayerClickT('templates/map/mapMain.html', 'templates/map/supervisionDetails.html');
            $scope.$apply();
          } else if (this_response[id].logo == '商家') {
            $scope.$parent.mapMerchants = $scope.allRole5;
            $scope.$parent.singleData = this_response[id];
            $scope.$parent.ceshi = 'show';
            $scope.$parent.img5 = 'images/role_buy_hover.jpg';
            $scope.$parent.img1 = $scope.$parent.img2 = $scope.$parent.img3 = $scope.$parent.img4 = '';
            $scope.$parent.masklayerClickT('templates/map/mapMain.html', 'templates/map/merchantsDetails.html');
            $scope.$apply();
          } else {
            $scope.$parent.masklayerClickT('templates/map/mapMain.html', 'templates/map/desginerCenter.html');
          }

        });
        a.style.zIndex = BMap.Overlay.getZIndex(this._point.lat);
        //头像
        var img = this._img = document.createElement("img");
        img.src = this._imgsrc;
        img.title = this._imgTitle;
        a.appendChild(img);
        var that = this;
        //箭头
        var arrow = this._arrow = document.createElement("span");
        a.appendChild(arrow);
        //添加至地图面板
        map.getPanes().labelPane.appendChild(a);
        return a;
      }
      //坐标重绘
      ComplexCustomOverlay.prototype.draw = function() {
        var map = this._map;
        var pixel = map.pointToOverlayPixel(this._point);
        this._a.style.left = pixel.x - 18 + "px";
        this._a.style.top = pixel.y - 46 + "px";
      }
      //清除覆盖物

      function remove_overlay() {
        map.clearOverlays();
        var houseSearch_point = localStorage.getItem('houseSearch_point') != 'undefined' ? JSON.parse(localStorage.getItem('houseSearch_point')) : new Object();
        position_house(houseSearch_point);
      }
      /********自定义覆盖物 结束********/
      //查找小区

      function position_house(_newVal) {
        var title_label = !document.getElementById('position_input') || document.getElementById('position_input').value.trim() == '' ? '' : document.getElementById('position_input').value;
        if (title_label != '') {
          try {
            map.removeOverlay(marker_house);
          } catch (event) {
            console.log('info : ' + event.message);
          }
          marker_house = new BMap.Marker(new BMap.Point(_newVal.lng, _newVal.lat));
          map.addOverlay(marker_house);
          marker_house.setLabel(new BMap.Label(title_label, {
            offset: new BMap.Size(20, -10)
          }));
          marker_house.setAnimation(BMAP_ANIMATION_BOUNCE); //跳动动画
        }
      }
    }
  }
})();