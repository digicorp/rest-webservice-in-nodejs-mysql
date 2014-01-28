/**
 * 
 */
var LOGIN_URL = "http://127.0.0.1:8086/login";
var SALT = "DYhG93b0qyJfIxfs2guVoUubWwvniR";
var GET_USER_DETAILS_URL = "http://127.0.0.1:8086/getUserDetails";

$.cookie.json = true;

var new_password = encryptPassword("digicorp",SALT);
alert("You should set in your database password field of the wp_users table." + new_password)
/*
 * @function : setCookieForToken
 * for assigning cookie for the user id and access token for next request
 */

function setCookieForToken(){
	
	var access_token_expire_after_days = 10; // access token expiry day
	
	var request = $.ajax({
	    url: LOGIN_URL,
	    type: "POST",
	    data: {
	    	 email: "user@digi-corp.com", password: new_password
	    },
	    contentType: "application/x-www-form-urlencoded", //This is what made the difference.
	    dataType: "json",
	});
	
	request.success(function(result) {
		$("#Accesstocken").html(JSON.stringify(result));
		deleteCookie('loginDetails');
		
		$.cookie("loginDetails", result, { expires : access_token_expire_after_days });	
		
		var cookieValue = $.cookie("loginDetails");
		var access_token = ( cookieValue[0] != undefined && cookieValue[0].access_token != undefined) ? cookieValue[0].access_token : '';
		var user_id = ( cookieValue[0] != undefined && cookieValue[0].id != undefined ) ? cookieValue[0].id : '';
		getUserDetails(access_token,user_id);
	});
	

	request.fail(function(jqXHR, textStatus) {
		$("#log").append('\n\nRequest failed: ' + textStatus+' .');
	});
}

/*@function : getUserDetails :
 * @param : access_token : access_token of the user 
 * @param : userid : user id of the user
 */

function getUserDetails(access_token,userid){
	//access_token = "sdfsdfsdf";
	var userdetailsrequest = $.ajax({
	    url: GET_USER_DETAILS_URL,
	    type: "POST",
	    data: {
	    	access_token: access_token, id: userid
	    },
	    contentType: "application/x-www-form-urlencoded", //This is what made the difference.
	    dataType: "json",
	});
	
	userdetailsrequest.success(function(myObject){
		// to check the error is exist
		if(myObject.error != undefined){
			// remove the current user cookie
			$("#userdetails").html(myObject.message);
			deleteCookie('loginDetails');
		}else{
			$("#userdetails").html(JSON.stringify(myObject));	
		}
		
	});
	
	userdetailsrequest.fail(function(jqXHR, textStatus) {
		$("#log").append('\n\nRequest failed: ' + textStatus + ' .');
	});
}

/*@function : deleteCookie :
 * @parama : cookieName : pass cookie variable for deleting 
 */

function deleteCookie(cookieName){
	var getCookie = $.cookie(cookieName);
	
	if(getCookie != undefined){
		$.removeCookie(cookieName);
		$("#log").append('\n\ncookie deleted for user token details.');
	}
}

$(document).ready(function(){
	 
	var cookieValue = $.cookie("loginDetails");
	
	if(cookieValue == undefined || (cookieValue != undefined && cookieValue.error != "")){
		$("#log").append('\nCreated Cookie');
		setCookieForToken(); 
		
	}else{
		
		$("#Accesstocken").html(JSON.stringify(cookieValue));
		
		var access_token = ( cookieValue[0] != undefined && cookieValue[0].access_token != undefined) ? cookieValue[0].access_token : '';
		var user_id = ( cookieValue[0] != undefined && cookieValue[0].id != undefined ) ? cookieValue[0].id : '';
		
		if(access_token == '' || user_id == ''){
			$("#log").append('\n\nAccess token or user id missing'+' .');
			return false;
		}else{
			getUserDetails(access_token,user_id);
		}
		//setCookieForToken();
	}
	return false;
})
