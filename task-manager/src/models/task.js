const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true,
        trim: true
    },
    completed: {
        type: Boolean,
        default: false,
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'     // user model에서 저장했던 const User = mongoose.model('User', userSchema) 이것의 'User'를 의미
    }
}, {
    timestamps: true
})

const Task = mongoose.model('Task', taskSchema)

module.exports = Task