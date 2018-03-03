const express = require('express');
const passport = require('passport');
const ensureLogin = require('connect-ensure-login');
const router = express.Router();
const bcrypt = require('bcrypt');
const bcryptSalt = 10;

const Family = require('../../models/family');
const Professional = require('../../models/professional');

router.get('/family', ensureLogin.ensureLoggedIn(), (req, res) => {
  if (req.user.role === 'family') {
    res.render('profiles/family', { user: req.user });
  } else {
    res.redirect('professional');
  }
});

router.post('/family/:id', (req, res) => {
  const { name, lastName, gender, birthdate, email, phone, address } = req.body;
  const { id } = req.params;
  Family.findByIdAndUpdate(
    { _id: id }, {
      $set: { name, lastName, gender, birthdate, email, phone, address } },
    { new: true },
    (err, family) => console.log(err, family)// res.redirect('/profiles/professional')
  );
});

router.get('/professional', ensureLogin.ensureLoggedIn(), (req, res) => {
  if (req.user.role === 'professional') {
    res.render('profiles/professional', { user: req.user });
  } else {
    res.redirect('family');
  }
});

router.post('/professional/addProfession/:id', (req, res) => {
  const { profession } = req.body;
  const { id } = req.params;
  Professional.findByIdAndUpdate(
    { _id: id }, {
      $push: { profession } },
    { new: true },
    (err, managerparent) => res.redirect('/profiles/professional')
  );
});

router.post('/professional/deleteProfession/:id', (req, res) => {
  const { profession } = req.body;
  const { id } = req.params;
  Professional.findByIdAndUpdate(
    { _id: id }, {
      $pull: { profession } },
    { new: true },
    (err, managerparent) => res.redirect('/profiles/professional')
  );
});

router.post('/professional/addExperience/:id', (req, res) => {
  const { experience } = req.body;
  const { id } = req.params;
  Professional.findByIdAndUpdate(
    { _id: id }, {
      $push: { experience: req.body } },
    { new: true },
    (err, managerparent) => { res.redirect('/profiles/professional')}
  );
});

router.post('/professional/deleteExperience/:id', (req, res) => {
  const { id } = req.params;
  Professional.findByIdAndUpdate(
    { _id : id }, {
      $pull: { experience: { _id: req.body._id } } },
    { new: true },
    (err, managerparent) => { res.redirect('/profiles/professional') }
  );
});

router.post('/professional/addEducation/:id', (req, res) => {
  const { education } = req.body;
  const { id } = req.params;
  Professional.findByIdAndUpdate(
    { _id : id }, {
      $push: { education: req.body } },
    { new: true },
    (err, managerparent) => {res.redirect('/profiles/professional')}
  );
});

router.post('/professional/deleteEducation/:id', (req, res) => {
  const { id } = req.params;
  Professional.findByIdAndUpdate(
    { _id : id }, {
      $pull: { education: {_id: req.body._id } } },
    { new: true },
    (err, managerparent) => { res.redirect('/profiles/professional') }
  );
});

router.post('/professional/addContact/:id', (req, res) => {
  const { contact } = req.body;
  const { id } = req.params;
  Professional.findByIdAndUpdate(
    { _id : id }, {
      $set: { contact: req.body } },
    { new: true },
    (err, managerparent) => { res.redirect('/profiles/professional')}
  );
});

router.post('/professional/deleteContact/:id', (req, res) => {
  const { contact } = req.body;
  const { id } = req.params;
  Professional.findByIdAndUpdate(
    { _id : id }, {
      $pull: { contact: req.body } },
    { new: true },
    (err, managerparent) => res.redirect('/profiles/professional')
  );
});

module.exports = router;
