// request library를 쓰지 않고 node의 core module인 http를 써서 api를 받아오는 방법
// 그냥 한번 해봐라. 실제로는 request library 쓰면 됨
const http = require('http')  // 이건 core module이라 npm install 안해도 있음

const url = `http://api.weatherstack.com/forecast?access_key=50d8aca1d98a387adb0122c03dfe3de2&query=40,-75&units=f`

const request = http.request(url, (response) => {
    let data = ''

    response.on('data', (chunk) => {
        data = data + chunk.toString()
    })

    response.on('end', () => {
        const body = JSON.parse(data)
        console.log(body)
    })
})

request.on('error', (error) => {
    console.log('An error', error)
})

request.end()