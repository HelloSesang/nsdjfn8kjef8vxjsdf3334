window.alert = function(msg) {
  console.log("[alert block]:", msg);
};

function getCommonCookie(name){
	strCookie = unescape(document.cookie);
	var pos = strCookie.indexOf(name, 0);
	if(pos > -1)
		return strCookie.substring(pos + name.length + 1, strCookie.indexOf(";", pos));
	else
		return null;
}

var Browser = {
    IE:     !!(window.attachEvent &&
      navigator.userAgent.indexOf('Opera') === -1),
    Opera:  navigator.userAgent.indexOf('Opera') > -1,
    WebKit: navigator.userAgent.indexOf('AppleWebKit/') > -1,
    Gecko:  navigator.userAgent.indexOf('Gecko') > -1 &&
      navigator.userAgent.indexOf('KHTML') === -1,
    MobileSafari: !!navigator.userAgent.match(/Apple.*Mobile.*Safari/)
  }


function fnMakeHtmlDocument(s)
{
	var html = "<head><title></title><meta http-equiv='Content-Type content=text/html; charset=euc-kr'><link rel=stylesheet type='text/css' href='//ticket.interpark.com/Include/css/common.css'><\script type='text/javascript' src='Inc/Js/block.js'><\/script></head>";
	html = html + "<body leftmargin='0' topmargin='0' style='scrollbar-3dlight-color:#FFFFFF;scrollbar-arrow-color:#C3C3C3;scrollbar-track-color:#FFFFFF;scrollbar-darkshadow-color:#FFFFFF;scrollbar-face-color:#FFFFFF;scrollbar-highlight-color:#C3C3C3;scrollbar-shadow-color:#C3C3C3;margin:0;'>";
//	html = html + "<table width='100%'  border='0' cellspacing='0' cellpadding='0'>";
	html = html + s;
//	html = html + "</table>";
	html = html + "</body></html>";
	return html;
}
function fnWriteHtmlDocument(s, t)
{
	t.document.open("text/html");
	t.document.write(fnMakeHtmlDocument(s));
	t.document.close();
}
function fnCutString(s, l)
{
	if(s.length > l)
		return s.substring(0, l) + "...";
	else
		return s;
}
function fnShortDate(s)
{
	if(s.length == 8)
		return s.substring(0, 4) + "/" + s.substring(4, 6) + "/" + s.substring(6, 8);
	else
		return s;
}
//문자열길이제한
function fnCutString(s, n)
{
	if(s.length > n)
		return s.substring(0, n) + "...";
	else
		return s;
}
//한글날짜변환
function fnKoreanDate(d)
{
	var ymd = new Date(d.substring(0, 4), eval(d.substring(4, 6)) - 1, d.substring(6, 8));
	return ymd.toLocaleDateString();
}

function fnKoreanDateMode(d, m)
{
	var retvalue = "";
	var ymd = new Date(d.substring(0, 4), eval(d.substring(4, 6)) - 1, d.substring(6, 8));

	if (m == 1){
		var aDay = ['일','월','화','수','목','금','토'][ymd.getDay()];
		retvalue = d.substring(0, 4) +"년 " + (eval(d.substring(4, 6))) + "월 " + eval(d.substring(6, 8)) + "일(" + aDay + ")";
	}else{
		retvalue = ymd.toLocaleDateString();
	}
	return retvalue;
}

function fnTimeFomat(t)
{
	var strtime = t.replace("시 ",":").replace("분","");
	return strtime;
}

//세자리마다컴마
function fnAddComma(n)
{
	n = n + "";
	var s = "";
	var j = 1;
	for(i=n.length-1; i>-1; i--)
	{
		s = n.substring(i, i+1) + s;
		if(j++%3 == 0 && i > 0)
			s = "," + s;
	}
	return s;
}

// 공백제거
function fnTrim(s){
	s = s.replace(/(^\s*)|(\s*$)/g, "");

	return s;
}

/**
 * 숫자 체크
 * @param {value} val
 */
function fnIsNumber(val) {
	var num_chk = /[^0-9]/;
	if(!num_chk.test(val)) {
		return true;
	}else{
		return false;
	}
}

//access to a array of elements.(with ProtyType FrameWork)
function $N(pName){
	return document.getElementsByName(pName)
}

//파라미터 동적 생성
function fnCreateParameter(id, name, value){
	try{
		// IE6, IE7 에서 사용
		var o = document.createElement("<input type='hidden' name='" + name + "' value='" + value + "'>");
	}catch(e){
		var o = document.createElement("input");
		o.setAttribute("type","hidden");
		o.setAttribute("name", name);
		o.setAttribute("value", value);
	}
	$(id).appendChild(o);
}

