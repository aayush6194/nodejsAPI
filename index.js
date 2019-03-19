var express = require("express");
var app = express();
var mongoose = require("mongoose");
var bodyParser = require("body-parser"); //post request
var urlencodedParser = bodyParser.urlencoded({extended: false});
var port = process.env.PORT || 3002;


const multer = require('multer');

const GridFsStorage = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');

const conn = mongoose.createConnection("mongodb://aayush6194:poop12@ds041571.mlab.com:41571/portfolio");
let gfs;
conn.once('open', () => {
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection('uploads');
});

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

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/',  (req, res) => {
 res.send({active: true});
});

app.post('/upload', upload.single('file'),  (req, res) => {
  res.redirect('https://www.aayushh.com/Message/');
});

app.get('/files', (req, res) => {
  gfs.files.find().toArray((err, files) => {
    // Check if files
    if (!files || files.length === 0) {
      return res.status(404).json({
        err: 'No files exist'
      });
    }

    // Files exist
    return res.send({num: files.length});
  });
});

app.listen(port);
