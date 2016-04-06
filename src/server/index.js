var express = require('express');
var app = express();
var session = require('express-session');
var port = process.env.PORT || 3000;
var CASAuthentication = require('cas-authentication');

app.use( session({
    secret            : 'sahilg',
    resave            : false,
    saveUninitialized : true
}));
 
var cas = new CASAuthentication({
    cas_url         : 'http://localhost:8080/cas',
    service_url     : 'http://localhost:3000',
    cas_version : '2.0'
});

app.get( '/', cas.bounce, function ( req, res , next ) {
	next();
});

app.use(express.static(__dirname + '/../client'));

app.listen(port, function () {
  console.log('app listening on port 3000.');
});