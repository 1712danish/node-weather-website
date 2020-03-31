const request=require('request')

const forecast=(longitude,latitude,callback)=>{
    url='https://api.darksky.net/forecast/df6f8931291957339c33879ec979ebb4/'+longitude+','+latitude+'?units=si'

    request({url, json:true},(error,response)=>{
        if(error){
            callback('Network connection unavailable',undefined)
        }else if(response.body.error){
            callback('Location not found',undefined)

        }else{
            callback(undefined,response.body.daily.summary+'.It is currently '+response.body.currently.temperature+' degree out there.There is '+response.body.currently.precipProbability+'% chance of rain.')
        }

    })
}

module.exports = forecast