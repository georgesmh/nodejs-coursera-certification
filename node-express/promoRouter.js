/**
 * Created by gmhanna on 18-Apr-17.
 */

// API for promotions

let express = require('express');
let bodyParser = require('body-parser');

let promoRouter = express.Router();
promoRouter.use(bodyParser.json());

promoRouter.route('/')
    .all((req, res, next)=>{
        res.writeHead(200, {"Content-Type":"text/plain"});
        next();
    })
    .get((req, res, next)=>{
        res.end("Getting all promotions");
    })
    .post((req, res, next)=>{
        res.end(`Creating a new promotion of name: ${req.body.name} and description ${req.body.description}`);
    })
    .delete((req, res, next)=>{
        res.end("Deleting all promotions!");
    });

promoRouter.route("/:promoId")
    .all((req, res, next)=>{
        res.writeHead(200, {"Content-Type":"text/plain"});
        next();
    })
    .get((req, res, next)=>{
        res.end(`Getting promotion of id: ${req.params.promoId}.`);
    })
    .put((req, res, next)=>{
        res.write(`Updating promotion of id: ${req.params.promoId}. \n`);
        res.end(`The updated promotion has a name of ${req.body.name} and a description of ${req.body.description}`);
    })
    .delete((req, res, next)=>{
        res.end(`Deleting promotion of id: ${req.params.promoId}`);
    });

module.exports = promoRouter;