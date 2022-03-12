const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Task = require('./task')

const userSchema = new mongoose.Schema({    // middleware를 사용하기 위해 Schema를 사용한다
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid')
            }
        }
    },
    age: {
        type: Number,
        default: 0,
        validate(value) {
            if (value < 0) {
                throw new Error('Age must be a positive number')
            }
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 7,
        validate(value) {
            if (value.toLowerCase().includes('password')) {
                throw new Error('password must not contain the string "password"')
            }
        }
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }],
    avatar: {
        type: Buffer
    }
}, {
    timestamps: true
})


userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email })

    if (!user) {
        throw new Error('Unable to login')
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
        throw new Error('Unable to login')
    }

    return user
}

// statics와 methods의 차이
// statics are the methods defined on the Model. methods are defined on the document (instance).

userSchema.methods.generateAuthToken = async function () {    // 주의! arrow function으로 하면 this에 user가 안 들어있네
    // const token = jwt.sign({id}, 'asdf', { expiresIn: '7 days' })
    // return token
    const user = this
    const token = jwt.sign({ _id: user._id.toString() }, 'thisismynewcourse')

    user.tokens = user.tokens.concat({ token })
    await user.save()

    return token
}

userSchema.methods.toJSON = function () {   // res.send({})하면(object를 send하면) 내부적으로 JSON.stringify()가 실행됨 ( -> JSON 형식으로 바꿈)
    const user = this                       // .toJSON하면 stringify할때 이 function을 실행하겠다는 뜻 (index.js에 pet 예시를 봐라)

    const userObject = user.toObject()  // 이렇게 하니까 내가 아는 object가 나오네 ?? 왜 하는지 모르겠음 user, userObject console해보면 똑같은데

    delete userObject.password
    delete userObject.tokens
    delete userObject.avatar

    return userObject
    // const keys = Object.keys(user)
    // console.log(keys)
    // const filtered = keys.filter((key) => {
    //     if (key === 'password' || key === 'tokens') return false
    //     else return true
    // })
    // console.log(filtered)
    // return filtered
}


// Hash the plain text password before saving
userSchema.pre('save', async function (next) {  // pre: middleware 중 하나
    const user = this

    if (user.isModified('password')) {  // isModified함수는 해당 값이 db에 기록된 값과 비교해서 변경된 경우 true를, 그렇지 않은 경우 false를 반환
        user.password = await bcrypt.hash(user.password, 8)
    }

    next()
})

userSchema.pre('remove', async function (next) {
    const user = this
    await Task.deleteMany({ owner: user._id })
    next()
})

userSchema.virtual('tasks', {   // virtual: database에 실제로 저장되는게 아닌, realationship between two entities
    ref: 'Task',
    localField: '_id',
    foreignField: 'owner'
})


const User = mongoose.model('User', userSchema)

module.exports = User