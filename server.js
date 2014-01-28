/**
 * 
 */
var restify = require('restify');
var mysql = require('mysql');
var custom = require('custommodule');
var sha1 = require('sha1');


var server = restify.createServer();

server.use(restify.bodyParser());
server.use(restify.queryParser());
server.use(restify.CORS());


server.post('/login', login);
server.post('/getUserDetails', getUserDetails);


function callback (err, result) {
  return err ? res.send(err) : res.json(result);
}

function login(req, res ,next){
	
	var fields = [
	              req.params.email,
	              req.params.password
	];
	custom.login(fields, res , function (err, result) {
	res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
	 	return err ? res.send(err) : res.json(result); 
	});
	
}

function getUserDetails(req, res ,next){
	var fields = [
	              req.params.access_token,
	              req.params.id
	];
	custom.getUserDetails(fields, res , function (err, result) {
	   res.header("Access-Control-Allow-Origin", "*");
	   res.header("Access-Control-Allow-Headers", "X-Requested-With");
	   return err ? res.send(err) : res.json(result); 
	});
	
}
/*

function generateAccessToken(){
	var fields = [
	              req.params.uid
	];
	custom.generateAccessToken(fields, function (err, result) {
		//console.log(result)
	 	return err ? res.send(err) : res.json(result); 
	});
}

function getAccessToken(){
	var fields = [
	              req.params.uid
	];
	custom.getAccessToken(fields, function (err, result) {
		//console.log(result)
	 	return err ? res.send(err) : res.json(result); 
	});
}

*/ 

server.listen(8086, '127.0.0.1', function() {
  console.log('%s listening at %s', server.name, server.url);
});


