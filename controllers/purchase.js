const AllItems = require("../models/getData")

exports.getItemsData = (req, res, next) =>{
  AllItems.fetchAllCategories(products =>{
    res.render('purchase', {
      path: '/purchase',
      Categories: products
    })
  })
}