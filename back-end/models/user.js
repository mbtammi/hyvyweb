const mongoose = require('mongoose')

  const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    passwordHash: String,
    age: Number,
    ssn: String,
    datas: [
      {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Grade'
      }
    ],
  })



userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    delete returnedObject.passwordHash
  }
})

const User = mongoose.model('User', userSchema)
module.exports = User