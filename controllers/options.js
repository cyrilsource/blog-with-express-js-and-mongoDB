const Option = require('../models/Options')

exports.getAllOptions = (req, res, next) => {
  // in this collection we only one entry
  Option.find(function(err, options) {
    /* we test the length of array, if empty we must create an entry for the first time
     if array is not empty we render the template */
    if (options.length === 0) {
      delete req.body._id;
      const option = new Option()
      option.save()
        .then(() => res.redirect('/admin/options'))
        .catch(error => res.status(400).json({ error }))
    } else {
      res.render('admin/options', { title: 'The options', content: options })
    }
  })
}

exports.updateOptions = (req, res, next) => {
  const postObject = {
    ...req.body
  }
  Option.updateOne({ _id: req.params.id }, { ...postObject, _id: req.params.id })
  .then(() => res.redirect('back'))
    .catch(error => res.status(404).json({ error }))
}
