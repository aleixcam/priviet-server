#!/usr/bin/env node

const app = require('express')()
const bodyParser = require('body-parser')
const server = require('http').Server(app)
const io = require('socket.io')(server)
const MongoClient = require('mongodb').MongoClient

const { argv: [, , PORT = 9000] } = process
const MONGO_URL = 'mongodb://localhost:27017'
const MONGO_DBNAME = 'priviet'

app.use(bodyParser.urlencoded({extended: false}))
server.listen(PORT)
console.log('SERVER: listening on port ' + PORT)
const mongoClient = new MongoClient(MONGO_URL)

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html')
})

app.post('/users', function (req, res) {
    const user = {
        email: req.body.email,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        password: req.body.password
    }

    mongoClient.connect(function(err) {
        const db = mongoClient.db(MONGO_DBNAME)
        const users = db.collection('users')
        users.insertOne(user, function(err, res) {
            mongoClient.close()
        })
    })

    res.redirect('/')
})

io.on('connection', function (socket) {
    console.log('SERVER: new user connected')
})
