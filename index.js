//Koittakaa kaikki kommentoida metodeja muita varten niin
//Helpompi lukea ja tulkita koodia

//Kirjastot ja importit
const express = require('express')
const app = express()
app.use(express.json())

//Hardkoodattu lista käyttäjistä
let users = [
  {
    id: 1,
    name: "Miro Tammi",
    email: "miro@gmail.com",
    age: 22,
    ssn: "261200XXXXX",
    grades: {
        math: 9,
        finnish: 8,
        others: 0,
    },
    resultOfQuery: "Nature",
    wantsToStudy: "Programming",
    hobbiesAndInterests: "Sports Science"
  },
  {
    id: 2,
    name: "Phatchanon Chuchat",
    email: "kai@gmail.com",
    age: 23,
    ssn: "121198XXXXX",
    grades: {
        math: 9,
        finnish: 8,
        others: 0,
    },
    resultOfQuery: "Nature",
    wantsToStudy: "Programming",
    hobbiesAndInterests: "Sports Science"
  },
  {
    id: 3,
    name: "Roni Koski",
    email: "roni@gmail.com",
    age: 22,
    ssn: "ENVarmaXXXXX",
    grades: {
        math: 9,
        finnish: 10,
        others: 0,
    },
    resultOfQuery: "Sports",
    wantsToStudy: "Programming",
    hobbiesAndInterests: "Sports Science"
  },
]
app.get('/', (req, res) => {
    res.send('<h1>Hello World!</h1>')
  })
  
  app.get('/api/users', (req, res) => {
    res.json(users)
  })


  app.get('/api/users/:id', (request, response) => {
    const id = Number(request.params.id)
    const user = users.find(user => user.id === id)
    if (user) {
        response.json(user)
      } else {
        response.status(404).end()
      }
  })

  app.delete('/api/users/:id', (request, response) => {
    const id = Number(request.params.id)
    users = users.filter(user => user.id !== id)
  
    response.status(204).end()
  })

  app.post('/api/users', (request, response) => {
    const user = request.body
    console.log(user)
    response.json(user)
  })
  
  const PORT = 3001
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })