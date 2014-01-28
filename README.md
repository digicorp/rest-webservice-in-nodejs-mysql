Create REST webservice in node.js using MySql
===============================

# Overview:

Just like login algorithm of CakePHP's auth component, this will give JSON response of valid user by passing email and encrypted password of MySql database.This whole module is using restify module of node.js. 

Check this before downloading this application.

Restify : http://mcavage.me/node-restify/

## Required node.js Modules

- dateformat: npm install dateformat // for date format
- mysql: npm install mysql // for database
- node-uuid: npm install node-uuid // for access token
- restify: npm install restify // for webservice
- sha1: npm install sha1 // for encryption


## Purpose

We create REST webservice for authentication using access token of the user. 

## How to install it?

- Download the project and extract it. 
- Put it in your respective node.js server folder. 
- Run following command.

<pre>
node server.js
</pre>

- Configure the IP address of the server here and port for node.js in REST webservice application.

- MySql database connection setting, you can manage it using node_modules/custommodule/index.js file.

- For sample, we have created database.sql file under db folder.

- If you want to generate new password then you need to pass your password and salt in encryptPassword(password,salt) function. This function is defined in sha1.js file under js folder. Basic client side call is defined in js/webservice.js file.

## How to set salt server side as well as client side?

Server Side :
Open node_modules/custommodule/index.js file and change the value of SALT.
var SALT = 'DYhG93b0qyJfIxfs2guVoUubWwvniR2G0FgaC9mj';

Client Side :
Open js/webservice.js file and change the value of salt.
var SALT = 'DYhG93b0qyJfIxfs2guVoUubWwvniR2G0FgaC9mj';

## How does it work ?

We have existing email id of the user and encrypted password which is generated using sha1 and salt.

For e.g.

Salt should be same in both server side as well as in this call.

email_id = “user@digi-corp.com”;
encypted_password = encryptPassword(password,salt); // this encryptPassword function is defined in sha1.js under js folder.

This salt is defined as SALT in node_modules/custommodule/index.js file for server side and js/webservice.js for client side.
 
Note: LOGIN_URL is defined in webservice.js file. This is our node server's login method.

var request = $.ajax({
	    url: LOGIN_URL, //Nodejs login url defined in server.js
	    type: "POST",
	    data: {
	    	 email: email_id, password: encypted_password ,
	    },
	    contentType: "application/x-www-form-urlencoded",  
	    dataType: "json",
	});
	
request.success(function(result) {
		// success handler after getting sucessful response from the login method
	});

request.fail(function(jqXHR, textStatus) {
		// failure handler after getting failure response from the login method
	});

It will provide you the success response of user with access token and user id. This token will be passed as post method in each and every new request.

If we want to access the getUserDetails which is defined in node_modules/custommodule/index.js, We have to pass success response coming from the login method.

Note: GET_USER_DETAILS_URL is defined in webservice.js file. This is our node server's getUserDetails method.

var userdetailsrequest = $.ajax({
	    url: GET_USER_DETAILS_URL,
	    type: "POST",
	    data: {
	    	access_token: access_token, id: userid
	    },
	    contentType: "application/x-www-form-urlencoded",
	    dataType: "json",
	});
	
	userdetailsrequest.success(function(myObject){
		// success handler after getting sucessful response from the getUserDetails method
	});

	userdetailsrequest.fail(function(jqXHR, textStatus) {
		// failure handler after getting failure response from the getUserDetails method
	});

Hope this helps.

Please contact us at info@digi-corp.com in case you have any questions.
