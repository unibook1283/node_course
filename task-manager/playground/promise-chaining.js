require('../src/db/mongoose')
const User = require('../src/models/user')

// promise chaining

// User.findByIdAndUpdate('620e1ef096712651085c35fa', { age: 1 }).then((user) => {
//     console.log(user)
//     return User.countDocuments({ age: 1 })
// }).then((result) => {
//     console.log(result)
// }).catch((e) => {
//     console.log(e)
// })



// async/await

const updateAgeAndCount = async (id, age) => {
    const user = await User.findByIdAndUpdate(id, { age })
    const count = await User.countDocuments({ age })
    return count
}

updateAgeAndCount('620e1ef096712651085c35fa', 3).then((count) => {
    console.log(count)
}).catch((e) => {
    console.log(e)
})