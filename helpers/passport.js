const bcrypt = require('bcrypt');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

// Import the model that we will use for login
const Family = require('../models/family');
const Professional = require('../models/professional');

function configurePassport() {
  // What we save in session
  passport.serializeUser((user, cb) => {
    cb(null, { id: user._id, role: user.collection.collectionName });
  });

  // Get what we got from session
  passport.deserializeUser((user, cb) => {
    if (user.role === 'families') {
      Family.findOne({ _id: user.id }, (err, family) => {
        if (err) { return cb(err); }
        cb(null, family);
      });
    } else {
      Professional.findOne({ _id: user.id }, (err, professional) => {
        if (err) { return cb(err); }
        cb(null, professional);
      });
    }
  });

  // Strategy that we follow locally
  passport.use('family', new LocalStrategy({
    passReqToCallback: true,
  }, (req, username, password, next) => {
    Family.findOne({ username }, (err, family) => {
      if (err) {
        return next(err);
      }
      if (!family) {
        return next(null, false, { message: 'Incorrect username or password' });
      }
      if (!bcrypt.compareSync(password, family.password)) {
        return next(null, false, { message: 'Incorrect username or password' });
      }
      return next(null, family);
    });
  }));

  passport.use('professional', new LocalStrategy({
    passReqToCallback: true,
  }, (req, username, password, next) => {
    Professional.findOne({ username }, (err, professional) => {
      if (err) {
        return next(err);
      }
      if (!professional) {
        return next(null, false, { message: 'Incorrect username or password' });
      }
      if (!bcrypt.compareSync(password, professional.password)) {
        return next(null, false, { message: 'Incorrect username or password' });
      }
      return next(null, professional);
    });
  }));
}

module.exports = configurePassport;
