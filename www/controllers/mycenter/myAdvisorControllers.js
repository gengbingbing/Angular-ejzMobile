define(['app','mainService','utilsService','myAdvisorDirective'],function (app){

	app.register.controller('myAdvisorCtrl', ['$scope', '$http' ,'mainAjax', 'utils', 'websocketer', function ($scope, $http , mainAjax, utils, websocketer) {
		$scope.initData = function() {
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
		}
		var timer = setTimeout(function(){
            document.getElementById("caht-all").scrollTop=document.getElementById("caht-all").scrollHeight;
            clearTimeout(timer);
        }, 1);
		
		var client_id = 0;
		var userlist = {};
		chatmessage=[];
		chatLog = ''; // 聊天记录
		
		$(document).ready(function() {     
			if(localStorage.getItem('chatLog') != null && localStorage.getItem('chatLog') != ''){	
				chatLog += localStorage.getItem('chatLog')  ;	      	
			}

			if(localStorage.getItem('chatLog') != null && localStorage.getItem('chatLog') != ''){
				$('#chat-messages').append("<div>"+localStorage.getItem('chatLog')+"</div>");	     				      	
			}
			
			ws.onopen = function(e) {
				ws.send("set name " + JSON.parse(localStorage.getItem('user')).username + '|' + "../cache/img/005.jpg");
				ws.send("get name list");
				console.log("连接服务器");
			};

			ws.onmessage = function(e) {
	
				var resp = e.data.split(" ", 3);  //将信息分割成字符串
				var _userid;
				// console.log(client_id + resp[2]);
				if (resp[0] == "setok") {
					client_id = resp[1];
				} else 
				
				if (resp[0] == "names") {
					userlist = eval("(" + resp[1] + ")");
					for ( var i in userlist) {
						newUser(userlist[i].Id);
					}
				} else 
				
				if (resp[0] == "msgfrom") {
					_userid = resp[1], 10
					newMsg(_userid, "@你  " + resp[2]);
				} else 
				
				if (resp[0] == "msgall") {
					_userid = resp[1]
					newMsg(_userid, " " + resp[2]);
				} else 
				
				if (resp[0] == "login") {
					var _u = resp[2].split("|", 2);
					userlist[resp[1]] = {
						Name : _u[0],
						Avatar : _u[1],
						Id : resp[1]
					}
					newUser(resp[1])
					// newMsg(0, _u[0] + "已登录");
				} else 

				if (resp[0] == "logout") {
					// newMsg(0, userlist[resp[1]].Name + "已退出");
					delUser(resp[1]);
				} else {
					console.log(e.data);
				}
			};
			ws.onclose = function(e) {
				console.log('您已退出聊天室');
			};
			ws.onerror = function(e) {
				console.log("onerror");
			};
		});

		function xssFilter(val) {
			// replace 在字符串中用一些字符替换另一些字符，或替换一个与正则表达式匹配的子串
			val = val.replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/\x22/g, '&quot;').replace(/\x27/g, '&#39;');
			return val;
		}

		// 获取时间
		function GetDateT() {
			var d, s;
			s = '';
			d = new Date();
			s += d.getHours() + ":"; // 取小时
			s += d.getMinutes() + ":"; // 取分
			s += d.getSeconds(); // 取秒
			return (s);
		}

		// 获取请求
		function GetRequest() {
			var url = location.search; // 获取url中"?"符后的字串
			var theRequest = new Object();
			if (url.indexOf("?") != -1) {
				var str = url.substr(1);
				strs = str.split("&");
				for ( var i = 0; i < strs.length; i++) {
					theRequest[strs[i].split("=")[0]] = decodeURIComponent(strs[i].split("=")[1]);
				}
			}
			return theRequest;
		}

		// 查询在线用户
		function selectUser(userid) {
			console.log(userid);
			$('#userlist').val(userid);
		}

		// 删除掉线用户
		function delUser(userid) {
			$('#user_' + userid).remove();
			$('#inroom_' + userid).remove();
			delete (userlist[userid])
		}

		// 新用户连接
		function newUser(userid) {
			console.log(userlist[userid]);
			if (userid != client_id) {
				$('#userlist').append("<option value='" + userid + "' id='user_" + userid + "'>"+ userlist[userid].Name + "</option>");
			}
		}

		// 发送或接收新消息
		function newMsg(fromId, content, color) {	
			content = xssFilter(content)
			$("#msg-template .userpic").html("");
			var html = '';
			var imgself = "../cache/img/005.jpg";
			if (client_id == fromId) {
				html += "<div class='chatDiv'><img src='"+imgself+"' style='float:right;'/>";
				chatLog += "<div class='chatDiv'><img src='"+imgself+"' style='float:right;'/>" + " <span class='chatContentRight'>" + content + "</span>" + '</div>'; // 将每条消息进行字符串累加
				localStorage.setItem('chatLog', chatLog);

				html += " <span class='chatContentRight'>" + content + '</span></div>';
				$("#msg-template .content").html(html);							
				$("#chat-messages").append($("#msg-template").html());
			} else {
				var imgurl = userlist[fromId].Avatar;
				html += '<div class="chatDiv"><span style="color: orange"><a href="javascript:selectUser('+ fromId + ')">' + "<img src='"+imgurl+"' style='float:left;'/>";
				html += '</a></span> '	

				// aa 和 bb 分别为监理和设计师， cc为客服,dd为装修公司,为聊天继续分组
				var bb = localStorage.getItem("designer");
				var dd = localStorage.getItem("designconstruction");
				if(userlist[fromId].Name == "Aa" || userlist[fromId].Name == bb || userlist[fromId].Name =="客服" || userlist[fromId].Name == dd){   
					chatLog += "<div class='chatDiv'><img src='"+imgurl+"' style='float:left;'/>" + " <span class='chatContentLeft'>" + content + "</span>" + '</div>'; // 将每条消息进行字符串累加
					localStorage.setItem('chatLog', chatLog);
					html += " <span class='chatContentLeft'>" + content + '</span></div>';					
					$("#msg-template .content").html(html);							
					$("#chat-messages").append($("#msg-template").html());
				}				
			}
			console.log(userlist[fromId].Name);
			document.getElementById("caht-all").scrollTop=document.getElementById("caht-all").scrollHeight; // 使最新的聊天信息在最下方
		}

		// 提交表单
		$(function() {
			$('#msgform').submit(function() {
				var content = $('#msg').val();
				content = content.replace(" ", "&nbsp;");
				if ($('#userlist').val() == 0) {
					ws.send("sendm 0 " + content);
				} else {
					ws.send("sendto " + $('#userlist').val() + " " + content);	
				}
				newMsg(client_id, content);
				$('#msg').val('');
				return false;	
			});
		});

	}]);

})