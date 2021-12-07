const Categories = require('../models/getData')

exports.getItemData = (req, res, next) =>{
  res.render('sellItem', {path: '/sell'})
}

exports.postItemData = (req, res, next)=>{
  const item = req.body
  console.log(item);
  const newItem = new Categories(item)
  newItem.save()
  res.redirect(`/category/${req.body.category}`)
}