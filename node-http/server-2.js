/**
 * Created by gmhanna on 14-Apr-17.
 */
// same as server-1, but includes serving html files from the public folder.

let http = require('http');
let fs = require('fs');
let path = require('path');


let hostname = 'localhost';
let port = 3000;

let server = http.createServer(function(req, res){
    // if get request, then appropriate request, if another request type, complain about it
    // print request info
    console.log(`Request for ${req.url} by method ${req.method}`);
    if(req.method==='GET') {
        let fileUrl = (req.url === '/') ? '/index.html' : req.url;
        let filePath = path.resolve(`./public${fileUrl}`);
        console.log(filePath);
        let fileExtension = path.extname(filePath);
        if (fileExtension === '.html') {
            fs.exists(filePath, function (exists) {
                if (!exists) {
                    res.writeHead(404, {'Content-Type': 'text/html'});
                    res.end(`<h1>Error 404: ${fileUrl} not found</h1>`);
                    return;
                }

                res.writeHead(200, {'Content-Type': 'text/html'});
                fs.createReadStream(filePath).pipe(res);
            });
        }
        else {
            res.writeHead(404, {'Content-Type': 'text/html'});
            res.end(`<h1>Error 404: ${fileUrl} not a valid HTML file</h1>`);
        }
    }
    else {
        res.writeHead(404, {'Content-Type': 'text/html'});
        res.end(`<h1>Error 404: ${req.method} not supported</h1>`);
    }

});

server.listen(port, hostname, function(){
    console.log(`Server running at http://${hostname}:${port}/`);
});