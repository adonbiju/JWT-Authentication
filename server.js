require('dotenv').config()
const express = require('express')
const app = express()
const jwt = require('jsonwebtoken')


app.use(express.json())

const posts = [
    {
      username: 'Adon',
      title: 'Post of Adon 1'
    },
    {
      username: 'Jion',
      title: 'Post 2'
    },
    {
      username: 'Adon',
      title: 'Post of Adon 2'
    }
  ]
  
app.get('/', (req, res) => res.send('JWT AUTHENTICATION!'))

app.get('/post', authenticateToken,(req, res) =>{
    res.json(posts.filter(post => post.username === req.user.name))
})

app.post('/login', (req, res) =>{
    //Authenicate user
    const username=req.body.username
    const user={name:username}
    
    const accessToken=jwt.sign(user,process.env.ACCESS_TOKEN_SECRET)
    res.json({accessToken:accessToken})
})

function  authenticateToken(req,res,next){
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (token == null) return res.sendStatus(401)

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403)
    req.user = user
    next()
  })

}
app.listen(3000,console.log("server running on the port 3000"))