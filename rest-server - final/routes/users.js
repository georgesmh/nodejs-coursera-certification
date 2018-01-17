const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../models/user');
const Verify = require('./verify');


/* GET users listing. */
router.get('/', Verify.verifyOrdinaryUser, Verify.verifyAdmin, function (req, res, next) {
  User.find({}, function (err, users) {    // returns all the items as an array

    if (err) throw err;
    res.json(users);
  });
});

// registering a new user

router.post('/register', function (req, res) {
  User.register(new User({
    username: req.body.username
  }),
    req.body.password,
    function (err, user) {
      if (err) {
        return res.status(500).json({
          err: err
        });
      }

      if (req.body.firstname) {
        user.firstname = req.body.firstname;
      }

      if (req.body.lastname) {
        user.lastname = req.body.lastname;
      }

      user.save(function (err, user) {
        passport.authenticate('local')(req, res, function () {
          return res.status(200).json({
            status: 'Registration successful'
          });
        });
      });


    });
});

router.post('/login', function (req, res, next) {

  passport.authenticate('local', function (err, user, info) {

    if (err) {
      return next(err);
    }

    if (!user) {
      return res.status(401).json({
        err: info
      });
    }

    req.logIn(user, function (err) {

      if (err) {
        return res.status(500).json({
          err: 'Could not log in!'
        }); // could not log in
      }
      console.log('User in users: ', user);

      let token = Verify.getToken(user);
      res.status(200).json({
        status: 'Logged In!',
        success: true,
        token: token
      });

    });



  })(req, res, next);

});

router.get('/logout', function (req, res, next) {

  req.logout();
  res.status(200).json({
    status: 'Bye!!'
  });

});

router.get('/facebook', passport.authenticate('facebook'), function (req, res) { });

router.get('/facebook/callback', function (req, res, next) {
  passport.authenticate('facebook', function (err, user, info) {
    if (err)
      return next(err);
    if (!user) {
      return res.status(401).json({
        err: info
      });
    }
    req.logIn(user, function (err) {
      if (err) {
        return res.status(500).json({
          err: 'Could not log in user'
        });
      }
      let token = Verify.getToken(user);
      res.status(200).json({
        status: 'Login Successful!',
        success: true,
        token: token,
        user: user
      });
    });
  })(req, res, next);
});

module.exports = router;
