const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const bcryptSalt = 10;

const Family = require('../../models/family');

/* GET home page. */
router.get('/family', (req, res, next) => {
  res.render('auth/signup_family', { message: req.flash('error') });
});

router.post('/family', (req, res, next) => {
  const { username, password } = req.body;

  if (username === '' || password === '') {
    res.render('auth/signup_family', { error: 'Indicate username and password' });
    return;
  }

  Family.findOne({ username }, 'username', (error, user) => {
    if (user !== null) {
      res.render('auth/signup_family', { error: 'The username already exists' });
      return;
    }

    const salt = bcrypt.genSaltSync(bcryptSalt);
    const hashPass = bcrypt.hashSync(password, salt);

    const newFamily = new Family({
      username,
      password: hashPass,
    });

    newFamily.save((err) => {
      if (err) {
        res.render('auth/signup', { error: 'Something went wrong' });
      } else {
        res.redirect('/');
      }
    });
  });
});

module.exports = router;
