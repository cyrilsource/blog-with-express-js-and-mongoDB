const Post = require('../models/Posts')

exports.getAllPosts = (req, res, next) => {
  Post.find(function(err, posts) {
    res.render('admin', { title: 'Admin', content: posts })
  });
}

exports.createPost = (req, res, next) => {
  console.log()
  delete req.body._id;
  const post = new Post({
    ...req.body,
    thumbnail: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  })
  post.save()
    .then(() => res.redirect('/admin'))
    .catch(error => res.status(400).json({ error }))
}

exports.deletePost = (req, res, next) => {
  Post.deleteOne({ _id: req.params.id })
  .then(() => res.redirect('back'))
  .catch(error => res.status(400).json({ error }))
}
