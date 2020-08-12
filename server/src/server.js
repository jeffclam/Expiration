const _ = require('underscore')
const express = require('express')
const app = express()
const port = process.env.PORT || 3000

app.use(express.json())

const logger = (req, res, next) => {
    console.log(`User accessed (${req.path}) using method (${req.method})`)
    next()
}

app.use(logger)

app.get('/', (req, res) => {
    res.send('Hello from the server!')
})

app.get('/api', (req, res) => {
    res.send('/api is okay')
})

app.get('/api/expirable', (req, res) => {
    db.collection('expirables').find().toArray((err, docs) => {
        if (err) {
            console.log(err)
            res.status(500).send({ err: 'failed to get collections' })
            return
        }
    
        res.send(docs)
    })
})

app.post('/api/expirable', (req, res) => {
    const expirable = req.body
    db.collection('expirables').insertOne(expirable, {}, (err, insertResult) => {
        if (err) {
            console.log(err)
            res.status(500).send({ err: 'failed to insert expirable' })
            return
        }

        res.send(insertResult.ops)
    })
})


process.on('SIGTERM', () => {
    console.log('SHUTTING DOWN...')
})

let db
const mongoDB = require('./mongo')
mongoDB.connect((database) => {
    db = database
    app.listen(port, () => console.log(`listening at http://localhost:${port}`))
})
