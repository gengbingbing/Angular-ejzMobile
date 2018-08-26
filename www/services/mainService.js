define(['app','ajaxService'], function (app) {

	app.register.service('mainAjax', ['ajaxService',function(ajaxService){
		//登录
/*		this.login=function(successFunction,errorFunction){
			ajaxService.ajaxGet("http://passport.zsj.test/Auth/sso_info/format/jsonp",successFunction,errorFunction);
		}*/ 

/*
		 'M_CLIENT_ID' => '13',
    'M_TOKEN' => 'mobileyjz001',*/
		//
		var client_id = '13';
		var token = 'mobileyjz001';
		var user_name ="yz110"
		var password = "123456"
		var sso_sid = "397d51e8351ef7e55d898b1ff6262302"
		//http://m.yijiazhuang.test2/User/login?user_name=yz110&password=123456&token=mobileyjz001&client_id=13&sso_sid=397d51e8351ef7e55d898b1ff6262302
		    // var str="http://m.yijiazhuang.test2/User/login?user_name="+user_name+"&password="+password
		  var str = "http://m.yijiazhuang.test2/User/login?user_name="+user_name+"&password="+password+"&client_id="+client_id+"&token="+token+"&sso_sid="+sso_sid+"  ";
	    this.login=function(successFunction,errorFunction){
			ajaxService.ajaxGet(str,successFunction,errorFunction);
		}
		// 获取所有角色信息
		this.getAllUser=function(successFunction,errorFunction){
			ajaxService.localGet("cache/data/mapAllData.json",successFunction,errorFunction);
		}
		// 获取业主信息
		this.getUser=function(successFunction,errorFunction){
			ajaxService.localGet("cache/data/user.json",successFunction,errorFunction);
		}
		// 获取装修公司信息
		this.getCompany=function(successFunction,errorFunction){
			ajaxService.localGet("cache/data/company.json",successFunction,errorFunction);
		}
		// 获取设计师信息
		this.getDesigner=function(successFunction,errorFunction){
			ajaxService.localGet("cache/data/designer.json",successFunction,errorFunction);
		}
		//获取房屋信息
		this.getHouse=function(successFunction,errorFunction){
			ajaxService.localGet("cache/data/House.json",successFunction,errorFunction);
		}
		// 获取监理信息
		this.getMonitor=function(successFunction,errorFunction){
			ajaxService.localGet("cache/data/monitor.json",successFunction,errorFunction);
		}
		// 获取商家信息
		this.getBusiness=function(successFunction,errorFunction){
			ajaxService.localGet("cache/data/business.json",successFunction,errorFunction);
		}

		this.getAlldata=function(successFunction,errorFunction){
			ajaxService.localGet("cache/data/mapAllData.json",successFunction,errorFunction);
		}
		//获取各种角色信息
		this.getResultData = function(successFunction, errorFunction) {
			var searchRoleId = localStorage.getItem('searchRoleId') ? localStorage.getItem('searchRoleId') : '0';
			switch(searchRoleId){
				case '0': this.getAllUser(successFunction, errorFunction); break;	//所有角色
				case '1': this.getUser(successFunction, errorFunction); break;	//业主
				case '2': this.getCompany(successFunction, errorFunction); break;	//装修公司
				case '3': this.getBusiness(successFunction, errorFunction); break;	//商家
				case '4': this.getDesigner(successFunction, errorFunction); break;	//设计师
				case '5': this.getMonitor(successFunction, errorFunction); break;	//监理
				default: this.getAllUser(successFunction, errorFunction);	//默认显示所有角色
			}
		}
		//获取装修信息
		this.getDecorateInfo = function(successFunction,errorFunction){
			ajaxService.localGet("cache/data/decorateInfo.json",successFunction,errorFunction)
		}
		this.getMessagesData = function(perPage,currentPage,successFunction,errorFunction){
			//url="cache/data/messagesDdata.json"+"&perPage="+perPage+"&currentPage="+currentPage
			url="cache/data/messagesDdata.json"
			ajaxService.localGet(url,successFunction,errorFunction);
		}
	}])
})