// 주민등록번호 체크 :: 외국인 등록번호와 주민등록번호를 동시에 체크
function fnCheckPersonID2(str) {
	var checkID = new Array(2,3,4,5,6,7,8,9,2,3,4,5);
    var aPersonID = new Array(13);
    var i=0, sum=0;
    var temp=0, temp1=0, temp2=0;

    if(str.length != 13) {
        return false;
    }

    for(i=0;i<13;i++) {
        if(str.charAt(i)<'0' || str.charAt(i)>'9')  {
            return false;
        }
    }

    for(i=0;i<12;i++){
        sum += str.charAt(i) * checkID[i];
    }

    temp = sum - Math.floor(sum/11)*11;
    temp = 11 - temp;
    temp = temp - Math.floor(temp/10)*10;


    //외국인 주민번호 체크로직 추가
    if(str.charAt(6) != '5' && str.charAt(6) != '6' && str.charAt(6) != '7' && str.charAt(6)!= '8') {

        if(temp==eval(str.charAt(12))) {
            return true;
        } else {
            return false;
        }

    } else {

        if((temp + 2)%10 == eval(str.charAt(12))) {
            return true;
        } else {
            return false;
        }
    }
    return false;
}

//전화번호 포맷으로 변경(000-0000-0000)
function  fnSetPhoneFormat(phone){
	var retValue = phone;

	if (phone.length > 0){
		if (phone.split("-").length != 3){
			phone = phone.replace(/\-/gi,"");

			if (phone.length == 12){
				retValue = phone.substring(0, 4) + "-" + phone.substring(4, 8) + "-" + phone.substring(8, 12);
			}else if (phone.length == 11){
				retValue = phone.substring(0, 3) + "-" + phone.substring(3, 7) + "-" + phone.substring(7, 11);
			}else if (phone.length == 10){
				if (phone.substring(0, 1) == "02"){
					retValue = phone.substring(0, 2) + "-" + phone.substring(2, 6) + "-" + phone.substring(6, 10);
				}else{
					retValue = phone.substring(0, 3) + "-" + phone.substring(3, 6) + "-" + phone.substring(6, 10);
				}
			}else if (phone.length == 9){
				retValue = phone.substring(0, 2) + "-" + phone.substring(2, 5) + "-" + phone.substring(5, 9);
			}
		}
	}

	return retValue;
}

//메일 주소 체크
function fnCheckEmail(MailAddress){
	var regEx = new RegExp("^([a-z0-9_\\-\\.]+)@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.)|(([a-z0-9_\\-]+\\.)+))([a-z]{2,4}|[0-9]{1,3})(\\]?)$", "i");

	if ( regEx.test(MailAddress) ){
		return true;
	}else{
		return false;
	}
}

//휴대폰번호 유효성 체크
String.prototype.isMobile = function() {
    var arg = arguments[0] ? arguments[0] : "";
    return eval("(/01[016789]" + arg + "[1-9]{1}[0-9]{2,3}" + arg + "[0-9]{4}$/).test(this)");
}

//	JSONP Service
function fnCallJSONP(callback, url){
	url = url + "&Callback=" + callback

	try{document.getElementsByTagName("head")[0].removeChild($("JSONPScript"))}catch(e){};

	var script = document.createElement("script");
	script.setAttribute("type", "text/javascript");
	script.setAttribute("charset", "euc-kr");
	script.setAttribute("src", url);
	script.setAttribute("id", "JSONPScript");
	document.getElementsByTagName("head")[0].appendChild(script);
}

// HTML 제거
function fnRemoveHTML(string) {
   var objStrip = new RegExp();
   objStrip = /[<][^>]*[>]/gi;
   return string.replace(objStrip, "");
}

/*
//뒤로 가기 막기
if (Prototype.Browser.IE){	//IE
	window.history.forward(0);
}else{	//FF, Chrome, Opera, Safari
	history.navigationMode = 'compatible'; // Opera, Safari
	function _no_Back(){window.history.forward(0);}
}

document.oncontextmenu = function() { return false; }
*/


/**
* 티켓링크 취소가능일자 계산
* 인터파크이 취소가능시간보다 1시간 빠르게 변경
*/
function fnTicketLinkCancelDate(time){
	var cdate = time;
	if (time.length == 12){
		var year  = time.substr(0,4);
		var month = time.substr(4,2) - 1; // 1월=0,12월=11
		var day   = time.substr(6,2);
		var hour  = time.substr(8,2);
		var min   = time.substr(10,2);

		cdate = fnTooTimeString(new Date(year,month,day,hour-1,min));
	}

	return cdate;
}

