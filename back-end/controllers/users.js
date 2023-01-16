const usersRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')
// const { userExtractor } = require('../utils/middleware')

usersRouter.get('/', async (request, response) => {
  const users = await User
    .find({})
  console.log(users)
  response.json(users)
})

  usersRouter.post('/', async (request, response) => {

    //   const body = request.body
    const { name, age, ssn, email, password } = request.body
    console.log("request body", request.body)
    // const decodedToken = jwt.verify(request.token, process.env.SECRET)
    // if (!request.token || !decodedToken.id) {
    //     return response.status(401).json({ error: 'token missing or invalid' })
    // }
  
    if (name === undefined) {
      return response.status(400).json({ error: 'content missing' })
    }
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)
  
    const user = new User({
      name,
      email,
      age,
      ssn,
      passwordHash
    })
    const savedUser = await user.save()
    console.log("Useri: ", savedUser)
    // user.grades = user.grades.concat(savedUser._id)
    // await user.save()
    response.status(201).json(savedUser.toJSON())
  })

module.exports = usersRouter