const Category = require('../models/Category')
const Post = require('../models/Posts')
// package to make a slug with title
const slug = require('slug')

exports.createCategory = (req, res, next) => {
  delete req.body._id;
  const category = new Category({
    ...req.body,
    slug: slug(req.body.post_category)
  })
  category.save()
    .then(() => res.redirect('back'))
    .catch(error => res.status(400).json({ error }))
}

exports.deleteCategory = (req, res, next) => {
  Category.deleteOne({ _id: req.params.id })
  .then(() => res.redirect('back'))
  .catch(error => res.status(400).json({ error }))
}

exports.getAllCategories = (req, res, next) => {
  Category.find(function(err, categories) {
    res.render('admin/addPost', { title: 'Add a Post', content: categories })
  });
}

// get one category for frontend
exports.getOneCategory = (req, res, next) => {
  Category.findOne({ slug: req.params.slug }, function(err, category) {
    Post.find({ category_slug: req.params.slug }, function(err, post) {
      res.render('category', { layout: 'layout_front', post: post, category: category })
    })
  })
}