/**
* Time 스트링을 자바스크립트 Date 객체로 변환
* parameter time: Time 형식의 String
*/
function toTimeObject(time) { //parseTime(time)
	var year  = time.substr(0,4);
	var month = time.substr(4,2) - 1; // 1월=0,12월=11
	var day   = time.substr(6,2);
	var hour  = time.substr(8,2);
	var min   = time.substr(10,2);

	return new Date(year,month,day,hour-1,min);
}

/**
* 자바스크립트 Date 객체를 Time 스트링으로 변환
* parameter date: JavaScript Date Object
*/
function fnTooTimeString(date) { //formatTime(date)
	var year  = date.getFullYear();
	var month = date.getMonth() + 1; // 1월=0,12월=11이므로 1 더함
	var day   = date.getDate();
	var hour  = date.getHours();
	var min   = date.getMinutes();

	if (("" + month).length == 1) { month = "0" + month; }
	if (("" + day).length   == 1) { day   = "0" + day;   }
	if (("" + hour).length  == 1) { hour  = "0" + hour;  }
	if (("" + min).length   == 1) { min   = "0" + min;   }

	return ("" + year + month + day + hour + min)
}

/**
* 스크립트 제거
*/
function fnRemoveScript(str){
	var re = /\r\n/g
	var retstr = str;
	//retstr = retstr.replace(re, "@!-_-!@");
	retstr = retstr.replace(re, "");
	re = /<\s*script.+?<\/\s*script\s*>/gi
	retstr = retstr.replace(re, "");
	//re = /@!-_-!@/g
	//retstr = retstr.replace(re, "\r\n");
	re = /^\r\n/g
	retstr = retstr.replace(re, "");

	return retstr;
}

/**
* 10원 절사
*
*/
function fnMoneyTenWonCut(amt){
	var f_num = amt.toFixed(0);
	var f_num_size = f_num.length;

	if (f_num_size > 1){
		f_num = String(f_num).substring(0, f_num_size - 1) + '0';
	}else{
		f_num = 0;
	}

	return f_num;
}




//쿠키삭제
function fnDelCookie (name, domain, path) {
	if (getCommonCookie(name)) {
		document.cookie = name + "="
		+ ((path == null) ? "" : "; path=" + path)
		+ ((domain == null) ? "" : "; domain=" + domain)
		+ "; expires=Fri, 31 Dec 1999 23:59:59 GMT;";
	}
}


function fnCheckBirthDay(k,s){
	var vRegExp = "";
	if(k=="A"){ // YYYYMMDD
		vRegExp = /^(19|20)[0-9]{2}(0[1-9]|1[012])(0[1-9]|[12][0-9]|3[01])$/;
	}else{  // YYMMDD
		vRegExp = /^[0-9]{2}(0[1-9]|1[012])(0[1-9]|[12][0-9]|3[01])$/;
	}

	if(s.match(vRegExp) == null){
		return false;
	}else{
		return true;
	}
}

function fnMoblieUseAmt(totalamt){
	var useamt = 0;
	if (Number(totalamt) >= 100000){
		useamt = 1500;
	}else if (Number(totalamt) >= 50000){
		useamt = 1000;
	}else if (Number(totalamt) >= 2000){
		useamt = 500;
	}
	// 2015-04-01 수수료 0 정책 적용
	useamt = 0;

	return useamt;
}

function fnGetDateAdd(dateformat, dates) {

	var int_millisecond = 1;
	var int_second      = 1000 * int_millisecond;
	var int_minute      = 60 * int_second;
	var int_hour        = 60 * int_minute;
	var int_day         = 24 * int_hour;

	var YY_form = parseInt(dateformat.substring(0,4));
	//var MM_form = parseInt(dateformat.substring(4,6))-1;
	if(dateformat.substring(4,5) == "0") {
		var MM_form = parseInt(dateformat.substring(5,6))-1;
	} else {
		var MM_form = parseInt(dateformat.substring(4,6))-1;
	}
	var DD_form = parseFloat(dateformat.substring(6,8));
	var date = new Date(YY_form, MM_form, DD_form);

//alert(MM_form);

	var date_milliseconds = date.valueOf();
	var add_milliseconds  = dates * int_day;
	var ret_date = new Date(date_milliseconds + add_milliseconds);
//alert(ret_date);
	var year  = ret_date.getFullYear();
	var month = ret_date.getMonth() + 1;

	if (month < 10) {
		month = "0" + month;
	}

	var day   = ret_date.getDate();
	if (day < 10) {
		day = "0" + day;
	}
//alert("" + year + month + day);
	return ( "" + year + month + day );
}
