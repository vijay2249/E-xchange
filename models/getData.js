const fs = require('fs')
const path = require('path')

// const filePath = path.join(path.dirname(require.main.filename), "data", 'data.json')
const categories = path.join(path.dirname(require.main.filename), "data", 'categories.json')
const categoryItems = path.join(path.dirname(require.main.filename), "data", 'categoryItem.json')

const getDataFromFile = (callBack, fileName) =>{
  fs.readFile(fileName, (err, content)=>{
    if(err) callBack([])
    else callBack(JSON.parse(content))
  })
}

const getAllCategories = (callBack) =>{
  fs.readFile(categories, (err, content)=>{
    if(err) callBack([])
    else callBack(JSON.parse(content))
  })
}

module.exports = class Product{
  constructor(item){
    this.item = item
  }
  save(){
    getDataFromFile((products, categoryItems) =>{
      products.push(this.item)
      fs.writeFile(categoryItems, JSON.stringify(products), (err, fd)=>{
        if(err) console.log(err);
        fs.close(fd, (e)=>{
          if(e) console.log(e);
          else console.log("No error while closing the file");
        })
      })
    })
  }
  static fetchAll(callBack){
    getDataFromFile(callBack, categoryItems)
  }
}

module.exports = class Categories{
  constructor(item){this.item = item}
  save(){
    getAllCategories((category) =>{
      category.push(this.item)
      fs.write(categories, JSON.stringify(category), (err, fd) =>{
        if(err) console.log(err);
        fs.close(fd, (e) =>{
          if(e) console.log(err);
          else console.log("No error while closing the file");
        })
      })
    })
  }
  static fetchAllCategories(callBack){
    getAllCategories(callBack)
  }
}