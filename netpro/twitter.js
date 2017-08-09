var passport = require('passport');
var TwitterStrategy = require('passport-twitter').Strategy;

//var User = require('../models/user');
//var config = require('../_config');
//var init = require('./init');

passport.use(new TwitterStrategy({
    consumerKey: '2qX7n5SMiYdIY7Z1UMHaZNz4t',
    consumerSecret: 'VSbWs5RuiINPc9UX7pXsuglBAACQ1CJXfgQTcutTRqHd8OhWza',
    callbackURL: "http://localhost:3000"
  },
  function(accessToken, refreshToken, profile, cb) {
    User.findOrCreate({twitterId: profile.id}, function (err, user){
      return cb(err, user);
    });
  }
  ));