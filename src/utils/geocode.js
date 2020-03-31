const request = require('request')

geocode=(address,callback)=>{

    url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoiMTcxMmRhbmlzaCIsImEiOiJjazgwOXM4bmMwZTJxM3NtdW05Z2FuMXphIn0.ZIWmaSJelC9FfyDrYIPhJA&limit=1'

    request({url,json:true},(error,response)=>{
        
        if(error){
            callback('Network connection unavailable',undefined)

        }else if(response.body.features.length===0){
            callback('location not found.Try another one',undefined)
        }
        else{
            callback(undefined,{
              longitude:response.body.features[0].center[0],
              latitude:response.body.features[0].center[1],  
              location:response.body.features[0].place_name
            })
        }


    })

}

module.exports=geocode