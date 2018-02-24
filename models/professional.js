const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const Education = new Schema({
  degree: String,
  university: String,
  graduation: Date,
  decription: String,
});

const Experience = new Schema({
  title: String,
  company: String,
  duration: {
    from: Date,
    to: Date,
  },
  current: Boolean,
  decription: String,
});

const Contact = new Schema({
  email: String,
  linkedIn: String,
  landline: Number,
  mobile: Number,
  address: {
    city: String,
    street: String,
    zip: Number,
    country: String,
  },
});

const professionalSchema = new Schema({
  username: String,
  password: String,
  role: String,
  profession: Array,
  education: [Education],
  experience: [Experience],
  contact: [Contact],
}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
});

const Professional = mongoose.model('Professionals', professionalSchema);

module.exports = Professional;
