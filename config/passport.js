const SamlStrategy = require('passport-saml').Strategy;
const config = require('./config');

module.exports = function (passport) {

  passport.serializeUser(function (user, done) {
    done(null, user);
  });

  passport.deserializeUser(function (user, done) {
    done(null, user);
  });

  passport.use(new SamlStrategy(
    {
      path: config.passport.saml.path,
      entryPoint: config.passport.saml.entryPoint,
      issuer: config.passport.saml.issuer,
      cert: config.passport.saml.cert
    },
    function (profile, done) {
      console.log(profile );

      return done(null,
        {
          id: profile.uid,
          email: profile.nameID,
          firstName: profile.firstName,
          lastName: profile.lastName
        });
    })
  );

};
