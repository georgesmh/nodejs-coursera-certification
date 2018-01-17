/**
 * Created by gmhanna on 16-Apr-17.
 */
// Node Module that implements an Express Router to support the REST API for the dishes

let bodyParser = require('body-parser');
let express = require('express');
let mongoose = require('mongoose');
let Dishes = require('../models/dishes'); // dishes mongoose schema
let Verify = require('./verify');


let dishRouter = express.Router();
dishRouter.use(bodyParser.json());

dishRouter.route('/')
    .get(Verify.verifyOrdinaryUser,  function(req, res, next){
        Dishes.find({})
            .populate('comments.postedBy')
            .exec(function(err, dishes){    // returns all the items as an array
            if (err) throw err;
            res.json(dishes);
        });
    })
    .post(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function(req, res, next){
        Dishes.create(req.body, function(err, dish){
            if(err) throw err;
            console.log('Dish Created!');
            let id = dish._id;
            res.writeHead(200, {'Content-Type':'text/plain'});
            res.end('Added the dish with id: '+id+' at: '+dish.updatedAt);
        })
    })
    .delete(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function(req, res, next){
        Dishes.remove({}, function(err, resp){
            if (err) throw err;
            res.json(resp);
        })
    });

dishRouter.route('/:dishId')
    .get(Verify.verifyOrdinaryUser, function(req, res, next){
        Dishes.findById(req.params.dishId)
            .populate('cooments.postedBy')
            .exec(function(err, dish){
           if (err) throw err;
           res.json(dish);
        });
    })
    .put(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function(req, res, next){
        Dishes.findByIdAndUpdate(req.params.dishId, {$set: req.body}, {new:true}, function(err, dish){
            if (err) throw err;
            res.json(dish);
        });
    })
    .delete(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function(req, res, next){
        Dishes.remove({_id:req.params.dishId}, function(err, resp){
           if (err) throw err;
           res.json(resp);
        });
    });

dishRouter.route('/:dishId/comments')
    .all(Verify.verifyOrdinaryUser)
    .get(Verify.verifyOrdinaryUser, (req, res, next) => {
        Dishes.findById(req.params.dishId)
            .populate('comments.postedBy')
            .exec(function(err, dish){
           if(err) throw err;


           res.json(dish.comments);
        });
    })
    .post(Verify.verifyOrdinaryUser, Verify.verifyAdmin, (req, res, next)=>{
        Dishes.findById(req.params.dishId, function(err, dish){

            // get user id

            req.body.postedBy = req.decoded._doc._id;
           dish.comments.push(req.body);

           dish.save(function(err, dish){
               if (err) throw err;
               console.log('Updated Comments!');
               res.json(dish);
           })
        });
    })
    .delete(Verify.verifyOrdinaryUser, Verify.verifyAdmin, (req, res, next)=>{
        Dishes.findById(req.params.dishId, function(err, dish){
            if (err) throw err;
            for (var i = (dish.comments.length-1); i>=0; i--){
                dish.comments.id(dish.comments[i]._id).remove();
            }
            dish.save(function(err, resp){
                if (err) throw err;
                res.writeHead(200, {'Content-Type':'text/plain'});
                res.end("Deleted all comments!");
            })
        })
    });

dishRouter.route('/:dishId/comments/:commentId')
    .all(Verify.verifyOrdinaryUser)
    .get(Verify.verifyOrdinaryUser, (req, res, next) => {
        Dishes.findById(req.params.dishId)
            .populate('comments.postedBy')
            .exec(function(err, dish){
            if (err) throw err;
            res.json(dish.comments.id(req.params.commentId));
        });
    })
    .put(Verify.verifyOrdinaryUser, (req, res, next)=> {
        Dishes.findById(req.params.dishId, function (err, dish) {
            if (err) throw err;

            // get user id

            req.body.postedBy = req.decoded._doc._id;

            dish.comments.id(req.params.commentId).remove();
            dish.comments.push(req.body);

            dish.save(function (err, resp) {
                if (err) throw err;
                res.json(dish);
            });

        });
    })
    .delete(Verify.verifyOrdinaryUser, (req, res, next)=> {
        Dishes.findById(req.params.dishId, function (err, dish) {
            if(dish.comments.id(req.params.commentId)!== req.decoded._doc._id){
                let err = new Error('Operation not authorized');
                err.status = 403;
                return next(err);
            }

            //if (err) throw err;

            dish.comments.id(req.params.commentId).remove();
            dish.save(function (err, resp) {
                if (err) throw err;
                res.json(dish);
            });

        });
    });

module.exports = dishRouter;