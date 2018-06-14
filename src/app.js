const http = require('http');
const fs = require("fs");


const hostname = "127.0.0.1";
const port = 3000;

const server = http.createServer((req, res)=>{
    res.statusCode = 200;

    ///res.end("<h1>Hepllo World!\n</h1>");
    if(req.url === "/api")
    {
      
      res.writeHead(200, {"content-Type" : "text/json"});
      var myReadStream = fs.createReadStream(__dirname+ "/../public/demo.txt","utf8");
      myReadStream.pipe(res);

    }
    else if(req.url === "/" || req.url === "/index.html" ){
    res.setHeader("content-Type", "text/html");
    var myReadStream = fs.createReadStream(__dirname + "/../index.html", "utf8");
    myReadStream.pipe(res);
  }
  else{
    res.writeHead(200, {"content-Type" : "text/json"});
    var obj = {poop: "poop"};
    res.end(JSON.stringify(obj));

  }
});
server.listen(port, hostname, ()=>{
  console.log(`Server running at http;//${hostname}:${port}/`);
});
