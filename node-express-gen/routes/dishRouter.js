/**
 * Created by gmhanna on 16-Apr-17.
 */
// Node Module that implements an Express Router to support the REST API for the dishes

let bodyParser = require('body-parser');
let express=require('express');

let dishRouter = express.Router();
dishRouter.use(bodyParser.json());

dishRouter.route('/')
    .all(function(req, res, next){
        res.writeHead(200, {"Content-Type":"text/plain"});
        next();
    })
    .get(function(req, res, next){
        res.end("Getting all the dishes");
    })
    .post(function(req, res, next){
        res.end(`Creating a new dish of name ${req.body.name} and description ${req.body.description} `);
    })
    .delete(function(req, res, next){
        res.end("Deleting all dishes!");
    });

dishRouter.route('/:dishId')
    .all(function(req, res, next){
        res.writeHead(200, {"Content-Type":"text/plain"});
        next();
    })
    .get(function(req, res, next){
        res.end(`Getting dish of id: ${req.params.dishId}`);
    })
    .put(function(req, res, next){
        res.write(`Updating dish of Id: ${req.params.dishId}: \n`);
        res.end(`Updated dish of name ${req.body.name} and description ${req.body.description}.`);
    })
    .delete(function(req, res, next){
        res.end(`Deleting dish of id: ${req.params.dishId}`);
    });

module.exports = dishRouter;



