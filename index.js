var express = require("express");
var app = express();
var mongoose = require("mongoose");
var bodyParser = require("body-parser"); //post request
var urlencodedParser = bodyParser.urlencoded({extended: false});
var port = process.env.PORT || 3000;

//conect
mongoose.connect("mongodb://aayush6194:poop12@ds016058.mlab.com:16058/chatapp");
//create schema
var dataSchema = new mongoose.Schema({item: String});
var data = mongoose.model('data', dataSchema);

//Template engine
app.set("view engine", "ejs");
//Middleware: Static file
app.use("/style", express.static("style"));

//controllers
app.get("/", (req, res)=>{
  res.sendFile(__dirname+ "/index.html");
});

app.get("/profile/:name", (req, res)=>{
  res.send(`name ${req.params.name}`);
});

app.get("/contact", (req, res)=>{
//  console.log(req.query);
  res.render('contact');
});

app.get("/api", (req, res)=>{
  res.sendFile(__dirname + "/public/demo.txt");
});

app.post("/poop", urlencodedParser, (req, res)=>{
  data = req.body;
  var insert = data({item: "fdfdf"}).save((err)=>{
    if(err) throw err;
   console.log("saved!");
  });
});

app.delete("/poop:item", (req, res)=>{
  item = req.params.item;

});


app.get("/mongo", (req, res)=>{
  data.find({},(err, data)=>{
    if(err) throw err;
      res.send("name "+ data[0].item);
  });

});

app.listen(port);
