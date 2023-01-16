const datasRouter = require('express').Router()
const Data = require('../models/data')
const jwt = require('jsonwebtoken')
const User = require('../models/user')

datasRouter.get('/', async (request, response) => {
  const datas = await Data
    .find({})

  response.json(datas)
})

datasRouter.get('/:id', async (request, response) => {
    const data = await Data.findById(request.params.id)
  
    if (data) {
      response.json(data.toJSON())
    } else {
      response.status(404).end()
    }
  })

const getTokenFrom = request => {
    const authorization = request.get('authorization')
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
      return authorization.substring(7)
    }
    return null
  }

datasRouter.post('/', async (request, response) => {
  const body = request.body

  //Gradesien saaminen? Yleensä tehdään aina ensiksi data osuus ja siihen lisätään gradeja...

  const grades = request.grades
  const token = getTokenFrom(request)

  const decodedToken = jwt.verify(token, process.env.SECRET)
  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  const user = await User.findById(decodedToken.id)
  console.log("Requestin useri:", user)

  const data = new Data({
    resultOfQuery: body.resultOfQuery,
    wantsToStudy: body.wantsToStudy,
    hobbiesAndInterests: body.hobbiesAndInterests,
    grades: grades,
    users: user,
  })

//   if (!blog.title || !blog.url) {
//     response.status(400).end()
//   } else {
//     if (!blog.likes) {
//       blog.likes = 0
//     }
    console.log("USERI: ", user)
    const savedData = await data.save()
    user.datas = user.datas.concat(savedData._id)
    await user.save()
    response.status(201).json(savedData.toJSON())
//   }
})

// blogsRouter.delete('/:id',userExtractor, async (request, response) => {
//   const decodedToken = jwt.verify(request.token, process.env.SECRET)
//   if (!request.token || !decodedToken.id) {
//     return response.status(401).json({ error: 'token missing or invalid' })
//   }
//   const user = request.user
//   const blog = await Blog.findById(request.params.id)

//   console.log("USER ID : ", user._id.toString() )
//   console.log("BLOG: ", blog.user)

//   if ( blog.user.toString() === user._id.toString() ) {
//     await Blog.findByIdAndRemove(request.params.id)
//     response.status(204).end()
//   } else {
//     return response.status(401).json({ error: 'You have no access to delete this blog' })
//   }  
// })

// blogsRouter.put('/:id', async (request, response) => {
//   const body = request.body

//   const blog = {
//     title: body.title,
//     author: body.author,
//     url: body.url,
//     likes: body.likes
//   }

//   const updatedBlog = await Blog.findByIdAndUpdate(
//     request.params.id,
//     blog,
//     { new: true }
//   )
//   response.json(updatedBlog.toJSON())
// })

module.exports = datasRouter