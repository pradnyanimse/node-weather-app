const path = require('path')
const express = require('express');
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000
//define path for express config
const publicDirPath = path.join(__dirname, '../public')
const viewDirPath = path.join(__dirname, '../templates/views')
const partialDirPath = path.join(__dirname, '../templates/partial')

//for heroku port number


// setup hndlebar engine and views path
app.set('view engine', 'hbs')
app.set('views', viewDirPath)
hbs.registerPartials(partialDirPath)

//setup static directory to serve
app.use(express.static(publicDirPath))
app.get('', (req,res) => {
    res.render('index', {
            title:'Weather app',
            name:'pradnya chikane'
    })
})
 
  
// app.get('/products', (req, res) => {
//     console.log(req.query.item)
//     res.send([{forcast : '36', location : 'pune'}])
  
// })
app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({error:'You must provide an address'})
    }
    geocode(req.query.address, (error,{latitude,longitude,places}={}) => {
        if(error){
            return res.send({error})
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if(error){
                return res.send({error}) 
            }
            res.send(
            {
                forecast : forecastData,
                places,
                address : req.query.address 
            })
        })
    })
   
})

app.get('/help', (req,res) => {
    res.render('help', {
        title:'Help',
        message:'This is help page',
        name:'pradnya chikane'
    })
})
app.get('/weather', (req,res) => {
    res.send([{forcast : '36', location : 'pune'}])
})
app.get('/help/*', (req,res)=>{
    res.render('404',{
        title:'404 page',
        name:'Pradnya chikane',
        errorMessage:'help artical not found'
    })
})
app.get('*', (req,res)=>{
    res.render('404',{
        title:'404 page',
        name:'Pradnya chikane',
        errorMessage:'404 page not found'
    })
})
app.listen(port,() => {
    console.log('setting up express server')
})
// app.get('',(req, res) => {
//     res.send('<h1>Hello Express</h1>')
// })
// app.get('/help', (req,res) => {
//     res.send({name : 'prdnya',age : '29'})
// })