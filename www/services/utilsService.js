define(['app'], function (app) {
 app.register.service('utils', ['$http', '$ionicPopup', '$ionicModal', '$ionicActionSheet', 'blockUI', '$timeout','$window', function($http, $ionicPopup, $ionicModal, $ionicActionSheet, blockUI, $timeout, $window){
    
    // 启动极光推送服务
    this.initPush = function(){
        $window.plugins.jPushPlugin.init();
        $window.plugins.jPushPlugin.setDebugMode(true);
    }

    // 停止极光推送服务
    this.stopPush = function(){
        $window.plugins.jPushPlugin.stopPush();
    }

    //跳转到登录页
    this.gotoLogin = function(){
        window.location.href="#/mycenter/index";
    }
    //alert弹窗(提示消息，标题，回调函数)
    this.alert = function(msgStr, titleStr, callback){
        $ionicPopup.alert({title: titleStr || '提示', template: msgStr || 'undefined'}).then(function(res){
            callback && callback();
        });
    }

    /**自定义对话框弹窗,_template变量为空时表现为confirm弹窗，参数只有_OkEvent时效果相当于confirm窗体
    *@ _OkEvent: (必填)确定按钮事件(event)。若不允许用户关闭,在函数体中加入event.preventDefault(); 
    *@ _template: (选填)自定义模板
    *@ _scope: (选填)作用域
    *@ _callback: (选填)回调函数(res)
    *@ _titleTxt: (选填)标题文本
    *@ _subTitleTxt: (选填)子标题文本
    */
    this.MyshowDialog = function(_OkEvent, _template, _scope, _callback, _titleTxt, _subTitleTxt){
        $ionicPopup.show({
            template: _template || '<p style="padding-top:10px; text-indent:2em;">确定执行此操作吗?</p>',
            title: _titleTxt || '提示',
            subTitle: _subTitleTxt || '',
            scope: _scope && _scope,
            buttons: [
                { text: '取消'},
                {
                    text: '确定',
                    type: 'button-positive',
                    onTap: _OkEvent
                },
            ]
        }).then(function(res) {
            _callback && _callback(res);
        });
    }

    this.showDialog = function(_OkEvent, _template, _scope, _callback, _titleTxt, _subTitleTxt){
        $ionicPopup.show({
            template: _template || '<p style="padding-top:10px; text-indent:2em;">确定执行此操作吗?</p>',
            title: _titleTxt || '提示',
            subTitle: _subTitleTxt || '',
            scope: _scope && _scope,
            buttons: [
                { text: '取消'},
                {
                    text: '确定',
                    type: 'button-positive',
                    onTap: function(res) {
            _callback && _callback(res);
        }
                },
            ]
        })
    }

/*   // 自定义弹窗2
   // _template：弹出信息，_scope：作用域，_callback1：取消事件，_callback2：确定事件
   this.myPopup = function (_template,_scope,_callback1,_callback2){
        var showmyPopup = $ionicPopup.show({
         template: _template,
         scope: _scope && _scope,
         buttons: [
            {
                text: '取消',
                type: 'button-default',
                onTap: _callback1 
            },
           {
             text: '确定',
             type: 'button-positive',
             onTap: _callback2
           },
         ]
    })
    };*/
    //显示modal层(模板URL或模板ID)
    this.modal = function(temlateUrl, $scope, _animationType){ //获取
        switch(_animationType){
            case 1: _animation = 'slide-in-up'; break;
            case 2: _animation = 'slide-in-right'; break;
            case 3: _animation = 'slide-in-down'; break;
            case 4: _animation = 'slide-in-left'; break;
            default: _animation = 'slide-in-up';
        }
        if($scope) {
            $ionicModal.fromTemplateUrl(temlateUrl,  {// modal窗口选项
                scope: $scope,
                animation: _animation || 'slide-in-up'
            }).then(function (modal) {
                $scope.modal = modal;
                $scope.modal.show();//显示对话框
            });
        } else {
            $ionicModal.fromTemplateUrl(temlateUrl, function (modal) {
                modal.show();//显示对话框
            });
        }
    }
    //获取模板，存入内存（根据模板路径）
    this.getTemplates = function(templateUrl){
        return $http.get(templateUrl).success(function(response) {
                    return response;
                });
    }
    //底部上弹菜单(选择框标题，自定义按钮对象数组，警告按钮对象)
    //* 控制器引用示例:
    //拍照按钮事件
/*    function takePhotoFunc(){
      console.log('拍照上传');
    }
    //相册选择事件
    function localChooseFunc(){
      console.log('在相册中选择');
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
    }*/
    
    this.bottomPopMenu = function(_titleTxt, _btnTxtEventArray, _destructiveTxtEvent, _cancelTxt ){

        var btnTxtArray = new Array();
        for( var index in _btnTxtEventArray) {
            btnTxtArray.push({ text: _btnTxtEventArray[index].txt });
        }
        var hideSheet = $ionicActionSheet.show({
            buttons: btnTxtArray,
            titleText: _titleTxt,
            cancelText: _cancelTxt,
            destructiveText: _destructiveTxtEvent ? _destructiveTxtEvent.txt : '',
            cancel: function() {    //取消按钮

            },
            destructiveButtonClicked: function() {  //警告按钮（红色字体）
                _destructiveTxtEvent && _destructiveTxtEvent.clickFunc();
                return true;
            },
            buttonClicked: function(index) {    //自定义按钮
                _btnTxtEventArray[index].clickFunc && _btnTxtEventArray[index].clickFunc();
                return true;
            }
       });
    }
    //进行下拉数据的动态加载
    var BASE_URL = "#";
    var decorcompany = [];
    this.GetFeed = function() {
        return $http.get(BASE_URL + '?results=6').then(function(response) {
            decorcompany = response.data.results;
            return decorcompany;
        });
    },
    this.GetNewUser = function() {
        return $http.get(BASE_URL + '?results=6').then(function(response) {
            decorcompany = response.data.results;
            return decorcompany;
        });
    }


    //服务
    var param = {};
    //页码
    param.curPage = 1;
    param.hasmore = false;
    this.getList = function(){
            return $resource(UrlUtil.root + 'financeList.do', {}, {
                query: {
                    method: 'GET',
                    params: param
                }
            });
            return {
                getList: getList,
                param: param
            };
     }
        //执行计时器（总执行秒数，结果处理函数）
    this.timeCount = function(_total, countFunc){
        if(this.timer ==undefined){
            var totalSeconds = 1, totalCount = totalSeconds*1000;   //总秒数，计时器总计数
            if(_total && parseInt(_total)>0){
                totalSeconds = _total;
                totalCount = totalSeconds*1000;
            }
            //返回结果
            var resultSecond = {
                currSecond: 0,  //当前执行秒数
                lastSecond: totalSeconds - this.currSecond   //剩余秒数
            }

            getCount = function(){
                localStorage.removeItem('resultSecond');
                resultSecond.currSecond++;    //当前执行秒数
                resultSecond.lastSecond = totalSeconds - resultSecond.currSecond;   // 当前剩余秒数
                //存入缓存，防止刷新后读秒置零
                localStorage.removeItem('resultSecond');
                localStorage.setItem('resultSecond', JSON.stringify(resultSecond));
                countFunc(JSON.parse(localStorage.getItem('resultSecond')));    //执行处理函数
                if(resultSecond.lastSecond > 0){
                    $timeout.cancel(this.timer);
                    this.timer = $timeout(function(){
                        getCount(); //定时执行此函数
                    }, 1000);
                } else {
                    $timeout.cancel(this.timer)
                }
            }
            getCount();
        }
    }

    this.masklayerClickT = function(templates){
        console.log("nnnnnnnnnnnnnnnnnnnnn")
          $scope.masklayerShowHideClass="RightColumnParentclassNotNone";
          $scope.DynamicTem=templates;
    }
    //手动终止计时
    this.timeCancel = function(){
        this.timer ? $timeout.cancel(this.timer) : '' ;
        return this;
    }

    //检测手机号(true格式正确，false格式不正确)
    this.chkMobile = function(_telNumber){
        return new RegExp(/^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9]|170)\d{8}$/).test(typeof(_telNumber)=='string' ? _telNumber.trim() : _telNumber);
    }
    //空检测(true不为空，false为空)
    this.chkNull = function(_varName){
        return _varName==undefined||_varName==null||!_varName||(typeof(_varName)=='string'&&_varName.trim()=='') ? false : true;
    }


    //接收消息
    this.message =function(event){ 
        ws = new WebSocket("ws://192.168.1.184:4141/chat"); // 应该改为动态获取服务器的ip和端口号 + document.getElementById("Connection").value
        ws.onopen = function() {
            console.log("连接已经建立。");
        };

        $scope.chatLog = ''; //聊天记录

        // if(localStorage.getItem('chatLog') != null && localStorage.getItem('chatLog') != ""){
        //     $scope.chatLog += localStorage.getItem('chatLog');
        // }

        ws.onmessage = function(event) {
            // Log(event.data); 
            $scope.chatLog += event.data + '<br>'; // 将每条消息进行字符串连接
            localStorage.setItem('chatLog', $scope.chatLog);
        };

        ws.onclose = function() {
            console.log("连接已经断开。");
        };

        ws.onerror = function() {
            console.log("连接已经断开。");
        };

    }
        
 }])

})