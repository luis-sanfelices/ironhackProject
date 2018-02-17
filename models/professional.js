const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const professionalSchema = new Schema({
  username: String,
  password: String,
  role: String,
}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
});

const Professional = mongoose.model('Professional', professionalSchema);

module.exports = Professional;
