const mongoose = require('mongoose')

const postSchema = mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  slug: { type: String, required: true },
  thumbnail: { type: String },
  category: { type: String, ref: 'Category', required: true },
  created_at: { type: Date }
})

module.exports = mongoose.model('Post', postSchema)
