const mongoose = require('mongoose')
// const validator = require('validator')
const User = require('../models/user')

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
    useNewUrlParser: true,      // 최근 mongoose 버전에서는 이것들 필요없음.
    useCreateIndex: true,
    useFindAndModify: false
})

// const User = mongoose.model('User', {
//     name: {
//         type: String,
//         required: true,
//         trim: true
//     },
//     email: {
//         type: String,
//         required: true,
//         trim: true,
//         lowercase: true,
//         validate(value) {
//             if (!validator.isEmail(value)) {
//                 throw new Error('Email is invalid')
//             }
//         }
//     },
//     age: {
//         type: Number,
//         default: 0,
//         validate(value) {
//             if (value < 0) {
//                 throw new Error('Age must be a positive number')
//             }
//         }
//     },
//     password: {
//         type: String,
//         required: true,
//         trim: true,
//         minlength: 7,
//         validate(value) {
//             if (value.toLowerCase().includes('password')) {
//                 throw new Error('password must not contain the string "password"')
//             }
//         }
//     }
// })



const me = new User({
    name: 'qwer',
    email: 'qwer@example.com',
    password: 'qwer1234'
})

me.save().then(() => {
    console.log(me)
}).catch((error) => {
    console.log('Error!', error)
})





// const Task = mongoose.model('Task', {
//     description: {
//         type: String,
//         required: true,
//         trim: true
//     },
//     completed: {
//         type: Boolean,
//         default: false,
//     }
// })



// const game = new Task ({
//     description: '   study hard  ',
// })

// game.save().then(() => {
//     console.log(game)
// }).catch((error) => {
//     console.log(error)
// })