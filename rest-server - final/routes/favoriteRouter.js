/**
 * Created by gmhanna on 29-May-17.
 */


let bodyParser = require('body-parser');
let express = require('express');
let mongoose = require('mongoose');
let Favorites = require('../models/favorites');
let Verify = require('./verify');

let favoriteRouter = express.Router();
favoriteRouter.use(bodyParser.json());

favoriteRouter.route('/')
    .get(Verify.verifyOrdinaryUser, function(req, res, next){
        Favorites.findOne({user : req.decoded._doc._id})
            .populate('user dishes')
            .exec(function(err, favorite){
                if (err) throw err;
                res.json(favorite);
        });
})
    .post(Verify.verifyOrdinaryUser, function(req, res, next) {

        Favorites.findOne({user: req.decoded._doc._id})
            .populate('dishes')
            .populate('user')
            .exec(function(err, favorite){
                if (err) throw err;
                console.log(favorite);
                if (favorite){
                    console.log(favorite.dishes);
                    favorite.dishes.push(req.body._id);
                    favorite.save(function(err, favorite){
                        if (err) throw err;
                        res.json(favorite);
                    });

                }
                else {
                    let f = new Favorites({user: req.decoded._doc._id, dishes:[req.body._id]});

                    Favorites.create(f, function(err, fav){
                        if (err) throw err;
                        console.log(fav);
                        res.json(fav);

                    });
                }
            });
    })
    .delete(Verify.verifyOrdinaryUser, function(req, res, next){

        Favorites.findOne({user: req.decoded._doc._id})
            .populate('user dishes')
            .exec(function(err, favorite){
                if (err) throw err;
                if (favorite){
                    // for (let i = (favorite.dishes.length-1); i>=0; i--){
                    //     favorite.dishes.id(favorite.dishes[i]).remove();
                    // }
                    favorite.dishes = [];
                    favorite.save(function(err, response){
                        if (err) throw err;
                        res.json(response);
                    });
                }
                else{
                    res.writeHead(200, {'Content-Type':'text/plain'});
                    res.end("No favorite document for this user");
                }
            })
    });

favoriteRouter.route('/:dishObjectId')
    .delete(Verify.verifyOrdinaryUser, function(req, res, next){

        Favorites.findOne({user: req.decoded._doc._id})
            //.populate('user dishes')
            .exec(function(err, favorite) {
                if (err) throw err;
                if (!favorite){
                    res.writeHead(200, {'Content-Type':'text/plain'});
                    res.end("No favorite document for this user");

                }

                else{
                    favorite.dishes.pull(req.params.dishObjectId);
                    favorite.save(function(err, response){
                        if (err) throw err;
                        res.json(response);
                    });

                }
            });

    });

module.exports = favoriteRouter;