
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pictureSchema = new Schema({
  name: String,
  pic_path: String,
  pic_name: String,
});

const Education = new Schema({
  degree: String,
  university: String,
  graduation: Date,
  description: String,
});

const Experience = new Schema({
  title: String,
  company: String,
  start: Date,
  end: Date,
  current: Boolean,
  description: String,
});

const Contact = new Schema({
  email: String,
  linkedIn: String,
  landline: Number,
  mobile: Number,
  city: String,
  street: String,
  zip: Number,
  country: String,

});

const professionalSchema = new Schema({
  username: String,
  password: String,
  role: String,
  name: String,
  lastName: String,
  gender: String,
  birthdate: Date,
  profession: Array,
  avatar: pictureSchema,
  education: [Education],
  experience: [Experience],
  contact: Contact,
}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
});

const Professional = mongoose.model('Professionals', professionalSchema);

module.exports = Professional;
