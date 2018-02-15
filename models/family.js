const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const familySchema = new Schema({
  username: String,
  password: String,
}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
});

const Family = mongoose.model('Family', familySchema);

module.exports = Family;
