const express = require('express');
const passport = require('passport');
const ensureLogin = require('connect-ensure-login');
const router = express.Router();
const bcrypt = require('bcrypt');
const bcryptSalt = 10;

router.get('/family', ensureLogin.ensureLoggedIn(), (req, res) => {
  res.render('profiles/family', { user: req.user });
});

router.get('/professional', ensureLogin.ensureLoggedIn(), (req, res) => {
  res.render('profiles/professional', { user: req.user });
});

module.exports = router;
