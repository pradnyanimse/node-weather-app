const request = require('postman-request')

const forecast = (latitude,longitude, callback) =>{
    const url = 'http://api.weatherstack.com/current?access_key=cf61f53a1386e0e030bd97c5b2f69c19&query='+ latitude + ',' + longitude + '&units=f'
    request({url,json:true},(error,{ body }) => {
        if(error){
            callback('Unable to connect weather services',undefined) 
        }else if (body.error){
            callback('Unable to find location,try proper search',undefined) 
        }else{
            callback(undefined,body.current.weather_descriptions[0] + '. It is currently ' + body.current.temperature + ' degrees out. It feels like ' + body.current.feelslike + ' degrees out. The wind speed is currently ' + body.current.wind_speed + ' and humidity like ' + body.current.humidity + ' degrees out.' )
        }
    })
}

module.exports = forecast