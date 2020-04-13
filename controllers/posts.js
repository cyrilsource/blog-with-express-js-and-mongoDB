const Post = require('../models/Posts')

exports.getAllPosts = (req, res, next) => {
  res.render('index', { title: 'My Blog' })
}

exports.createPost = (req, res, next) => {
  console.log()
  delete req.body._id;
  const post = new Post({
    ...req.body,
    thumbnail: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  })
  post.save()
    .then(() => res.redirect('back'))
    .catch(error => res.status(400).json({ error }))
}
