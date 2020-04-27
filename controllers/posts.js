const Post = require('../models/Posts')
const Category = require('../models/Category')
const Option = require('../models/Options')
const fs = require('fs')
// package to make a slug with title
const slug = require('slug')

exports.createPost = (req, res, next) => {
  console.log(req.body)
  delete req.body._id;
  const post = new Post({
    ...req.body,
    thumbnail: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
    slug: slug(req.body.title),
    category_slug: slug(req.body.category),
    created_at: Date.now()
  })
  post.save()
    .then(() => res.redirect('/admin/home'))
    .catch(error => res.status(400).json({ error }))
}

exports.updatePost = (req, res, next) => {
  // every data except the picture
  const postObject = {
    ...req.body,
    slug: slug(req.body.title),
    category_slug: slug(req.body.category)
  }
  Post.updateOne({ _id: req.params.id }, { ...postObject, _id: req.params.id })
  .then(() => res.redirect('/admin/home'))
    .catch(error => res.status(404).json({ error }))
}

exports.updateImage = (req, res, next) => {
  // upload a new picture
  const postObject = {
    ...req.body,
    thumbnail: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  }
  Post.updateOne({ _id: req.params.id }, { ...postObject, _id: req.params.id })
  .then(() => res.redirect('/admin/home'))
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

//get one post for backend
exports.getOnePost = (req, res, next) => {
  Category.find(function(err, categories) {
    Post.findOne({ _id: req.params.id }, function(err, post) {
      res.render('admin/editPost', { title: 'Edit the post', post: post, categories: categories })
    })
  })
}

// get one post for frontend
exports.getOnePost_front = (req, res, next) => {
  Post.findOne({ slug: req.params.slug }, function(err, post) {
    res.render('single', { post: post })
  })
}

// get the form to upload a new image
exports.changeImage = (req, res, next) => {
  Post.findOne({ _id: req.params.id }, function(err, post) {
    res.render('admin/changeImage', { title: 'Edit the image', content: post })
  })
}

// post list for backend
exports.getAllPosts = (req, res, next) => {
  Post.find(function(err, posts) {
    console.log(posts)
    res.render('admin/home', { title: 'Admin', content: posts })
  });
}

// post list for frontend
exports.getAllPosts_front = (req, res, next) => {
  Option.find(function(err, options) {
    // get the excerpt words length
    const excerpt = options[0].excerpt_length
    Post.find(function(err, posts) {
      // create a new array with the new value excerpt
      var postsArray = []
      for (var i = 0; i < posts.length; i++) {
        // create object and inside put every value + excerpt value
        const postsObject = {}

        postsObject.title = posts[i].title
        postsObject.slug = posts[i].slug
        postsObject.date = posts[i].created_at.getFullYear()
        postsObject.category = posts[i].category
        postsObject.category_slug = slug(posts[i].category)
        // excerpt value from description and the limit words in options
        postsObject.excerpt = posts[i].description.split(' ').slice(0, excerpt).join(' ')
        postsArray.push(postsObject)
      }
      res.render('home', { title: 'Front', layout: 'layout_front', content: postsArray })
    })
  })
}
