var express = require("express");
var app = express();
var mongoose = require("mongoose");
var bodyParser = require("body-parser"); //post request
var urlencodedParser = bodyParser.urlencoded({extended: false});
var port = process.env.PORT || 3000;
const multer = require('multer');

const app = express();
const GridFsStorage = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
//const db = require("./db");

// db.connect("", {name: String, email: String,message: String
//               //,  img: { data: Buffer, contentType: String }
//             });

const storage = new GridFsStorage({
 url: "mongodb://aayush6194:poop12@ds041571.mlab.com:41571/portfolio",
 file: (req, file) => {
   return new Promise((resolve, reject) => {
       const filename = file.originalname;
       const fileInfo = {
         filename: filename,
         bucketName: 'uploads'
       };
       resolve(fileInfo);
   });
 }
});

const upload = multer({ storage });
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(function(req, res, next) {
   res.header("Access-Control-Allow-Origin", "*");
   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
   next();
});

app.post('/upload', upload.single('file'),  (req, res) => {
 res.redirect('https://www.aayushh.com/Message/');
});

app.get('/',  (req, res) => {
 res.send({active: true});
});

app.listen(port);
