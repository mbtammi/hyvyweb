const gradesRouter = require('express').Router()
const Grade = require('../models/grade')
const jwt = require('jsonwebtoken')
const User = require('../models/user')
const Data = require('../models/data')

gradesRouter.get('/', async (request, response) => {
    const grades = await Grade
    .find({})

  response.json(grades)
})

gradesRouter.get('/:id', async (request, response) => {
  const grade = await Grade.findById(request.params.id)
  if (grade) {
    response.json(grade.toJSON())
  } else {
    response.status(404).end()
  }
})

gradesRouter.get('/', async (request, response) => {
  const grades = await Grade
  .find({})

response.json(grades)
})

const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
  }
  return null
}

gradesRouter.post('/', async (request, response) => {
  const body = request.body
  // const user = request.user
  const token = getTokenFrom(request)
  const decodedToken = jwt.verify(token, process.env.SECRET)
  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  const user = await User.findById(decodedToken.id)
  console.log("Requestin useri:", user)


    // TODO: Tee tarkistus, että onko käyttäjällä jo arvosana, sitten voi päivittää numeron
    // const existingUser = await User.findOne({ username })
    // if (existingUser) {
    //   return response.status(400).json({
    //     error: 'username must be unique'
    //   })
    // }
  
    // ID pitää saada käyttäjältä, kun on kirjautunut tms
    const newGrade = new Grade({
      name: body.name,
      grade: body.grade,
      datas: body.datas,
      users: user
    })
    console.log("Uusi Grade luotu: ", newGrade)
  
    const savedGrade = await newGrade.save()  
    console.log("Userin eka datas...: ",  user.datas[0] )
    const data = await Data.findById(user.datas[0])
    console.log("USERIN DATA: ", data)
    // console.log("Userin eka grades...: ",  user.datas[4].grades )
    //KÄYTÄ TÄMÄNTYYPPISTÄ const user = await User.findById(decodedToken.id)
    //tässä kohtaa pitäisi saada user.datas kohta ja päästä sinne sisälle
    data.grades = data.grades.concat(savedGrade._id)
    
    await user.save()
    await data.save()
    response.status(201).json(savedGrade)
  })

module.exports = gradesRouter