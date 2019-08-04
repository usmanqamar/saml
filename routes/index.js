var express = require('express');
const config = require('../config/config');

function Router(passport) {

  var router = express.Router();

  router.get('/login',
    passport.authenticate(config.passport.strategy,
      {
        successRedirect: '/',
        failureRedirect: '/login'
      })
  );

  router.post(config.passport.saml.callbackPath,
    passport.authenticate(config.passport.strategy,
      {
        failureRedirect: '/',
        failureFlash: true
      }),
      function (req, res) {
        res.redirect('/profile');
      });

  router.get('/logout', function(req, res, next) {
    req.logout();
    res.redirect('/');

  });

  router.get('/', function(req, res, next) {
    res.render('home', { user: req.user });
  });


  router.get('/profile', function(req, res, next) {

    if (req.isAuthenticated()) {
      res.render('profile', { user: req.user });
    } else {
      res.redirect('/');
    }

  });

  return router;

}


module.exports = Router;
