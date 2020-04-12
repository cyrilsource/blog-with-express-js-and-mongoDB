const mongoose = require('mongoose');

const categorySchema = mongoose.Schema({
  post_category: { type: String, required: true, unique: true }
});

module.exports = mongoose.model('Category', categorySchema)
