let passport = require('passport');
let LocalStrategy = require('passport-local').Strategy;
let FacebookStrategy = require('passport-facebook').Strategy;
let User = require('./models/user');
let config = require('./config');

exports.local = passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

exports.facebook = passport.use(new FacebookStrategy({
    clientID: config.facebook.clientID,
    clientSecret: config.facebook.clientSecret,
    callbackURL: config.facebook.callbackURL
},
    function (accessToken, requestToken, profile, done) {
        User.findOne({ OauthId: profile.id }, function (err, user) {
            if (err) console.log(err);
            if (!err && user != null) { // user exists in local db
                done(null, user);
            }
            else { // user does not exist in localdb .... first time authentication
                user = new User({
                    username: profile.displayName,
                    firstname: profile._json.name.split(" ")[0],
                    lastname: profile._json.name.split(" ")[1]
                }); 
                user.firstname = profile._json.name.split(" ")[0];
                user.OauthId = profile.id;
                user.OauthToken = accessToken;
                user.save(function (err) {
                    if (err) console.log(err);
                    else {
                        console.log('saving user....');
                        done(null, user);
                    }
                });
            }
        });
    }
));