const mongoose = require('mongoose')
const Grade = require('./models/grade')

// if (process.argv.length<3) {
//   console.log('give password as argument')
//   process.exit(1)
// }


const url =
"mongodb+srv://full67shac23:kdi68h7Prd43@cluster0.xoh2tup.mongodb.net/dataBaseForTesting?retryWrites=true&w=majority"

mongoose.connect(url)

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  age: Number,
  ssn: String,
  grades: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Grade'
    }
  ],
  resultOfQuery: String,
  wantsToStudy: String,
  hobbiesAndInterests: String,
})

const User = mongoose.model('User', userSchema)

const user = new User({
    name: "Signing in",
    email: "kirjaudu@gmail.com",
    password: "salainen",
    age: 22,
    ssn: "261200XXXXX",
    grades: [{
        name: "Finnish",
        grade: 8,
    }],
    resultOfQuery: "Nature",
    wantsToStudy: "Programming",
    hobbiesAndInterests: "Sports Science"
})

user.save().then(result => {
  console.log("Tulos:", result)
  console.log('user saved!')
  mongoose.connection.close()
})