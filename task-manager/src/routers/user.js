const express = require('express')
const router = new express.Router()
const User = require('../models/user')
const auth = require('../middleware/auth')
const multer = require('multer')
const sharp = require('sharp')

router.post('/users', async (req, res) => {
    const user = new User(req.body)

    try {
        await user.save()
        const token = await user.generateAuthToken()
        res.status(201).send({ user, token })
    } catch (e) {
        res.status(400).send(e)
    }

    // user.save().then(() => {
    //     res.status(201).send(user)
    // }).catch((e) => {
    //     res.status(400).send(e)
    // })
})

router.get('/users/me', auth, async (req, res) => { // auth를 먼저 실행하고 auth에서 next()가 불리면 저 다음이 실행됨
    res.send(req.user)

    // try {
    //     const users = await User.find({})
    //     res.send(users)
    // } catch (e) {
    //     res.status(500).send()
    // }


    // User.find({}).then((users) => { // {} 비워놓으면 모든 user를 가져온다
    //     res.send(users)
    // }).catch((e) => {
    //     res.status(500).send()
    // }) 
})

router.get('/users/:id', async (req, res) => {
    // console.log(req.params)
    const _id = req.params.id   // req.params로 그걸 받을 수 있음!
    
    try {
        const user = await User.findById(_id)
        if (!user) {
            return res.status(404).send()
        }
        res.send(user)
    } catch (e) {
        res.status(500).send()
    }

    // User.findById(_id).then((user) => {
    //     if (!user) {
    //         return res.status(404).send()
    //     }
    //     res.send(user)
    // }).catch((e) => {
    //     res.status(500).send()
    // })
})

router.patch('/users/me', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'password', 'age']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!'})
    }

    try {
        // auth 안 쓴 것
        // const user = await User.findById(req.user._id)

        // updates.forEach((update) => user[update] = req.body[update])

        // await user.save()

        // // const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })  // option
        // if (!user) {
        //     return res.status(404).send()
        // }
        // res.send(user)

        updates.forEach((update) => req.user[update] = req.body[update])

        await req.user.save()
        res.send(req.user)

    } catch (e) {
        res.status(400).send(e)
    }
})

router.delete('/users/me', auth, async (req, res) => {
    try {
        // const user = await User.findByIdAndDelete(req.user._id) // auth일 때만 req.user._id에 접근할 수 있다

        // if (!user) {
        //     return res.status(404).send()
        // }
        await req.user.remove()
        res.send(req.user)
    } catch (e) {
        res.status(500).send()
    }
})

// login하면 authentication token을 send하도록
router.post('/users/login', async (req, res) => {
    //이건 내가 혼자 해본거
    // try {
    //     const user = await User.findOne({ email: req.body.email })
    //     console.log(user)
    //     console.log(req.body.password)
    //     console.log(user.password)
    //     const okay = await bcrypt.compare(req.body.password, user.password)
    //     console.log(okay)
    //     if (!okay) {
    //         return res.status(400).send()
    //     }
    //     res.send(user)
    // } catch (e) {
    //     res.status(500).send(e)
    // }

    // 이건 routers/user.js에 userSchema.statics.findByCredentials 만들어서 하는거
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        res.send({ user, token })
    } catch (e) {
        res.status(400).send()
    }
})

router.post('/users/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })
        await req.user.save()

        res.send()
    } catch (e) {
        res.status(500).send()
    }
})

router.post('/users/logoutAll', auth, async (req, res) => {
    try {
        req.user.tokens = []
        await req.user.save()
        res.send()
    } catch (e) {
        res.status(500).send()
    }
})

const upload = multer({
    // dest: 'avatars',     // 이게 있으면 file system에 저장하고, 없으면 아래 (req, res)의 req에서 그 file을 가져올 수 있다.
    limits: {
        fileSize: 1000000
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(jpg|jpeg|png)/)) {
            return cb(new Error('Please upload an image file'))
        }
        cb(undefined, true)
    }
})
router.post('/users/me/avatar', auth, upload.single('avatar'), async (req, res) => {
    const buffer = await sharp(req.file.buffer).resize({ width: 250, height: 250 }).png().toBuffer()
    req.user.avatar = buffer
    // req.user.avatar = req.file.buffer
    await req.user.save()
    res.send()
}, (error, req, res, next) => {
    res.status(400).send({ error: error.message })
})

router.delete('/users/me/avatar', auth, async (req, res) => {
    req.user.avatar = undefined
    await req.user.save()
    res.send()
})

router.get('/users/:id/avatar', async (req, res) => {
    try {
        const user = await User.findById(req.params.id)

        if (!user || !user.avatar) {
            throw new Error()
        }

        res.set('Content-Type', 'image/png')    // 원래는 express가 알아서 'Content-Type', 'applictation/json'으로 default
        res.send(user.avatar)
    } catch (e) {
        res.status(404).send()
    }
})

module.exports = router