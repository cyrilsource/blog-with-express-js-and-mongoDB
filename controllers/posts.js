const Post = require('../models/Posts')
const fs = require('fs')

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
  Post.findOne({ _id: req.params.id })
    .then(post => {
      const filename = post.thumbnail.split('/images/')[1]
      fs.unlink(`images/${filename}`, () => {
        Post.deleteOne({ _id: req.params.id })
          .then(() => res.redirect('back'))
          .catch(error => res.status(400).json({ error }))
      });
    })
    .catch(error => res.status(500).json({ error }))
}

exports.getOnePost = (req, res, next) => {
  Post.findOne({ _id: req.params.id }, function(err, post) {
    console.log(post)
    res.render('editPost', {  title: 'Edit the post', content: post })
  });
}

exports.getAllPosts = (req, res, next) => {
  Post.find(function(err, posts) {
    res.render('admin', { title: 'Admin', content: posts })
  });
}
