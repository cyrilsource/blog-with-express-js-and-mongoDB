const Category = require('../models/Category')

exports.createCategory = (req, res, next) => {
  delete req.body._id;
  const category = new Category({
    ...req.body
  })
  category.save()
    .then(() => res.redirect('back'))
    .catch(error => res.status(400).json({ error }))
}

exports.getAllCategories = (req, res, next) => {
  Category.find(function(err, categories) {
    res.render('addPost', { title: 'Add a Post', content: categories })
  });
}
