const express = require('express');
const passport = require('passport');
const ensureLogin = require('connect-ensure-login');
const router = express.Router();
const bcrypt = require('bcrypt');
const bcryptSalt = 10;

const Family = require('../../models/family');
const Professional = require('../../models/professional');

router.get('/family', ensureLogin.ensureLoggedIn(), (req, res) => {
  res.render('profiles/family', { user: req.user });
});

router.get('/professional', ensureLogin.ensureLoggedIn(), (req, res) => {
  res.render('profiles/professional', { user: req.user });
});

router.post('/professional/addProfession/:id', (req, res) => {
  console.log(req.body);
  const { profession } = req.body;
  const { id } = req.params;
  Professional.findByIdAndUpdate(
    { _id : id }, {
      $push: { profession } },
    { new: true },
    (err, managerparent) => res.redirect('/profiles/professional')
  );
});

router.post('/professional/deleteProfession/:id', (req, res) => {
  const { profession } = req.body;
  const { id } = req.params;
  Professional.findByIdAndUpdate(
    { _id : id }, {
      $pull: { profession } },
    { new: true },
    (err, managerparent) => res.redirect('/profiles/professional')
  );
});

router.post('/professional/addExperience/:id', (req, res) => {
  console.log(req.body);
  const { profession } = req.body;
  const { id } = req.params;
  Professional.findByIdAndUpdate(
    { _id : id }, {
      $push: { experience: req.body } },
    { new: true },
    (err, managerparent) => {console.log(err, managerparent); res.redirect('/profiles/professional')}
  );
});

router.post('/professional/deleteExperience/:id', (req, res) => {
  const { profession } = req.body;
  const { id } = req.params;
  Professional.findByIdAndUpdate(
    { _id : id }, {
      $pull: { profession } },
    { new: true },
    (err, managerparent) => res.redirect('/profiles/professional')
  );
});


module.exports = router;
