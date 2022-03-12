// console.log('Starting')

// setTimeout(() => {
//     console.log('2 Second Timer')
// }, 2000)

// setTimeout(() => {
//     console.log('0 Second Timer')
// }, 0)

// console.log('Stopping')



// const url = 'http://api.weatherstack.com/current?access_key=50d8aca1d98a387adb0122c03dfe3de2&query=Seoul&units=f'

// request({ url: url, json: true }, (error, response) => {    // error, response 둘 중 하나만 값을 갖는다. 다른건 null.
//     if (error) {    // low OS level error
//         console.log('Unable to connect to weather service!')
//     } else if (response.body.error) {   // query를 잘못넣었을 때 등...
//         console.log('Unable to find location')
//     } else {
//         const current = response.body.current
//         console.log(`${current.weather_descriptions}. It is currently ${current.temperature} degrees out. It is feelslike ${current.feelslike} degrees out.`)
//     }
// })



const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


const address = process.argv[2]

if (!address) {
    console.log('Please provide an address')
} else {
    geocode(address, (error, { latitude, longitude, location }) => {  //(error, data) 이 순서가 전형적
        if (error) {
            return console.log(error)
        }
    
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return console.log(error)
            }
            console.log(location)
            console.log(forecastData)
        })
    })
}

