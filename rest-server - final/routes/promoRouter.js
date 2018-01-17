/**
 * Created by gmhanna on 18-Apr-17.
 */

// API for promotions

let express = require('express');
let bodyParser = require('body-parser');
let Promotions = require('../models/promotions');
let promoRouter = express.Router();
let Verify = require('./verify');
promoRouter.use(bodyParser.json());

promoRouter.route('/')
    .get((req, res, next)=> {
        Promotions.find({}, function (err, promotions) {    // returns all the items as an array
            if (err) throw err;
            res.json(promotions);
        });
    })
    .post(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function(req, res, next){
        Promotions.create(req.body, function(err, promotion){
            if(err) throw err;
            console.log('Promotion Created!');
            let id = promotion._id;
            res.writeHead(200, {'Content-Type':'text/plain'});
            res.end('Added the promotion with id: '+id+' at: '+promotion.updatedAt);
        })
    })
    .delete(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function(req, res, next){
        Promotions.remove({}, function(err, resp){
            if (err) throw err;
            res.json(resp);
        })
    });
promoRouter.route("/:promoId")
    .get(Verify.verifyOrdinaryUser, function(req, res, next){
        Promotions.findById(req.params.promoId, function(err, promotion){
            if (err) throw err;
            res.json(promotion);
        });
    })
    .put(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function(req, res, next){
        Promotions.findByIdAndUpdate(req.params.promoId, {$set: req.body}, {new:true}, function(err, promotion){
            if (err) throw err;
            res.json(promotion);
        });
    })
    .delete(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function(req, res, next){
        Promotions.remove({_id:req.params.promoId}, function(err, resp){
            if (err) throw err;
            res.json(resp);
        });
    });


module.exports = promoRouter;