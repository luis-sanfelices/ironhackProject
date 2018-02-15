const bcrypt = require('bcrypt');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

// Import the model that we will use for login
const Family = require('../models/family');

function configurePassport() {
  // What we save in session
  passport.serializeUser((family, cb) => {
    cb(null, family._id);
  });

  // Get what we got from session
  passport.deserializeUser((id, cb) => {
    Family.findOne({ '_id': id }, (err, family) => {
      if (err) { return cb(err); }
      cb(null, family);
    });
  });

  // Strategy that we follow locally
  passport.use(new LocalStrategy({
    passReqToCallback: true,
  }, (req, username, password, next) => {
    Family.findOne({ username }, (err, family) => {
      if (err) {
        return next(err);
      }
      if (!family) {
        return next(null, false, { message: 'Incorrect username' });
      }
      if (!bcrypt.compareSync(password, family.password)) {
        return next(null, false, { message: 'Incorrect password' });
      }

      return next(null, family);
    });
  }));
}

module.exports = configurePassport;
