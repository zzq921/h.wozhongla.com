/*! wozhongla 2015-01-23 */
define("wzlh5/1.0.0/pay",["jquery/2.1.1/jquery","wzlh5/1.0.0/ac","handlebars/1.3.0/dist/cjs/handlebars","wzlh5/1.0.0/until","wzlh5/1.0.0/cp","wzlh5/1.0.0/ui"],function(require,exports,module){var $=require("jquery/2.1.1/jquery"),until=require("wzlh5/1.0.0/until"),action=require("wzlh5/1.0.0/ac"),wzlui=require("wzlh5/1.0.0/ui"),cp=require("wzlh5/1.0.0/cp"),Handlebars=require("handlebars/1.3.0/dist/cjs/handlebars").default,pops=wzlui.containerMask,iscrollPop=wzlui.iscrollPop,dialog=wzlui.dialog,containerMask=wzlui.containerMask,dropdownMask=wzlui.dropdownMask,Y_Y=until.Y_Y,TZ_INFO=until.TZ_INFO,pay=function(ac){function loginJudge(){action.queryUserInfo({},function(re){return"200"==re.resultCode&&"用户没有登录"==re.data.message?void untils.ref("login",location.search):void 0})}function alipayCz(){$(".alipay-cz").on("keyup",function(){var $val=$(this).val().trim();$(this).val($val.replace(/\D/g,""))}),$("#alipaycz").on("click",function(){var dig=dialog("loading","正在发起支付请求，请稍等片刻..."),$money=$(".alipay-cz").val().trim();return!$money||1>$money?(dialog("tips","请输入正确充值金额！"),!1):void actions.queyrUserAccount({},function(re){"200"!=re.resultCode?location.href="login.html":actions.doAlipayCharge({amount:$money},function(re){re.status?document.write(re.data):(dig.hide(),setTimeout(function(){dialog({type:"select",message:re.data,onConfirm:function(){location.href="login.html"}})},500))})})})}function weixinCz(){$(".weixin-cz").on("keyup",function(){var $val=$(this).val().trim();$(this).val($val.replace(/\D/g,""))}),$("#weixincz").on("click",function(){var $money=$(".weixin-cz").val().trim();$money?dialog("loading","正在跳转至微信..."):dialog("请输入充值金额！")})}function cjcard(){$("#alipaycz").on("click",function(){$(this).attr("disabled","disabled");var card=$("#charge-username").val().trim(),pass=$("#charge-password").val().trim();return card?pass?void actions.wzlCardCharge({cardNumber:card,cardPassword:pass},function(re){$("#alipaycz").removeAttr("disabled"),dialog("tips",re.data),"用户未登录"==re.data&&setTimeout(function(){location.href="login.html"},2e3)}):(dialog("tips","请填写正确的密码！"),$(this).removeAttr("disabled"),!1):(dialog("tips","请填写正确的卡号！"),$(this).removeAttr("disabled"),!1)})}function unioncallcz(){var $phone=$(".union-call-phone"),$money=$(".unicon-pay"),$bank=$('input[name="u-crads"]:checked');$("#unicon-cz").on("click",function(){{var $p=$phone.val().trim();$money.val(),$bank.val().trim()}rules.MOBILE.test($p)?dialog("loading","正在提交！"):dialog("请填写完整信息！")}),$(".pay-addcard").on("click",function(){})}function unionpay(){loginJudge("savingscard");var $cash=$("#cash");$pay=$("#pay"),$pay.on("click",function(){var dia=dialog("loading","正在跳转银联支付，请稍等片刻...");return($cashval=$cash.val())?void actions.queyrUserAccount({},function(re){dia.hide(),"200"!=re.resultCode?location.href="login.html":actions.doMobileCharge({amount:$cashval},function(re){dia.hide(),re.status?($("#warp").fadeOut(),$("#warp2").fadeIn(),$("#payurl").attr("href","uppay://uppayservice/?style=token&paydata="+re.data)):dia.hide()})}):(dialog("tips","请输入正确的充值金额..."),!1)})}function ubankcrads(){allBankData=eval("("+allBankData+")"),actions.queryBankInfo({},function(re){"200"==re.resultCode?(("3"==re.data.statusCode||null==re.data.bindInfo[0].accounts)&&($(".banks-nobind").removeClass("hidden"),$("#tocash").show()),"0"==re.data.statusCode&&null!=re.data.bindInfo[0].accounts&&($(".banks-bind").removeClass("hidden"),$("#tocash").show(),$(".pay-items-subtitie").text("尾号"+re.data.bindInfo[0].accounts.substring(re.data.bindInfo[0].accounts.length-4,re.data.bindInfo[0].accounts.length)))):dialog({type:"select",message:"查询出现异常，确认进入首页",onConfirm:function(){location.href="../index.html"},onCancel:function(){}})});var pop=iscrollPop({title:"添加银行卡",content:$("#add-crads-temp").html(),onclose:function(){}});$("#pay-addcard").on("click",function(){pop.show(function(){$("#add-crads-temp").html(""),$("#provinceinfo").on("change",function(){var val=$(this).val();$("#cityinfo").html('<option value="-1" selected="selected">请选择市</option>');for(var s=allBankData.data.link[val],i=0,len=s.length;len>i;i++){var str="";str+='<option value="'+allBankData.data.def[s[i]]+'">'+allBankData.data.def[s[i]]+"</option>",$("#cityinfo").append(str)}}),$("#addcard").click(function(){{var reg=/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/,reg2=/^\d{16,19}$/,s=$("#provinceinfo").val(),pro=allBankData.data.def[s],city=$("#cityinfo").val(),obank=$("#bankinfo").val(),account=$("#account").val(),opass=$("#pass").val();$('input[name="username"]')}return reg2.test(account)?reg.test($("#idcards").val().trim())?"-1"==$("#bankinfo").val()?(dialog("tips","请选择银行！"),!1):"-1"==$("#provinceinfo").val()?(dialog("tips","请选择银行所在省份"),!1):"-1"==$("#cityinfo").val()?(dialog("tips","请选择银行所在市"),!1):pro?city?opass?account?void action.bindBank({openBank:obank,accounts:account,password:opass,province:pro,city:city},function(re){"200"==re.resultCode&&setTimeout(function(){dialog(re.data),location.reload()},2e3),"15"==re.resultCode&&setTimeout(function(){dialog({type:"tips",message:re.data})},500)}):(dialog("tips","银行卡号不能为空"),!1):(dialog("tips","密码不能为空"),!1):(dialog("tips","请填写市区"),!1):(dialog("tips","请填写省份"),!1):(dialog("tips","请输入正确的身份证号!"),!1):(dialog("tips","请输入正确的银行卡号!"),!1)})})})}function bindbank(){$("#submit-btn").on("click",function(){var $ubank=$("#bankname").val().trim(),$uprov=$("#chose-province").val().trim(),$ucity=$("#chose-city").val().trim(),$wzlAccount=$("#wzl-account").val().trim(),$realname=$("#realname").val().trim(),$bankcard=$("#bankcard").val().trim(),$password=$("#password").val().trim();return"default"==$ubank?(dialog("请您选择银行"),!1):"default"==$uprov?(dialog("请您选择省份"),!1):"default"==$ucity?(dialog("请您选择市"),!1):$wzlAccount?$realname?$bankcard?$password?void dialog("loading","正在发送提现请求"):(dialog("请您填写正确的密码"),!1):(dialog("请您填写正确的银行卡号"),!1):(dialog("请填写您的真实姓名"),!1):(dialog("我中啦账号不能为空"),!1)})}function paycenter(){function isWeixinBrowser(){var ua=navigator.userAgent.toLowerCase();return/micromessenger/.test(ua)?!0:!1}isWeixinBrowser()&&$(".list-group").removeClass("hidden"),actions.queyrUserAccount({},function(re){if("200"==re.resultCode){if("用户没有登录"==re.data.message)return untils.ref("login","ucenter"),!1;$(".uname").text(re.data.username),$("#balance").text("余额:"+re.data.accountInfo[0].balance+"元"),$("#getmoney").on("click",function(){location.href="cards2cash.html?balance="+re.data.accountInfo[0].balance})}else dialog("暂无数据")})}function bindalipay(){var isLoad=Math.random()>.5;isLoad?($(".accomplish-block").show(),$(".input-block").hide(),$("#alipay-name").text(),$("#alipay-card2").text(),$("#submit-bind2").on("click",function(){var alipayUsername=$("#alipay-username2").val().trim(),password=$("#password2").val().trim();alipayUsername?password||dialog("密码不能为空，请您进行完善。"):dialog("支付宝账号不能为空，请您进行完善。"),dialog("loading","正在发送提现请求")})):($(".accomplish-block").hide(),$(".input-block").show(),$("#submit-bind1").on("click",function(){var alipayUsername=$("#alipay-username1").val().trim(),alipayName=$("#alipay-name1").val().trim(),alipayCard=$("#alipay-card1").val().trim(),password=$("#password1").val().trim();alipayUsername?alipayName?alipayCard?password||dialog("密码不能为空，请您进行完善。"):dialog("卡号不能为空，请您进行完善。"):dialog("姓名不能为空，请您进行完善。"):dialog("支付宝账号不能为空，请您进行完善。"),dialog("loading","正在发送提现请求")}))}function card2cash(){loginJudge("ucenter"),actions.queryBankInfo({},function(re){if("200"==re.resultCode&&"0"==re.data.statusCode&&null!=re.data.bindInfo[0].accounts){$(".banks-bind").removeClass("hidden"),$(".pay-items-subtitie").text("尾号"+re.data.bindInfo[0].accounts.substring(re.data.bindInfo[0].accounts.length-4,re.data.bindInfo[0].accounts.length));var openBank=re.data.bindInfo[0].openbank,Accounts=re.data.bindInfo[0].accounts,Province=re.data.bindInfo[0].province,City=re.data.bindInfo[0].city;$("#tocash").on("click",function(){function draw(){var dig=dialog("loading","正在发送提现请求");actions.draw({cash:$money,openBank:openBank,Accounts:Accounts,Province:Province,City:City},function(re){"0"==re.resultCode?(dig.hide(),setTimeout(function(){dialog({type:"tips",message:re.data,onConfirm:function(){location.href="ucenter.html"}})},2e3)):(dig.hide(),setTimeout(function(){dialog({type:"tips",message:re.data,onConfirm:function(){}})},2e3))})}{var $bank=$("input[name='bankcrad']:checked"),$money=parseInt($input.val().trim());$bank.val()}return $money?parseInt(untils.getRequestParameter("balance"))<$money?(dialog("tips","账户余额不足，请重新填写"),!1):5>=$money?(dialog("tips","最低金额为<span class='wzl-text-warning'>5</span>元，请重新填写金额..."),!1):void dialog($money>5&&2e4>$money?{type:"select",message:"提现手续费为<span class='wzl-text-warning'>2</span>元，确认继续提现...",onCancel:function(){},onConfirm:function(){draw()}}:$money>=2e4&&5e4>$money?{type:"select",message:"提现手续费为<span class='wzl-text-warning'>5</span>元，确认继续提现...",onCancel:function(){},onConfirm:function(){draw()}}:$money>=5e4&&5e5>$money?{type:"select",message:"提现手续费为<span class='wzl-text-warning'>15</span>元，确认继续提现...",onCancel:function(){},onConfirm:function(){draw()}}:$money>=5e5&&1e6>$money?{type:"select",message:"提现手续费为<span class='wzl-text-warning'>20</span>元，确认继续提现...",onCancel:function(){},onConfirm:function(){draw()}}:{type:"select",message:"提现手续费以实际为准，确认继续...",onCancel:function(){},onConfirm:function(){draw()}}):(dialog("tips","请填写提现金额"),!1)})}else $(".banks-nobind").removeClass("hidden")}),allBankData=eval("("+allBankData+")");var $input=$("input[name='tocash']");$input.on("keyup",function(){var $val=$(this).val().trim();$(this).val($val.replace(/\D/g,""))});var pop=iscrollPop({title:"添加银行卡",content:$("#add-crads-temp").html(),onclose:function(){}});$("#pay-addcard").on("click",function(){pop.show(function(){$("#add-crads-temp").html(""),$("#provinceinfo").on("change",function(){var val=$(this).val();$("#cityinfo").html('<option value="-1" selected="selected">请选择市</option>');for(var s=allBankData.data.link[val],i=0,len=s.length;len>i;i++){var str="";str+='<option value="'+allBankData.data.def[s[i]]+'">'+allBankData.data.def[s[i]]+"</option>",$("#cityinfo").append(str)}}),$("#addcard").click(function(){var reg=/^\d{17}\w{1}$/,reg2=/^\d{16,19}$/,s=$("#provinceinfo").val(),pro=allBankData.data.def[s],city=$("#cityinfo").val(),obank=$("#bankinfo").val(),account=$("#account").val(),opass=$("#pass").val();return reg2.test(account)?reg.test($("#idcards").val().trim())?"-1"==$("#bankinfo").val()?(dialog("tips","请选择银行！"),!1):"-1"==$("#provinceinfo").val()?(dialog("tips","请选择银行所在省份"),!1):"-1"==$("#cityinfo").val()?(dialog("tips","请选择银行所在市"),!1):pro?city?opass?account?void action.bindBank({openBank:obank,accounts:account,password:opass,province:pro,city:city},function(re){"200"==re.resultCode&&location.reload(),"15"==re.resultCode&&setTimeout(function(){dialog({type:"tips",message:re.data})},500)}):void dialog("银行卡号不能为空"):void dialog("密码不能为空"):void dialog("请填写市区"):void dialog("请填写省份"):(dialog("tips","请输入正确的18位身份证号!"),!1):(dialog("tips","请输入正确的银行卡号!"),!1)})})})}function alipay2cash(){var $input=$("input[name='tocash']");$input.on("keyup",function(){var $val=$(this).val().trim();$(this).val($val.replace(/\D/g,""))}),$("#tocash").on("click",function(){var $alipay=$('input[name="alipayaccount"]:checked'),$money=$input.val().trim(),$alipayAccount=$alipay.val();return $money?$alipayAccount?void 0:void dialog("请选择支付宝账号或者绑定支付宝账号！"):void dialog("请填写提现金额")});var pop=iscrollPop({title:"添加支付宝账号",content:$("#add-alipay-temp").html(),onclose:function(){}});$(".alipay-add").on("click",function(){pop.show()})}function telecom(){var operator=0;$(".icon-operators").on("click",function(){$(this).addClass("onselect").siblings().removeClass("onselect"),operator=$(this).data("name")}),$("#submit-btn").click(function(){var card=($("#money").val(),$("#cardNumber").val()),password=$("#cardPass").val();operator?card?password||dialog("请您输入正确的充值卡密码。"):dialog("请您输入正确的充值卡号。"):dialog("请您选择运营商。")})}var actions=action,untils=until,rules=untils.RULES;switch(ac){case"acz":alipayCz();break;case"wxcz":weixinCz();break;case"unioncz":unioncallcz();break;case"unionpay":unionpay();break;case"ubankcrads":ubankcrads();break;case"bindalipay":bindalipay();break;case"card2cash":card2cash();break;case"alipay2cash":alipay2cash();break;case"telecom":telecom();break;case"bindbank":bindbank();break;case"binkpay":binkpay();break;case"cashcenter":cashcenter();break;case"cjcard":cjcard();break;default:paycenter()}};return window.backAction=function(){try{rechargeAct.actFinish(-1)}catch(e){window.history.back(-1)}},{pay:pay}});