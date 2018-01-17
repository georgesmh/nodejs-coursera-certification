/**
 * Created by gmhanna on 14-Apr-17.
 */
let http = require('http');

let hostname = 'localhost';
let port = 3000;

let server = http.createServer(function(req, res){
    console.log('-------------------------------------------------------------------------------------');
    console.log(req.headers);
    console.log('-------------------------------------------------------------------------------------');

    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end('<h1>HelloWorld</h1>');

});

server.listen(port, hostname, function(){
   console.log(`Server Running at http://${hostname}:${port}/`);
});
