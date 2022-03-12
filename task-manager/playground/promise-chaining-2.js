require('../src/db/mongoose')
const Task = require('../src/models/task')

// Task.findByIdAndDelete('620e2d1fbdabc108bcd8e49a').then((task) => {
//     console.log(task)
//     return Task.countDocuments({ completed: false })
// }).then((result) => {
//     console.log(result)
// }).catch((e) => {
//     console.log(e)
// })

const deleteTaskAndCount = async (id) => {
    await Task.findByIdAndDelete(id)
    const count = await Task.countDocuments({ completed: false})
    return count
}

deleteTaskAndCount('620e2dac2a63f203b05a7f90').then((count) => {
    console.log(count)
}).catch((e) => {
    console.log(e)
})