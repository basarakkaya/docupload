const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = process.env.PORT || 3003
const cos = require('./queries/cos')
const db = require('./queries/db')
const cors = require('cors')


app.use(cors())
app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
)

app.get('/', (request, response) => {
    response.json({ info: 'Node.js, Express, and Postgres API' })
})

app.get('/users', db.getAllUsers)
app.get('/users/:id', db.getUserById)
app.post('/users', db.addUser)

app.post('/uploadText', cos.uploadText)
app.post('/uploadImage', cos.uploadImage)

app.get('/files', cos.getFiles)
app.get('/files/:itemName', cos.getItemURL)

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
})