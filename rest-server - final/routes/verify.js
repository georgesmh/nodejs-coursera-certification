let User = require('../models/user');
let jwt = require('jsonwebtoken');

let config = require('../config');

exports.getToken = function(user) {
  return jwt.sign(user, config.secretKey, {
    expiresIn: 3600
  });
};

exports.verifyOrdinaryUser = function(req, res, next) {

  // get the token (check for header or url parameter or post parameter
  let token = req.body.token ||
    req.query.token ||
    req.headers['x-access-token'];

  // decode the token
  if (token) {
    // verifies secret and checks expiration
    jwt.verify(token, config.secretKey, function(err, decoded) {

      if (err) {
        let err = new Error('You are not authenticated!!');
        err.status = 401;
        return next(err);
      } else { // everything is gd, save to request for use in other routes
        req.decoded = decoded;
        next();
      }
    });
  } else {

    let err = new Error('No token provided');
    err.status = 403;
    return next(err);
  }
};

exports.verifyAdmin = function(req, res, next){

    let isAdmin = req.decoded._doc.admin;

    if(!isAdmin){
        let err = new Error('You are unable to perform this operation');
        err.status = 403;
        return next(err);
    }

    else{
        next();
    }


};
