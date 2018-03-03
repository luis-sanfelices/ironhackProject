const express = require('express');
const passport = require('passport');
const router = express.Router();
const bcrypt = require('bcrypt');
const bcryptSalt = 10;

const Family = require('../../models/family');
const Professional = require('../../models/professional');

/* GET home page. */
router.get('/family', (req, res, next) => {
  res.render('auth/signup_family', { message: req.flash('error') });
});

router.post('/family', (req, res, next) => {
  const { username, password } = req.body;

  if (username === '' || password === '') {
    res.render('index', { error: 'Indicate username and password' });
    return;
  }

  Family.findOne({ username }, 'username', (error, user) => {
    if (user !== null) {
      res.render('index', { error: 'The username already exists' });
      return;
    }

    const salt = bcrypt.genSaltSync(bcryptSalt);
    const hashPass = bcrypt.hashSync(password, salt);

    const newFamily = new Family({
      username,
      password: hashPass,
      role: 'family',
    });

    newFamily.save((err) => {
      if (err) {
        res.render('index', { error: 'Something went wrong' });
      } else {
        passport.authenticate('family')(req, res, () => {
          // req.toastr.success(‘Sesión iniciada con exito’, ‘Bienvenido!‘, optionsToastr);
          res.redirect('/profiles/family');
        });
      }
    });
  });
});

router.get('/professional', (req, res, next) => {
  res.render('auth/signup_professional', { message: req.flash('error') });
});

router.post('/professional', (req, res, next) => {
  const { username, password } = req.body;

  if (username === '' || password === '') {
    res.render('index', { error: 'Indicate username and password' });
    return;
  }

  Professional.findOne({ username }, 'username', (error, user) => {
    if (user !== null) {
      res.render('index', { error: 'The username already exists' });
      return;
    }

    const salt = bcrypt.genSaltSync(bcryptSalt);
    const hashPass = bcrypt.hashSync(password, salt);

    const newProfessional = new Professional({
      username,
      password: hashPass,
      role: 'professional',
    });

    newProfessional.save((err) => {
      if (err) {
        res.render('index', { error: 'Something went wrong' });
      } else {
        passport.authenticate('professional')(req, res, () => {
          // req.toastr.success(‘Sesión iniciada con exito’, ‘Bienvenido!‘, optionsToastr);
          res.redirect('/profiles/professional');
        });
      }
    });
  });
});

module.exports = router;
