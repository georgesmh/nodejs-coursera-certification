/**
 * Created by gmhanna on 15-Apr-17.
 */
// same as server-2, + application routes rest api + body parser usage

let express = require('express');
let morgan = require('morgan');
let bodyParser = require('body-parser');

let hostname = 'localhost';
let port = 3000;

let app = express();

app.use(morgan('dev'));
app.use(bodyParser.json());


app.all('/dishes', function(req, res, next){

    res.writeHead(200, {'Content-Type':'text/plain'});
    next();
});

app.get('/dishes', function(req, res, next){

    res.end('Will send all the dishes to you');
});

app.post('/dishes', function(req, res, next){

    res.end(`Will add the dish ${req.body.name} with details: ${req.body.description}`);
});

app.delete('/dishes', function(req, res, next){

    res.end('Deleting all dishes');
});

app.get('/dishes/:dishId', function(req, res, next){

    res.end(`Will send details of the dish: ${req.params.dishId} to you`);
});

app.put('/dishes/:dishId', function(req, res, next) {

    res.write(`Updating dish of id: ${req.params.dishId} \n`);
    res.end(`Will update the dish: ${req.body.name} with details: ${req.body.description}`);
});

app.delete('/dishes/:dishId', function(req, res, next) {

    res.end(`Deleting dish of id: ${req.params.dishId}`);
});

app.use(express.static(`${__dirname}/public`));

app.listen(port, hostname, function(){
    console.log(`Server listening at: http://${hostname}:${port}/`);
});
