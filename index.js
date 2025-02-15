const categoryItems = [
    {category: 'cycle', price: 500, condition: 'usable',img_path:"/imgs/cycles/1.jpg",owner: 'Vijay',
     description: 'Working well but front break need to be tightned'},
    {category: 'cycle', price: 600, condition: 'usable',img_path:"/imgs/cycles/4.jpg",owner: 'Vamsi',
    description: 'Working well but front break need to be tightned'}, 
    {category: 'cycle', price: 400, condition: 'super',img_path:"/imgs/cycles/5.jpg",owner: 'Jaithra',
     description: 'Working well but front break need to be tightned'},
    {category: 'cycle', price: 400, condition: 'super',img_path:"/imgs/cycles/2.jpg",owner: 'Jaithra',
    description: 'Working well but front break need to be tightned'},

    {category: 'books', price: 1200,condition: 'usable',img_path:"/imgs/books/5.jpg",owner: 'Sai Vivek',
    description: 'some pages missing'},
    {category: 'books', price: 650,condition: 'usable',img_path:"/imgs/books/1.jpg",owner: 'Jaithra',
     description: 'some pages missing'},
     {category: 'books', price: 300,condition: 'usable',img_path:"/imgs/books/2.jpg",owner: 'Vijay',
     description: 'some pages missing'},
     {category: 'books', price: 250,condition: 'usable',img_path:"/imgs/books/3.jpg",owner: 'Vivek',
     description: 'some pages missing'},
     {category: 'books', price: 700,condition: 'usable',img_path:"/imgs/books/4.jpg",owner: 'Vamsi',
     description: 'some pages missing'},

    {category: 'Stationary',price: 120,img_path:"/imgs/stationary/1.jpg",condition: 'Not so good',owner: 'Vamsi',
    description: 'Some leafs are torn'}, 
    {category: 'Stationary',price: 50,img_path:"/imgs/stationary/2.jpg",condition: 'Good',owner: 'Vijay',
    description: 'Some brushes are lost in set'}, 
    {category: 'Stationary',price: 70,img_path:"/imgs/stationary/3.jpg",condition: 'Not so good',owner: 'Jaithra',
    description: 'Some colors are dried'}, 
    {category: 'Stationary',price: 200,img_path:"/imgs/stationary/4.jpg",condition: 'Excellent',owner: 'Vivek',
    description: 'Parker pen'},

    {category: 'Calculator', price: 450,img_path:"/imgs/calculator/1.jpg",condition: 'Good',owner: 'Sai Vivek',
    description: 'Working well'},
    {category: 'Calculator', price: 700,img_path:"/imgs/calculator/2.jpg",condition: 'Ok',owner: 'Vamsi',
    description: 'Working well'},
    {category: 'Calculator', price: 1000,img_path:"/imgs/calculator/3.jpg",condition: 'Excellent',owner: 'Jaithra',
    description: 'Working very well'},
    
    {category: 'drafter', price: 45,img_path:"/imgs/drafter/1.jpg",condition: 'Good',owner: 'Sai Vivek',
    description: 'Working well'},
    {category: 'drafter', price: 70,img_path:"/imgs/drafter/2.jpg",condition: 'Ok',owner: 'Vamsi',
    description: 'Working well'},
    {category: 'drafter', price: 100,img_path:"/imgs/drafter/3.jpg",condition: 'Excellent',owner: 'Vijay',
    description: 'Working very well'},

    {category: 'Chart-Holder', price: 120,img_path:"/imgs/ChartHolder/1.jpg",condition: 'No Damage',owner: 'Vijay',
    description: 'Works very well'},
    {category: 'Chart-Holder', price: 120,img_path:"/imgs/ChartHolder/2.jpg",condition: 'Pretty good',owner: 'Jaithra',
    description: 'Holds more than 10 charts'},
    {category: 'Chart-Holder', price: 120,img_path:"/imgs/ChartHolder/3.jpg",condition: 'No Damage',owner: 'Vamsi',
    description: 'Nice Look'}
]

const express=require('express');
const bodyParser = require('body-parser')
const _ = require('lodash')

const userProfileRoute = require('./routes/userProfile')
const sellItemsRoute = require('./routes/sell')
const purchaseItemsRoute = require('./routes/purchase')
// const aboutUsRoute = require('./routes/aboutUs')

const app = express();
app.set('view engine', 'ejs');
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}))


app.get("/", (req, res, next) => {
    res.render('aboutUs/aboutUs', {path: '/about'})
})

app.get("/about", (req, res, next) =>{
    res.render('aboutUs/aboutUs', {path: '/about'})
})

app.use('/purchase', purchaseItemsRoute)

// app.use('/sell', sellItemsRoute)

app.route('/sell')
    .get((req, res, next) =>{
        res.render('sellItem', {path: '/sell'})
    })
    .post((req, res, next)=>{
        const {category} = req.body
        categoryItems.push(req.body)
        res.redirect(`/category/${category}`)
    })

app.use('/profile', userProfileRoute)

app.get('/category/:categoryName', (req, res, next)=>{
    const categoryName = _.lowerCase(req.params.categoryName)
    const filteredItems = categoryItems.filter(item => categoryName === _.lowerCase(item.category))
    res.render('categoryItem', {
        path: `/category/${categoryName}`, 
        categoryItems: filteredItems
    })
})

app.get('/cart', (req, res, next) =>{
    res.render('cart', { path: "/cart"})
})

app.listen(3000,() =>{ console.log("Server Started and listening on 3000") })