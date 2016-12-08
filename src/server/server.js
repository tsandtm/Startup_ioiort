var http = require('http');
var express = require("express");
var request = require('request');
var app = express();
app.use(express.static("public"));
app.set("view engine","ejs");
app.set("views","./views");
var server=http.createServer(app);
server.listen(8000);
var io = require("socket.io").listen(server);
var pg = require('pg')  
const conString = 'postgres://postgres:123456@localhost:5432/test' 
var bodyParser = require('body-parser');
var urlencodeParser = bodyParser.urlencoded({extended:false});

var config = {
  user: 'postgres', //env var: PGUSER
  database: 'test', //env var: PGDATABASE
  password: 'postgres', //env var: PGPASSWORD
  host: 'localhost', // Server hosting the postgres database
  port: 5432, //env var: PGPORT
  max: 10, // max number of clients in the pool
  idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed
};
var pool = new pg.Pool(config);

io.sockets.on('connection',function(socket){
	console.log('Co nguoi connect !');
	socket.on("token",function(data){
		console.log('token: '+data);
		const client = new pg.Client(conString);
		client.connect();
		const query = client.query("INSERT INTO 'notifi_Client'(token, loaithietbi) values($1, $2)',[data, false]");

		query.on('row', (row) => {
		  results.push(row);
		});
		query.on('end', () => { client.end(); });
	});
	socket.on("tokenpost",function(data){
	request({
		url: 'https://fcm.googleapis.com/fcm/send',
		method: 'POST',
		headers: {
		'Content-Type' :' application/json',
		'Authorization': 'key='+data.serverkey+''
		},
		body: JSON.stringify(
		{
		"collapse_key" : "demo",
		"to" : data.token,
		"notification":{
			"title": data.title,
			"body": data.body
		}
		})
	}, function(error, response, body) {
		if (error) { 
		console.error(error, response, body);
		}
		else if (response.statusCode >= 400) { 
		console.error('HTTP Error: '+response.statusCode+' - '+response.statusMessage+'\n'+body); 
		}
		else {
		console.log("Done");
		socket.emit("posttokensuccess","Done");
		}
	})
	});
	socket.on("topicpost",function(data){
		request({
		url: 'https://fcm.googleapis.com/fcm/send',
		method: 'POST',
		headers: {
		'Content-Type' :' application/json',
		'Authorization': 'key='+data.serverkey+''
		},
		body: JSON.stringify(
		{
		"collapse_key" : "demo",
		"to" : "/topics/"+data.topic,
		"notification":{
			"title": data.title,
			"body": data.body
		}
		})
	}, function(error, response, body) {
		if (error) { 
		console.error(error, response, body);
		}
		else if (response.statusCode >= 400) { 
		console.error('HTTP Error: '+response.statusCode+' - '+response.statusMessage+'\n'+body); 
		}
		else {
		console.log('Done!');
		socket.emit("posttopicsuccess","Done");
		}
	})
	});
});
console.log("Server Started...");


//callback style
//AIzaSyCSO6GX5yQVpdT4m9fLj3gJlRInNWynJN4
//cWgcrzFU6r8:APA91bGYCG1XClYZuNFDtdlfDW9QgdpepGfqcv6v4Aspt7bTv7PfW_hqebhR18Xqo8bk0QNxFHNjKFCKLe2ZEhVGfBjgWCoYCncek9FJAgvtRNSxviq8WkFxC8zbMJVdh3R7pTtY2y8b