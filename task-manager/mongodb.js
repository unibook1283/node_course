// CRUD create read update delete

// const mongodb = require('mongodb')
// const MongoClient = mongodb.MongoClient
// const ObjectID = mongodb.ObjectID

const { MongoClient, ObjectID } = require('mongodb');

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'

// const id = new ObjectID()
// console.log(id.id.length)
// console.log(id.toHexString().length)

MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
    if (error) {
        return console.log('Unable to connect to database')
    } 

    const db = client.db(databaseName)


    


    //-------------------------------C(Create)--------------------------

    // db.collection('users').insertOne({
    //     _id: id,
    //     name: 'Vikram',
    //     age: 26
    // }, (error, result) => {
    //     if (error) {
    //         return console.log('Unable to insert user')
    //     }

    //     console.log(result.ops)
    // })


    // db.collection('users').insertMany([
    //     {
    //         name: 'Andrew',
    //         age: 21
    //     }, {
    //         name: 'Mead',
    //         age: 22
    //     }
    // ], (error, result) => {
    //     if (error) {
    //         return console.log('Unable to insert users')
    //     }

        
    //     console.log(result.ops)
    // })

    // db.collection('tasks').insertMany([
    //     {
    //         description: 'Playing game',
    //         completed: true
    //     }, {
    //         description: 'Study English',
    //         completed: false
    //     }, {
    //         description: 'Eat lunch',
    //         completed: false
    //     }
    // ], (error, result) => {
    //     if (error) {
    //         return console.log(error)
    //     }

    //     console.log(result.ops)
    // })

    //---------------------------------------------------------------




    //-------------------------R(Read)--------------------------------

    // db.collection('users').findOne({ _id: new ObjectID('620712371f4ada2424f40c41') }, (error, user) => {
    //     if (error) {                // _id는 이렇게 해야됨. string을 ObjectID형으로 만들어서 넣어줘야 됨
    //         return console.log('Unable to fetch')
    //     }

    //     console.log(user)
    // })

    // db.collection('users').find({ age: 27 }).toArray((error, users) => {
    //     console.log(users)
    // })

    // db.collection('users').find({ age: 27 }).count((error, count) => {
    //     console.log(count)
    // })



    // db.collection('tasks').findOne({ _id: new ObjectID('620665024a610243b0d378e6')}, (error, task) => {
    //     console.log(task)
    // })

    // db.collection('tasks').find({ completed: false }).toArray((error, result) => {
    //     console.log(result)
    // })

    //---------------------------------------------------------------



    //-------------------------U(Update)---------------------------

    // db.collection('users').updateOne({
    //     _id: new ObjectID('62065add5e470f198c31f202')
    // }, {
    //     $inc: {
    //         age: 1
    //     }
    // }).then((result) => {
    //     console.log(result)
    // }).catch((error) => {
    //     console.log(error)
    // })

    db.collection('tasks').updateMany({
        completed: false
    }, {
        $set: {
            completed: true
        }
    }).then((result) => {
        console.log(result)
    }).catch((error) => {
        console.log(error)
    })



    //---------------------------------------------------------------


    //----------------------D(Delete)------------------------------

    // db.collection('users').deleteMany({
    //     age: 27
    // }).then((result) => {
    //     console.log(result)
    // }).catch((error) => {
    //     console.log(error)
    // })

    db.collection('tasks').deleteOne({
        description: 'Eat lunch'
    }).then((result) => {
        console.log(result)
    }).catch((error) => {
        console.log(error)
    })



    //---------------------------------------------------------------
})