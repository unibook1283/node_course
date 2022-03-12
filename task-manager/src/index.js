const express = require('express')
require('./db/mongoose')
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

const app = express()
const port = process.env.PORT || 3000

//
// Without middleware:  new request -> run route handler
// 
// With middleware:     new request -> do something -> run route handler
// 
// app.use((req, res, next) => {    // 이 콜백함수를 짜놓은 게 ./middleware/auth에 있는 auth 함수임
//     if (req.method === 'GET'){
//         res.send('GET requests are disabled')
//     } else {
//         next()
//     }
//     // next()  // next를 해줘야지 다른 router도 찾으러 간다. 아니면 무한로딩
// })

// app.use((req, res, next) => {
//     res.status(503).send('maintenance...')
// })


// multer
const multer = require('multer')
const upload = multer({
    dest: 'images',
    limits: {
        fileSize: 1000000
    },
    fileFilter(req, file, cb) {
        // if (!file.originalname.endsWith('.pdf')) {  // String.endsWith(s) : s로 끝나면 true 아니면 false return
        if (!file.originalname.match(/\.(doc|docx)$/)) {    // regular expression. regex101.com
            return cb(new Error('Please upload a Word document'))
        }
        cb(undefined, true)

        // 여기서 callback 보내는 세 가지 방법
        // cb(new Error('File must be a PDF'))
        // cb(undefined, true)
        // cb(undefined, false)
    }
})
app.post('/upload', upload.single('upload'), (req, res) => {    //upload.single('upload')의 upload는 post할 때 "key 이름"
    res.send()
}, (error, req, res, next) => { // 이 4개를 넣어줘야 express가 이게 error handler라는 걸 안다
    res.status(400).send({ error: error.message })
})
// 이 error handling으로 html이 아닌 json을 response로 보낼 수 있음.



app.use(express.json()) // 이렇게 해줘야 req 받을 때 json을 object로 변환해서 받아올 수 있음
                        // 안하면 undefined가 옴
app.use(userRouter)
app.use(taskRouter)

app.listen(port, () => {
    console.log(`Server is up on port ${port}`)
})

// const bcrypt = require('bcryptjs')

// const myFunction = async () => {
//     const password = 'Red12345!'
//     const hashedPassword = await bcrypt.hash(password, 8)   // salt는 8이 적당하더라
//     // hashing algorithms are one way algorithms(can't reverse) 
//     // 그래서 비밀번호를 비교하려면 다른것도 hashing해서 비교한다
//     console.log(password)
//     console.log(hashedPassword)

//     const isMatch = await bcrypt.compare('Red12345!', hashedPassword)
//     console.log(isMatch)
// }


// authentication을 위한 jsonwebtoken
// const jwt = require('jsonwebtoken')

// const myFunction = () => {
//     const token = jwt.sign({ _id: 'abc123' }, 'thisismynewcourse', { expiresIn: '7 days' }) // 첫 번째 {} 안에 user를 구분하기 위한 unique한 identifier를 넣어줘야됨
//     console.log(token)

//     const data = jwt.verify(token, 'thisismynewcourse')
//     console.log(data)
// }

// myFunction()




// const pet = {
//     name: 'Hal'
// }

// pet.toJSON = function () {
//     console.log(this)
//     return this
// }

// console.log(JSON.stringify(pet))



// const Task = require('./models/task')
// const User = require('./models/user')

// const main = async () => {
//     const task = await Task.findById('6211ee37ed2bda4d3c30fad0')
    
//     // await task.populate('owner').execPopulate()
//     // console.log(task.owner)

//     const user = await User.findById(task.owner)
//     await user.populate('tasks').execPopulate()
//     console.log(user.tasks)
// }

// main()