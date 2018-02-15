const express = require('express');
const passport = require('passport');
const ensureLogin = require('connect-ensure-login');
const router = express.Router();
const bcrypt = require('bcrypt');
const bcryptSalt = 10;

const Family = require('../../models/family');

router.get('/login', (req, res, next) => {
  res.render('auth/login', { message: req.flash('error') });
});

router.post('/login', passport.authenticate('local', {
  successRedirect: 'profiles/family',
  failureRedirect: 'login',
  failureFlash: true,
  passReqToCallback: true,
}));

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('login');
});

module.exports = router;
