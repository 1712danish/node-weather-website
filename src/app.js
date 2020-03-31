const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode=require('./utils/geocode')
const forecast=require('./utils/forecast')

const app=express()
const port = process.env.PORT || 3000

//config paths for node
const public = path.join(__dirname,'../public')
const viewpath=path.join(__dirname,'../templates/views')
const partiaPath=path.join(__dirname,'../templates/partials')

//setup handlers engine views and partials
app.set('view engine','hbs')
app.set('views',viewpath)
hbs.registerPartials(partiaPath)

app.use(express.static(public))

app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather',
        name:'Danish Ali'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About me',
        name:'Danish Ali'
        
    })

})

app.get('/help',(req,res)=>{
    res.render('help',{
        title:'help me',
        message:'cajbhdvfhdbcsvknjacdh',
        name:'Danish Ali'
    })
})

app.get('/weather',(req,res)=>{

    if(!req.query.address){
        return res.send ({
            error:'provide an address'
        })
    }
        geocode(req.query.address,(error,{longitude,latitude,location}={})=>{
            if(error){
                return res.send({error})
            }
            forecast(latitude,longitude, (error,forecastData) => {
                if(error){
                    return res.send({error})
                }   
                res.send({
                    location: location,
                    address:req.query.address,
                    forecast: forecastData
                })
            

            })

        })
})  



    


app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:'Error 404',
        errorMessage:'help article not found'

    })
})


app.get('*',(req,res)=>{
    res.render('404',{
        title:'Error 404',
        errorMessage:'page not found'

    })
})

app.listen(port,()=>{
    console.log('Server is currently running'+port)
})