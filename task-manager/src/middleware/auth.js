const jwt = require('jsonwebtoken')
const User = require('../models/user')

const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '')
        const decoded = jwt.verify(token, 'thisismynewcourse')  // decoded._id에 이 token을 갖는 user의 _id도 저장되는구나
        const user = await User.findOne({ _id: decoded._id, 'tokens.token': token })
        if (!user) {
            throw new Error()
        }
        
        req.token = token
        req.user = user
        next()
    } catch (e) {
        res.status(401).send({ error: 'Please authenticate.' })
    }
}

module.exports = auth