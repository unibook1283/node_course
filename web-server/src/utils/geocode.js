const request = require('request')

const geocode = (address, callback) => {    
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoidW5pYm9va3MiLCJhIjoiY2t6YzI0N3RoMXNpYjJ2cHE4MDU4eTd3aCJ9.-KlW3hNQdzDE5SiZRNo5Hg&limit=1`
    request({ url, json: true }, (error, { body }) => { //{ body } : object destructuring을 사용한것
        if (error) {
            callback('Unable to connect to location service!', undefined)
        } else if (body.features.length === 0) {
            callback('Unable to find location. Try another search.', undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode