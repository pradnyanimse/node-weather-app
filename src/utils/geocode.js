const request = require ('postman-request')

const geocode = (address,callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1IjoiYW5kcmV3bWVhZDEiLCJhIjoiY2pvOG8ybW90MDFhazNxcnJ4OTYydzJlOSJ9.njY7HvaalLEVhEOIghPTlw&limit=1'
    request({url,json:true},(error) =>{
          if(error){
             callback('Unable to connect geocode services',undefined)
           }
          //  else if(body.features.length === 0){
          //    callback('Unable to find location. Try another search.',undefined)
          //  }
          else{
             
             callback(undefined,{
                latitude : '18.520430',
                longitude : '73.856743',
                places : 'Pune,Ravet,Mukai chowk'
                })
          }
    })
}

module.exports = geocode