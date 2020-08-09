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

app.post('/api/expirable', (req, res) => {
    console.log('body:',req.body)
    res.send({msg: 'POST to /api/expirable'})
})

app.listen(port, () => console.log(`Listening at http://localhost:${port}`))
