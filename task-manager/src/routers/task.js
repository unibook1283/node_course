const express = require('express')
const router = new express.Router()
const Task = require('../models/task')
const User = require('../models/user')
const auth = require('../middleware/auth')

router.post('/tasks', auth, async (req, res) => {
    // const task = new Task(req.body)
    const task = new Task({
        ...req.body,    // copy all of the properties from the body over to this object.
        owner: req.user._id
    })

    try {
        await task.save()
        res.status(201).send(task)
    } catch (e) {
        res.status(400).send(e)
    }

    // task.save().then(() => {
    //     res.status(201).send(task)
    // }).catch((e) => {
    //     res.status(400).send(e)
    // })
})

// match로 하는 것
// GET /tasks?completed=true
// options로 하는 것
// GET /tasks?limit=10&skip=20  // 10개를 보겠다. 앞에 20개는 skip하겠다.
// GET /tasks?sortBy=createdAt:desc // createdAt을 내림차순으로 달라.
router.get('/tasks', auth, async (req, res) => {
    const match = {}
    if (req.query.completed) {  // req.query.completed에 들어있는 true/false는 Boolean이 아니고 String이다!
        match.completed = req.query.completed === 'true'
    }
    
    const sort = {}
    if (req.query.sortBy) {
        const parts = req.query.sortBy.split(':')
        sort[parts[0]] = parts[1] === 'asc' ? 1 : -1
    }
    try {
        // const tasks = await Task.find({ owner: req.user._id })
        // res.send(tasks)
        // await req.user.populate('tasks').execPopulate() 여기다가 option을 주고 싶으면 아래처럼 하면 됨
        await req.user.populate({
            path: 'tasks',
            match,
            options: {
                limit: parseInt(req.query.limit),    // parseInt: string -> int
                skip: parseInt(req.query.skip),
                sort
                // sort: {
                //     // createdAt: 1 // 1: asc, -1: desc
                //     completed: -1
                // }
            }
        }).execPopulate()
        res.send(req.user.tasks)

    } catch (e) {
        res.status(500).send()
    }

    // Task.find({}).then((tasks) => {
    //     res.send(tasks)
    // }).catch((e) => {
    //     res.status(500).send()
    // })
})

router.get('/tasks/:id', auth, async (req, res) => {
    const _id = req.params.id

    try {
        // const task = await Task.findById(_id)
        const task = await Task.findOne({ _id, owner: req.user._id })
        if (!task) {
            return res.status(404).send()
        }
        res.send(task)
    } catch (e) {
        res.status(500).send()
    }

    // Task.findById(_id).then((task) => {
    //     if (!task) {
    //         return res.status(404).send()
    //     }
    //     res.send(task)
    // }).catch((e) => {
    //     res.status(500).send()
    // })
})

router.patch('/tasks/:id', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['description', 'completed']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try {
        // const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
        // const task = await Task.findById(req.params.id)
        
        // updates.forEach((update) => {
        //     task[update] = req.body[update]
        // })
        
        // await task.save()
        
        // if (!task) {
        //     return res.status(404).send()
        // }
        // res.send(task)
        const task = await Task.findOne({ _id: req.params.id, owner: req.user._id })

        if (!task) {
            return res.status(404).send()
        }

        updates.forEach((update) => task[update] = req.body[update])
        await task.save()
        req.send(task)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.delete('/tasks/:id', auth, async (req, res) => {
    try {
        // const task = await Task.findByIdAndDelete(req.params.id)
        // if (!task) {
        //     return res.status(404).send()
        // }
        // res.send(task)

        const task = await Task.findOneAndDelete({ _id: req.params.id, owner: req.user._id})
        if (!task) {
            return res.status(404).send()
        }
        res.send(task)
    } catch (e) {
        res.status(500).send(e)
    }
})

module.exports = router