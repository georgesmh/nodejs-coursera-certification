/**
 * Created by gmhanna on 15-Apr-17.
 */
// express server

let express = require('express');
let http = require('http');

let hostname = 'localhost';
let port = 3000;

let app = express();

app.use(function(req, res, next){

    console.log(req.headers);

    res.writeHead(200, {'Content-Type':'text/html'});
    res.end('<html><body><h1>Hello World!!</h1></body></html>');

});

let server = http.createServer(app);
server.listen(port, hostname, function(){
    console.log(`Server listening at: http://${hostname}:${port}/`);
});