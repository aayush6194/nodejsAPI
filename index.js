var express = require("express");
var app = express();
var mongoose = require("mongoose");
var bodyParser = require("body-parser"); //post request
var urlencodedParser = bodyParser.urlencoded({extended: false});
var port = process.env.PORT || 3000;


app.get('/',  (req, res) => {
 res.send({active: true});
});

app.listen(port);
