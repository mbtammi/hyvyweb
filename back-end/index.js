// //Koittakaa kaikki kommentoida metodeja muita varten niin
// //Helpompi lukea ja tulkita koodia

// //Kirjastot ja importit
// require('dotenv').config()
// const usersRouter = require('./controllers/users')
// const express = require('express')
// const app = express()
// const User = require('./models/user')
// app.use(express.json())

// //Hardkoodattu lista käyttäjistä
// // let users = [
// //   {
// //     id: 1,
// //     name: "Miro Tammi",
// //     email: "miro@gmail.com",
// //     age: 22,
// //     ssn: "261200XXXXX",
// //     grades: {
// //         math: 9,
// //         finnish: 8,
// //         others: 0,
// //     },
// //     resultOfQuery: "Nature",
// //     wantsToStudy: "Programming",
// //     hobbiesAndInterests: "Sports Science"
// //   },
// //   {
// //     id: 2,
// //     name: "Phatchanon Chuchat",
// //     email: "kai@gmail.com",
// //     age: 23,
// //     ssn: "121198XXXXX",
// //     grades: {
// //         math: 9,
// //         finnish: 8,
// //         others: 0,
// //     },
// //     resultOfQuery: "Nature",
// //     wantsToStudy: "Programming",
// //     hobbiesAndInterests: "Sports Science"
// //   },
// //   {
// //     id: 3,
// //     name: "Roni Koski",
// //     email: "roni@gmail.com",
// //     age: 22,
// //     ssn: "ENVarmaXXXXX",
// //     grades: {
// //         math: 9,
// //         finnish: 10,
// //         others: 0,
// //     },
// //     resultOfQuery: "Sports",
// //     wantsToStudy: "Programming",
// //     hobbiesAndInterests: "Sports Science"
// //   },
// // ]

// //Pyyntöjä, eli get / post / delete
// app.get('/', (req, res) => {
//     res.send('<h1>Hello World!</h1>')
//   })
  
//   app.get('/api/users', (req, res) => {
//       User.find({}).then(users => {
//         res.json(users)
//       })
//   })


//   // app.get('/api/users/:id', (request, response) => {
//   //   const id = Number(request.params.id)
//   //   const user = users.find(user => user.id === id)
//   //   if (user) {
//   //       response.json(user)
//   //     } else {
//   //       response.status(404).end()
//   //     }
//   // })

// app.get('/api/users/:id', (request, response) => {
//     User.findById(request.params.id).then(user => {
//       response.json(user)
//     })
//   })

//   app.delete('/api/users/:id', (request, response) => {
//     const id = Number(request.params.id)
//     users = users.filter(user => user.id !== id)
  
//     response.status(204).end()
//   })

//   // app.post('/api/users', (request, response) => {
//   //   const user = request.body
//   //   console.log(user)
//   //   response.json(user)
//   // })

//   app.post('/api/users', (request, response) => {
//     const body = request.body
  
//     if (body.content === undefined) {
//       return response.status(400).json({ error: 'content missing' })
//     }
  
//     const user = new User({
//       name: body.name,
//       email: body.email,
//       age: body.age,
//       ssn: body.ssn,
//       grades: [
//         body.grades
//       ],
//       resultOfQuery: body.resultOfQuery,
//       wantsToStudy: body.wantsToStudy,
//       hobbiesAndInterests: body.hobbiesAndInterests,
//     })
  
//     user.save().then(savedUser => {
//       response.json(savedUser)
//     })
//   })
  
//   const PORT = 3001
//   app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`)
//   })

  const http = require('http')
  const app = require("./app");
  const server = http.createServer(app);
  const config = require("./utils/config");
  const logger = require("./utils/logger");
  
  
  server.listen(config.PORT, () => {
      logger.info(`Server running on port ${config.PORT}`);
    });