/**
 * Created by gmhanna on 16-Apr-17.
 */
// Node Module that implements an Express Router to support the REST API for the dishes

let bodyParser = require('body-parser');
let express = require('express');
let mongoose = require('mongoose');
let Dishes = require('../models/dishes'); // dishes mongoose schema
let dishRouter = express.Router();
dishRouter.use(bodyParser.json());

dishRouter.route('/')
    .get(function(req, res, next){
        Dishes.find({}, function(err, dishes){    // returns all the items as an array
            if (err) throw err;
            res.json(dishes);
        });
    })
    .post(function(req, res, next){
        Dishes.create(req.body, function(err, dish){
            if(err) throw err;
            console.log('Dish Created!');
            let id = dish._id;
            res.writeHead(200, {'Content-Type':'text/plain'});
            res.end('Added the dish with id: '+id+' at: '+dish.updatedAt);
        })
    })
    .delete(function(req, res, next){
        Dishes.remove({}, function(err, resp){
            if (err) throw err;
            res.json(resp);
        })
    });

dishRouter.route('/:dishId')
    .get(function(req, res, next){
        Dishes.findById(req.params.dishId, function(err, dish){
           if (err) throw err;
           res.json(dish);
        });
    })
    .put(function(req, res, next){
        Dishes.findByIdAndUpdate(req.params.dishId, {$set: req.body}, {new:true}, function(err, dish){
            if (err) throw err;
            res.json(dish);
        });
    })
    .delete(function(req, res, next){
        Dishes.remove({_id:req.params.dishId}, function(err, resp){
           if (err) throw err;
           res.json(resp);
        });
    });

dishRouter.route('/:dishId/comments')
    .get((req, res, next) => {
        Dishes.findById(req.params.dishId, function(err, dish){
           if(err) throw err;
           res.json(dish.comments);
        });
    })
    .post((req, res, next)=>{
        Dishes.findById(req.params.dishId, function(err, dish){
           dish.comments.push(req.body);

           dish.save(function(err, dish){
               if (err) throw err;
               console.log('Updated Comments!');
               res.json(dish);
           })
        });
    })
    .delete((req, res, next)=>{
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
    .get((req, res, next) => {
        Dishes.findById(req.params.dishId, function(err, dish){
            if (err) throw err;
            res.json(dish.comments.id(req.params.commentId));
        });
    })
    .put((req, res, next)=> {
        Dishes.findById(req.params.dishId, function (err, dish) {
            if (err) throw err;
            dish.comments.id(req.params.commentId).remove();
            dish.comments.push(req.body);

            dish.save(function (err, resp) {
                if (err) throw err;
                res.json(dish);
            });

        });
    })
    .delete((req, res, next)=> {
        Dishes.findById(req.params.dishId, function (err, dish) {
            if (err) throw err;
            dish.comments.id(req.params.commentId).remove();
            dish.save(function (err, resp) {
                if (err) throw err;
                res.json(dish);
            });

        });
    });

module.exports = dishRouter;