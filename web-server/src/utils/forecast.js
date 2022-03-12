const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = `http://api.weatherstack.com/forecast?access_key=50d8aca1d98a387adb0122c03dfe3de2&query=${latitude},${longitude}&units=f`

    request({url, json: true}, (error, { body }) => {   //{ body } : object destructuring을 사용한것
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } if (body.error) {
            callback('Unable to find location. Try another search.', undefined)
        } else {
            callback(undefined, `${body.current.weather_descriptions[0]}. It is currently ${body.current.temperature} degrees out. It is feelslike ${body.current.feelslike} degrees out. Humidity is ${body.current.humidity}%.`)
}
    })
}

module.exports = forecast