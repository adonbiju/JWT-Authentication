require('dotenv').config()
const express = require('express')
const app = express()
const jwt = require('jsonwebtoken')


app.use(express.json())

app.get('/', (req, res) => res.send('JWT AUTHENTICATION!'))

app.listen(3000,console.log("server running on the port 3000"))