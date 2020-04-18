const Post = require('../models/Posts')
const Category = require('../models/Category')
const fs = require('fs')
//package to make a slug with title
const slug = require('slug')

exports.createPost = (req, res, next) => {
  console.log(req.body)
  delete req.body._id;
  const post = new Post({
    ...req.body,
    thumbnail: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
    slug: slug(req.body.title)
  })
  post.save()
    .then(() => res.redirect('/admin'))
    .catch(error => res.status(400).json({ error }))
}

exports.updatePost = (req, res, next) => {
  // every data except the picture
  const postObject = {
    ...req.body,
    slug: slug(req.body.title)
  }
  Post.updateOne({ _id: req.params.id }, { ...postObject, _id: req.params.id })
  .then(() => res.redirect('/admin'))
    .catch(error => res.status(404).json({ error }))
}

exports.updateImage = (req, res, next) => {
  // upload a new picture
  const postObject = {
    ...req.body,
    thumbnail: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  }
  Post.updateOne({ _id: req.params.id }, { ...postObject, _id: req.params.id })
  .then(() => res.redirect('/admin'))
    .catch(error => res.status(404).json({ error }))
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

// function to delete only image
exports.deleteImage = (req, res, next) => {
  Post.findOne({ _id: req.params.id })
    .then(post => {
      const filename = post.thumbnail.split('/images/')[1]
      fs.unlink(`images/${filename}`, () => res.redirect(`/admin/changeImage/${req.params.id}`))
    })
    .catch(error => res.status(500).json({ error }))
}

exports.getOnePost = (req, res, next) => {
  Category.find(function(err, categories) {
    Post.findOne({ _id: req.params.id }, function(err, post) {
      res.render('editPost', { title: 'Edit the post', post: post, categories: categories })
    })
  })
}

// get the form to upload a new image
exports.changeImage = (req, res, next) => {
  Post.findOne({ _id: req.params.id }, function(err, post) {
    res.render('changeImage', { title: 'Edit the image', content: post })
  })
}

exports.getAllPosts = (req, res, next) => {
  Post.find(function(err, posts) {
    res.render('admin', { title: 'Admin', content: posts })
  });
}
