const mongoose = require('mongoose');

const optionSchema = mongoose.Schema({
  excerpt_length: { type: Number, default: 40, unique: true }
})

module.exports = mongoose.model('Option', optionSchema)
