const express = require('express')
//express는 하나의 function만을 export한다.
const app = express()   //express는 함수 하나로 이루어져 있다. 다른것처럼 object가 아니고. 그래서 여기서 한 번만 쓰면 됨
const path = require('path')    // core module
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const port = process.env.PORT || 3000

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))


app.get('', (req, res) => {
    res.render('index', {        //render: view를 보내줄 수 있음
        title: 'Weather App',
        name: 'Andrew Mead'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Andrew'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text.',
        title: 'Help',
        name: 'Mead'
    })
})

// 위에서부터 읽으면서 '/' route를 찾으면 아래는 더 이상 보지 않는다.
// 그래서 '/' 이 route는 위에거만 실행됨. 아래 주석 처리한 건 필요가 없음
// index.html이 '/'를 대신한다
// help.html이 '/help'를 대신한다

// app.get('', (req, res) => { //get: 이 app/이라는 server에 요청이 오면 JSON이나 HTML같은 걸 response로 보내줌.
//     res.send('<h1>Weather</h1>')
// })  // 안에 들어있는 함수 : 누가 이 route에 들어오면 무슨 일을 할 지



// app.get('/help', (req, res) => {    // object를 보내면 localhost 들어가보면 JSON으로 나온다. 자동으로 변환됨
//     res.send([{
//         name: 'Andrew',
//         age: 27
//     }, {
//         name: 'Tom',
//         age: 12
//     }])
// })

// app.get('/about', (req, res) => {
//     res.send('<h1>title</h1>')
// })

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address term'
        })
    } else {
        geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {  //(error, data) 이 순서가 전형적
            if (error) {                   // 위에 object의 default값을 {}로 줘야지 undefined를 destructuring하는 문제가 안 생김. 안그러면 잘못된 address를 받았을 때 서버가 다운됨.
                return res.send({ error })
            }
        
            forecast(latitude, longitude, (error, forecastData) => {
                if (error) {
                    return res.send({ error })
                }
                res.send({
                    location,
                    forecastData,
                    address: req.query.address
                })
            })
        })
    }

    // res.send({
    //     forecast: 'sunny',
    //     location: 'seoul',
    //     address: req.query.address
    // })
})



app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({   // return을 해줘야 아래 에러가 안나온다. 응답을 두 번 한다는 걸 생각해봐
            error: 'You must proivde a serach term'
        })
    }   // 일반적으로 if else가 아닌 if문 안에서 return을 하는 구조를 많이 사용한다. 
// Error [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client
// : 응답을 두 번 이상 하면 나오는 에러.(res.send ...)
    console.log(req.query.search)
    res.send({
        products: []
    })
})


app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'Help',
        name: 'Andrew Mead',
        errorMessage: 'Help article not found.'
    })
})

app.get('*', (req, res) => {    // *: wildcard. 위의 어떤 router에도 걸리지 않았을 때, 404page를 보낸다.
    res.render('404', {
        title: '404 Error',
        name: 'Andrew Mead',
        errorMessage: 'Page not found.'
    })    // express는 router를 위에서부터 읽기 때문에 맨 마지막에 이렇게 써야되겠지.
})

app.listen(port, () => {
    console.log(`Server is up on port ${port}.`)
})