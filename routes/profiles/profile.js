const express = require('express');
const passport = require('passport');
const ensureLogin = require('connect-ensure-login');
const router = express.Router();
const bcrypt = require('bcrypt');
const bcryptSalt = 10;

const Family = require('../../models/family');

router.get('/family', (req, res, next) => {
  res.render('profiles/family');
});


module.exports = router;
