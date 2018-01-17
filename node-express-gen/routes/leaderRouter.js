/**
 * Created by gmhanna on 20-Apr-17.
 */

let express = require("express");
let leaderRouter = express.Router();
let bodyParser = require("body-parser");

leaderRouter.use(bodyParser.json());

leaderRouter.route('/')
    .all((req, res, next)=>{
        res.writeHead(200, {"Content-Type":"text/plain"});
        next();
    })
    .get((req, res, next)=>{
        res.end("Getting all leaders");
    })
    .post((req, res, next)=>{
        res.end(`Creating new leader of first name: ${req.body.firstName} and last name: ${req.body.lastName}. `);
    })
    .delete((req, res, next)=>{
        res.end("Deleting all leaders");
    });

leaderRouter.route('/:leaderId')
    .all((req, res, next)=>{
        res.writeHead(200, {"Content-Type":"text/plain"});
        next();
    })
    .get((req, res, next)=>{
        res.end(`Getting leader of id: ${req.params.leaderId}`);
    })
    .put((req, res, next)=>{
        res.write(`Updating leader of id: ${req.params.leaderId}. \n`);
        res.end(`Updated leader of first name: ${req.body.firstName} and last name: ${req.body.lastName}. `);
    })
    .delete((req, res, next)=>{
        res.end(`Deleting leader of id: ${req.params.leaderId}`);
    });

module.exports = leaderRouter;